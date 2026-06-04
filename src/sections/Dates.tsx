import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const dates = [
  {
    date: "May 5, 2026",
    event: "Website & CFP Release",
    highlight: false,
  },
  {
    date: "June 30, 2026",
    event: "Paper & Challenge Submission",
    highlight: true,
  },
  {
    date: "July 21, 2026",
    event: "Notification of Acceptance",
    highlight: false,
  },
  {
    date: "August 04, 2026",
    event: "Camera-Ready Due",
    highlight: false,
  },
  {
    date: "Oct 11–12, 2026",
    event: "Workshop at UbiComp/ISWC 2026 in Shanghai",
    highlight: false,
  },
];

export default function Dates() {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const timeline = timelineRef.current;
    if (!section || !timeline) return;

    const items = timeline.querySelectorAll(".timeline-item");

    const ctx = gsap.context(() => {
      // Timeline line draw animation
      gsap.from(".timeline-line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 1.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      // Stagger items
      items.forEach((item, i) => {
        gsap.from(item, {
          x: i % 2 === 0 ? -40 : 40,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 85%",
            once: true,
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="dates"
      ref={sectionRef}
      className="relative py-24 md:py-32"
    >
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Important Dates
          </h2>
          <p className="text-lg text-[#A0B4C8]">
            All deadlines are AoE (UTC-12). The workshop will be held on October 11 or 12, 2026 in Shanghai.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Vertical Line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5">
            <div
              className="timeline-line absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, #1E7A8C 0%, #7C6BB3 50%, #7C3AED 100%)",
              }}
            />
            {/* Glow effect */}
            <div
              className="absolute inset-0 blur-sm opacity-60"
              style={{
                background:
                  "linear-gradient(180deg, #1E7A8C 0%, #7C6BB3 50%, #7C3AED 100%)",
              }}
            />
          </div>

          {/* Date Items */}
          <div className="space-y-8">
            {dates.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={item.date}
                  className={`timeline-item relative flex items-center gap-6 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Node dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        item.highlight
                          ? "bg-[#1E7A8C] border-[#1E7A8C] shadow-lg shadow-[#1E7A8C]/50"
                          : "bg-[#0D1B2A] border-[#4A6278]"
                      }`}
                    />
                  </div>

                  {/* Content Card */}
                  <div
                    className={`ml-14 md:ml-0 md:w-[45%] ${
                      isLeft ? "md:pr-12" : "md:pl-12"
                    }`}
                  >
                    <div
                      className={`rounded-xl p-5 transition-all duration-300 hover:-translate-y-1 ${
                        item.highlight
                          ? "liquid-glass-strong border border-[#1E7A8C]/30"
                          : "bg-white/[0.02] border border-white/5"
                      }`}
                    >
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <span
                          className={`font-mono font-bold text-base ${
                            item.highlight ? "text-[#1E7A8C]" : "text-[#B8C8D8]"
                          }`}
                        >
                          {item.date}
                        </span>
                        {item.highlight && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#1E7A8C]/20 text-[#1E7A8C]">
                            Deadline
                          </span>
                        )}
                      </div>
                      <p className="text-[#A0B4C8] text-sm mt-2">{item.event}</p>
                    </div>
                  </div>

                  {/* Spacer for opposite side */}
                  <div className="hidden md:block md:w-[45%]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
