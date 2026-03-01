import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section>
      <h2>Not Found</h2>
      <p className="muted">That page doesn’t exist.</p>
      <Link to="/">Go back to Dashboard</Link>
    </section>
  );
}