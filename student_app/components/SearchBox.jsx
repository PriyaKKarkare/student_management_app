"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
	SearchIcon,
	EyeIcon,
	FilterIcon,
	DownloadIcon,
} from "./Icons";

// Table madhle columns - navin column pahije asel tar ithe add kara
// (Student model madhe field asne garajeche)
const ALL_COLUMNS = [
	{ key: "id", label: "Student ID" },
	{ key: "name", label: "Student Name" },
	{ key: "email", label: "Email" },
	{ key: "age", label: "Age" },
	{ key: "course", label: "Course" },
];

function getValue(student, key) {
	if (key === "id") {
		return "STU-" + String(student._id).slice(-6).toUpperCase();
	}
	return student[key] ?? "";
}

export default function SearchBox({ students }) {
	const [search, setSearch] = useState("");
	const [course, setCourse] = useState("All");
	const [openMenu, setOpenMenu] = useState(null); // "columns" | "filter" | null
	const [visibleCols, setVisibleCols] = useState(
		ALL_COLUMNS.map((c) => c.key)
	);

	const toolbarRef = useRef(null);

	// Menu baher click kela ki band hou de
	useEffect(() => {
		function handleClick(event) {
			if (
				toolbarRef.current &&
				!toolbarRef.current.contains(event.target)
			) {
				setOpenMenu(null);
			}
		}
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, []);

	const courses = useMemo(
		() => ["All", ...new Set(students.map((s) => s.course))],
		[students]
	);

	const filteredStudents = students.filter((student) => {
		const query = search.toLowerCase();

		const matchesSearch = [
			student.name,
			student.email,
			student.course,
			getValue(student, "id"),
		]
			.join(" ")
			.toLowerCase()
			.includes(query);

		const matchesCourse =
			course === "All" || student.course === course;

		return matchesSearch && matchesCourse;
	});

	const columns = ALL_COLUMNS.filter((c) =>
		visibleCols.includes(c.key)
	);

	function toggleColumn(key) {
		setVisibleCols((prev) =>
			prev.includes(key)
				? prev.filter((k) => k !== key)
				: [...prev, key]
		);
	}

	function handleExport() {
		const header = columns.map((c) => c.label);
		const rows = filteredStudents.map((s) =>
			columns.map((c) => `"${String(getValue(s, c.key)).replace(/"/g, '""')}"`)
		);

		const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
		const url = URL.createObjectURL(blob);

		const link = document.createElement("a");
		link.href = url;
		link.download = "students.csv";
		link.click();

		URL.revokeObjectURL(url);
	}

	return (
		<div>
			{/* ===== Toolbar: Search + Columns / Filter / Export ===== */}
			<div className="toolbar" ref={toolbarRef}>
				<div className="search-pill">
					<SearchIcon size={16} />
					<input
						type="text"
						placeholder="Search students by name, ID, email, course..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>

				<div className="menu-wrap">
					<button
						type="button"
						className="btn-pill"
						onClick={() =>
							setOpenMenu(openMenu === "columns" ? null : "columns")
						}
					>
						<EyeIcon size={16} />
						Columns
					</button>

					{openMenu === "columns" && (
						<div className="dropdown">
							{ALL_COLUMNS.map((c) => (
								<label key={c.key} className="dropdown-item">
									<input
										type="checkbox"
										checked={visibleCols.includes(c.key)}
										onChange={() => toggleColumn(c.key)}
									/>
									{c.label}
								</label>
							))}
						</div>
					)}
				</div>

				<div className="menu-wrap">
					<button
						type="button"
						className="btn-pill"
						onClick={() =>
							setOpenMenu(openMenu === "filter" ? null : "filter")
						}
					>
						<FilterIcon size={16} />
						Filter
					</button>

					{openMenu === "filter" && (
						<div className="dropdown">
							<span className="dropdown-label">Course</span>
							<select
								value={course}
								onChange={(e) => setCourse(e.target.value)}
							>
								{courses.map((item) => (
									<option key={item} value={item}>
										{item}
									</option>
								))}
							</select>
						</div>
					)}
				</div>

				<button
					type="button"
					className="btn-pill"
					onClick={handleExport}
				>
					<DownloadIcon size={16} />
					Export
				</button>
			</div>

			{/* ===== Table ===== */}
			<div className="table-card">
				<div className="table-scroll">
					<table className="student-table">
						<thead>
							<tr>
								{columns.map((c) => (
									<th key={c.key}>{c.label}</th>
								))}
								<th>Actions</th>
							</tr>
						</thead>

						<tbody>
							{filteredStudents.length === 0 ? (
								<tr>
									<td
										className="table-empty"
										colSpan={columns.length + 1}
									>
										{students.length === 0
											? "No students added yet."
											: "No students match your search."}
									</td>
								</tr>
							) : (
								filteredStudents.map((student) => (
									<tr key={student._id}>
										{columns.map((c) => (
											<td key={c.key}>
												{c.key === "course" ? (
													<span className="badge">
														{getValue(student, c.key)}
													</span>
												) : (
													getValue(student, c.key)
												)}
											</td>
										))}
										<td>
											<div className="row-actions">
												<Link href={`/students/${student._id}`}>
													View
												</Link>
												<Link
													href={`/students/${student._id}/edit`}
												>
													Edit
												</Link>
											</div>
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</div>

			{/* ===== Footer ===== */}
			<div className="table-footer">
				<span>
					Showing {filteredStudents.length} of {students.length} students
				</span>
				<span>{students.length} active students</span>
			</div>
		</div>
	);
}
