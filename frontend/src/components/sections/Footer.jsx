import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Twitter, ArrowUp } from "lucide-react";

const socials = [
  { Icon: Github, label: "GitHub", href: "#" },
  { Icon: Linkedin, label: "LinkedIn", href: "#" },
  { Icon: Instagram, label: "Instagram", href: "#" },
  { Icon: Twitter, label: "Twitter", href: "#" },
];

export default function Footer() {
  const scrollTop = () => {
    if (window.__lenis)
      window.__lenis.scrollTo(0, { duration: 1.4, immediate: false });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      className="relative border-t border-white/5 bg-[#050505] pt-24 md:pt-32"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Top grid */}
        <div className="grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 md:col-span-5">
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4C5B9] mb-4">
              Hast du ein Projekt?
            </p>
            <a
              href="mailto:ivanvilargomes@gmail.com"
              className="font-display text-3xl md:text-4xl text-white hover:text-[#E6C229] transition-colors inline-flex items-center gap-2"
              data-testid="footer-email"
            >
              Sag Hallo →
            </a>
          </div>

          <div className="col-span-6 md:col-span-3">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">
              Navigation
            </p>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-[#E6C229] transition-colors">
                  Über mich
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-[#E6C229] transition-colors"
                >
                  Projekte
                </a>
              </li>
              <li>
                <a
                  href="#skills"
                  className="hover:text-[#E6C229] transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-[#E6C229] transition-colors"
                >
                  Kontakt
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4">
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-4">
              Social
            </p>
            <div className="flex flex-wrap gap-3">
              {socials.map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="group relative w-11 h-11 rounded-full border border-white/10 flex items-center justify-center hover:border-[#E6C229] transition-all"
                  data-testid={`footer-social-${label.toLowerCase()}`}
                >
                  <Icon
                    size={16}
                    className="text-neutral-400 group-hover:text-[#E6C229] transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Big watermark */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <h2
            className="font-display text-[20vw] md:text-[14vw] leading-[0.85] tracking-tighter font-medium text-transparent"
            style={{
              WebkitTextStroke: "1px rgba(230, 194, 41, 0.5)",
            }}
            data-testid="footer-watermark"
          >
            Gomes Webdesign
          </h2>
        </motion.div>

        {/* Bottom row */}
        <div className="border-t border-white/5 mt-10 py-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-neutral-500">
          <p data-testid="footer-copyright">
            © {new Date().getFullYear()} Gomes Webdesign · Ivan Vilar Gomes
          </p>
          <div className="flex items-center gap-6">
            <span>Hand crafted in Deutschland</span>
            <button
              onClick={scrollTop}
              className="inline-flex items-center gap-2 hover:text-[#E6C229] transition-colors"
              data-testid="footer-back-to-top"
            >
              Nach oben
              <ArrowUp size={12} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
