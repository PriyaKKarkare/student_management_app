"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteStudentButton({ id }) {
	const router = useRouter();

	const [loading, setLoading] = useState(false);

	async function handleDelete() {
		const confirmed = window.confirm(
			"Are you sure you want to delete this student?"
		);

		if (!confirmed) {
			return;
		}

		setLoading(true);

		try {
			const response = await fetch(`/api/students/${id}`, {
				method: "DELETE",
			});

			const data = await response.json();

			if (!response.ok) {
				alert(data.message || "Failed to delete student");
				return;
			}

			alert("Student deleted successfully!");

			router.push("/students");
			router.refresh();
		} catch (error) {
			alert("Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<button
			onClick={handleDelete}
			disabled={loading}
		>
			{loading ? "Deleting..." : "Delete Student"}
		</button>
	);
}