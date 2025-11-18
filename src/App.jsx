import { useState } from 'react';
import Hero from './components/Hero';
import Survey from './components/Survey';
import ChoiceFlow from './components/ChoiceFlow';
import Results from './components/Results';

function App() {
  const [step, setStep] = useState('survey');
  const [answers, setAnswers] = useState(null);
  const [payload, setPayload] = useState(null);

  const startFlow = (a) => {
    setAnswers(a);
    setStep('choices');
  };

  const finished = (p) => {
    setPayload(p);
    setStep('results');
  };

  const restart = () => {
    setStep('survey');
    setAnswers(null);
    setPayload(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
      <Hero />

      <main className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 -mt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 sticky top-6">
              <h2 className="text-white text-2xl font-semibold mb-2">Plan smarter</h2>
              <p className="text-white/70">We’ll ask a few quick questions, then you’ll tap through seven rounds of inspiring images. Finally, get three tailored destinations with links to book.</p>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            {step === 'survey' && (
              <Survey onNext={startFlow} />
            )}
            {step === 'choices' && (
              <div className="space-y-6">
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                  <ChoiceFlow answers={answers} onFinished={finished} />
                </div>
              </div>
            )}
            {step === 'results' && (
              <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
                <Results payload={payload} onRestart={restart} />
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="relative z-10 py-8 text-center text-white/60">
        Built with love for explorers. ✈️🌍
      </footer>
    </div>
  );
}

export default App
