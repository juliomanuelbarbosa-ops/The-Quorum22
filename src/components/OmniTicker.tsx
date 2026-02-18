import React, { useState, useEffect } from 'react';
import { ArrowRight, Volume2, Newspaper, Music, Radio } from 'lucide-react';

const OmniTicker: React.FC = () => {
  const [mode, setMode] = useState<'crypto' | 'stocks' | 'spaces' | 'news' | 'music' | 'threats'>('crypto');
  const [tickerData, setTickerData] = useState<string[]>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (mode === 'crypto') {
      setTickerData(["BTC $92,847 ▲3.2%", "ETH $3,284 ▼1.1%", "SOL $148.9 ▲4.8%"]);
      interval = setInterval(() => setTickerData(prev => [...prev.slice(1), `XAI $${(Math.random()*2+0.5).toFixed(2)} ▲${(Math.random()*10).toFixed(1)}%`]), 3000);
    } else if (mode === 'stocks') {
      setTickerData(["NVDA $141 ↑4.8%", "TSLA $248 ↓1.2%", "AAPL $228 ↑0.9%"]);
    } else if (mode === 'spaces') {
      setTickerData(["Elon Musk: Mars Update • 47k listening", "Vitalik Roadmap • 12k listening"]);
    } else if (mode === 'news') {
      setTickerData(["BREAKING: xAI Grok-4 released", "Cyber attack on 14 banks"]);
    } else if (mode === 'music') {
      setTickerData(["Neon Blade - 1.2M plays • Clone now", "Cyberpunk OST Remix - Live"]);
    } else if (mode === 'threats') {
      setTickerData(["WormGPT v3 detected", "CVSS 9.8 CVE today"]);
    }

    return () => clearInterval(interval);
  }, [mode]);

  return (
    <div className="flex-1 overflow-hidden bg-slate-900 border border-cyan-500/30 rounded-full h-9 flex items-center relative">
      <div className="flex gap-1 px-2 absolute left-0 z-10">
        {[
          { id: 'crypto', label: 'CRYPTO' },
          { id: 'stocks', label: 'STOCKS' },
          { id: 'spaces', label: 'SPACES' },
          { id: 'news', label: 'NEWS' },
          { id: 'music', label: 'MUSIC', icon: Music },
          { id: 'threats', label: 'THREATS', icon: Radio },
        ].map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id as any)}
            className={`px-4 py-1 text-xs rounded-full transition-all flex items-center gap-1.5 ${mode === m.id ? 'bg-cyan-500 text-black font-bold' : 'hover:bg-slate-800'}`}
          >
            {m.icon ? <m.icon size={14} /> : null} {m.label}
          </button>
        ))}
      </div>

      <div className="overflow-hidden flex-1 pl-80 pr-8">
        <div className="flex whitespace-nowrap animate-marquee text-sm font-medium text-cyan-300">
          {tickerData.map((item, i) => (
            <span key={i} className="mx-8">{item} <ArrowRight className="inline w-3 h-3" /></span>
          ))}
          {tickerData.map((item, i) => (
            <span key={`dup-${i}`} className="mx-8">{item} <ArrowRight className="inline w-3 h-3" /></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OmniTicker;
