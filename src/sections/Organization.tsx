import { useRef, useEffect } from "react";

/* ──────────────── ADVISORY COMMITTEE ──────────────── */

const advisoryCommittee = [
  { name: "Xuelong Li", affil: "TeleAI", img: "/images/people-xuelongli.jpg" },
  { name: "Shuicheng Yan", affil: "NUS", img: "/images/people-shuichengyan.png" },
  { name: "Junliang Xing", affil: "Tsinghua University", img: "/images/people-junliangxing.jpg" },
];

/* ──────────────── ORGANIZERS ──────────────── */

const organizers = [
  { name: "Jian Zhao", affil: "TeleAI", img: "/images/people-zhaojian.jpg" },
  { name: "Tianle Zhang", affil: "TeleAI", img: "/images/people-tianlezhang.jpg" },
  { name: "Hongcheng Guo", affil: "Fudan University", img: "/images/people-hongchengguo.png" },
  { name: "Leilei Zhang", affil: "TeleAI; Fudan University", img: "/images/people-leileizhang.png" },
  { name: "Huilin Zhou", affil: "TeleAI; USTC", img: "/images/people-huilinzhou.png" },
  { name: "Feng Wei", affil: "CAICT", img: "/images/people-fengwei.jpg" },
  { name: "Kai Wang", affil: "TeleAI", img: "/images/people-kaiwang.jpg" },
  { name: "Yuchen Yuan", affil: "TeleAI", img: "/images/people-yuchenyuan.jpg" },
  { name: "Yanghao Zhang", affil: "Imperial College London", img: "/images/people-yanghaozhang.jpg" },
  { name: "Ronghui Mu", affil: "University of Exeter", img: "/images/people-ronghuimu.jpg" },
  { name: "Guojun Xiong", affil: "SJTU", img: "/images/people-guojunxiong.png" },
  { name: "Zheng Zhu", affil: "GigaAI", img: "/images/people-zhengzhu.jpg" },
  { name: "Wentao Chen", affil: "CAICT", img: "/images/people-wentaochen.jpg" },
  { name: "Rongrong Ni", affil: "BJTU", img: "/images/people-rongrongni.jpg" },
  { name: "Lan Zhang", affil: "USTC", img: "/images/people-lanzhang.jpg" },
  { name: "Zhaofeng He", affil: "BUPT", img: "/images/people-zhaofenghe.png" },
  { name: "Rui Feng", affil: "Fudan University", img: "/images/people-ruifeng.jpg" },
  { name: "Zhibo Wang", affil: "Zhejiang University", img: "/images/people-zhibowang.jpg" },
];

/* ──────────────── CARD COMPONENT ──────────────── */

function PersonCard({ person }: { person: { name: string; affil: string; img: string } }) {
  const hasImg = person.img.length > 0;

  return (
    <div
      className="flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:-translate-y-1 group text-center"
      style={{
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.10)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(42, 157, 176, 0.35)";
        e.currentTarget.style.background = "rgba(255,255,255,0.09)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
      }}
    >
      {/* Photo or Fallback */}
      <div className="relative w-20 h-24">
        {hasImg ? (
          <img
            src={person.img}
            alt={person.name}
            className="w-20 h-24 rounded-xl object-cover absolute inset-0"
            style={{ border: "2px solid rgba(42, 157, 176, 0.35)", objectPosition: "top center" }}
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fb = e.currentTarget.parentElement?.querySelector(".fb") as HTMLElement;
              if (fb) fb.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className={`fb w-20 h-24 rounded-xl items-center justify-center text-lg font-bold absolute inset-0 ${hasImg ? "hidden" : "flex"}`}
          style={{
            background: "linear-gradient(135deg, #1E7A8C40 0%, #1E7A8C20 100%)",
            border: "2px solid #1E7A8C60",
            color: "#2A9DB0",
          }}
        >
          {person.name.split(" ").map((n) => n[0]).join("")}
        </div>
      </div>

      {/* Info */}
      <div className="w-full">
        <p className="text-white font-semibold text-sm leading-tight mb-1">
          {person.name}
        </p>
        {person.affil && (
          <p className="text-[#8BA3B8] text-xs leading-tight">{person.affil}</p>
        )}
      </div>
    </div>
  );
}

/* ──────────────── MAIN COMPONENT ──────────────── */

export default function Organization() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    void section;
  }, []);

  return (
    <section id="organization" ref={sectionRef} className="relative py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Organizing Committee
          </h2>
          <p className="text-lg text-[#A0B4C8] max-w-2xl mx-auto">
            A mix of expertise in agent safety, benchmarking, mobile systems, privacy, and deployment.
          </p>
        </div>

        {/* ─── ADVISORY COMMITTEE ─── */}
        <div className="mb-20">
          <h3
            className="text-xl font-bold mb-8 flex items-center gap-3"
            style={{ color: "#7C6BB3" }}
          >
            <span
              className="w-10 h-1 rounded-full"
              style={{
                background: "linear-gradient(90deg, #7C6BB3 0%, #2A9DB0 100%)",
              }}
            />
            Advisory Committee
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl">
            {advisoryCommittee.map((p) => (
              <PersonCard key={p.name} person={p} />
            ))}
          </div>
        </div>

        {/* ─── ORGANIZERS ─── */}
        <div>
          <h3
            className="text-xl font-bold mb-8 flex items-center gap-3"
            style={{ color: "#2A9DB0" }}
          >
            <span
              className="w-10 h-1 rounded-full"
              style={{
                background: "linear-gradient(90deg, #2A9DB0 0%, #5B4B8A 100%)",
              }}
            />
            Organizers
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
            {organizers.map((p) => (
              <PersonCard key={p.name} person={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
