export default function NotFound() {
  return (
    <main className="not-found shell">
      <a className="brand" href="/">
        <span className="brand-mark" aria-hidden="true" />
        Century
      </a>
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The page you are looking for is not available.</p>
      <a className="btn btn-primary" href="/">
        Back to Century
      </a>
    </main>
  );
}
