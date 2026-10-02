"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditStudentPage() {
	const params = useParams();
	const router = useRouter();

	const id = params.id;

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		age: "",
		course: "",
	});

	const [loading, setLoading] = useState(true);
	const [message, setMessage] = useState("");

	useEffect(() => {
		async function getStudent() {
			try {
				const response = await fetch(`/api/students/${id}`);

				const data = await response.json();

				if (!response.ok) {
					setMessage(data.message || "Failed to fetch student");
					return;
				}

				setFormData({
					name: data.name,
					email: data.email,
					age: data.age,
					course: data.course,
				});
			} catch (error) {
				setMessage("Something went wrong");
			} finally {
				setLoading(false);
			}
		}

		getStudent();
	}, [id]);

	function handleChange(event) {
		const { name, value } = event.target;

		setFormData({
			...formData,
			[name]: value,
		});
	}

	async function handleSubmit(event) {
		event.preventDefault();

		setMessage("Updating...");

		const response = await fetch(`/api/students/${id}`, {
			method: "PUT",
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
			setMessage(data.message || "Failed to update student");
			return;
		}

		setMessage("Student updated successfully!");

		router.push(`/students/${id}`);
	}

	if (loading) {
		return <p>Loading student...</p>;
	}

	return (
		<div>
			<h1>Edit Student</h1>

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
					Update Student
				</button>
			</form>

			<p>{message}</p>
		</div>
	);
}