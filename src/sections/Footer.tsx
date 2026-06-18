import { ExternalLink } from "lucide-react";

const quickLinks = [
  {
    label: "UbiComp 2026 Main Conference",
    href: "https://www.ubicomp.org/ubicomp-iswc-2026",
    external: true,
  },
  { label: "Submission System (PCS)", href: "https://new.precisionconference.com/sigchi", external: true },
];

const contactLinks = [
  { label: "workshop-2026@ubicomp.org", href: "mailto:workshop-2026@ubicomp.org" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#162D45] border-t border-white/5">
      {/* Top decorative gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, #1E7A8C 30%, #7C6BB3 50%, #7C3AED 70%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-white font-extrabold text-lg mb-4 tracking-tight">
              Trustworthy Agentic AI{" "}
              <span className="text-[#1E7A8C]">2026</span>
            </h3>
            <p className="text-[#6B8299] text-sm leading-relaxed max-w-sm">
              The 1st Workshop on Trustworthy, Controllable, and Sustainable
              Agentic AI in Ubiquitous Computing. Affiliated with UbiComp / ISWC
              2026.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-[#6B8299] text-sm hover:text-[#1E7A8C] transition-colors duration-200 flex items-center gap-1.5 group"
                  >
                    {link.label}
                    {link.external && (
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              {contactLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-[#6B8299] text-sm hover:text-[#1E7A8C] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#4A6278] text-xs">
            &copy; 2026 Trustworthy Agentic AI Workshop. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-[#4A6278] text-xs">
            <span>Made for</span>
            <span className="font-semibold text-[#A0B4C8]">UbiComp / ISWC 2026</span>
            <span>&middot;</span>
            <span>Shanghai, China</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
