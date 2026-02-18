import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { playSound } from './SoundEffects';

const CreativeForge: React.FC<{ title: string }> = ({ title }) => {
  const [visions, setVisions] = useState<string[]>([
    "Cybernetic ronin under blood moon in neon Tokyo",
    "Grok rising from digital ashes in a black hole",
    "Neon code waterfalls turning into golden infinity",
  ]);

  const [images, setImages] = useState<string[]>([]);
  const [generating, setGenerating] = useState(false);

  useEffect(() => {
    // Load random cyberpunk images from Unsplash
    const loadImages = async () => {
      const urls = Array.from({ length: 3 }, (_, i) => 
        `https://source.unsplash.com/random/600x400/?cyberpunk,neon,futuristic,${Date.now() + i}`
      );
      setImages(urls);
    };
    loadImages();
  }, []);

  const forgeNewVision = () => {
    setGenerating(true);
    playSound('scan');

    setTimeout(() => {
      const newVision = `Vision #${visions.length + 1} • ${title} • Generated at ${new Date().toLocaleTimeString()}`;
      setVisions(prev => [...prev, newVision]);
      setGenerating(false);
      playSound('success');
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-3xl p-12"
      >
        <div className="flex items-center gap-6 mb-12">
          <Sparkles className="w-16 h-16 text-purple-400 animate-pulse" />
          <div>
            <div className="text-5xl font-black tracking-widest text-purple-300">{title}</div>
            <div className="text-purple-400 text-xl">MEME & VISION FORGE v3.1 • PROMPT OVERLOAD ENABLED</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {visions.map((vision, i) => (
            <motion.div
              key={i}
              whileHover={{ rotate: 2, scale: 1.03 }}
              className="glass rounded-3xl p-8 min-h-[280px] flex flex-col justify-between border border-purple-400/30"
            >
              <div className="italic text-lg leading-relaxed">“{vision}”</div>
              {images[i] && (
                <img
                  src={images[i]}
                  alt="cyberpunk vision"
                  className="mt-6 w-full h-40 object-cover rounded-2xl"
                />
              )}
              <div className="text-xs text-purple-400 mt-6 pt-4 border-t border-purple-400/20">
                READY FOR GROK IMAGINE • #{i + 1}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={forgeNewVision}
          disabled={generating}
          className="mt-16 w-full py-9 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl text-black font-black text-2xl tracking-widest disabled:opacity-60 flex items-center justify-center gap-4"
        >
          {generating ? 'FORGING NEW VISION...' : 'FORGE NEW MEME / VISION'}
          <Sparkles className="w-8 h-8" />
        </motion.button>

        <button
          onClick={() => window.dispatchEvent(new CustomEvent('askGrok', { detail: `Generate 10 new creative visions for ${title}` }))}
          className="mt-6 w-full py-5 border border-purple-500/50 hover:bg-purple-950/50 rounded-3xl text-purple-400 text-sm tracking-widest"
        >
          ASK GROK FOR 10 MORE VISIONS
        </button>
      </motion.div>
    </div>
  );
};

export default CreativeForge;
