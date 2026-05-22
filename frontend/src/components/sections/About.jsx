import { motion } from "framer-motion";
import { Sparkles, Code, Zap } from "lucide-react";

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 md:py-40 max-w-7xl mx-auto px-6 md:px-12"
      data-testid="about-section"
    >
      {/* Section label */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3 mb-12 md:mb-0">
          <div className="sticky top-32">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-[#E6C229]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4C5B9]">
                01 — Über mich
              </span>
            </div>
            <div className="hidden md:block aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 relative">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent z-10" />
              <img
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=700"
                alt="Ivan Vilar Gomes — Frontend Developer"
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                data-testid="about-portrait"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <p className="font-display text-xl">Ivan Vilar Gomes</p>
                <p className="text-xs text-[#E6C229] uppercase tracking-[0.2em] mt-1">
                  Frontend Developer
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-9 md:pl-12">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-12 font-medium"
            data-testid="about-title"
          >
            Ich entwickle moderne und performante Websites mit Fokus auf{" "}
            <span className="italic font-light text-[#E6C229]">Design</span>,{" "}
            <span className="italic font-light text-[#D4C5B9]">
              Nutzerfreundlichkeit
            </span>{" "}
            und sauberen Code.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-2xl mb-16"
          >
            Mein Ziel ist es, digitale Erlebnisse zu schaffen, die professionell
            aussehen und perfekt funktionieren — von ersten Konzepten bis zum
            produktionsfertigen Code.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden">
            <Stat
              icon={<Sparkles size={20} className="text-[#E6C229]" />}
              value="100%"
              label="Custom Design"
            />
            <Stat
              icon={<Code size={20} className="text-[#E6C229]" />}
              value="3+"
              label="Live Projekte"
            />
            <Stat
              icon={<Zap size={20} className="text-[#E6C229]" />}
              value="A+"
              label="Performance"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ icon, value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="bg-[#0A0A0A] p-8 hover:bg-[#111] transition-colors"
    >
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <span className="text-xs uppercase tracking-[0.25em] text-neutral-500">
          {label}
        </span>
      </div>
      <p className="font-display text-4xl md:text-5xl tracking-tight">
        {value}
      </p>
    </motion.div>
  );
}
