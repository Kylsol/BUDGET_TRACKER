import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useBudget } from "../contexts/BudgetContext.jsx";

export default function Dashboard() {
  const { transactions, settings } = useBudget();

  const totalsByCurrency = useMemo(() => {
    const map = new Map();

    for (const t of transactions) {
      const sign = t.type === "expense" ? -1 : 1;
      const value = sign * Number(t.amount || 0);
      const currency = t.currency || settings.baseCurrency;

      map.set(currency, (map.get(currency) ?? 0) + value);
    }

    return Array.from(map.entries()).sort(([a], [b]) => {
      if (a === settings.baseCurrency) return -1;
      if (b === settings.baseCurrency) return 1;
      return a.localeCompare(b);
    });
  }, [transactions, settings.baseCurrency]);

  return (
    <section>
      <Helmet>
        <title>Dashboard | Budget Tracker</title>
      </Helmet>

      <h2>Dashboard</h2>
      <p className="muted">Base currency: {settings.baseCurrency}</p>

      <div className="card">
        <strong>Net totals (by currency)</strong>

        {totalsByCurrency.length === 0 ? (
          <p className="muted">No transactions yet.</p>
        ) : (
          <ul className="totals">
            {totalsByCurrency.map(([currency, total]) => (
              <li key={currency} className="row space">
                <span>{currency}</span>
                <span>
                  {total.toFixed(2)} {currency}
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