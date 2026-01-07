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
    setTimeout(() => {
      setMetrics([
        { label: "Users", value: 1200 },
        { label: "Orders", value: 320 },
        { label: "Revenue", value: 9800 }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={`w-screen h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl mb-4">Dashboard</h1>

      <button
        className={`mb-4 px-2 py-1 border ${darkMode ? 'border-white text-white' : 'border-black text-black'}`}
        onClick={() => setDarkMode(!darkMode)}
      >
        Toggle Dark Mode
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {loading ? (
          <div className="col-span-full text-center">Loading...</div>
        ) : (
          metrics.map((m, i) => (
            <div key={i} className={`border p-2 ${darkMode ? 'border-white' : 'border-black'}`}>
              <div>{m.label}</div>
              <div>{m.value}</div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
