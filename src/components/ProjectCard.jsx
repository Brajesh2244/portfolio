import { useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, ExternalLink, Github, Layers3, Orbit, Play, Target } from "lucide-react";

function ProjectCard({ project, delay = 0 }) {
  const videoRef = useRef(null);
  const accentClass = project.accent === "neon" ? "text-neon border-neon/40 bg-neon/10" : "text-electric border-electric/40 bg-electric/10";

  const handlePlayVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
      videoRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <motion.article
      className="project-card reveal group"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay, duration: 0.7 }}
      whileHover={{ y: -6 }}
    >
      {project.embedUrl ? (
        <div className="relative mb-6 overflow-hidden rounded-lg border border-electric/40 bg-black/90 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-3.5 py-2.5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-electric">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-electric opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-electric" />
              </span>
              Loom Video Walkthrough
            </span>
            <span className="rounded border border-white/15 bg-white/[0.05] px-2 py-0.5 text-[11px] font-mono text-white/70">
              FashionStore Demo
            </span>
          </div>

          <div className="relative aspect-video w-full bg-black">
            <iframe
              src={project.embedUrl}
              title={project.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              webkitallowfullscreen="true"
              mozallowfullscreen="true"
              allowFullScreen
              className="h-full w-full border-0 bg-black"
            />
          </div>

          <div className="flex items-center justify-between border-t border-white/10 bg-black/60 px-3.5 py-2 text-xs">
            <span className="text-white/60">Live Walkthrough & Architecture</span>
            <span className="font-semibold text-electric">{project.outcome}</span>
          </div>
        </div>
      ) : project.videoUrl ? (
        <div className="relative mb-6 overflow-hidden rounded-lg border border-neon/30 bg-black/90 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-3.5 py-2.5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold text-mint">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              Demo Walkthrough Video
            </span>
            <span className="rounded border border-white/15 bg-white/[0.05] px-2 py-0.5 text-[11px] font-mono text-white/70">
              FoodieHub MP4
            </span>
          </div>

          <div className="relative aspect-video w-full bg-black">
            <video
              ref={videoRef}
              controls
              playsInline
              preload="metadata"
              className="h-full w-full object-contain bg-black"
            >
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 bg-black/60 px-3.5 py-2 text-xs">
            <span className="text-white/60">Full-Stack Application Flow</span>
            <span className="font-semibold text-neon">{project.outcome}</span>
          </div>
        </div>
      ) : (
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
      )}

      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-white/45">{project.eyebrow}</p>
          <h3 className="mt-1 font-display text-lg sm:text-xl font-semibold">{project.title}</h3>
        </div>
        <Layers3 className="shrink-0 text-electric" size={20} />
      </div>
      <p className="text-sm leading-6 text-white/70">{project.description}</p>
      <div className="mt-4 border border-white/10 bg-white/[0.035] p-3.5">
        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-electric">
          <Target size={14} />
          Overview
        </div>
        <p className="text-xs sm:text-sm leading-5 sm:leading-6 text-white/65">{project.overview}</p>
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
        {project.embedUrl ? (
          <>
            <a
              href={project.loomUrl || project.embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button compact"
            >
              <ExternalLink size={16} />
              Watch on Loom
            </a>
          </>
        ) : project.videoUrl ? (
          <>
            <button
              type="button"
              onClick={handlePlayVideo}
              className="primary-button compact"
            >
              <Play size={16} className="fill-current" />
              Play Video Demo
            </button>
            <a
              href={project.videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="secondary-button compact"
            >
              <ExternalLink size={16} />
              Open Video
            </a>
          </>
        ) : (
          <a href={project.liveUrl} className="primary-button compact">
            <ExternalLink size={17} />
            Live Demo
          </a>
        )}
        <a href={project.githubUrl} className="secondary-button compact">
          <Github size={17} />
          GitHub
        </a>
      </div>
    </motion.article>
  );
}

export default ProjectCard;
