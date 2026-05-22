import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Über mich", target: "#about" },
  { label: "Projekte", target: "#projects" },
  { label: "Skills", target: "#skills" },
  { label: "Kontakt", target: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (e, target) => {
    e.preventDefault();
    const el = document.querySelector(target);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-2xl bg-[#050505]/70 border-b border-white/5"
          : "bg-transparent"
      }`}
      data-testid="main-nav"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleNav(e, "#hero")}
          className="flex items-center gap-2"
          data-testid="nav-logo"
        >
          <div className="w-8 h-8 rounded-full bg-[#E6C229] flex items-center justify-center">
            <span className="text-[#050505] font-display font-bold text-sm">
              G
            </span>
          </div>
          <span className="font-display text-lg tracking-tight">
            Gomes <span className="text-[#E6C229]">Webdesign</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {links.map((l, i) => (
            <a
              key={l.target}
              href={l.target}
              onClick={(e) => handleNav(e, l.target)}
              className="link-underline text-sm text-neutral-300 hover:text-white transition-colors"
              data-testid={`nav-link-${i}`}
            >
              <span className="text-[#E6C229] text-xs mr-2">0{i + 1}</span>
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={(e) => handleNav(e, "#contact")}
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 hover:border-[#E6C229] hover:text-[#E6C229] transition-colors text-sm"
          data-testid="nav-cta"
        >
          Projekt starten
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E6C229] animate-pulse" />
        </a>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden p-2 -mr-2"
          aria-label="menu"
          data-testid="nav-mobile-toggle"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden overflow-hidden bg-[#050505]/95 backdrop-blur-2xl border-t border-white/5"
            data-testid="nav-mobile-menu"
          >
            <div className="px-6 py-8 flex flex-col gap-6">
              {links.map((l, i) => (
                <a
                  key={l.target}
                  href={l.target}
                  onClick={(e) => handleNav(e, l.target)}
                  className="text-2xl font-display flex items-baseline gap-3"
                  data-testid={`nav-mobile-link-${i}`}
                >
                  <span className="text-[#E6C229] text-xs">0{i + 1}</span>
                  {l.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
