import { Helmet } from "react-helmet-async";
import { useBudget } from "../contexts/BudgetContext.jsx";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function Profile() {
  const { settings, updateBaseCurrency, clearAll, currencyOptions } = useBudget();
  const { user } = useAuth();

  return (
    <section>
      <Helmet>
        <title>Profile | Budget Tracker</title>
      </Helmet>

      <h2>Profile</h2>

      <div className="card">
        <p className="muted">
          Logged in as: <strong>{user?.name || "User"}</strong> ({user?.role || "member"})
        </p>

        <label>
          Base currency (default for new transactions)
          <select
            value={settings.baseCurrency}
            onChange={(e) => updateBaseCurrency(e.target.value)}
          >
            {currencyOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        {user?.role === "admin" ? (
          <div style={{ marginTop: 12 }}>
            <button className="btn danger" onClick={clearAll}>
              Clear all transactions
            </button>
          </div>
        ) : (
          <p className="muted" style={{ marginTop: 12 }}>
            Only admin users can clear all transactions.
          </p>
        )}
      </div>
    </section>
  );
}