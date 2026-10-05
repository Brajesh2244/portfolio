import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Github, Layers3, Orbit, Target } from "lucide-react";

function ProjectCard({ project, delay = 0 }) {
  const accentClass = project.accent === "neon" ? "text-neon border-neon/40 bg-neon/10" : "text-electric border-electric/40 bg-electric/10";

  return (
    <motion.article
      className="project-card reveal group"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ delay, duration: 0.7 }}
      whileHover={{ rotateX: 4, rotateY: -5, y: -12 }}
    >
      <div className="relative mb-7 grid min-h-56 place-items-center overflow-hidden border border-white/10 bg-black/30">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,212,255,0.12),transparent,rgba(124,58,237,0.16))]" />
        <motion.div
          className="absolute h-36 w-36 border border-electric/40"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        />
        <motion.div
          className="absolute h-24 w-24 border border-neon/45"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
        />
        <div className={`relative z-10 grid h-20 w-20 place-items-center border ${accentClass}`}>
          <Orbit size={34} />
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border border-white/10 bg-black/45 px-4 py-3 backdrop-blur-xl">
          <span className="text-xs uppercase tracking-[0.22em] text-white/54">{project.outcomeLabel || "Architecture"}</span>
          <strong className="font-display text-xl text-white">{project.outcome}</strong>
        </div>
      </div>
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.32em] text-white/42">{project.eyebrow}</p>
          <h3 className="mt-2 font-display text-2xl font-semibold">{project.title}</h3>
        </div>
        <Layers3 className="shrink-0 text-electric" />
      </div>
      <p className="text-base leading-7 text-white/68">{project.description}</p>
      <div className="mt-6 border border-white/10 bg-white/[0.035] p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-electric">
          <Target size={16} />
          Overview
        </div>
        <p className="text-sm leading-7 text-white/66">{project.overview}</p>
      </div>
      <div className="mt-6">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white/42">Key Achievements</p>
        <ul className="grid gap-3 text-sm text-white/66">
          {project.achievements.map((achievement) => (
            <li key={achievement} className="flex gap-3">
              <CheckCircle2 className="mt-1 shrink-0 text-mint" size={16} />
              {achievement}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <p className="mb-3 text-xs uppercase tracking-[0.28em] text-white/42">Feature Modules</p>
        <div className="grid gap-2 text-sm text-white/66 sm:grid-cols-2">
          {project.features.map((feature) => (
            <span key={feature} className="border-l border-electric/50 bg-white/[0.035] px-3 py-2">
              {feature}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {project.technologies.map((technology) => (
          <span key={technology} className="skill-chip">
            {technology}
          </span>
        ))}
      </div>
      <div className="mt-7 flex flex-wrap gap-3">
        <a href={project.liveUrl} className="primary-button compact">
          <ExternalLink size={17} />
          Live Demo
        </a>
        <a href={project.githubUrl} className="secondary-button compact">
          <Github size={17} />
          GitHub
        </a>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
