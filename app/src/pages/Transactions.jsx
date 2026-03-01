import { useMemo, useState } from "react";
import { useBudget } from "../contexts/BudgetContext.jsx";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionItem from "../components/TransactionItem.jsx";

export default function Transactions() {
  const { transactions, expenseCategories, deleteTransaction } = useBudget();
  const [filterCategory, setFilterCategory] = useState("All");

  const filtered = useMemo(() => {
    if (filterCategory === "All") return transactions;
    return transactions.filter((t) => t.category === filterCategory);
  }, [transactions, filterCategory]);

  return (
    <section>
      <h2>Transactions</h2>

      <TransactionForm />

      <div className="row">
        <label>
          Filter
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Income">Income</option>
            {expenseCategories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="list">
        {filtered.length === 0 ? (
          <p className="muted">No transactions yet.</p>
        ) : (
          filtered.map((t) => (
            <TransactionItem key={t.id} tx={t} onDelete={() => deleteTransaction(t.id)} />
          ))
        )}
      </div>
    </section>
  );
}