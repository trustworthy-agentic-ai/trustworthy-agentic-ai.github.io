import { useRef } from "react";
import { Activity, ShieldCheck } from "lucide-react";

const cards = [
  {
    icon: Activity,
    title: "MedLongTrust-EHR",
    description:
      "Evaluates whether models can faithfully understand complex, lengthy, cross-paragraph medical records to determine if a medical claim is supported by evidence, and identify hallucinations, contradictions, and critical risk omissions.",
    color: "#2A9DB0",
    bgGlow: "rgba(42, 157, 176, 0.1)",
  },
  {
    icon: ShieldCheck,
    title: "PII-PolicyBench",
    description:
      "Evaluates whether PII detectors meet sample-level privacy policy compliance requirements, advancing evaluation from span-level F1 to risk-driven, sample-level policy compliance rate (PCR).",
    color: "#7C6BB3",
    bgGlow: "rgba(124, 107, 179, 0.1)",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Cards render directly without GSAP opacity animation

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Workshop Scope
          </h2>
          <p className="text-lg text-[#A0B4C8] max-w-3xl mx-auto leading-relaxed">
            This workshop focuses on two critical challenges in trustworthy AI systems: long-context medical claim verification in electronic health records, and risk-aware PII detection for policy compliance. Both tracks push beyond traditional metrics toward deployment-oriented safety evaluation.
          </p>
        </div>

        {/* Cards Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="about-card group relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-2"
                style={{
                  background: `linear-gradient(135deg, ${card.bgGlow} 0%, rgba(15, 23, 42, 0.6) 100%)`,
                  border: `1px solid ${card.color}20`,
                  boxShadow: `0 4px 24px ${card.bgGlow}`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(ellipse at center, ${card.color}15 0%, transparent 70%)`,
                  }}
                />

                <div className="relative z-10">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `${card.color}15`,
                      border: `1px solid ${card.color}30`,
                    }}
                  >
                    <Icon className="w-7 h-7" style={{ color: card.color }} />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {card.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#A0B4C8] leading-relaxed text-sm">
                    {card.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
