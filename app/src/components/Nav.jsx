import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/" end>
        Dashboard
      </NavLink>
      <NavLink to="/transactions">Transactions</NavLink>
      <NavLink to="/insights">Insights</NavLink>
      <NavLink to="/profile">Profile</NavLink>
    </nav>
  );
}