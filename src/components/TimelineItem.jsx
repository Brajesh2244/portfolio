import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

function TimelineItem({ item }) {
  return (
    <motion.article
      className="timeline-item reveal"
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.66 }}
    >
      <div className="timeline-node" />
      <div className="glass-panel">
        <div className="flex flex-col justify-between gap-2 border-b border-white/10 pb-5 sm:flex-row">
          <div>
            <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
            <p className="mt-2 text-electric">{item.organization}</p>
          </div>
          <span className="h-fit border border-neon/40 bg-neon/10 px-3 py-1 text-sm text-white/74">{item.meta}</span>
        </div>
        {item.summary ? <p className="mt-5 text-base leading-7 text-white/66">{item.summary}</p> : null}
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {item.points.map((point) => (
            <li key={point} className="flex gap-3 text-sm leading-6 text-white/68">
              <CheckCircle2 className="mt-1 shrink-0 text-mint" size={16} />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
}

export default TimelineItem;
