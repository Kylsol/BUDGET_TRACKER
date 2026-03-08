import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function NotFound() {
  return (
    <section>
      <Helmet>
        <title>404 | Budget Tracker</title>
      </Helmet>

      <h2>404 — Page Not Found</h2>

      <p className="muted">
        The page you are looking for does not exist or may have been moved.
      </p>

      <div style={{ marginTop: 12 }}>
        <Link className="btn" to="/">
          Go back to Dashboard
        </Link>
      </div>
    </section>
  );
}