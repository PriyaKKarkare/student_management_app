import SearchBox from "./SearchBox";

async function getStudents() {
	const response = await fetch(
		"http://localhost:3000/api/students"
	);

	if (!response.ok) {
		throw new Error("Failed to fetch students");
	}

	return response.json();
}

export default async function StudentList() {
	const students = await getStudents();

	if (students.length === 0) {
		return <p>No students found.</p>;
	}

	return (
		<div>
			<SearchBox students={students} />
		</div>
	);
}