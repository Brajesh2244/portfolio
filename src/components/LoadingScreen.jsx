import { motion } from "framer-motion";

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-void text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.18),transparent_36%),radial-gradient(circle_at_70%_35%,rgba(124,58,237,0.2),transparent_30%)]" />
      <motion.div
        className="relative flex flex-col items-center"
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="relative h-24 w-24">
          <motion.div
            className="absolute inset-0 border border-electric"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-4 border border-neon"
            animate={{ rotate: -360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          />
          <div className="absolute inset-8 bg-electric shadow-glow" />
        </div>
        <p className="mt-7 font-display text-sm uppercase tracking-[0.45em] text-white/70">Initializing Command Center</p>
        <div className="mt-5 h-1 w-72 overflow-hidden bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-electric via-mint to-neon"
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ repeat: Infinity, duration: 1.1, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
}

export default LoadingScreen;
