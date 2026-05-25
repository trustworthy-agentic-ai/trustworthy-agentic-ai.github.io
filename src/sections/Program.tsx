import { useEffect, useRef } from "react";
import { Clock, Mic, Coffee, Award, MessageSquare } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const scheduleItems = [
  {
    time: "08:30–08:45",
    title: "Opening",
    description: "Challenge goals and logistics",
    speaker: "Dr. Xuelong Li",
    icon: Clock,
    type: "opening" as const,
  },
  {
    time: "08:45–09:30",
    title: "Keynote 1 (T1)",
    description: "Efficient Agentic Reasoning",
    speaker: "Dr. Pan Zhou (SMU)",
    icon: Mic,
    type: "keynote" as const,
  },
  {
    time: "09:30–10:15",
    title: "Keynote 2 (T2)",
    description: "AI Alignment and Safe RL",
    speaker: "Dr. Yaodong Yang (PKU)",
    icon: Mic,
    type: "keynote" as const,
  },
  {
    time: "10:15–10:45",
    title: "Coffee Break & Poster Session A",
    description: "Networking and poster presentations",
    speaker: null,
    icon: Coffee,
    type: "break" as const,
  },
  {
    time: "10:45–12:00",
    title: "Challenge Spotlight I",
    description: "Track 1 and Track 2 winners (oral presentations)",
    speaker: null,
    icon: MessageSquare,
    type: "spotlight" as const,
  },
  {
    time: "12:00–13:30",
    title: "Lunch Break",
    description: null,
    speaker: null,
    icon: Coffee,
    type: "break" as const,
  },
  {
    time: "13:30–14:15",
    title: "Keynote 3 (T3)",
    description: "Safe AI Verification",
    speaker: "Prof. Alessio R. Lomuscio (Imperial)",
    icon: Mic,
    type: "keynote" as const,
  },
  {
    time: "14:15–15:00",
    title: "Invited Talk",
    description: "Robust & Interpretable Agent",
    speaker: "Prof. Liping Jing (BJTU)",
    icon: Mic,
    type: "invited" as const,
  },
  {
    time: "15:00–15:30",
    title: "Coffee Break & Poster Session B",
    description: "Networking and poster presentations",
    speaker: null,
    icon: Coffee,
    type: "break" as const,
  },
  {
    time: "15:30–16:30",
    title: "Challenge Spotlight II",
    description: "Track 2 winners and technical Q&A",
    speaker: null,
    icon: MessageSquare,
    type: "spotlight" as const,
  },
  {
    time: "16:30–17:00",
    title: "Awards & Closing",
    description: "Awards ceremony and closing remarks",
    speaker: null,
    icon: Award,
    type: "closing" as const,
  },
];

const typeStyles: Record<string, { border: string; bg: string; iconColor: string }> = {
  opening: { border: "#05966940", bg: "#05966908", iconColor: "#059669" },
  keynote: { border: "#1E7A8C40", bg: "#1E7A8C08", iconColor: "#1E7A8C" },
  break: { border: "#4A627840", bg: "#4A627808", iconColor: "#A0B4C8" },
  spotlight: { border: "#7C3AED40", bg: "#7C3AED08", iconColor: "#7C3AED" },
  invited: { border: "#7C6BB340", bg: "#7C6BB308", iconColor: "#7C6BB3" },
  closing: { border: "#DC262640", bg: "#DC262608", iconColor: "#DC2626" },
};

export default function Program() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(".schedule-item", {
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });


    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="program"
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-[#0D1B2A] via-[#162D45]/30 to-[#0D1B2A]"
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Workshop Program
          </h2>
          <p className="text-lg text-[#A0B4C8] max-w-2xl mx-auto">
            A one-day, in-person, discussion-oriented workshop. The program combines invited talks, paper spotlights, poster sessions, and a discussion session centered on the three challenge tracks.
          </p>
        </div>

        {/* Tentative label */}
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#7C6BB3]/10 text-[#7C6BB3] border border-[#7C6BB3]/20">
            Tentative Schedule — October 11 or 12, 2026
          </span>
        </div>

        {/* Schedule */}
        <div className="relative mb-20">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-white/5" />

          <div className="space-y-4">
            {scheduleItems.map((item) => {
              const Icon = item.icon;
              const style = typeStyles[item.type];
              return (
                <div
                  key={item.time}
                  className="schedule-item relative flex items-start gap-4 md:gap-6 group"
                >
                  {/* Timeline node */}
                  <div className="relative z-10 shrink-0">
                    <div
                      className="w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                      style={{
                        background: style.bg,
                        border: `1px solid ${style.border}`,
                      }}
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6" style={{ color: style.iconColor }} />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="flex-1 rounded-xl p-4 md:p-5 transition-all duration-300 hover:-translate-y-0.5"
                    style={{
                      background: "rgba(255,255,255,0.015)",
                      border: `1px solid rgba(255,255,255,0.05)`,
                    }}
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-1">
                      <span className="font-mono text-xs text-[#6B8299] font-semibold">
                        {item.time}
                      </span>
                      {item.speaker && (
                        <span className="text-xs text-[#A0B4C8]">
                          {item.speaker}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-semibold text-base">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-[#6B8299] text-sm mt-1">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Open Workshop Note */}
        <div className="mt-16 text-center">
          <div className="inline-block rounded-xl p-6 max-w-2xl" style={{ background: "rgba(37, 99, 235, 0.05)", border: "1px solid rgba(37, 99, 235, 0.15)" }}>
            <h4 className="text-white font-semibold mb-2">Open Workshop Policy</h4>
            <p className="text-[#A0B4C8] text-sm leading-relaxed">
              The workshop is planned as an open, in-person event. UbiComp/ISWC attendees may join without a paper submission, subject to registration and room capacity. We expect 30–45 participants from UbiComp/ISWC researchers, agent system builders, and trustworthy AI researchers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
