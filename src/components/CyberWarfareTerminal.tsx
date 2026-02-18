import React, { useState, useEffect, useRef } from 'react';
import { Terminal, AlertTriangle, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { playSound } from './SoundEffects';

const CyberWarfareTerminal: React.FC<{ title: string }> = ({ title }) => {
  const [logs, setLogs] = useState<string[]>([]);
  const [cves, setCves] = useState<any[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Matrix rain
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    canvas.width = 920;
    canvas.height = 380;
    const chars = '01アイウエオカキクケコ$@#&%★◆■▲';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.09)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };
    const int = setInterval(draw, 32);
    return () => clearInterval(int);
  }, []);

  // Real CVEs + logs
  useEffect(() => {
    const fetchCVEs = async () => {
      try {
        const res = await fetch('https://cve.circl.lu/api/last');
        const data = await res.json();
        setCves(data.slice(0, 12));
        setLogs(data.slice(0, 8).map((c: any) => `[${new Date().toLocaleTimeString()}] ${c.id} - ${c.summary?.slice(0, 80)}...`));
        playSound('scan');
      } catch {
        setLogs(["[API OFFLINE] Simulated threat feed active"]);
      }
    };
    fetchCVEs();
    const interval = setInterval(fetchCVEs, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass rounded-3xl overflow-hidden border border-red-500/60 shadow-2xl"
      >
        <div className="bg-black px-6 py-4 flex items-center gap-4 border-b border-red-500">
          <Terminal className="text-red-400" />
          <div className="font-mono text-red-400 tracking-widest text-lg">WARFARE CORE // {title}</div>
        </div>

        <canvas ref={canvasRef} className="w-full block" />

        <div className="h-72 bg-black/95 p-6 font-mono text-green-400 text-sm overflow-y-auto border-t border-red-500/40 scanlines">
          {logs.map((log, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-1">{log}</motion.div>
          ))}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { playSound('launch'); window.dispatchEvent(new CustomEvent('askGrok', { detail: `Analyze latest CVEs in ${title}` })); }}
          className="absolute bottom-8 right-8 flex items-center gap-4 bg-red-600 hover:bg-red-500 px-16 py-7 rounded-3xl text-white font-black text-2xl tracking-widest neon-red"
        >
          <Zap className="w-8 h-8" /> ANALYZE LIVE THREATS
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CyberWarfareTerminal;
