"use client";

export default function Error({
	error,
	reset,
}) {
	return (
		<div>
			<h2>Something went wrong!</h2>

			<p>
				We could not load the students.
			</p>

			<button onClick={() => reset()}>
				Try Again
			</button>
		</div>
	);
}