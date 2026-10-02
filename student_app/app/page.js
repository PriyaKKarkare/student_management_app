import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Student Management System</h1>

      <p>Welcome to Student Management System</p>

      <Link href="/login">
        Go to Login
      </Link>
    </div>
  );
}