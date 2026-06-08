import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Challenge", href: "#challenge" },
  { label: "Dates", href: "#dates" },
  { label: "CFP", href: "#cfp" },
  { label: "Program", href: "#program" },
  { label: "Organizers", href: "#organization" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <>
      {/* Logo - transparent, no background, bottom-left of top area */}
      <a
        href="#"
        className="fixed top-14 left-6 z-[60] text-white font-extrabold text-base tracking-tight hover:opacity-80 transition-opacity"
        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.6), 0 0 2px rgba(0,0,0,0.8)" }}
        onClick={(e) => {
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      >
        TAI Workshop{" "}
        <span style={{ color: "#2A9DB0" }}>2026</span>
      </a>

      {/* Right-side floating pill nav */}
      <nav
        className={`fixed top-4 right-6 z-[60] hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-[#0D1B2A]/85 backdrop-blur-xl shadow-lg shadow-black/20 border border-white/10"
            : "bg-[#0D1B2A]/50 backdrop-blur-md border border-white/5"
        }`}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:bg-white/10"
            style={{ color: "#A0B4C8" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#FFFFFF";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#A0B4C8";
            }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="mailto:workshop-2026@ubicomp.org"
          className="ml-1 px-4 py-1.5 rounded-full text-white text-sm font-semibold hover:opacity-90 transition-all duration-200"
          style={{
            background: "linear-gradient(135deg, #1E7A8C 0%, #2A9DB0 100%)",
          }}
        >
          Contact
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="fixed top-4 right-6 z-[60] md:hidden p-2 rounded-lg"
        style={{ background: "rgba(13, 27, 42, 0.7)", backdropFilter: "blur(10px)" }}
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
      </button>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 w-72 h-full z-[58] md:hidden transform transition-transform duration-300 flex flex-col gap-4 p-6 pt-20 ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: "#162D45",
          borderLeft: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleNavClick(e, link.href)}
            className="text-lg font-semibold py-3 border-b transition-colors"
            style={{ color: "#A0B4C8", borderColor: "rgba(255,255,255,0.05)" }}
          >
            {link.label}
          </a>
        ))}
        <a
          href="mailto:workshop-2026@ubicomp.org"
          className="mt-4 px-4 py-3 rounded-xl text-white text-center font-semibold transition-colors"
          style={{
            background: "linear-gradient(135deg, #1E7A8C 0%, #2A9DB0 100%)",
          }}
        >
          Contact
        </a>
      </div>
    </>
  );
}
