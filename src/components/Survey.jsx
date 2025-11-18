import { useState } from 'react';

const budgets = [
  { label: 'Budget', value: 'budget' },
  { label: 'Mid', value: 'mid' },
  { label: 'Luxury', value: 'luxury' },
];
const lengths = [
  { label: 'Weekend', value: 'weekend' },
  { label: '1-2 weeks', value: '1-2 weeks' },
  { label: 'Long', value: 'long' },
];
const flex = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];
const stayTypes = ['hotel','apartment','hostel','resort','villa'];
const climates = ['warm','mild','cold'];
const paces = [
  { label: 'Chill', value: 'chill' },
  { label: 'Balanced', value: 'balanced' },
  { label: 'Packed', value: 'packed' },
];
const groups = ['solo','couple','family','friends'];

export default function Survey({ onNext }) {
  const [form, setForm] = useState({
    budget: 'mid',
    trip_length: '1-2 weeks',
    flexibility: 'medium',
    stay_type: 'hotel',
    climate: 'mild',
    pace: 'balanced',
    month: '',
    companions: 'solo',
  });

  const handleChange = (key, value) => setForm(prev => ({ ...prev, [key]: value }));

  const submit = (e) => {
    e.preventDefault();
    onNext(form);
  };

  const Section = ({ title, children }) => (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
      <h3 className="text-white/90 font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );

  const RadioGroup = ({ options, value, onChange }) => (
    <div className="flex flex-wrap gap-2">
      {options.map(opt => (
        <button
          key={opt.value || opt}
          onClick={() => onChange(opt.value || opt)}
          type="button"
          className={`px-3 py-2 rounded-xl border text-sm transition ${
            (opt.value || opt) === value ? 'bg-blue-500/90 text-white border-blue-400' : 'bg-white/5 text-white/80 border-white/10 hover:bg-white/10'
          }`}
        >
          {opt.label || opt}
        </button>
      ))}
    </div>
  );

  return (
    <form onSubmit={submit} className="space-y-5">
      <Section title="Budget">
        <RadioGroup options={budgets} value={form.budget} onChange={(v) => handleChange('budget', v)} />
      </Section>
      <Section title="Time">
        <RadioGroup options={lengths} value={form.trip_length} onChange={(v) => handleChange('trip_length', v)} />
      </Section>
      <Section title="Flexibility">
        <RadioGroup options={flex} value={form.flexibility} onChange={(v) => handleChange('flexibility', v)} />
      </Section>
      <Section title="Stay Type">
        <RadioGroup options={stayTypes} value={form.stay_type} onChange={(v) => handleChange('stay_type', v)} />
      </Section>
      <Section title="Preferred Climate">
        <RadioGroup options={climates} value={form.climate} onChange={(v) => handleChange('climate', v)} />
      </Section>
      <Section title="Pace">
        <RadioGroup options={paces} value={form.pace} onChange={(v) => handleChange('pace', v)} />
      </Section>
      <Section title="Travel Month">
        <input
          type="text"
          value={form.month}
          onChange={(e) => handleChange('month', e.target.value)}
          placeholder="e.g., July"
          className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/40"
        />
      </Section>
      <Section title="Who are you traveling with?">
        <RadioGroup options={groups} value={form.companions} onChange={(v) => handleChange('companions', v)} />
      </Section>

      <div className="flex justify-end">
        <button type="submit" className="px-5 py-3 rounded-2xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg shadow-blue-500/20">
          Start inspiration flow
        </button>
      </div>
    </form>
  );
}
