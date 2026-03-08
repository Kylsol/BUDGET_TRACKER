import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useBudget } from "../contexts/BudgetContext.jsx";
import TransactionForm from "../components/TransactionForm.jsx";
import TransactionItem from "../components/TransactionItem.jsx";

export default function Transactions() {
  const { transactions, expenseCategories, deleteTransaction } = useBudget();
  const [filterCategory, setFilterCategory] = useState("All");

  const filteredTransactions = useMemo(() => {
    if (filterCategory === "All") return transactions;
    return transactions.filter((t) => t.category === filterCategory);
  }, [transactions, filterCategory]);

  return (
    <section>
      <Helmet>
        <title>Transactions | Budget Tracker</title>
      </Helmet>

      <h2>Transactions</h2>

      <TransactionForm />

      <div className="row">
        <label>
          Filter
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="Income">Income</option>
            {expenseCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="list">
        {filteredTransactions.length === 0 ? (
          <p className="muted">No transactions yet.</p>
        ) : (
          filteredTransactions.map((transaction) => (
            <TransactionItem
              key={transaction.id}
              tx={transaction}
              onDelete={() => deleteTransaction(transaction.id)}
            />
          ))
        )}
      </div>
    </section>
  );
}