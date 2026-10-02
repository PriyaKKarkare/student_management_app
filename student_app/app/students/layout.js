export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <h2>Student App</h2>
        </nav>

        <main>
          {children}
        </main>
      </body>
    </html>
  );
}