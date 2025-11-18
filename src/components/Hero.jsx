import Spline from '@splinetool/react-spline';

export default function Hero() {
  return (
    <section className="relative w-full min-h-[70vh] lg:min-h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/ESO6PnMadasO0hU3/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-8 pt-24 pb-16">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight">
            Find your perfect getaway
          </h1>
          <p className="mt-4 text-blue-100/90 text-lg md:text-xl max-w-2xl">
            Answer a few quick questions, choose what inspires you, and we’ll craft three spot-on destinations with stays, flights, and curated tips.
          </p>
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/20 to-slate-900 pointer-events-none" />
    </section>
  );
}
