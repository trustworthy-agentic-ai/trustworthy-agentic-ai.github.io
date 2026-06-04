import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const topics = [
  "Attacks on AI agents, prompt injection, and unsafe tool use",
  "MCP safety and security in tool-integrated LLM agents",
  "Execution tracing, trajectory checks, and safety monitoring during interaction",
  "Safe planning for mobile and wearable assistants",
  "Multimodal and environment-grounded evaluation",
  "Model editing, concept removal, and selective unlearning",
  "Safety–utility tradeoffs for ubiquitous agentic systems",
  "Datasets, simulators, logs, and benchmarks for trustworthy agents",
];

export default function CFP() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".cfp-panel", {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      gsap.from(".cfp-topic", {
        x: -20,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".cfp-topics-list",
          start: "top 80%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="cfp"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#0D1B2A] via-[#162D45]/30 to-[#0D1B2A]"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Call for Papers
          </h2>
          <p className="text-lg text-[#A0B4C8] max-w-2xl mx-auto">
            We invite papers and challenge submissions on trustworthy agent behavior in ubiquitous and wearable computing.
          </p>
        </div>

        {/* CFP Panel */}
        <div className="cfp-panel liquid-glass-strong rounded-2xl p-8 md:p-12">
          {/* Topics of Interest */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-[#1E7A8C] rounded-full" />
              Topics of Interest
            </h3>
            <ul className="cfp-topics-list grid grid-cols-1 md:grid-cols-2 gap-3">
              {topics.map((topic) => (
                <li
                  key={topic}
                  className="cfp-topic flex items-start gap-3 text-[#B8C8D8] text-sm leading-relaxed"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1E7A8C] mt-2 shrink-0" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="mt-10 pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[#6B8299] text-sm">
              Ready to contribute? Submit through the official system.
            </p>
            <a
              href="https://new.precisionconference.com/sigchi"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-[#1E7A8C] text-white font-semibold text-sm hover:bg-[#2A9DB0] transition-all duration-300 hover:shadow-lg hover:shadow-[#1E7A8C]/25 hover:-translate-y-0.5"
            >
              Submission System (PCS) →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
