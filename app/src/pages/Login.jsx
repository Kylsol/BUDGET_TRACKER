import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Login() {
  const { login, error } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    if (!email || !password) return;

    const ok = login({ email, password });

    if (ok) {
      navigate("/");
    }
  }

  const isDisabled = !email || !password;

  return (
    <section>
      <Helmet>
        <title>Login | Budget Tracker</title>
      </Helmet>

      <h2>Login</h2>

      <form className="card" onSubmit={onSubmit}>
        <div className="grid">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trimStart())}
              placeholder="Enter email"
              autoComplete="email"
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              autoComplete="current-password"
              required
            />
          </label>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="form-actions">
          <button className="btn" type="submit" disabled={isDisabled}>
            Login
          </button>
        </div>

        <p className="muted" style={{ marginTop: 12 }}>
          No account? <Link to="/register">Register</Link>
        </p>
      </form>
    </section>
  );
}