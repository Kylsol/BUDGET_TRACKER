import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Nav() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="row space">
      <div className="row">
        {isAuthenticated ? (
          <>
            <NavLink to="/" end>
              Dashboard
            </NavLink>

            <NavLink to="/transactions">
              Transactions
            </NavLink>

            <NavLink to="/insights">
              Insights
            </NavLink>

            <NavLink to="/profile">
              Profile
            </NavLink>
          </>
        ) : (
          <>
            <NavLink to="/login">
              Login
            </NavLink>

            <NavLink to="/register">
              Register
            </NavLink>
          </>
        )}
      </div>

      {isAuthenticated && (
        <div className="row">
          <span className="muted">
            {user?.name || "User"} ({user?.role || "member"})
          </span>

          <button
            className="btn"
            type="button"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}