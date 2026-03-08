import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useBudget, currencyOptions } from "../contexts/BudgetContext.jsx";
import { fetchLatestRates } from "../utils/frankfurter.js";

export default function Insights() {
  const { settings } = useBudget();
  const base = settings.baseCurrency;

  const defaultTarget = useMemo(() => {
    const fallback = currencyOptions.find((c) => c !== base);
    return fallback || "EUR";
  }, [base]);

  const [target, setTarget] = useState(defaultTarget);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (target === base) {
      setTarget(defaultTarget);
    }
  }, [base, defaultTarget, target]);

  useEffect(() => {
    let alive = true;

    async function loadRates() {
      try {
        setIsLoading(true);
        setError("");
        setData(null);

        const json = await fetchLatestRates(base);

        if (!alive) return;
        setData(json);
      } catch (e) {
        if (!alive) return;
        setError(e?.message || "API error");
      } finally {
        if (!alive) return;
        setIsLoading(false);
      }
    }

    loadRates();

    return () => {
      alive = false;
    };
  }, [base]);

  const rate = data?.rates?.[target];

  return (
    <section>
      <Helmet>
        <title>Insights | Budget Tracker</title>
      </Helmet>

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

      {isLoading && (
        <div className="card">
          <div className="skeleton" style={{ width: "40%", marginBottom: 10 }} />
          <div className="skeleton" style={{ width: "60%" }} />
        </div>
      )}

      {error && (
        <div className="card">
          <p className="error">Error: {error}</p>
          <p className="muted">
            If this keeps failing, your network may be blocking the API domain.
          </p>
        </div>
      )}

      {data && !error && !isLoading && (
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