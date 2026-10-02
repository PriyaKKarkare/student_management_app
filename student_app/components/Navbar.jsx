import Link from "next/link";

export default function Navbar() {
	return (
		<nav>
			<h2>Student Management System</h2>

			<div>
				<Link href="/">Home</Link>
				{" | "}
				<Link href="/dashboard">Dashboard</Link>
				{" | "}
				<Link href="/login">Login</Link>
			</div>
		</nav>
	);
}