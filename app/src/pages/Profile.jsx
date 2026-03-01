import { useBudget } from "../contexts/BudgetContext.jsx";

export default function Profile() {
  const { settings, updateBaseCurrency, clearAll, currencyOptions } = useBudget();

  return (
    <section>
      <h2>Profile</h2>

      <div className="card">
        <label>
          Base currency (default for new transactions)
          <select
            value={settings.baseCurrency}
            onChange={(e) => updateBaseCurrency(e.target.value)}
          >
            {currencyOptions.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <div style={{ marginTop: 12 }}>
          <button className="btn danger" onClick={clearAll}>
            Clear all transactions
          </button>
        </div>
      </div>
    </section>
  );
}