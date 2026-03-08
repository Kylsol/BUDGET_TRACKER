import { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useBudget } from "../contexts/BudgetContext.jsx";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const { transactions, settings } = useBudget();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const chartData = [
    { name: "Income", value: income },
    { name: "Expenses", value: expenses },
  ];

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

      <div className="card">
        <strong>Income vs Expenses</strong>

        {income === 0 && expenses === 0 ? (
          <p className="muted" style={{ marginTop: 12 }}>
            Add transactions to see the chart.
          </p>
        ) : (
          <div style={{ width: "100%", height: 280, marginTop: 12 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={90}
                  label
                >
                  <Cell fill="#16a34a" />
                  <Cell fill="#dc2626" />
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </section>
  );
}