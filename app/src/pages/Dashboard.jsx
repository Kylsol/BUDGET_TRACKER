import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useBudget } from "../contexts/BudgetContext.jsx";
import { fetchLatestRates } from "../services/frankfurter.js";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

export default function Dashboard() {
  const { transactions, settings } = useBudget();
  const baseCurrency = settings.baseCurrency;

  const [rates, setRates] = useState({});
  const [ratesLoading, setRatesLoading] = useState(false);
  const [ratesError, setRatesError] = useState("");

  useEffect(() => {
    let alive = true;

    async function loadRates() {
      try {
        setRatesLoading(true);
        setRatesError("");

        const data = await fetchLatestRates(baseCurrency);

        if (!alive) return;
        setRates(data?.rates || {});
      } catch (err) {
        if (!alive) return;
        setRates({});
        setRatesError(err?.message || "Failed to load exchange rates.");
      } finally {
        if (!alive) return;
        setRatesLoading(false);
      }
    }

    loadRates();

    return () => {
      alive = false;
    };
  }, [baseCurrency]);

  function convertToBase(amount, currency) {
    const numericAmount = Number(amount || 0);

    if (!currency || currency === baseCurrency) {
      return numericAmount;
    }

    const rate = rates[currency];

    if (!rate || rate === 0) {
      return 0;
    }

    return numericAmount / rate;
  }

  const convertedTotals = useMemo(() => {
    let income = 0;
    let expenses = 0;

    for (const t of transactions) {
      const convertedAmount = convertToBase(t.amount, t.currency);

      if (t.type === "income") {
        income += convertedAmount;
      } else if (t.type === "expense") {
        expenses += convertedAmount;
      }
    }

    return { income, expenses };
  }, [transactions, rates, baseCurrency]);

  const chartData = [
    { name: "Income", value: Number(convertedTotals.income.toFixed(2)) },
    { name: "Expenses", value: Number(convertedTotals.expenses.toFixed(2)) },
  ];

  const totalsByCurrency = useMemo(() => {
    const map = new Map();

    for (const t of transactions) {
      const sign = t.type === "expense" ? -1 : 1;
      const value = sign * Number(t.amount || 0);
      const currency = t.currency || baseCurrency;

      map.set(currency, (map.get(currency) ?? 0) + value);
    }

    return Array.from(map.entries()).sort(([a], [b]) => {
      if (a === baseCurrency) return -1;
      if (b === baseCurrency) return 1;
      return a.localeCompare(b);
    });
  }, [transactions, baseCurrency]);

  return (
    <section>
      <Helmet>
        <title>Dashboard | Budget Tracker</title>
      </Helmet>

      <h2>Dashboard</h2>
      <p className="muted">Base currency: {baseCurrency}</p>

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
        <strong>Income vs Expenses (Converted to {baseCurrency})</strong>

        {ratesLoading && (
          <p className="muted" style={{ marginTop: 12 }}>
            Loading exchange rates…
          </p>
        )}

        {ratesError && (
          <p className="error" style={{ marginTop: 12 }}>
            {ratesError}
          </p>
        )}

        {!ratesLoading &&
          !ratesError &&
          convertedTotals.income === 0 &&
          convertedTotals.expenses === 0 && (
            <p className="muted" style={{ marginTop: 12 }}>
              Add transactions to see the chart.
            </p>
          )}

        {!ratesLoading &&
          !ratesError &&
          (convertedTotals.income > 0 || convertedTotals.expenses > 0) && (
            <>
              <p className="muted" style={{ marginTop: 12 }}>
                All transaction amounts are converted into {baseCurrency} before visualization.
              </p>

              <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
                <PieChart width={320} height={260}>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={90}
                    label
                  >
                    <Cell fill="#16a34a" />
                    <Cell fill="#dc2626" />
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${Number(value).toFixed(2)} ${baseCurrency}`, ""]}
                  />
                  <Legend />
                </PieChart>
              </div>
            </>
          )}
      </div>
    </section>
  );
}