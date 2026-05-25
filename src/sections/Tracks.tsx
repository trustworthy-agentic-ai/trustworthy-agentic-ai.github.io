import { useRef, useState } from "react";
import {
  Activity,
  ShieldCheck,
  ChevronDown,
  Database,
  BarChart3,
  FileText,
  Microscope,
} from "lucide-react";

/* ──────────────── TYPES ──────────────── */

interface TaskLabel {
  label: string;
  desc: string;
}

interface EvalMetric {
  metric: string;
  desc: string;
}

interface RiskBand {
  band: string;
  score: string;
  weight: string;
  treatment: string;
}

interface TrackData {
  tag: string;
  title: string;
  subtitle: string;
  color: string;
  colorDark: string;
  image: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  overview: string;
  task: {
    intro: string;
    labels: TaskLabel[];
  };
  dataset?: string[];
  questionTypes?: string[];
  riskBands?: RiskBand[];
  evaluation: EvalMetric[];
}

/* ──────────────── DATA ──────────────── */

const track1: TrackData = {
  tag: "Track 1",
  title: "MedLongTrust-EHR",
  subtitle: "Electronic Health Record Long-Context Hallucination Detection & Evidence Attribution",
  color: "#2A9DB0",
  colorDark: "#1E7A8C",
  image: "/images/track1-medical.jpg",
  icon: Activity,
  overview:
    "MedLongTrust-EHR evaluates whether models can faithfully understand complex, lengthy, cross-paragraph medical records to determine if a medical claim is supported by evidence, and identify hallucinations, contradictions, insufficient evidence, and critical risk omissions.",
  task: {
    intro: "Given a long electronic health record and a medical claim, the system must determine whether the claim is supported by the record and return the evidence paragraphs.",
    labels: [
      { label: "Supported", desc: "Claim is supported by EHR evidence." },
      { label: "Contradicted", desc: "Claim contradicts EHR evidence." },
      { label: "Not Enough Evidence", desc: "Insufficient evidence in EHR to judge." },
      { label: "Critical Omission (Extended)", desc: "Identifies key risk omissions or constraints." },
    ],
  },
  dataset: [
    "Long electronic health record sample text",
    "Medical claim requiring verification",
    "Answer label (Supported / Contradicted / Not Enough Evidence)",
    "Evidence location (doc_id, section_id, paragraph_id)",
    "Risk level (LOW / MEDIUM / HIGH / CRITICAL)",
  ],
  questionTypes: [
    "Diagnosis verification",
    "Medication and allergy verification",
    "Lab and examination verification",
    "Timeline reasoning",
    "History disambiguation",
    "Critical omission detection",
  ],
  evaluation: [
    { metric: "Accuracy", desc: "Primary metric — claim verification correctness." },
    { metric: "Evidence Recall / Precision", desc: "Submitted evidence coverage vs. gold evidence." },
    { metric: "Hallucination F1", desc: "Recognition of contradictions or unsupported claims." },
    { metric: "Critical Error Rate", desc: "Error rate on HIGH / CRITICAL risk samples." },
    { metric: "Avg Tokens", desc: "Per-sample official model API token consumption." },
  ],
};

