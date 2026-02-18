import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ThreatMatrix: React.FC = () => {
  const [threats, setThreats] = useState([
    { name: "WormGPT", type: "Red", desc: "Uncensored LLM for malware", risk: "CRITICAL", date: "2024-11" },
    { name: "FraudGPT", type: "Red", desc: "Phishing & carding automation", risk: "HIGH", date: "2025-01" },
  ]);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="text-red-400 text-xs tracking-widest">GLOBAL ADVERSARY DATABASE</div>
          <div className="text-6xl font-bold">THREAT MATRIX</div>
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-xs uppercase tracking-widest text-slate-400">
              <th className="text-left p-6">AGENT</th>
              <th className="text-left p-6">ALIGNMENT</th>
              <th className="text-left p-6">DESCRIPTION</th>
              <th className="text-left p-6">RISK</th>
              <th className="text-right p-6">DETECTED</th>
            </tr>
          </thead>
          <tbody>
            {threats.map((t, i) => (
              <tr key={i} className="border-b border-slate-800 hover:bg-slate-950/50 transition">
                <td className="p-6 font-medium">{t.name}</td>
                <td className="p-6">
                  <span className={`inline-block px-4 py-1 text-xs rounded-full ${t.type === 'Red' ? 'bg-red-950 text-red-400' : 'bg-cyan-950 text-cyan-400'}`}>
                    {t.type}
                  </span>
                </td>
                <td className="p-6 text-slate-400">{t.desc}</td>
                <td className="p-6">
                  <span className={`font-mono text-sm ${t.risk === 'CRITICAL' ? 'text-red-400' : ''}`}>{t.risk}</span>
                </td>
                <td className="p-6 text-right text-xs text-slate-500">{t.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ThreatMatrix;
