import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Register() {
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    if (!name || !email || !password) return;

    const ok = register({ name, email, password, role: "user" });

    if (ok) {
      navigate("/");
    }
  }

  const isDisabled = !name || !email || !password;

  return (
    <section>
      <Helmet>
        <title>Register | Budget Tracker</title>
      </Helmet>

      <h2>Register</h2>

      <form className="card" onSubmit={onSubmit}>
        <div className="grid">
          <label>
            Name
            <input
              value={name}
              onChange={(e) => setName(e.target.value.trimStart())}
              placeholder="Enter name"
              autoComplete="name"
              required
            />
          </label>

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

          <label className="full">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              autoComplete="new-password"
              required
            />
          </label>
        </div>

        {error && <p className="error">{error}</p>}

        <div className="form-actions">
          <button className="btn" type="submit" disabled={isDisabled}>
            Register
          </button>
        </div>

        <p className="muted" style={{ marginTop: 12 }}>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}