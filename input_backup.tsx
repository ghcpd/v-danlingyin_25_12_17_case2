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
    const timer = setTimeout(() => {
      setMetrics([
        { label: "Users", value: 1200 },
        { label: "Orders", value: 320 },
        { label: "Revenue", value: 9800 }
      ]);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
      <h1 className="text-2xl mb-4">Dashboard</h1>

      <button
        className={`mb-4 px-3 py-1 border rounded focus:outline-none focus:ring ${
          darkMode ? "bg-gray-700 text-white border-gray-600" : "bg-white text-black"
        }`}
        onClick={() => setDarkMode(!darkMode)}
        aria-pressed={darkMode}
      >
        {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
      </button>

      {loading ? (
        <div role="status" aria-live="polite" className="text-sm italic">
          Loading metrics...
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((m) => (
            <div
              key={m.label}
              className={`border rounded p-4 ${
                darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-50"
              }`}
              role="article"
              aria-label={`${m.label} metric`}
            >
              <div className="text-sm text-gray-500 mb-2">{m.label}</div>
              <div className="text-xl font-semibold">{formatValue(m)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
