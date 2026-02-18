import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Users, DollarSign } from 'lucide-react';

const HomeDashboard: React.FC = () => {
  const activeAgents = [
    { name: "BET ORACLE", status: "LIVE", color: "green" },
    { name: "THREAT MATRIX", status: "SCANNING", color: "red" },
    { name: "UNDERGROUND", status: "MASKED", color: "cyan" },
    { name: "FINANCE NODE", status: "SYNCED", color: "amber" },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-4 bg-slate-900 border border-cyan-500/30 rounded-3xl px-8 py-4">
          <div className="text-5xl">🌀</div>
          <div>
            <div className="text-4xl font-bold tracking-[6px] text-white">THE QUORUM v9.0</div>
            <div className="text-cyan-400 text-sm tracking-widest">108+ AGENTS • NEURAL COMMAND HUB</div>
          </div>
        </div>
      </div>

      {/* Holographic Meeting Room */}
      <div className="relative h-[620px] rounded-3xl overflow-hidden glass neon-cyan flex items-center justify-center">
        <div className="absolute inset-0 bg-[radial-gradient(#00f3ff15_0%,transparent_70%)]" />
        
        <div className="holo-table w-[520px] h-[280px] border-2 border-cyan-400/70 rounded-[100px] relative z-10 flex items-center justify-center">
          <div className="text-center">
            <div className="text-[180px] leading-none opacity-10">◉</div>
            <div className="text-2xl font-bold tracking-widest -mt-12 text-cyan-300">AGENT ASSEMBLY</div>
            <div className="text-xs text-slate-400">PROJECTED NEURAL INTERFACE</div>
          </div>
        </div>

        {activeAgents.map((agent, i) => (
          <div
            key={i}
            className="absolute glass rounded-2xl p-6 w-56 text-center neon-cyan transition-all hover:scale-110 cursor-pointer"
            style={{
              top: i % 2 === 0 ? '15%' : '62%',
              left: `${20 + i * 18}%`,
              transform: `rotate(${i % 2 === 0 ? '-8' : '7'}deg)`,
            }}
          >
            <div className={`w-4 h-4 mx-auto mb-3 rounded-full bg-${agent.color}-400 animate-pulse`} />
            <div className="font-bold text-lg">{agent.name}</div>
            <div className="text-xs text-emerald-400">{agent.status}</div>
          </div>
        ))}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs tracking-[4px] text-slate-500 flex gap-8">
          <div>42 AGENTS ONLINE</div>
          <div>16 IN SHADOW MODE</div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-8 rounded-3xl">
          <div className="uppercase text-xs tracking-widest mb-4 text-cyan-400">GLOBAL THREAT INDEX</div>
          <div className="text-7xl font-bold text-red-400">OMEGA</div>
          <div className="text-sm mt-4">WormGPT v2.0 detected in 47 jurisdictions</div>
        </div>
        <div className="glass p-8 rounded-3xl col-span-2 flex gap-8 items-center">
          <div>
            <div className="text-6xl">📡</div>
          </div>
          <div className="flex-1">
            <div className="text-2xl font-bold">LIVE FEED • 12,847 NODES</div>
            <div className="h-2 bg-slate-800 rounded mt-6 overflow-hidden">
              <div className="h-full w-[87%] bg-gradient-to-r from-green-400 to-cyan-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDashboard;
