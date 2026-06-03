// Neutral, brand-free 404. Next exports this as /404.html, which Firebase
// Hosting serves for any path without a matching file — including the bare
// root and unknown client slugs. Deliberately contains no store branding.
export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily:
          "var(--font-geist-sans), system-ui, -apple-system, Arial, sans-serif",
        background: "#ffffff",
        color: "#0f172a",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "28rem" }}>
        <p style={{ fontSize: "3rem", fontWeight: 800, margin: 0 }}>404</p>
        <h1 style={{ fontSize: "1.25rem", fontWeight: 700, marginTop: "0.5rem" }}>
          Page not found
        </h1>
        <p style={{ marginTop: "0.75rem", color: "#64748b", lineHeight: 1.6 }}>
          The page you are looking for does not exist or may have moved. Please
          check the address and try again.
        </p>
      </div>
    </main>
  );
}
