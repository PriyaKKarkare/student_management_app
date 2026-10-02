"use client";

import { useState } from "react";

export default function SearchBox({ students }) {
	const [search, setSearch] = useState("");
	const [course, setCourse] = useState("All");

	const courses = [
		"All",
		...new Set(students.map((student) => student.course)),
	];

	const filteredStudents = students.filter((student) => {
		const matchesSearch = student.name
			.toLowerCase()
			.includes(search.toLowerCase());

		const matchesCourse =
			course === "All" || student.course === course;

		return matchesSearch && matchesCourse;
	});

	return (
		<div>
			{/* Search */}
			<input
				type="text"
				placeholder="Search student..."
				value={search}
				onChange={(event) => setSearch(event.target.value)}
			/>

			<br />
			<br />

			{/* Course Filter */}
			<select
				value={course}
				onChange={(event) => setCourse(event.target.value)}
			>
				{courses.map((item) => (
					<option key={item} value={item}>
						{item}
					</option>
				))}
			</select>

			<br />
			<br />

			{/* Students */}
			{filteredStudents.length === 0 ? (
				<p>No students found.</p>
			) : (
				filteredStudents.map((student) => (
					<div key={student._id}>
						<h2>{student.name}</h2>
						<p>Email: {student.email}</p>
						<p>Age: {student.age}</p>
						<p>Course: {student.course}</p>
						<hr />
					</div>
				))
			)}
		</div>
	);
}