import SearchBox from "./SearchBox";

async function getStudents() {
	const response = await fetch(
		"http://localhost:3000/api/students",
		{
			cache: "no-store",
		}
	);

	if (!response.ok) {
		throw new Error("Failed to fetch students");
	}

	return response.json();
}

export default async function StudentList() {
	const students = await getStudents();

	return <SearchBox students={students} />;
}