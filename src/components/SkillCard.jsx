import { motion } from "framer-motion";
import { Cpu, RadioTower } from "lucide-react";

function SkillCard({ group, delay = 0 }) {
  return (
    <motion.article
      className="skill-dashboard reveal group"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ delay, duration: 0.64 }}
      whileHover={{ y: -10, rotateX: 5, rotateY: 3 }}
    >
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-electric">{group.signal}</p>
          <h3 className="mt-1.5 font-display text-lg sm:text-xl font-semibold">{group.title}</h3>
          <p className="mt-2 text-xs sm:text-sm leading-5 sm:leading-6 text-white/60">{group.description}</p>
        </div>
        <span className="grid h-10 w-10 place-items-center border border-white/10 bg-white/[0.06] text-electric transition group-hover:border-electric group-hover:shadow-glow">
          <Cpu size={20} />
        </span>
      </div>
      <div className="space-y-4">
        {group.skills.map((skill) => (
          <div key={skill.name} className="tech-row">
            <div className="mb-2 flex items-center justify-between gap-4 text-sm">
              <span className="flex items-center gap-2 font-semibold text-white/82">
                <RadioTower size={15} className="text-mint" />
                {skill.name}
              </span>
              <span className="text-electric">{skill.level}%</span>
            </div>
            <div className="h-2 overflow-hidden bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-electric via-mint to-neon"
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: delay + 0.15 }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.article>
  );
}

export default SkillCard;
