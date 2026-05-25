import { useState, useEffect } from "react";
import { Calendar, MapPin, Building2, ChevronRight } from "lucide-react";

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div
      className="rounded-xl px-5 py-4 min-w-[80px] text-center"
      style={{
        background: "rgba(13, 27, 42, 0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <span
        className="block text-3xl md:text-4xl font-extrabold font-mono tabular-nums leading-none"
        style={{ color: "#2A9DB0" }}
      >
        {String(value).padStart(2, "0")}
      </span>
      <span className="block text-xs uppercase tracking-wider text-[#A0B4C8] mt-2 font-medium">
        {label}
      </span>
    </div>
  );
}

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const deadline = new Date("2026-06-26T12:00:00Z").getTime();
    const update = () => {
      const now = Date.now();
      const diff = deadline - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      }
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-12">
      {/* Shanghai Skyline Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url(/images/shanghai-skyline.png)" }}
      />

      {/* Gradient overlays */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(13,27,42,0.3) 0%, rgba(13,27,42,0.5) 30%, rgba(13,27,42,0.75) 60%, rgba(13,27,42,0.95) 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(30,122,140,0.15) 0%, transparent 60%)",
        }}
      />

      {/* Floating ambient letters */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {["U", "b", "i", "C", "o", "m", "p"].map((letter, i) => (
          <span
            key={letter + i}
            className="absolute text-[8rem] md:text-[12rem] font-black text-white/[0.03] select-none animate-float"
            style={{
              left: `${10 + i * 12}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${5 + i * 0.5}s`,
            }}
          >
            {letter}
          </span>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Spacer to keep original position */}
        <div className="h-8" />

        {/* Main Title */}
        <h1
          className="text-4xl md:text-6xl lg:text-7xl font-black leading-[1.1] tracking-tight mb-6"
          style={{ color: "#FFFFFF" }}
        >
          Towards Trustworthy
          <br />
          <span style={{ color: "#FFFFFF" }}>Agentic AI</span>
        </h1>

        <p
          className="text-xl md:text-2xl font-light max-w-3xl mx-auto mb-8 leading-relaxed"
          style={{ color: "#A0B4C8" }}
        >
          The 1st Workshop on Trustworthy, Reliable, and Safe Agentic AI in Ubiquitous Computing
        </p>

        {/* Meta Info */}
        <div
          className="flex flex-wrap justify-center gap-6 text-sm mb-12"
          style={{ color: "#A0B4C8" }}
        >
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" style={{ color: "#2A9DB0" }} />
            October 11–12, 2026
          </span>
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4" style={{ color: "#2A9DB0" }} />
            Shanghai, China
          </span>
          <span className="flex items-center gap-2">
            <Building2 className="w-4 h-4" style={{ color: "#2A9DB0" }} />
            In-person Workshop
          </span>
        </div>

        {/* Countdown */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-4">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" />
        </div>
        <p className="text-xs mb-10" style={{ color: "#6B8299" }}>
          Until submission deadline (June 25, 2026 AoE)
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => scrollTo("#cfp")}
            className="group px-8 py-4 rounded-xl text-white font-semibold text-base transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            style={{
              background: "linear-gradient(135deg, #1E7A8C 0%, #2A9DB0 100%)",
              boxShadow: "0 4px 20px rgba(30, 122, 140, 0.4)",
            }}
          >
            Submit Paper
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => scrollTo("#challenge")}
            className="px-8 py-4 rounded-xl font-semibold text-base transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              backdropFilter: "blur(10px)",
            }}
          >
            Challenge Details
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to top, #0D1B2A, transparent)",
        }}
      />
    </section>
  );
}
