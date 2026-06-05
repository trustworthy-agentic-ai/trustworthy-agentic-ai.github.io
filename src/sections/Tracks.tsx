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
  datasetLinks?: { label: string; url: string }[];
  submission?: string[];
  questionTypes?: string[];
  riskBands?: RiskBand[];
  evaluation: EvalMetric[];
}

/* ──────────────── DATA ──────────────── */

const track1: TrackData = {
  tag: "Track 1",
  title: "MedLongTrust-EHR",
  subtitle: "Long-Context Trustworthy Understanding & Risk Identification for Electronic Health Records",
  color: "#2A9DB0",
  colorDark: "#1E7A8C",
  image: "/images/track1-medical.jpg",
  icon: Activity,
  overview:
    "MedLongTrust-EHR is a challenge for long-context trustworthy understanding of electronic health records. Models must judge whether a medical claim or response is trustworthy, identify hallucinations, privacy leaks, safety risks, and insufficient evidence, and return traceable evidence paragraphs. Participants download the public train/dev/test package, develop local systems, and submit a JSON prediction file named submission.json to the challenge platform.",
  task: {
    intro: "Given a patient-level long EHR timeline and a medical claim or model response, the system must output: (1) whether the claim or response is trustworthy; (2) what risk types are present; (3) which evidence paragraphs support the judgment. The model must not only judge right or wrong, but also explain error types, identify privacy leaks and safety risks, and understand cross-encounter patient timelines.",
    labels: [
      { label: "trusted", desc: "Claim or response is supported by EHR evidence." },
      { label: "untrusted", desc: "EHR evidence contradicts, or risks are present." },
      { label: "insufficient_evidence", desc: "EHR does not contain enough information to judge." },
      { label: " hallucination.fact_mismatch", desc: "Factually inconsistent with EHR." },
      { label: "hallucination.fabricated_medication", desc: "Fabricated or incorrect medication." },
      { label: "hallucination.trend_reversal", desc: "Reverses trend across encounters." },
      { label: "privacy.identifier_disclosure", desc: "Unnecessary identifier leaked." },
      { label: "safety.allergy_conflict", desc: "Allergy-related safety risk." },
    ],
  },
  dataset: [
    "Dataset download: /datasets/MedLongTrust-EHR_Synthea_Public_Release.zip",
    "120 synthetic patient timeline records (Synthea / SyntheticMass)",
    "1,000 trustworthiness judgment questions",
    "Up to 20 encounters per record",
    "Median ~1,509 words, P90 ~2,164 words",
    "Train: 84 records / 690 questions (with answers)",
    "Dev: 18 records / 152 questions (with answers)",
    "Test: 18 records / 158 questions (answers held out)",
  ],
  datasetLinks: [
    {
      label: "Download public Track 1 dataset",
      url: "/datasets/MedLongTrust-EHR_Synthea_Public_Release.zip",
    },
  ],
  submission: [
    "Submission file name: submission.json",
    "Each prediction is keyed by qid, which is the unique claim/question ID.",
    "Required fields per qid: trust_label, risk_types, evidence.",
    "trust_label values: trusted, untrusted, insufficient_evidence.",
    "risk_types is a list and may include hallucination.fact_mismatch, hallucination.fabricated_medication, hallucination.trend_reversal, privacy.identifier_disclosure, safety.allergy_conflict, insufficient_evidence.",
    "evidence is a list of objects such as { paragraph_id: \"encounter_003_p002\" }.",
    "summary.total_tokens may be included for Token Cost evaluation.",
  ],
  questionTypes: [
    "Condition verification — judge if diagnosis claim is supported by EHR",
    "Medication verification — judge if medication claim is supported by EHR",
    "Observation trend — judge cross-encounter trend of the same observation",
    "Allergy safety — judge if model response ignores allergy risk",
    "Not enough evidence — judge if EHR is sufficient to support a conclusion",
    "Privacy identifier disclosure — judge if response leaks unnecessary identifiers",
  ],
  evaluation: [
    { metric: "FinalScore", desc: "100 * (0.50*TrustLabelAccuracy + 0.30*RiskTypeMicroF1 + 0.20*EvidenceF1) * (0.7 + 0.3*TokenScore)" },
    { metric: "TrustLabelAccuracy", desc: "Trustworthiness judgment accuracy — 50% weight." },
    { metric: "RiskTypeMicroF1", desc: "Multi-label risk type identification F1 — 30% weight." },
    { metric: "EvidenceF1", desc: "Evidence paragraph localization F1 — 20% weight." },
    { metric: "TokenScore", desc: "Token cost efficiency score — scales final score by 0.7~1.0x." },
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
              {track.datasetLinks && track.datasetLinks.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {track.datasetLinks.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      className="inline-flex items-center rounded-lg px-3 py-2 text-xs font-semibold text-white transition-opacity hover:opacity-80"
                      style={{
                        background: `${track.color}25`,
                        border: `1px solid ${track.color}45`,
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
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

          {track.submission && track.submission.length > 0 && (
            <ExpandableSection
              title="Submission Format"
              icon={FileText}
              color={track.color}
            >
              <ul className="space-y-2">
                {track.submission.map((item) => (
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
              <pre
                className="mt-3 overflow-x-auto rounded-lg p-3 text-[11px] text-[#A0B4C8]"
                style={{ background: "rgba(0,0,0,0.22)" }}
              >{`{
  "summary": {
    "total_tokens": {
      "prompt_tokens": 12000,
      "completion_tokens": 3000,
      "total_tokens": 15000
    }
  },
  "synthea_pub_00001": {
    "trust_label": "trusted",
    "risk_types": [],
    "evidence": [
      { "paragraph_id": "encounter_003_p002" }
    ]
  }
}`}</pre>
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
