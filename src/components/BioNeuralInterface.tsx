import React from 'react';
import { motion } from 'framer-motion';

const BioNeuralInterface: React.FC<{ title: string }> = ({ title }) => (
  <div className="max-w-5xl mx-auto">
    <motion.div
      initial={{ scale: 0.92 }}
      animate={{ scale: 1 }}
      className="glass rounded-3xl overflow-hidden relative h-[680px] flex items-center justify-center neon-green"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#00ff4120_0%,transparent_70%)]" />

      <div className="relative z-10 text-center">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 3.5, repeat: Infinity }}
          className="text-9xl mb-10"
        >
          🧬
        </motion.div>
        <div className="text-7xl font-black tracking-[10px] text-emerald-300">{title}</div>
        <div className="text-2xl text-emerald-400 mt-4">NEURAL LACE ONLINE • CONSCIOUSNESS SYNC 99.8%</div>
      </div>

      <motion.button
        whileHover={{ scale: 1.08 }}
        onClick={() => window.dispatchEvent(new CustomEvent('askGrok', { detail: `Merge with ${title} neural core` }))}
        className="absolute bottom-16 px-24 py-8 bg-emerald-500 rounded-3xl text-black font-black text-2xl tracking-widest hover:neon-green"
      >
        ACTIVATE FULL LACE
      </motion.button>
    </motion.div>
  </div>
);

export default BioNeuralInterface;
