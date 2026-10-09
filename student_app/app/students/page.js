import { Suspense } from "react";
import Link from "next/link";
import StudentList from "../../components/StudentList";
import { PlusIcon } from "../../components/Icons";

export default function StudentsPage() {
	return (
		<div className="students-page">
			<div className="students-header">
				<div>
					<h1>Students</h1>
					<p className="students-subtitle">
						Manage your student records and information
					</p>
				</div>

				<Link href="/students/add" className="btn-primary-pill">
					<PlusIcon size={16} />
					Add Student
				</Link>
			</div>

			<Suspense fallback={<p>Loading student list...</p>}>
				<StudentList />
			</Suspense>
		</div>
	);
}
