import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";
import HeroScene from "@/components/three/HeroScene";

const reveal = {
  hidden: { y: 60, opacity: 0 },
  show: (i = 0) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.1 + i * 0.08,
    },
  }),
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const scrollToProjects = () => {
    const el = document.querySelector("#projects");
    if (window.__lenis && el)
      window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 });
    else el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden"
      data-testid="hero-section"
    >
      {/* 3D Canvas background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Gradient mask */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505]" />

      {/* Decorative grid */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20"
      >
        {/* Top label */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={0}
          className="flex items-center gap-3 mb-8"
        >
          <span className="w-12 h-px bg-[#E6C229]" />
          <span className="text-xs uppercase tracking-[0.3em] text-[#D4C5B9]">
            Portfolio · 2025
          </span>
        </motion.div>

        {/* Title */}
        <div className="overflow-hidden">
          <motion.h1
            variants={reveal}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display text-[16vw] md:text-[12vw] lg:text-[10rem] leading-[0.9] tracking-tighter font-medium"
            data-testid="hero-title"
          >
            Gomes
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            variants={reveal}
            initial="hidden"
            animate="show"
            custom={2}
            className="font-display text-[16vw] md:text-[12vw] lg:text-[10rem] leading-[0.9] tracking-tighter font-medium"
          >
            <span className="italic font-light text-[#E6C229]">Web</span>design
          </motion.h1>
        </div>

        {/* Bottom row */}
        <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <motion.p
            variants={reveal}
            initial="hidden"
            animate="show"
            custom={3}
            className="md:col-span-6 lg:col-span-5 md:col-start-7 lg:col-start-7 text-lg md:text-xl text-neutral-300 leading-relaxed max-w-md"
            data-testid="hero-slogan"
          >
            Moderne Websites mit Fokus auf{" "}
            <span className="text-white">Performance</span>,{" "}
            <span className="text-white">Design</span> und{" "}
            <span className="text-white">Benutzererlebnis</span>.
          </motion.p>
        </div>

        {/* CTA row */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          custom={5}
          className="mt-12 flex flex-wrap items-center gap-6"
        >
          <button
            onClick={scrollToProjects}
            className="btn-magnetic group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#E6C229] text-[#050505] font-medium text-sm uppercase tracking-wider overflow-hidden"
            data-testid="hero-cta"
          >
            <span className="relative z-10">Meine Projekte ansehen</span>
            <ArrowRight
              className="relative z-10 group-hover:translate-x-1 transition-transform"
              size={16}
            />
          </button>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const el = document.querySelector("#contact");
              if (window.__lenis && el)
                window.__lenis.scrollTo(el, { offset: -80, duration: 1.4 });
              else el?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm text-neutral-300 link-underline"
            data-testid="hero-contact-link"
          >
            Oder kontaktiere mich →
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="absolute bottom-10 left-6 md:left-12 flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 rotate-180 [writing-mode:vertical-rl]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          >
            <ArrowDown size={14} className="text-[#E6C229]" />
          </motion.div>
        </motion.div>

        {/* Counter / status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="absolute bottom-10 right-6 md:right-12 text-right hidden sm:block"
        >
          <div className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 mb-2">
            Frontend Developer
          </div>
          <div className="text-sm text-neutral-300">
            Ivan Vilar Gomes <span className="text-[#E6C229]">●</span> Verfügbar
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
