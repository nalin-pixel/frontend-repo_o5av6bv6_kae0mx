import { useEffect, useState } from 'react';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function ResultCard({ d }) {
  return (
    <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5">
      <img src={d.image} alt={d.name} className="w-full h-44 object-cover" />
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-white text-lg font-semibold">{d.name}</h4>
          <span className="text-white/70 text-sm">{d.country}</span>
        </div>
        <div className="text-white/70 text-sm">Match score: {d.score}</div>
        <div className="flex flex-wrap gap-2">
          {d.tags.slice(0,6).map(t => (
            <span key={t} className="text-xs px-2 py-1 rounded-full bg-white/10 text-white/80">{t}</span>
          ))}
        </div>
        <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-2">
          <a href={d.stays_url} target="_blank" rel="noreferrer" className="text-center px-3 py-2 rounded-xl bg-blue-500/90 hover:bg-blue-600 text-white text-sm">Stays</a>
          <a href={d.flights_url} target="_blank" rel="noreferrer" className="text-center px-3 py-2 rounded-xl bg-emerald-500/90 hover:bg-emerald-600 text-white text-sm">Flights</a>
          <a href={d.guide_url} target="_blank" rel="noreferrer" className="text-center px-3 py-2 rounded-xl bg-purple-500/90 hover:bg-purple-600 text-white text-sm">Guide</a>
        </div>
      </div>
    </div>
  );
}

export default function Results({ payload, onRestart }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/recommend`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        const d = await res.json();
        setData(d);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [payload]);

  if (loading) return <div className="text-white/80">Crafting your perfect trip...</div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="text-white text-xl font-semibold">Your top picks</h3>
        <button onClick={onRestart} className="px-4 py-2 rounded-xl bg-white/10 text-white/80 hover:text-white hover:bg-white/15">Start over</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {data?.recommendations?.map((d) => (
          <ResultCard key={d.name} d={d} />
        ))}
      </div>
    </div>
  );
}
