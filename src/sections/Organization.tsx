import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────── DATA ──────────────── */

const organizers = [
  { name: "赵健", nameEn: "Jian Zhao", affil: "TeleAI", img: "/images/people-zhaojian.jpg" },
  { name: "张天乐", nameEn: "Tianle Zhang", affil: "TeleAI", img: "/images/people-tianlezhang.jpg" },
  { name: "郭宏成", nameEn: "Hongcheng Guo", affil: "Fudan University", img: "/images/people-hongchengguo.png" },
  { name: "张磊磊", nameEn: "Leilei Zhang", affil: "TeleAI; Fudan University", img: "/images/people-leileizhang.png" },
  { name: "周晖林", nameEn: "Huilin Zhou", affil: "TeleAI; USTC", img: "/images/people-huilinzhou.png" },
  { name: "陈文弢", nameEn: "Wentao Chen", affil: "CAICT", img: "/images/people-wentaochen.jpg" },
  { name: "魏峰", nameEn: "Feng Wei", affil: "CAICT", img: "/images/people-fengwei.jpg" },
  { name: "陈杰", nameEn: "Jie Chen", affil: "CAICT", img: "/images/people-jiechen.png" },
  { name: "范肇心", nameEn: "Zhaoxin Fan", affil: "BUAA", img: "/images/people-zhaoxinfan.png" },
  { name: "张兰", nameEn: "Lan Zhang", affil: "USTC", img: "/images/people-lanzhang.jpg" },
  { name: "王志波", nameEn: "Zhibo Wang", affil: "Zhejiang University", img: "/images/people-zhibowang.jpg" },
  { name: "冯瑞", nameEn: "Rui Feng", affil: "Fudan University", img: "/images/people-ruifeng.jpg" },
  { name: "倪蓉蓉", nameEn: "Rongrong Ni", affil: "BJTU", img: "/images/people-rongrongni.jpg" },
  { name: "张洋豪", nameEn: "Yanghao Zhang", affil: "Imperial College London", img: "/images/people-yanghaozhang.jpg" },
  { name: "牟容慧", nameEn: "Ronghui Mu", affil: "University of Exeter", img: "/images/people-ronghuimu.jpg" },
];

const advisoryCommittee = [
  { name: "兴军亮", nameEn: "Junliang Xing", affil: "Tsinghua University", img: "/images/people-junliangxing.jpg" },
  { name: "Jane Shen Shengmei", nameEn: "Jane Shen", affil: "Pensees Singapore", img: "/images/people-janeshen.png" },
  { name: "颜水成", nameEn: "Shuicheng Yan", affil: "NUS", img: "/images/people-shuichengyan.png" },
  { name: "李学龙", nameEn: "Xuelong Li", affil: "TeleAI", img: "/images/people-xuelongli.jpg" },
];

/* ──────────────── CARD COMPONENT ──────────────── */

function PersonCard({ person }: { person: (typeof organizers)[0] }) {
  return (
    <div
      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:-translate-y-0.5 group"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.08)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "rgba(42, 157, 176, 0.25)";
        e.currentTarget.style.background = "rgba(255,255,255,0.07)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      }}
    >
      {/* Photo */}
      <div className="shrink-0">
        <img
          src={person.img}
          alt={person.name}
          className="w-12 h-14 rounded-lg object-cover"
          style={{
            border: "2px solid rgba(42, 157, 176, 0.3)",
          }}
          onError={(e) => {
            const el = e.currentTarget;
            el.style.display = "none";
            const fallback = el.parentElement?.querySelector(".fallback-avatar") as HTMLElement;
            if (fallback) fallback.style.display = "flex";
          }}
        />
        <div
          className="fallback-avatar w-12 h-14 rounded-lg hidden items-center justify-center text-sm font-bold"
          style={{
            background: "linear-gradient(135deg, #1E7A8C30 0%, #1E7A8C10 100%)",
            border: "2px solid #1E7A8C40",
            color: "#2A9DB0",
          }}
        >
          {person.nameEn.split(" ").map((n) => n[0]).join("")}
        </div>
      </div>

      {/* Info */}
      <div className="min-w-0">
        <p className="text-white font-semibold text-sm truncate">
          {person.name}
        </p>
        <p className="text-[#6B8299] text-xs truncate">{person.affil}</p>
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
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Organizing Committee
          </h2>
          <p className="text-lg text-[#A0B4C8] max-w-2xl mx-auto">
            A mix of expertise in agent safety, benchmarking, mobile systems, privacy, and deployment.
          </p>
        </div>

        {/* ─── ORGANIZERS ─── */}
        <div className="mb-20">
          <h3
            className="text-xl font-bold mb-8 flex items-center gap-3"
            style={{ color: "#2A9DB0" }}
          >
            <span
              className="w-10 h-1 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #2A9DB0 0%, #5B4B8A 100%)",
              }}
            />
            Organizers
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {organizers.map((p) => (
              <PersonCard key={p.nameEn} person={p} />
            ))}
          </div>
        </div>

        {/* ─── ADVISORY COMMITTEE ─── */}
        <div>
          <h3
            className="text-xl font-bold mb-8 flex items-center gap-3"
            style={{ color: "#7C6BB3" }}
          >
            <span
              className="w-10 h-1 rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #7C6BB3 0%, #2A9DB0 100%)",
              }}
            />
            Advisory Committee
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {advisoryCommittee.map((p) => (
              <PersonCard key={p.nameEn} person={p} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
