import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ project, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className={`grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center ${
        index % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
      }`}
      data-testid={`project-${index}`}
    >
      <a
        ref={cardRef}
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="md:col-span-7 tilt-card group relative block overflow-hidden rounded-2xl border border-white/10 bg-[#0A0A0A]"
        data-testid={`project-${index}-link`}
        data-cursor="grow"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative"
        >
          <div className="aspect-[16/10] overflow-hidden">
            <motion.img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ scale: 1.05 }}
            />
          </div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-[#050505]/20 to-transparent opacity-100 group-hover:opacity-50 transition-opacity duration-500" />

          {/* Number */}
          <div className="absolute top-6 left-6 font-display text-7xl text-white/10 group-hover:text-[#E6C229]/50 transition-colors duration-500">
            0{index + 1}
          </div>

          {/* Hover Reveal */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="px-6 py-3 rounded-full bg-[#E6C229] text-[#050505] text-xs uppercase tracking-[0.3em] flex items-center gap-2 font-semibold">
              Live ansehen
              <ArrowUpRight size={14} />
            </div>
          </div>
        </motion.div>
      </a>

      <div className="md:col-span-5">
        <div className="flex items-center gap-3 mb-4">
          <span className="w-6 h-px bg-[#E6C229]" />
          <span className="text-xs uppercase tracking-[0.25em] text-[#D4C5B9]">
            {project.category}
          </span>
        </div>
        <h3 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4 font-medium">
          {project.title}
        </h3>
        <p className="text-neutral-400 text-base md:text-lg leading-relaxed mb-6 max-w-md">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs uppercase tracking-[0.15em] px-3 py-1.5 rounded-full border border-white/10 text-neutral-400"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white hover:text-[#E6C229] transition-colors link-underline"
          data-testid={`project-${index}-cta`}
        >
          Projekt besuchen
          <ArrowUpRight size={14} />
        </a>
      </div>
    </motion.div>
  );
}
