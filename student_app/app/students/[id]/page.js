import Link from "next/link";
import mongoose from "mongoose";
import { notFound } from "next/navigation";
import DeleteStudentButton from "@/components/DeleteStudentButton";
import { connectDB } from "@/lib/db";
import Student from "@/models/Student";

// DB madhun thet student ghe (juna code localhost:3000 var fetch karaycha)
async function getStudent(id) {
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return { student: null };
	}

	try {
		await connectDB();

		const doc = await Student.findById(id).lean();

		if (!doc) {
			return { student: null };
		}

		return {
			student: {
				_id: String(doc._id),
				name: doc.name,
				email: doc.email,
				age: doc.age,
				course: doc.course,
			},
		};
	} catch (error) {
		return { error: error.message };
	}
}

export default async function StudentDetails({ params }) {
	const { id } = await params;

	const { student, error } = await getStudent(id);

	// Kahi chukla tar khara error screen var disel
	if (error) {
		return (
			<div className="details-card">
				<h1>Could not load student</h1>
				<p className="error-message">{error}</p>
				<Link href="/students">← Back to students</Link>
			</div>
		);
	}

	if (!student) {
		notFound();
	}

	return (
		<div>
			<Link href="/students" className="back-link">
				← Back to students
			</Link>

			<div className="students-header">
				<div>
					<h1>Student Details</h1>
					<p className="students-subtitle">
						Information about this student
					</p>
				</div>
			</div>

			<div className="details-card">
				<div className="detail-row">
					<span className="detail-label">Name : </span>
					<span>{student.name}</span>
				</div>

				<div className="detail-row">
					<span className="detail-label">Email : </span>
					<span>{student.email}</span>
				</div>

				<div className="detail-row">
					<span className="detail-label">Age : </span>
					<span>{student.age}</span>
				</div>

				<div className="detail-row">
					<span className="detail-label">Course : </span>
					<span>{student.course}</span>
				</div>

				<div className="detail-row">
					<span className="detail-label">ID : </span>
					<span>{student._id}</span>
				</div>

				<div className="action-buttons">
					<Link href={`/students/${id}/edit`} className="btn-pill">
						Edit Student
					</Link>

					<DeleteStudentButton id={student._id} />
				</div>
			</div>
		</div>
	);
}
