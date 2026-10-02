export default async function StudentDetails({ params }) {
	const { id } = await params;
	return (
		<div>
			<h1>Student Details</h1>
			<p>Student ID: {id}</p>
		</div>
	);
}