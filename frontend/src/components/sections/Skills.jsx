import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  {
    name: "HTML",
    level: 95,
    desc: "Semantic Markup, Accessibility, SEO-optimierte Struktur",
  },
  {
    name: "CSS",
    level: 92,
    desc: "Flexbox, Grid, Animationen, moderne Layout-Techniken",
  },
  {
    name: "JavaScript",
    level: 88,
    desc: "ES6+, DOM, Async/Await, OOP, Web APIs",
  },
  {
    name: "Responsive Design",
    level: 96,
    desc: "Mobile First, Fluid Layouts, Cross-Browser-Kompatibilität",
  },
  {
    name: "UI / UX Design",
    level: 85,
    desc: "Figma, Prototyping, User Journey, Design Systems",
  },
];

const tools = [
  "Figma",
  "VS Code",
  "Git",
  "Firebase",
  "Framer Motion",
  "Three.js",
  "Tailwind",
  "Vite",
];

function SkillRow({ skill, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="group border-b border-white/5 py-8 grid grid-cols-12 gap-4 items-center hover:border-[#E6C229]/30 transition-colors"
      data-testid={`skill-${index}`}
    >
      <div className="col-span-3 sm:col-span-1 text-[#E6C229] font-display text-2xl">
        0{index + 1}
      </div>
      <div className="col-span-9 sm:col-span-3">
        <h3 className="font-display text-2xl md:text-3xl tracking-tight">
          {skill.name}
        </h3>
      </div>
      <div className="col-span-12 sm:col-span-5 text-sm text-neutral-400">
        {skill.desc}
      </div>
      <div className="col-span-12 sm:col-span-3 flex items-center gap-4">
        <div className="flex-1 h-px bg-white/10 relative overflow-hidden">
          <motion.div
            initial={{ scaleX: 0, originX: 0 }}
            animate={inView ? { scaleX: skill.level / 100 } : {}}
            transition={{
              duration: 1.4,
              delay: 0.3 + index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 bg-gradient-to-r from-[#E6C229] to-[#D4C5B9]"
            style={{
              boxShadow: "0 0 20px rgba(230,194,41,0.6)",
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 md:py-40 max-w-7xl mx-auto px-6 md:px-12"
      data-testid="skills-section"
    >
      <div className="grid grid-cols-12 gap-6 mb-20">
        <div className="col-span-12 md:col-span-5">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#E6C229]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4C5B9]">
              03 — Expertise
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-medium"
            data-testid="skills-title"
          >
            Skills &{" "}
            <span className="italic font-light text-[#E6C229]">Toolset</span>.
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="col-span-12 md:col-span-5 md:col-start-8 self-end text-neutral-400 text-base md:text-lg leading-relaxed"
        >
          Technologien und Methoden, die ich täglich einsetze um Websites zu
          bauen die nicht nur gut aussehen — sondern auch perfekt performen.
        </motion.p>
      </div>

      <div className="border-t border-white/5">
        {skills.map((s, i) => (
          <SkillRow key={s.name} skill={s} index={i} />
        ))}
      </div>

      {/* Tools chip cloud */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20"
      >
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500 mb-6">
          Toolbox
        </p>
        <div className="flex flex-wrap gap-3">
          {tools.map((t) => (
            <span
              key={t}
              className="px-5 py-2.5 rounded-full border border-white/10 text-sm text-neutral-300 hover:border-[#E6C229] hover:text-[#E6C229] transition-colors"
              data-testid={`tool-${t}`}
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
