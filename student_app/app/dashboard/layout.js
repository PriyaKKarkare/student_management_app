import Link from "next/link";

export default function DashboardLayout({ children }) {
  return (
    <div style={{ display: "flex", gap: "30px" }}>
      
      <aside>
        <h3>Dashboard Menu</h3>

        <div>
          <Link href="/dashboard">Dashboard</Link>
        </div>

        <div>
          <Link href="/students">Students</Link>
        </div>

        <div>
          <Link href="/students/add">Add Student</Link>
        </div>
      </aside>

      <main>
        {children}
      </main>

    </div>
  );
}