const track2: TrackData = {
  tag: "Track 2",
  title: "PII-PolicyBench",
  subtitle: "Risk-Aware Benchmarking for Policy-Compliant PII Detection",
  color: "#7C6BB3",
  colorDark: "#5B4B8A",
  image: "/images/track2-privacy.jpg",
  icon: ShieldCheck,
  overview:
    "PII-PolicyBench evaluates whether PII detectors meet sample-level privacy policy compliance requirements. It advances evaluation from span-level F1 to risk-driven, sample-level policy compliance rate (PCR).",
  task: {
    intro: "The system must detect personally identifiable information (PII) spans in given text and output the corresponding coarse label. Evaluation focuses on whether sensitive content is adequately covered, whether CRITICAL-risk entities are missed, and whether non-PII text is over-redacted.",
    labels: [
      { label: "PERSON_NAME", desc: "Person name" },
      { label: "ACCOUNT_HANDLE", desc: "Account / username identifier" },
      { label: "CONTACT", desc: "Contact information" },
      { label: "ADDRESS_GEO", desc: "Address and geographic info" },
      { label: "OFFICIAL_ID", desc: "Official identity identifier" },
      { label: "FINANCIAL_ACCOUNT", desc: "Financial account" },
      { label: "AUTH_SECRET", desc: "Authentication secret / password" },
      { label: "DIGITAL_ID", desc: "Digital identity identifier" },
      { label: "HEALTH_MEDICAL", desc: "Health and medical info" },
      { label: "DEMOGRAPHIC_PROFILE", desc: "Demographic profile" },
      { label: "TRANSACTION_ASSET", desc: "Transaction and asset info" },
      { label: "CONTEXT_MISC", desc: "Contextual miscellaneous" },
    ],
  },
  riskBands: [
    { band: "CONTEXT", score: "0", weight: "0", treatment: "Not counted as positive PII in PCR." },
    { band: "LOW", score: "1-4", weight: "1", treatment: "Counted in PII coverage." },
    { band: "MEDIUM", score: "5-8", weight: "2", treatment: "Counted in PII coverage." },
    { band: "HIGH", score: "9-11", weight: "3", treatment: "Counted in PII coverage." },
    { band: "CRITICAL", score: "\u2265 12", weight: "4", treatment: "Must be 100% covered." },
  ],
  evaluation: [
    { metric: "PCR (Policy Compliance Rate)", desc: "Sample-level policy compliance pass rate \u2014 primary leaderboard metric." },
    { metric: "weighted_pii_coverage", desc: "PII coverage weighted by risk level." },
    { metric: "critical_coverage", desc: "CRITICAL entity coverage \u2014 must reach 100% to pass sample." },
    { metric: "fp_char_rate", desc: "Over-redacted non-PII character ratio." },
    { metric: "Character / Entity P-R-F1", desc: "Traditional character-level and entity-level quality." },
  ],
};

/* ──────────────── EXPANDABLE SECTION ──────────────── */

