import React from 'react';
import { motion } from 'framer-motion';

const timelineEvents = [
  { date: "Oct 28, 2017", event: "First Q post on 4chan (/pol/ board)", source: "https://en.wikipedia.org/wiki/QAnon" },
  { date: "Nov 2017", event: "Q drops increase, Pizzagate connections alleged", source: "https://en.wikipedia.org/wiki/Pizzagate_conspiracy_theory" },
  { date: "2018", event: "QAnon spreads to mainstream social media", source: "https://en.wikipedia.org/wiki/QAnon" },
  { date: "Jul 2018", event: "Trump rally chants 'QAnon'", source: "https://en.wikipedia.org/wiki/QAnon" },
  { date: "2019", event: "Q posts slow down, followers interpret drops", source: "https://en.wikipedia.org/wiki/QAnon" },
  { date: "Jan 6, 2021", event: "Capitol riot participants include QAnon believers", source: "https://en.wikipedia.org/wiki/2021_United_States_Capitol_attack" },
  { date: "2021–2025", event: "QAnon evolves into broader conspiracy networks", source: "https://en.wikipedia.org/wiki/QAnon" },
  // Add more public-sourced entries as needed
];

const QAnonTimeline: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto glass rounded-3xl p-12">
      <div className="text-6xl font-black tracking-widest text-red-400 text-center mb-16">QANON TIMELINE</div>
      <div className="space-y-16 relative before:absolute before:left-8 before:top-0 before:h-full before:w-0.5 before:bg-red-500/30">
        {timelineEvents.map((e, i) => (
          <motion.div key={i} className="relative pl-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="absolute left-0 top-3 w-16 h-16 rounded-full border-4 border-red-500 bg-black flex items-center justify-center font-black text-xl">{e.date}</div>
            <div className="text-xl font-medium">{e.event}</div>
            <a href={e.source} target="_blank" className="text-xs text-red-400 hover:underline">PUBLIC SOURCE →</a>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QAnonTimeline;
