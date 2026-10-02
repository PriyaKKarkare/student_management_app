import Link from "next/link";

async function getStudents() {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch students");
  }

  return response.json();
}

export default async function StudentsPage() {
  const students = await getStudents();

  return (
    <div>
      <h1>Students</h1>

      {students.map((student) => (
        <div key={student.id}>
          <h2>{student.name}</h2>

          <p>{student.email}</p>

          <Link href={`/students/${student.id}`}>
            View Details
          </Link>

          <hr />
        </div>
      ))}
    </div>
  );
}