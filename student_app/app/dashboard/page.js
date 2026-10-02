import Link from "next/link";

export default function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      <p>Welcome to Student Dashboard</p>

      <Link href="/students">
        View Students
      </Link>
    </div>
  );
}