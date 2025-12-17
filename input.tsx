import React, { useEffect, useState } from "react";

type Metric = {
  label: string;
  value: number;
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMetrics([
        { label: "Users", value: 1200 },
        { label: "Orders", value: 320 },
        { label: "Revenue", value: 9800 }
      ]);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className={`w-full min-h-screen p-4 flex items-center justify-center transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <span role="status" aria-live="polite">Loading metrics...</span>
      </div>
    );
  }

  return (
    <div className={`w-full min-h-screen p-4 transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl mb-4">Dashboard</h1>

      <button
        type="button"
        className="mb-4 px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        aria-pressed={darkMode}
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      </button>

      <div role="list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <div key={i} role="listitem" className="border p-2 rounded shadow-sm">
            <div className="font-semibold">{m.label}</div>
            <div>{new Intl.NumberFormat().format(m.value)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
