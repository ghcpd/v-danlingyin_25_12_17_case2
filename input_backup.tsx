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
    const id = window.setTimeout(() => {
      setMetrics([
        { label: "Users", value: 1200 },
        { label: "Orders", value: 320 },
        { label: "Revenue", value: 9800 }
      ]);
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(id);
    };
  }, []);

  return (
    <div className={`min-h-screen p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h1 className="text-2xl mb-4">Dashboard</h1>

      <button
        className="mb-4 px-3 py-2 border rounded focus:outline-none focus:ring"
        onClick={() => setDarkMode(!darkMode)}
        aria-pressed={darkMode}
      >
        {darkMode ? "Disable Dark Mode" : "Enable Dark Mode"}
      </button>

      {loading ? (
        <div role="status" aria-live="polite" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="border rounded p-4 bg-gray-50 dark:bg-gray-800 animate-pulse h-24" />
          <div className="border rounded p-4 bg-gray-50 dark:bg-gray-800 animate-pulse h-24" />
          <div className="border rounded p-4 bg-gray-50 dark:bg-gray-800 animate-pulse h-24" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className={`border rounded p-4 ${darkMode ? "bg-gray-800" : "bg-gray-50"}`}>
              <div className="text-sm text-gray-500">{m.label}</div>
              <div className="text-2xl font-semibold">{m.value.toLocaleString()}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
