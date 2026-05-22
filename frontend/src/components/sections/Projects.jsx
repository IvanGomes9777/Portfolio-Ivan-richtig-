import { motion } from "framer-motion";
import ProjectCard from "@/components/ProjectCard";

const projects = [
  {
    title: "El Pollo Loco",
    category: "Browser Game · 2D Platformer",
    description:
      "Ein interaktives 2D Jump-and-Run Game mit objektorientiertem JavaScript, Canvas-Animationen, Sound-Design und responsiver Steuerung für Desktop und Touch.",
    tags: ["JavaScript", "Canvas API", "OOP", "Game Dev"],
    url: "https://ivan-gomes.developerakademie.net/el-pollo-loco-PEPE.spiel/",
    image:
      "https://static.prod-images.emergentagent.com/jobs/d2c4373d-5862-4c88-9a13-0ffb22a9b91e/images/d00750b0bb23eef8c595d12bb4ac1b15583e97e46171b5eb7a3926e45b232584.png",
  },
  {
    title: "Pokédex",
    category: "Web App · API Integration",
    description:
      "Eine dynamische Pokédex-Anwendung mit der PokéAPI — Live-Search, Detailansichten, Lazy Loading und einem cleanen, modernen UI mit weichen Animationen.",
    tags: ["JavaScript", "REST API", "Async/Await", "UI Design"],
    url: "https://ivan-gomes.developerakademie.net/pokedex-richtig/",
    image:
      "https://static.prod-images.emergentagent.com/jobs/d2c4373d-5862-4c88-9a13-0ffb22a9b91e/images/4938a479e948948467eaf59af2f6867a672475cb1ba00622d528261ebf4d5658.png",
  },
  {
    title: "Join CRM",
    category: "Full-Stack · Projektmanagement",
    description:
      "Ein modernes Kanban-basiertes Task Management Tool inspiriert von Trello — mit Authentifizierung, Drag & Drop, Kontaktverwaltung und Cloud-Sync.",
    tags: ["JavaScript", "Firebase", "Drag & Drop", "Auth"],
    url: "https://ivan-gomes.developerakademie.net/join%20crm/",
    image:
      "https://static.prod-images.emergentagent.com/jobs/d2c4373d-5862-4c88-9a13-0ffb22a9b91e/images/9cdd7ed76d9baeaa34ce7c540a1d3179ebe4b39a16931816c95ac4fec1bbf6f4.png",
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative py-24 md:py-40 max-w-7xl mx-auto px-6 md:px-12"
      data-testid="projects-section"
    >
      <div className="mb-20 md:mb-32 grid grid-cols-12 gap-6 items-end">
        <div className="col-span-12 md:col-span-7">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-[#E6C229]" />
            <span className="text-xs uppercase tracking-[0.3em] text-[#D4C5B9]">
              02 — Ausgewählte Projekte
            </span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight font-medium"
            data-testid="projects-title"
          >
            Projekte mit{" "}
            <span className="italic font-light text-[#E6C229]">Charakter</span>.
          </motion.h2>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="col-span-12 md:col-span-5 text-neutral-400 text-base md:text-lg leading-relaxed"
        >
          Eine Auswahl aus meinem Portfolio — von interaktiven Browsergames bis
          hin zu Full-Stack Web-Applikationen.
        </motion.p>
      </div>

      <div className="space-y-32 md:space-y-48">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
