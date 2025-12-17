import React, { useEffect, useState } from "react";

type Metric = {
  label: string;
  value: number;
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // initialize metrics (simulated fetch)
  const loadMetrics = () => {
    setLoading(true);
    const timer = setTimeout(() => {
      setMetrics([
        { label: "Users", value: 1200 },
        { label: "Orders", value: 320 },
        { label: "Revenue", value: 9800 }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  };

  useEffect(() => {
    // initial load
    const cleanup = loadMetrics();
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist dark mode preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("dashboard:darkMode");
      if (saved !== null) setDarkMode(saved === "true");
    } catch (e) {
      // ignore (SSR / privacy)
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("dashboard:darkMode", String(darkMode));
    } catch (e) {
      // ignore
    }
  }, [darkMode]);

  const formatValue = (m: Metric) => {
    if (m.label.toLowerCase() === "revenue") {
      return `$${m.value.toLocaleString()}`;
    }
    return m.value.toLocaleString();
  };

  return (
    <div
      className={`min-h-screen p-4 transition-colors ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <header className="flex items-center justify-between mb-4">
        <h1 className="text-2xl">Dashboard</h1>

        <div className="flex items-center gap-2">
          <button
            aria-pressed={darkMode}
            onClick={() => setDarkMode((s) => !s)}
            className={`px-3 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors text-sm ${
              darkMode
                ? "bg-gray-700 text-white border-gray-600 focus:ring-gray-500"
                : "bg-white text-black border-gray-200 focus:ring-indigo-300"
            }`}
          >
            {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
          </button>

          <button
            onClick={() => loadMetrics()}
            className={`px-3 py-1 border rounded text-sm bg-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              darkMode
                ? "border-gray-600 text-gray-200 focus:ring-gray-500 hover:bg-gray-800"
                : "border-gray-200 text-gray-800 focus:ring-indigo-300 hover:bg-gray-50"
            }`}
            title="Refresh metrics"
          >
            Refresh
          </button>
        </div>
      </header>

      {loading ? (
        <div role="status" aria-live="polite" className="text-sm italic">
          Loading metrics...
        </div>
      ) : metrics.length === 0 ? (
        <div role="status" className="text-sm text-gray-500 italic">
          No metrics available
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((m, i) => (
            <article
              key={`${m.label}-${i}`}
              className={`border rounded p-4 transition-colors ${
                darkMode
                  ? "bg-gray-800 border-gray-700 text-gray-100"
                  : "bg-gray-50 border-gray-200 text-gray-900"
              }`}
              aria-label={`${m.label} metric`}
            >
              <div className={`${darkMode ? "text-gray-300" : "text-gray-500"} text-sm mb-2`}>
                {m.label}
              </div>
              <div className="text-xl font-semibold">{formatValue(m)}</div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

