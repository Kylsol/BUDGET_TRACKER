import { useMemo } from "react";
import { useBudget } from "../contexts/BudgetContext.jsx";

export default function Dashboard() {
  const { transactions, settings } = useBudget();

  const totalsByCurrency = useMemo(() => {
    // { USD: 120.00, ZAR: -50.00, ... }
    const map = new Map();

    for (const t of transactions) {
      const sign = t.type === "expense" ? -1 : 1;
      const value = sign * Number(t.amount || 0);
      const cur = t.currency || settings.baseCurrency;

      map.set(cur, (map.get(cur) ?? 0) + value);
    }

    // sort so base currency shows first, then others alphabetically
    const entries = Array.from(map.entries()).sort(([a], [b]) => {
      if (a === settings.baseCurrency) return -1;
      if (b === settings.baseCurrency) return 1;
      return a.localeCompare(b);
    });

    return entries;
  }, [transactions, settings.baseCurrency]);

  return (
    <section>
      <h2>Dashboard</h2>
      <p className="muted">Base currency: {settings.baseCurrency}</p>

      <div className="card">
        <strong>Net totals (by currency)</strong>

        {totalsByCurrency.length === 0 ? (
          <p className="muted">No transactions yet.</p>
        ) : (
          <ul className="totals">
            {totalsByCurrency.map(([cur, total]) => (
              <li key={cur} className="row space">
                <span>{cur}</span>
                <span>
                  {total.toFixed(2)} {cur}
                </span>
              </li>
            ))}
          </ul>
        )}

        <p className="muted">Transactions: {transactions.length}</p>
      </div>
    </section>
  );
}