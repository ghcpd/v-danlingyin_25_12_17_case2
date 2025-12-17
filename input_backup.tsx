import React, { useEffect, useState } from "react";

type Metric = {
  label: string;
  value: number;
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setMetrics([
        { label: "Users", value: 1200 },
        { label: "Orders", value: 320 },
        { label: "Revenue", value: 9800 }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(id);
  }, []);

  const formatValue = (m: Metric) => {
    if (m.label === "Revenue") {
      return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(m.value);
    }
    return m.value.toLocaleString();
  };

  const containerClasses = `min-h-screen w-full p-4 transition-colors ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`;
  const cardBg = darkMode ? "bg-gray-800" : "bg-white";

  return (
    <div className={containerClasses}>
      <h1 className="text-2xl mb-4">Dashboard</h1>

      <button
        type="button"
        data-testid="dark-toggle"
        aria-pressed={darkMode}
        className={`mb-4 px-3 py-2 border rounded focus:outline-none focus:ring ${darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-gray-900 border-gray-300"}`}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
      </button>

      <div data-testid="metrics-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          // Loading placeholders
          [1, 2, 3].map((n) => (
            <div key={n} className={`border p-4 rounded ${cardBg} animate-pulse`} aria-hidden>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
              <div className="h-6 bg-gray-300 rounded w-1/2" />
            </div>
          ))
        ) : (
          metrics.map((m) => (
            <article key={m.label} role="region" aria-label={`${m.label} metric`} data-testid={`metric-${m.label}`} className={`border p-4 rounded ${cardBg}`}>
              <div className="text-sm text-gray-500 mb-2">{m.label}</div>
              <div className="text-xl font-semibold">{formatValue(m)}</div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
