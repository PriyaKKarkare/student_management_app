"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import {
	CapIcon,
	UsersIcon,
	ChartIcon,
	SettingsIcon,
	ChevronLeftIcon,
	ChevronRightIcon,
	UserIcon,
	LogOutIcon,
} from "./Icons";

// Ya pages var sidebar nahi disnar (public pages)
const PUBLIC_PATHS = ["/", "/login", "/register"];

// Sidebar menu - href badlayche asel tar ithe badla
const NAV_ITEMS = [
	{
		href: "/students",
		title: "Students",
		subtitle: "Manage student records",
		Icon: UsersIcon,
	},
	{
		href: "/dashboard",
		title: "Analytics",
		subtitle: "View reports and statistics",
		Icon: ChartIcon,
	},
	{
		href: "/about",
		title: "Settings",
		subtitle: "System configuration",
		Icon: SettingsIcon,
	},
];

export default function AppShell({ children }) {
	const pathname = usePathname();
	const router = useRouter();

	const [collapsed, setCollapsed] = useState(false);
	const [userName, setUserName] = useState("");

	const isPublic = PUBLIC_PATHS.includes(pathname);

	useEffect(() => {
		if (isPublic) return;

		fetch("/api/auth/me")
			.then((res) => (res.ok ? res.json() : null))
			.then((data) => {
				if (data?.user?.name) setUserName(data.user.name);
			})
			.catch(() => { });
	}, [isPublic]);

	async function handleLogout() {
		await fetch("/api/auth/logout", { method: "POST" });
		router.push("/login");
		router.refresh();
	}

	if (isPublic) {
		return (
			<>
				<Navbar />
				<main className="public-main">{children}</main>
			</>
		);
	}

	return (
		<div className="app-shell">
			<aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
				<div className="sidebar-brand">
					<div className="brand-logo">
						<CapIcon size={20} />
						<span className="brand-name">EduManage</span>
					</div>

					<button
						type="button"
						className="icon-btn"
						onClick={() => setCollapsed(!collapsed)}
						aria-label="Toggle sidebar"
					>
						{collapsed ? (
							<ChevronRightIcon size={16} />
						) : (
							<ChevronLeftIcon size={16} />
						)}
					</button>
				</div>

				<nav className="sidebar-nav">
					{NAV_ITEMS.map(({ href, title, subtitle, Icon }) => {
						const active = pathname.startsWith(href);

						return (
							<Link
								key={href}
								href={href}
								className={`nav-item ${active ? "active" : ""}`}
								title={title}
							>
								<Icon size={18} />
								<span className="nav-text">
									<span className="nav-title">{title}</span>
									<span className="nav-sub">{subtitle}</span>
								</span>
							</Link>
						);
					})}
				</nav>
			</aside>

			<div className="app-body">
				<header className="topbar">
					<h2 className="topbar-title">Student Management Dashboard</h2>

					<div className="topbar-user">
						<UserIcon size={16} />
						<span>{userName || "User"}</span>

						<button
							type="button"
							className="icon-btn"
							onClick={handleLogout}
							aria-label="Logout"
							title="Logout"
						>
							<LogOutIcon size={16} />
						</button>
					</div>
				</header>

				<main className="app-content">{children}</main>
			</div>
		</div>
	);
}
