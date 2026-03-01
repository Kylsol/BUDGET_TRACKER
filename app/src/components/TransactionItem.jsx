export default function TransactionItem({ tx, onDelete }) {
  return (
    <div className="card row space">
      <div>
        <strong>{tx.type.toUpperCase()}</strong>{" "}
        <span className="muted">{tx.category}</span>
        {tx.note ? <div className="muted">{tx.note}</div> : null}
      </div>

      <div className="right">
        <div>
          {tx.type === "expense" ? "-" : "+"}
          {tx.amount.toFixed(2)} {tx.currency}
        </div>
        <button className="btn danger" onClick={onDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}