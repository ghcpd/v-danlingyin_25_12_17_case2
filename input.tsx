import React, { useEffect, useState } from "react";

type Metric = {
  label: string;
  value: number;
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Persist dark mode preference
  useEffect(() => {
    try {
      const stored = localStorage.getItem("dashboard-dark");
      if (stored !== null) setDarkMode(stored === "true");
    } catch (e) {
      // ignore - localStorage not available in some environments
    }
  }, []);

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
  const cardClasses = darkMode ? "bg-gray-800 border border-gray-700" : "bg-gray-50 border border-gray-200"; // light cards use subtle bg to separate from page background

  return (
    <div className={containerClasses}>
      <h1 className="text-2xl mb-4">Dashboard</h1>

      <button
        type="button"
        data-testid="dark-toggle"
        aria-pressed={darkMode}
        aria-label={darkMode ? "Disable dark mode" : "Enable dark mode"}
        className={`mb-4 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 ${darkMode ? "bg-gray-700 text-white border border-gray-600" : "bg-white text-gray-900 border border-gray-300"}`}
        onClick={() => {
          setDarkMode(!darkMode);
          try {
            localStorage.setItem("dashboard-dark", String(!darkMode));
          } catch (e) {
            // ignore
          }
        }}
      >
        {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
      </button>

      <div data-testid="metrics-grid" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {loading ? (
          // Loading placeholders
          [1, 2, 3].map((n) => (
            <div key={n} className={`${cardClasses} p-4 rounded animate-pulse`} aria-hidden={true}>
              <div className={`h-4 rounded w-3/4 mb-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
              <div className={`h-6 rounded w-1/2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`} />
            </div>
          ))
        ) : (
          metrics.length === 0 ? (
            <div data-testid="empty-state" className={`${cardClasses} p-4 rounded text-center ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
              No metrics available
            </div>
          ) : (
            metrics.map((m) => (
              <article key={m.label} role="region" aria-label={`${m.label} metric`} data-testid={`metric-${m.label}`} className={`${cardClasses} p-4 rounded`}>
                <div className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{m.label}</div>
                <div className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{formatValue(m)}</div>
              </article>
            ))
          )
        )}
      </div>
    </div>
  );
}

