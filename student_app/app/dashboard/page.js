"use client";

import { useRouter } from "next/navigation";

export default function DashboardPage() {
	const router = useRouter();

	async function handleLogout() {
		const response = await fetch("/api/auth/logout", {
			method: "POST",
		});

		const data = await response.json();

		if (!response.ok) {
			alert(data.message || "Logout failed");
			return;
		}

		router.push("/login");
		router.refresh();
	}

	return (
		<div>
			<h1>Dashboard</h1>

			<p>Welcome to Student Management System</p>

			<button onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
}