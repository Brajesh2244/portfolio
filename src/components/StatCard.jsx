import { motion } from "framer-motion";

function StatCard({ label, value, caption, delay = 0 }) {
  return (
    <motion.div
      className="glass-panel reveal group overflow-hidden"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.45 }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
    >
      <div className="absolute left-0 top-0 h-px w-full bg-holo-line opacity-60" />
      <p className="font-display text-5xl font-bold text-white">{value}</p>
      <h3 className="mt-3 text-sm uppercase tracking-[0.28em] text-electric">{label}</h3>
      <p className="mt-4 text-sm leading-6 text-white/58">{caption}</p>
    </motion.div>
  );
}

export default StatCard;