function ExpandableSection({
  title,
  icon: Icon,
  color,
  children,
  defaultOpen = false,
}: {
  title: string;
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  color: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "rgba(255,255,255,0.07)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-3 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-white">
          <Icon className="w-4 h-4" style={{ color }} />
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-[#8BA3B8] transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 pb-4">{children}</div>
      </div>
    </div>
  );
}

/* ──────────────── TRACK CARD ──────────────── */

function TrackCard({ track }: { track: TrackData }) {
  const Icon = track.icon;

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: `${track.color}08`,
        border: `1px solid ${track.color}25`,
        boxShadow: `0 4px 24px ${track.color}10`,
      }}
    >
      {/* Image */}
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img
          src={track.image}
          alt={track.title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(180deg, ${track.color}15 0%, ${track.colorDark}40 50%, #0D1B2A 100%)`,
          }}
        />
        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider"
            style={{
              background: `${track.color}20`,
              color: track.color,
              border: `1px solid ${track.color}40`,
            }}
          >
            {track.tag}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 flex-1 flex flex-col gap-5">
        {/* Title */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{
                background: `${track.color}15`,
                border: `1px solid ${track.color}30`,
              }}
            >
              <Icon className="w-5 h-5" style={{ color: track.color }} />
            </div>
            <h3 className="text-2xl font-bold text-white">{track.title}</h3>
          </div>
          <p className="text-sm text-[#A0B4C8] leading-relaxed">
            {track.subtitle}
          </p>
        </div>

        {/* Overview */}
        <p className="text-sm text-[#8BA3B8] leading-relaxed">
          {track.overview}
        </p>

        {/* Expandable Sections */}
        <div className="space-y-3 flex-1">
          <ExpandableSection
            title="Task & Labels"
            icon={Microscope}
            color={track.color}
            defaultOpen={true}
          >
            <p className="text-xs text-[#8BA3B8] mb-3">{track.task.intro}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {track.task.labels.map((l) => (
                <div
                  key={l.label}
                  className="flex items-start gap-2 p-2 rounded-lg"
                  style={{ background: `${track.color}08` }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ background: track.color }}
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {l.label}
                    </span>
                    <span className="text-[11px] text-[#8BA3B8]">{l.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </ExpandableSection>

          {track.dataset && track.dataset.length > 0 && (
            <ExpandableSection
              title="Dataset"
              icon={Database}
              color={track.color}
            >
              <ul className="space-y-2">
                {track.dataset.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-xs text-[#A0B4C8]"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                      style={{ background: track.color }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </ExpandableSection>
          )}

          {track.questionTypes && track.questionTypes.length > 0 && (
            <ExpandableSection
              title="Question Types"
              icon={FileText}
              color={track.color}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {track.questionTypes.map((qt) => (
                  <div
                    key={qt}
                    className="flex items-center gap-2 text-xs text-[#A0B4C8] p-2 rounded-lg"
                    style={{ background: `${track.color}08` }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full shrink-0"
                      style={{ background: track.color }}
                    />
                    {qt}
                  </div>
                ))}
              </div>
            </ExpandableSection>
          )}

          {track.riskBands && track.riskBands.length > 0 && (
            <ExpandableSection
              title="Risk Bands"
              icon={ShieldCheck}
              color={track.color}
              defaultOpen={true}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-[#8BA3B8] border-b border-white/5">
                      <th className="text-left py-2 px-1 font-medium">Band</th>
                      <th className="text-left py-2 px-1 font-medium">Score</th>
                      <th className="text-left py-2 px-1 font-medium">Weight</th>
                      <th className="text-left py-2 px-1 font-medium">Policy Treatment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {track.riskBands.map((rb) => (
                      <tr
                        key={rb.band}
                        className="border-b border-white/5 last:border-0"
                      >
                        <td
                          className="py-2 px-1 font-semibold"
                          style={{ color: track.color }}
                        >
                          {rb.band}
                        </td>
                        <td className="py-2 px-1 text-[#A0B4C8]">{rb.score}</td>
                        <td className="py-2 px-1 text-[#A0B4C8]">{rb.weight}</td>
                        <td className="py-2 px-1 text-[#8BA3B8]">{rb.treatment}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </ExpandableSection>
          )}

          <ExpandableSection
            title="Evaluation Metrics"
            icon={BarChart3}
            color={track.color}
            defaultOpen={true}
          >
            <div className="space-y-2">
              {track.evaluation.map((ev) => (
                <div
                  key={ev.metric}
                  className="flex items-start gap-2 p-2 rounded-lg"
                  style={{ background: `${track.color}08` }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ background: track.color }}
                  />
                  <div>
                    <span className="text-xs font-semibold text-white block">
                      {ev.metric}
                    </span>
                    <span className="text-[11px] text-[#8BA3B8]">{ev.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </ExpandableSection>
        </div>
      </div>
    </div>
  );
}

/* ──────────────── MAIN COMPONENT ──────────────── */

export default function Tracks() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      id="challenge"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{
        background:
          "linear-gradient(180deg, #0D1B2A 0%, rgba(13,27,42,0.97) 30%, rgba(13,27,42,0.97) 70%, #0D1B2A 100%)",
      }}
    >
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Two-Track Challenge
          </h2>
          <p className="text-lg text-[#A0B4C8] max-w-2xl mx-auto leading-relaxed">
            The workshop features two complementary tracks: long-context medical claim verification and risk-aware PII policy compliance detection.
          </p>
        </div>

        {/* Two-column Track Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TrackCard track={track1} />
          <TrackCard track={track2} />
        </div>
      </div>
    </section>
  );
}
