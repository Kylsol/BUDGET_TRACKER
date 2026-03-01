import { useEffect, useMemo, useState } from "react";
import { useBudget, currencyOptions } from "../contexts/BudgetContext.jsx";

const API_BASE = "https://api.frankfurter.dev/v1";

async function fetchLatestRates(base) {
  const url = `${API_BASE}/latest?base=${encodeURIComponent(base)}`;
  const res = await fetch(url);

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Frankfurter API error ${res.status}: ${text || res.statusText}`);
  }

  return res.json();
}

export default function Insights() {
  const { settings } = useBudget();
  const base = settings.baseCurrency;

  const defaultTarget = useMemo(() => {
    // pick something different than base
    const fallback = currencyOptions.find((c) => c !== base);
    return fallback || "EUR";
  }, [base]);

  const [target, setTarget] = useState(defaultTarget);

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // If base changes and target matches base, auto-pick a new target
  useEffect(() => {
    if (target === base) setTarget(defaultTarget);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, defaultTarget]);

  useEffect(() => {
    let alive = true;

    setIsLoading(true);
    setError("");
    setData(null);

    fetchLatestRates(base)
      .then((json) => {
        if (!alive) return;
        setData(json);
      })
      .catch((e) => {
        if (!alive) return;
        setError(e?.message || "API error");
      })
      .finally(() => {
        if (!alive) return;
        setIsLoading(false);
      });

    return () => {
      alive = false;
    };
  }, [base]);

  const rate = data?.rates?.[target];

  return (
    <section>
      <h2>Insights</h2>
      <p className="muted">
        Exchange rates (Frankfurter API) — base: <strong>{base}</strong>
      </p>

      <div className="card">
        <div className="grid">
          <label>
            Base currency
            <input value={base} disabled />
          </label>

          <label>
            Compare to
            <select value={target} onChange={(e) => setTarget(e.target.value)}>
              {currencyOptions
                .filter((c) => c !== base)
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          </label>

          <div className="full muted">
            Tip: Change your base currency in <strong>Profile</strong>.
          </div>
        </div>
      </div>

      {isLoading && <p>Loading rates…</p>}

      {error && (
        <div className="card">
          <p className="error">Error: {error}</p>
          <p className="muted">
            If this keeps failing, your network may be blocking the API domain.
          </p>
        </div>
      )}

      {data && !error && (
        <div className="card">
          <div className="row space">
            <strong>Latest rate</strong>
            <span className="muted">Date: {data.date}</span>
          </div>

          {rate ? (
            <p style={{ marginTop: 12 }}>
              <strong>1 {base}</strong> = <strong>{Number(rate).toFixed(4)} {target}</strong>
            </p>
          ) : (
            <p className="muted" style={{ marginTop: 12 }}>
              Rate unavailable for {target}.
            </p>
          )}

          <p className="muted" style={{ marginTop: 8 }}>
            Data source: Frankfurter (European Central Bank)
          </p>
        </div>
      )}
    </section>
  );
}