"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddStudentPage() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		age: "",
		course: "",
	});

	const [message, setMessage] = useState("");

	function handleChange(event) {
		const { name, value } = event.target;

		setFormData({
			...formData,
			[name]: value,
		});
	}

	async function handleSubmit(event) {
		event.preventDefault();

		setMessage("Saving...");

		const response = await fetch("/api/students", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				...formData,
				age: Number(formData.age),
			}),
		});

		const data = await response.json();

		if (!response.ok) {
			setMessage(data.message || "Failed to create student");
			return;
		}

		setMessage("Student created successfully!");

		setFormData({
			name: "",
			email: "",
			age: "",
			course: "",
		});

		router.push("/students");
	}

	return (
		<div>
			<h1>Add Student</h1>

			<form onSubmit={handleSubmit}>
				<div>
					<label>Name</label>
					<br />

					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
					/>
				</div>

				<br />

				<div>
					<label>Email</label>
					<br />

					<input
						type="email"
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
				</div>

				<br />

				<div>
					<label>Age</label>
					<br />

					<input
						type="number"
						name="age"
						value={formData.age}
						onChange={handleChange}
					/>
				</div>

				<br />

				<div>
					<label>Course</label>
					<br />

					<input
						type="text"
						name="course"
						value={formData.course}
						onChange={handleChange}
					/>
				</div>

				<br />

				<button type="submit">
					Add Student
				</button>
			</form>

			<p>{message}</p>
		</div>
	);
}