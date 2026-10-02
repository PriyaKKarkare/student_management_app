"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
	const router = useRouter();

	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
	});

	const [message, setMessage] = useState("");
	const [loading, setLoading] = useState(false);

	function handleChange(event) {
		const { name, value } = event.target;

		setFormData({
			...formData,
			[name]: value,
		});
	}

	async function handleSubmit(event) {
		event.preventDefault();

		setMessage("");
		setLoading(true);

		try {
			const response = await fetch("/api/auth/register", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				setMessage(data.message || "Registration failed");
				return;
			}

			setMessage("Registration successful!");

			setFormData({
				name: "",
				email: "",
				password: "",
			});

			router.push("/login");
		} catch (error) {
			setMessage("Something went wrong");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div>
			<h1>Register</h1>

			<form onSubmit={handleSubmit}>
				<div>
					<label>Name</label>
					<br />

					<input
						type="text"
						name="name"
						value={formData.name}
						onChange={handleChange}
						placeholder="Enter your name"
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
						placeholder="Enter your email"
					/>
				</div>

				<br />

				<div>
					<label>Password</label>
					<br />

					<input
						type="password"
						name="password"
						value={formData.password}
						onChange={handleChange}
						placeholder="Enter your password"
					/>
				</div>

				<br />

				<button type="submit" disabled={loading}>
					{loading ? "Registering..." : "Register"}
				</button>
			</form>

			<p>{message}</p>
		</div>
	);
}