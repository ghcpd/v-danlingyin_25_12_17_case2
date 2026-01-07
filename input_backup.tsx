import React, { useEffect, useState } from "react";

type Metric = {
  label: string;
  value: number;
};

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setMetrics([
        { label: "Users", value: 1200 },
        { label: "Orders", value: 320 },
        { label: "Revenue", value: 9800 }
      ]);
    }, 1000);
  }, []);

  return (
    <div className="w-screen h-screen bg-white text-black p-4">
      <h1 className="text-2xl mb-4">Dashboard</h1>

      <button
        className="mb-4 px-2 py-1 border"
        onClick={() => setDarkMode(!darkMode)}
      >
        Toggle Dark Mode
      </button>

      <div className="grid grid-cols-3 gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="border p-2">
            <div>{m.label}</div>
            <div>{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}