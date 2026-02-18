import React from 'react';
import { Radar, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const IntelReconHub: React.FC<{ title: string }> = ({ title }) => (
  <div className="max-w-5xl mx-auto">
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="glass rounded-3xl p-12 relative overflow-hidden neon-cyan h-[660px] flex flex-col"
    >
      <div className="text-center mb-16">
        <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }}>
          <Radar className="mx-auto w-28 h-28 text-cyan-400" />
        </motion.div>
        <div className="text-6xl font-black tracking-[8px] mt-8 text-white">{title}</div>
        <div className="text-emerald-400 mt-3 text-2xl">GLOBAL RECON NETWORK • 14,872 NODES LIVE</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -6, scale: 1.02 }}
            className="glass p-8 rounded-3xl flex items-start gap-6 border border-cyan-400/30"
          >
            <div className="w-6 h-6 rounded-full bg-cyan-400 animate-ping mt-1" />
            <div>
              <div className="font-mono text-xl">TARGET-{10000 + i * 137}</div>
              <div className="text-slate-400 text-sm mt-2">SIGNAL: 99.4% • MASKED • ACTIVE</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.04 }}
        onClick={() => window.dispatchEvent(new CustomEvent('askGrok', { detail: `Full recon sweep on ${title}` }))}
        className="mt-auto w-full py-8 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl text-black font-black text-2xl tracking-widest flex items-center justify-center gap-4"
      >
        <Zap /> SWEEP ENTIRE GRID
      </motion.button>
    </motion.div>
  </div>
);

export default IntelReconHub;
