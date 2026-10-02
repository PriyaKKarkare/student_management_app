export default function RootLayout({ children }) {
	return (
		<div>
			<nav>
				<h2>Student App</h2>
			</nav>
			{children}
		</div>
	);
}