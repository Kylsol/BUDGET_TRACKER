import { useEffect, useState } from "react";
import { useBudget, currencyOptions } from "../contexts/BudgetContext.jsx";

export default function TransactionForm({ categories }) {
  const { addTransaction, settings, expenseCategories } = useBudget();

  const [type, setType] = useState("expense");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState(settings.baseCurrency);
  const [category, setCategory] = useState(expenseCategories[0] || "Other");
  const [note, setNote] = useState("");

  // If user changes base currency in Profile, keep new transactions aligned by default
  useEffect(() => {
    setCurrency(settings.baseCurrency);
  }, [settings.baseCurrency]);

  // If income selected, force category to Income
  useEffect(() => {
    if (type === "income") setCategory("Income");
    if (type === "expense" && category === "Income") setCategory(expenseCategories[0] || "Other");
  }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

  function onSubmit(e) {
    e.preventDefault();
    const num = Number(amount);
    if (!num || num <= 0) return;

    addTransaction({
      type,
      amount: num,
      currency,
      category: type === "income" ? "Income" : category,
      note,
      createdAt: new Date().toISOString(),
    });

    setAmount("");
    setNote("");
  }

  return (
    <form className="card" onSubmit={onSubmit}>
      <h3>Add Transaction</h3>

      <div className="grid">
        <label>
          Type
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        <label>
          Amount
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="e.g., 25.50"
            inputMode="decimal"
          />
        </label>

        <label>
          Currency
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {currencyOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        {/* Only show categories for expenses */}
        {type === "expense" ? (
          <label className="full">
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              {expenseCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <div className="full muted">Income category is set automatically.</div>
        )}

        <label className="full">
          Note
          <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="Optional" />
        </label>
      </div>

      <div className="form-actions">
        <button className="btn" type="submit">
          Add
        </button>
      </div>
    </form>
  );
}