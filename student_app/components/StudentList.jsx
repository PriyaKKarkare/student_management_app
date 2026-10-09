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

	// Empty asla tari SearchBox dakhvaycha - table madhe
	// "No students added yet." message tithech yeto.
	return <SearchBox students={students} />;
}
