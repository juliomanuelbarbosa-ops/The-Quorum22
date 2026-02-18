import React, { useState, useEffect } from 'react';
import { Play, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const BetOracle: React.FC = () => {
  const [sport, setSport] = useState('soccer');
  const [loading, setLoading] = useState(false);
  const [predictions, setPredictions] = useState<any[]>([]);

  useEffect(() => {
    // Simulated real-time sports data fetch
    const fetchMatches = async () => {
      // In real app, use TheSportsDB API here
      setPredictions([
        { match: "Man City vs Arsenal", pick: "Over 2.5 Goals", conf: 94, odds: "1.78" },
        { match: "Liverpool vs Chelsea", pick: "BTTS Yes", conf: 89, odds: "1.65" },
      ]);
    };
    fetchMatches();
  }, []);

  const runPrediction = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto glass rounded-3xl p-10">
      <div className="flex justify-between items-center mb-12">
        <div>
          <div className="uppercase tracking-[3px] text-xs text-amber-400">BLACK OPS DIVISION</div>
          <div className="text-5xl font-bold">BET ORACLE v3.1</div>
        </div>
        <Trophy className="w-16 h-16 text-amber-400" />
      </div>

      <div className="flex gap-4 mb-8">
        {['soccer', 'nba', 'nfl'].map(s => (
          <button
            key={s}
            onClick={() => setSport(s)}
            className={`flex-1 py-4 text-sm font-medium rounded-2xl transition ${sport === s ? 'bg-amber-500 text-black' : 'bg-slate-800 hover:bg-slate-700'}`}
          >
            {s.toUpperCase()}
          </button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.03 }}
        onClick={runPrediction}
        disabled={loading}
        className="w-full py-6 bg-gradient-to-r from-amber-500 to-yellow-400 text-black font-bold text-xl tracking-widest rounded-2xl flex items-center justify-center gap-3 disabled:opacity-70"
      >
        <Play className="w-6 h-6" /> SCAN FOR BANKERS
      </motion.button>

      {loading && <div className="mt-10 text-center text-cyan-400 text-xl animate-pulse">ALGORITHM SCANNING...</div>}

      {predictions.length > 0 && (
        <div className="mt-12 space-y-6">
          {predictions.map((p, i) => (
            <div key={i} className="glass p-6 rounded-2xl border border-amber-400/30">
              <div className="flex justify-between">
                <div className="text-xl">{p.match}</div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-amber-400">{p.pick}</div>
                  <div className="text-xs text-slate-400">ODDS {p.odds}</div>
                </div>
              </div>
              <div className="mt-6 h-3 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-emerald-400" style={{ width: `${p.conf}%` }} />
              </div>
              <div className="flex justify-between text-xs mt-1 text-slate-400">
                <span>CONFIDENCE</span>
                <span>{p.conf}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BetOracle;
