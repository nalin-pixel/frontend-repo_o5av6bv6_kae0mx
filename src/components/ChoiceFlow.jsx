import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function Card({ option, onPick }) {
  return (
    <button onClick={() => onPick(option.id)} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
      <img src={option.image} alt={option.label} className="w-full h-44 object-cover" />
      <div className="p-3 flex items-center justify-between">
        <span className="text-white font-medium">{option.label}</span>
        <span className="text-white/70 text-xs group-hover:text-white">Choose</span>
      </div>
    </button>
  );
}

export default function ChoiceFlow({ answers, onFinished }) {
  const [history, setHistory] = useState([]);
  const [round, setRound] = useState(1);
  const [total, setTotal] = useState(7);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOptions = async (h) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/choices`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: h }),
      });
      const data = await res.json();
      setRound(data.round);
      setTotal(data.total_rounds);
      setOptions(data.options);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchOptions([]); }, []);

  const pick = (id) => {
    const next = [...history, id];
    setHistory(next);
    if (next.length === total) {
      onFinished({ answers, history: next });
    } else {
      fetchOptions(next);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Round {round} of {total}</h3>
        <div className="h-2 w-40 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500" style={{ width: `${(history.length/total)*100}%` }} />
        </div>
      </div>

      {loading ? (
        <div className="text-white/70">Loading options...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {options.map(opt => (
            <Card key={opt.id} option={opt} onPick={pick} />
          ))}
        </div>
      )}
    </div>
  );
}
