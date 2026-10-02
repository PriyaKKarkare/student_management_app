import DeleteStudentButton from "@/components/DeleteStudentButton";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getStudent(id) {
	const response = await fetch(
		`http://localhost:3000/api/students/${id}`
	);

	if (response.status === 404) {
		return null;
	}

	if (!response.ok) {
		throw new Error("Failed to fetch student");
	}

	return response.json();
}

export default async function StudentDetails({ params }) {
	const { id } = await params;

	const student = await getStudent(id);

	if (!student) {
		notFound();
	}

	return (
		<div>
			<h1>Student Details</h1>

			<p>
				<strong>Name:</strong> {student.name}
			</p>

			<p>
				<strong>Email:</strong> {student.email}
			</p>

			<p>
				<strong>Age:</strong> {student.age}
			</p>

			<p>
				<strong>Course:</strong> {student.course}
			</p>

			<p>
				<strong>ID:</strong> {student._id}
			</p>

			<br />

			<Link href={`/students/${id}/edit`}>
				<button>Edit Student</button>
			</Link>

			{" "}

			<DeleteStudentButton id={student._id} />
		</div>
	);
}