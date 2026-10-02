import { Suspense } from "react";
import StudentList from "../../components/StudentList";

export default function StudentsPage() {
	return (
		<div>
			<h1>Students</h1>

			<p>Here is the student list:</p>

			<Suspense fallback={<p>Loading student list...</p>}>
				<StudentList />
			</Suspense>
		</div>
	);
}