import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Users, Shield, Code, Target, Brain } from 'lucide-react';
import { playSound } from './SoundEffects';

const agents = [
  { id: 'hack', name: 'HACK AGENT', color: 'red', icon: Zap },
  { id: 'code', name: 'CODE AGENT', color: 'cyan', icon: Code },
  { id: 'survival', name: 'SURVIVAL AGENT', color: 'emerald', icon: Shield },
  { id: 'truth', name: 'TRUTH AGENT', color: 'purple', icon: Brain },
  { id: 'finance', name: 'FINANCE AGENT', color: 'amber', icon: Target },
  { id: 'recon', name: 'RECON AGENT', color: 'rose', icon: Users },
];

const AIAgentSwarm: React.FC = () => {
  const [tasks, setTasks] = useState<Record<string, string>>({});
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [swarmThinking, setSwarmThinking] = useState(false);

  const taskAgent = (agentId: string, task: string) => {
    setTasks(prev => ({ ...prev, [agentId]: task }));
    setResponses(prev => ({ ...prev, [agentId]: 'Thinking...' }));
    playSound('scan');

    // Simulated Grok response (in real app, call Grok API here)
    setTimeout(() => {
      setResponses(prev => ({
        ...prev,
        [agentId]: `AGENT ${agentId.toUpperCase()} REPORT: ${task} → EXECUTED WITH MAXIMUM TRUTH.`
      }));
    }, 1200);
  };

  const swarmMode = () => {
    setSwarmThinking(true);
    Object.keys(tasks).forEach(id => {
      if (tasks[id]) taskAgent(id, tasks[id]);
    });
    setTimeout(() => setSwarmThinking(false), 2800);
  };

  return (
    <div className="max-w-7xl mx-auto glass rounded-3xl p-12">
      <div className="text-center mb-12">
        <div className="text-7xl font-black tracking-[12px] bg-clip-text text-transparent bg-gradient-to-r from-red-400 to-cyan-400">AI AGENT SWARM</div>
        <div className="text-emerald-400 text-2xl">6 AUTONOMOUS NODES • COLLABORATIVE EXECUTION</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map(agent => {
          const Icon = agent.icon;
          return (
            <motion.div key={agent.id} className="glass rounded-3xl p-8 border border-cyan-500/30" whileHover={{ scale: 1.02 }}>
              <div className={`flex items-center gap-4 mb-6 text-${agent.color}-400`}>
                <Icon className="w-10 h-10" />
                <div className="font-black text-2xl">{agent.name}</div>
              </div>
              <input
                type="text"
                placeholder="Task this agent..."
                onChange={e => setTasks(prev => ({ ...prev, [agent.id]: e.target.value }))}
                className="w-full bg-slate-950 border border-cyan-500/30 rounded-2xl p-5 font-mono mb-6"
              />
              <button
                onClick={() => taskAgent(agent.id, tasks[agent.id] || 'Analyze current situation')}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl text-black font-bold"
              >
                TASK AGENT
              </button>
              <AnimatePresence>
                {responses[agent.id] && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-6 bg-black rounded-2xl font-mono text-sm text-emerald-400">
                    {responses[agent.id]}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        onClick={swarmMode}
        disabled={swarmThinking}
        className="mt-12 w-full py-8 bg-gradient-to-r from-red-600 via-purple-600 to-cyan-600 rounded-3xl text-3xl font-black tracking-widest flex items-center justify-center gap-6 disabled:opacity-70"
      >
        {swarmThinking ? 'SWARM EXECUTING...' : 'ACTIVATE FULL SWARM MODE'}
        <Zap className="w-10 h-10" />
      </motion.button>
    </div>
  );
};

export default AIAgentSwarm;
