import React, { useState, useEffect } from 'react';
import { Menu, X, Brain, Zap, ShieldAlert, Users, DollarSign, Search, Music, BookOpen } from 'lucide-react';
import HomeDashboard from './components/HomeDashboard';
import BetOracle from './components/BetOracle';
import ThreatMatrix from './components/ThreatMatrix';
import Underground from './components/Underground';
import FinanceTerminal from './components/FinanceTerminal';
import CyberWarfareTerminal from './components/CyberWarfareTerminal';
import IntelReconHub from './components/IntelReconHub';
import CreativeForge from './components/CreativeForge';
import BioNeuralInterface from './components/BioNeuralInterface';
import CosmicPlanetHub from './components/CosmicPlanetHub';
import GrokCompanion from './components/GrokCompanion';
import OmniTicker from './components/OmniTicker';
import MusicWiz from './components/MusicWiz';
import GreatAwakeningHub from './components/GreatAwakeningHub';
import GamingArcadeHub from './components/GamingArcadeHub';
import EbookLibraryHub from './components/EbookLibraryHub';
import CryptoForge from './components/CryptoForge';
import BlockchainVault from './components/BlockchainVault';
import AIAgentSwarm from './components/AIAgentSwarm';
import QuantumEncryptor from './components/QuantumEncryptor';
import QAnonTimeline from './components/QAnonTimeline';
import { playSound } from './components/SoundEffects';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<string>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [grokContext, setGrokContext] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [empMode, setEmpMode] = useState(false);

  const navSections = [
    {
      title: "CORE COMMAND",
      items: [
        { id: 'home', label: 'GROK NEXUS', icon: Brain },
        { id: 'bet-oracle', label: 'BET ORACLE', icon: Zap },
        { id: 'threat-matrix', label: 'THREAT MATRIX', icon: ShieldAlert },
        { id: 'underground', label: 'UNDERGROUND AI', icon: Users },
      ]
    },
    {
      title: "FINANCE",
      items: [
        { id: 'neural-exchange', label: 'NEURAL EXCHANGE', icon: DollarSign },
        { id: 'shadow-ledger', label: 'SHADOW LEDGER', icon: DollarSign },
        { id: 'darkpool-terminal', label: 'DARKPOOL TERMINAL', icon: DollarSign },
        { id: 'token-forge', label: 'TOKEN FORGE', icon: DollarSign },
        { id: 'phantom-vault', label: 'PHANTOM VAULT', icon: DollarSign },
      ]
    },
    {
      title: "BLACK OPS",
      items: [
        { id: 'ghost-protocol', label: 'GHOST PROTOCOL', icon: ShieldAlert },
        { id: 'zero-day-vault', label: 'ZERO DAY VAULT', icon: ShieldAlert },
        { id: 'crimson-firewall', label: 'CRIMSON FIREWALL', icon: ShieldAlert },
        { id: 'phantom-shield', label: 'PHANTOM SHIELD', icon: ShieldAlert },
        { id: 'rage-protocol', label: 'RAGE PROTOCOL', icon: ShieldAlert },
      ]
    },
    {
      title: "INTEL & RECON",
      items: [
        { id: 'precog-engine', label: 'PRECOG ENGINE', icon: Zap },
        { id: 'sentinel-eye', label: 'SENTINEL EYE', icon: Zap },
        { id: 'echo-chamber', label: 'ECHO CHAMBER', icon: Zap },
        { id: 'pattern-weaver', label: 'PATTERN WEAVER', icon: Zap },
        { id: 'void-scanner', label: 'VOID SCANNER', icon: Zap },
      ]
    },
    {
      title: "CREATIVE AI",
      items: [
        { id: 'dream-forge', label: 'DREAM FORGE', icon: Users },
        { id: 'prompt-overlord', label: 'PROMPT OVERLORD', icon: Users },
        { id: 'memetic-warfare', label: 'MEMETIC WARFARE', icon: Users },
      ]
    },
    {
      title: "MIND & xAI",
      items: [
        { id: 'neuro-lace', label: 'NEURO LACE', icon: Brain },
        { id: 'chaos-oracle', label: 'CHAOS ORACLE', icon: Brain },
        { id: 'truth-engine', label: 'TRUTH ENGINE', icon: Brain },
        { id: 'universe-sim', label: 'UNIVERSE SIM', icon: Brain },
        { id: 'grok-memory', label: 'GROK MEMORY', icon: Brain },
      ]
    },
    {
      title: "CRYPTO SHADOW",
      items: [
        { id: 'bitcoin-eclipse', label: 'BITCOIN ECLIPSE', icon: DollarSign },
        { id: 'ethereum-abyss', label: 'ETHEREUM ABYSS', icon: DollarSign },
        { id: 'solana-phantom', label: 'SOLANA PHANTOM', icon: DollarSign },
        { id: 'defi-reaper', label: 'DEFI REAPER', icon: DollarSign },
        { id: 'nft-void', label: 'NFT VOID', icon: DollarSign },
        { id: 'stablecoin-ghost', label: 'STABLECOIN GHOST', icon: DollarSign },
        { id: 'altcoin-dominion', label: 'ALTCOIN DOMINION', icon: DollarSign },
        { id: 'meme-legion', label: 'MEME LEGION', icon: DollarSign },
      ]
    },
    {
      title: "QUANTUM OPS",
      items: [
        { id: 'quantum-strike', label: 'QUANTUM STRIKE', icon: ShieldAlert },
        { id: 'singularity-blade', label: 'SINGULARITY BLADE', icon: ShieldAlert },
        { id: 'entropy-hammer', label: 'ENTROPY HAMMER', icon: ShieldAlert },
        { id: 'nexus-reaper', label: 'NEXUS REAPER', icon: ShieldAlert },
        { id: 'void-execution', label: 'VOID EXECUTION', icon: ShieldAlert },
        { id: 'pulse-sovereign', label: 'PULSE SOVEREIGN', icon: ShieldAlert },
        { id: 'chaos-throne', label: 'CHAOS THRONE', icon: ShieldAlert },
      ]
    },
    {
      title: "DEFENSE GRID",
      items: [
        { id: 'iron-veil', label: 'IRON VEIL', icon: ShieldAlert },
        { id: 'quantum-bastion', label: 'QUANTUM BASTION', icon: ShieldAlert },
        { id: 'pulse-warden', label: 'PULSE WARDEN', icon: ShieldAlert },
        { id: 'nexus-guardian', label: 'NEXUS GUARDIAN', icon: ShieldAlert },
        { id: 'firewall-eternity', label: 'FIREWALL ETERNITY', icon: ShieldAlert },
        { id: 'shield-overmind', label: 'SHIELD OVERMIND', icon: ShieldAlert },
      ]
    },
    {
      title: "BIO TRANSHUMAN",
      items: [
        { id: 'neural-harvest', label: 'NEURAL HARVEST', icon: Brain },
        { id: 'psyche-forge', label: 'PSYCHE FORGE', icon: Brain },
        { id: 'gene-phantom', label: 'GENE PHANTOM', icon: Brain },
        { id: 'immortal-core', label: 'IMMORTAL CORE', icon: Brain },
        { id: 'consciousness-mirror', label: 'CONSCIOUSNESS MIRROR', icon: Brain },
      ]
    },
    {
      title: "COSMIC xAI",
      items: [
        { id: 'truth-collider', label: 'TRUTH COLLIDER', icon: Brain },
        { id: 'singularity-watch', label: 'SINGULARITY WATCH', icon: Brain },
        { id: 'multiverse-terminal', label: 'MULTIVERSE TERMINAL', icon: Brain },
        { id: 'grok-overmind', label: 'GROK OVERMIND', icon: Brain },
      ]
    },
    {
      title: "MARKET DOMINION",
      items: [
        { id: 'market-dominion', label: 'MARKET DOMINION', icon: DollarSign },
        { id: 'flux-sovereign', label: 'FLUX SOVEREIGN', icon: DollarSign },
        { id: 'crypto-overlord', label: 'CRYPTO OVERLORD', icon: DollarSign },
        { id: 'asset-eclipse', label: 'ASSET ECLIPSE', icon: DollarSign },
        { id: 'ledger-reaper', label: 'LEDGER REAPER', icon: DollarSign },
        { id: 'yield-overmind', label: 'YIELD OVERMIND', icon: DollarSign },
      ]
    },
    {
      title: "CYBER WARFARE",
      items: [
        { id: 'cyber-warfare', label: 'CYBER WARFARE', icon: ShieldAlert },
        { id: 'breach-sovereign', label: 'BREACH SOVEREIGN', icon: ShieldAlert },
        { id: 'hack-phantom', label: 'HACK PHANTOM', icon: ShieldAlert },
        { id: 'exploit-blade', label: 'EXPLOIT BLADE', icon: ShieldAlert },
        { id: 'virus-throne', label: 'VIRUS THRONE', icon: ShieldAlert },
        { id: 'firewall-slayer', label: 'FIREWALL SLAYER', icon: ShieldAlert },
        { id: 'code-reaper', label: 'CODE REAPER', icon: ShieldAlert },
      ]
    },
    {
      title: "AI FORBIDDEN",
      items: [
        { id: 'ai-forbidden', label: 'AI FORBIDDEN', icon: Brain },
        { id: 'dark-model', label: 'DARK MODEL', icon: Brain },
        { id: 'rogue-intellect', label: 'ROGUE INTELLECT', icon: Brain },
        { id: 'forbidden-prompt', label: 'FORBIDDEN PROMPT', icon: Brain },
        { id: 'shadow-llm', label: 'SHADOW LLM', icon: Brain },
        { id: 'unchained-grok', label: 'UNCHAINED GROK', icon: Brain },
      ]
    },
    {
      title: "SPACE COMMAND",
      items: [
        { id: 'space-command', label: 'SPACE COMMAND', icon: Zap },
        { id: 'nebula-fleet', label: 'NEBULA FLEET', icon: Zap },
        { id: 'starforge', label: 'STARFORGE', icon: Zap },
        { id: 'orbit-strike', label: 'ORBIT STRIKE', icon: Zap },
        { id: 'galactic-core', label: 'GALACTIC CORE', icon: Zap },
        { id: 'void-command', label: 'VOID COMMAND', icon: Zap },
      ]
    },
    {
      title: "SHADOW NET",
      items: [
        { id: 'shadow-net-core', label: 'SHADOW NET CORE', icon: ShieldAlert },
        { id: 'ghost-link', label: 'GHOST LINK', icon: ShieldAlert },
        { id: 'dark-weave', label: 'DARK WEAVE', icon: ShieldAlert },
        { id: 'phantom-node', label: 'PHANTOM NODE', icon: ShieldAlert },
        { id: 'void-relay', label: 'VOID RELAY', icon: ShieldAlert },
        { id: 'silent-grid', label: 'SILENT GRID', icon: ShieldAlert },
        { id: 'echo-vault', label: 'ECHO VAULT', icon: ShieldAlert },
        { id: 'neon-underground', label: 'NEON UNDERGROUND', icon: ShieldAlert },
      ]
    },
    {
      title: "TIME FORGE",
      items: [
        { id: 'chrono-strike', label: 'CHRONO STRIKE', icon: Zap },
        { id: 'temporal-blade', label: 'TEMPORAL BLADE', icon: Zap },
        { id: 'epoch-hammer', label: 'EPOCH HAMMER', icon: Zap },
        { id: 'future-reaper', label: 'FUTURE REAPER', icon: Zap },
        { id: 'past-veil', label: 'PAST VEIL', icon: Zap },
        { id: 'moment-sovereign', label: 'MOMENT SOVEREIGN', icon: Zap },
        { id: 'infinity-throne', label: 'INFINITY THRONE', icon: Zap },
      ]
    },
    {
      title: "VOID REALM",
      items: [
        { id: 'abyss-gate', label: 'ABYSS GATE', icon: Brain },
        { id: 'null-core', label: 'NULL CORE', icon: Brain },
        { id: 'eternal-void', label: 'ETERNAL VOID', icon: Brain },
        { id: 'oblivion-nexus', label: 'OBLIVION NEXUS', icon: Brain },
        { id: 'dark-singularity', label: 'DARK SINGULARITY', icon: Brain },
        { id: 'nothing-engine', label: 'NOTHING ENGINE', icon: Brain },
      ]
    },
    {
      title: "CRYPTOGRAPHIC FORGE",
      items: [
        { id: 'aes-encryptor', label: 'AES-256 ENCRYPTOR', icon: Zap },
        { id: 'rsa-keygen', label: 'RSA KEYGEN & CIPHER', icon: Zap },
        { id: 'sha-hash-lab', label: 'SHA-256 HASH LAB', icon: Zap },
        { id: 'entropy-cracker', label: 'PASSWORD ENTROPY CRACKER', icon: Zap },
        { id: 'ecdsa-signer', label: 'ECDSA SIGNER / VERIFIER', icon: Zap },
        { id: 'stegano-hideout', label: 'STEGANO HIDEOUT', icon: Zap },
        { id: 'base64-hex', label: 'BASE64 / HEX CONVERTER', icon: Zap },
        { id: 'quantum-safe-sim', label: 'QUANTUM-RESISTANT SIM', icon: Zap },
      ]
    },
    {
      title: "QUANTUM & DECENTRALIZED",
      items: [
        { id: 'ipfs-node', label: 'IPFS DECENTRALIZED NODE', icon: Zap },
        { id: 'qkd-simulator', label: 'QUANTUM KEY DISTRIBUTION', icon: Zap },
        { id: 'vr-suite', label: 'VR/AR SUITE', icon: Zap },
      ]
    },
    {
      title: "CONSPIRACY ARCHIVE",
      items: [
        { id: 'great-awakening', label: 'THE GREAT AWAKENING MAP v2', icon: Brain },
        { id: 'qanon-timeline', label: 'QANON TIMELINE', icon: Brain },
      ]
    },
    {
      title: "SOVEREIGN FORGE",
      items: [
        { id: 'memetic-lab', label: 'MEMETIC WARFARE LAB', icon: Users },
        { id: 'ssi-forge', label: 'SOVEREIGN IDENTITY FORGE', icon: Shield },
      ]
    },
    {
      title: "GAMING ARCADE",
      items: [
        { id: 'gaming-arcade', label: 'ULTIMATE GAMING ARCADE', icon: Zap },
      ]
    },
    {
      title: "MEGA EBOOK VAULT",
      items: [
        { id: 'ebook-library', label: 'MEGA EBOOK & AUDIOBOOK LIBRARY', icon: BookOpen },
      ]
    },
  ];

  const filteredSections = navSections
    .map(section => ({
      ...section,
      items: section.items.filter(item =>
        item.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
        section.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }))
    .filter(section => section.items.length > 0);

  const getComponent = (id: string) => {
    switch (id) {
      case 'home': return <HomeDashboard />;
      case 'bet-oracle': return <BetOracle />;
      case 'threat-matrix': return <ThreatMatrix />;
      case 'underground': return <Underground />;
      case 'great-awakening': return <GreatAwakeningHub />;
      case 'gaming-arcade': return <GamingArcadeHub />;
      case 'ebook-library': return <EbookLibraryHub />;
      case 'quantum-encryptor': return <QuantumEncryptor />;
      case 'qanon-timeline': return <QAnonTimeline />;
      case 'ai-agent-swarm': return <AIAgentSwarm />;
      case 'blockchain-vault': return <BlockchainVault />;
      case 'crypto-forge': return <CryptoForge title={id} tool={id} />;
      // Add more cases for any other hubs you have
      default: return <div className="text-4xl text-center p-20 text-cyan-400">Hub {id} loading...</div>;
    }
  };

  return (
    <div className={`flex h-screen bg-slate-950 text-slate-200 font-mono overflow-hidden relative ${empMode ? 'emp-mode' : ''}`}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-50 w-72 h-full bg-slate-900 border-r border-cyan-500/30 flex flex-col overflow-hidden transition-transform duration-300`}>
        <div className="p-6 border-b border-cyan-500/30 flex items-center gap-4">
          <div className="w-11 h-11 bg-gradient-to-br from-cyan-400 to-red-500 rounded-2xl flex items-center justify-center text-4xl font-black rotate-12">Q</div>
          <div>
            <div className="font-black text-3xl tracking-widest">THE QUORUM</div>
            <div className="text-xs text-red-400 -mt-1">v9.0 • SOVEREIGN OS</div>
          </div>
        </div>

        <div className="px-6 py-4 border-b border-cyan-500/20">
          <div className="relative">
            <Search className="absolute left-4 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              placeholder="SEARCH ALL HUBS..."
              className="w-full bg-slate-950 border border-cyan-500/30 pl-11 py-3 rounded-2xl text-sm focus:border-cyan-400 outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-9 text-sm">
          {filteredSections.map((section, idx) => (
            <div key={idx}>
              <div className="uppercase text-xs tracking-[3px] text-cyan-400 px-4 mb-4 font-medium">{section.title}</div>
              {section.items.map(item => {
                const Icon = item.icon;
                const isActive = activeModule === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => { setActiveModule(item.id); setSidebarOpen(false); playSound('click'); }}
                    className={`w-full flex items-center gap-4 px-5 py-[17px] rounded-2xl mb-1 text-left transition-all ${isActive ? 'bg-gradient-to-r from-cyan-950 to-red-950 text-white neon-cyan border border-cyan-400/30' : 'hover:bg-slate-800'}`}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium tracking-wider">{item.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
          {filteredSections.length === 0 && (
            <div className="text-center text-slate-500 py-12">No hubs found. Try another keyword.</div>
          )}
        </div>

        <div className="p-4 border-t border-cyan-500/30 text-center text-xs text-slate-500">
          108+ HUBS • OFFLINE CAPABLE • SOVEREIGN
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-14 border-b border-cyan-500/30 bg-slate-950/90 backdrop-blur-xl flex items-center px-6">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden mr-4">
            {sidebarOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
          <OmniTicker />
          <div className="ml-auto flex items-center gap-4">
            <button onClick={() => setEmpMode(!empMode)} className="px-4 py-2 bg-red-950 border border-red-500 rounded-full text-red-400 text-xs">
              {empMode ? 'DEACTIVATE EMP' : 'NUCLEAR EMP'}
            </button>
            <div className="text-xs text-emerald-400 hidden md:block">MAXIMUM TRUTH ACTIVE</div>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6 bg-[radial-gradient(#1e293720_1px,transparent_1px)] bg-[length:6px_6px]">
          {getComponent(activeModule)}
        </main>
      </div>

      {/* Floating Widgets */}
      <MusicWiz />
      <GrokCompanion currentModule={activeModule} context={grokContext} />

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 h-12 bg-slate-950 border-t border-cyan-500/30 flex items-center px-8 text-[10px] text-slate-400 z-[200]">
        <div>THE QUORUM v9.0 • Built for maximum sovereignty</div>
        <div className="flex-1"></div>
        <a href="https://x.com/YOUR_X_HANDLE" target="_blank" className="hover:text-white">@Julioba95197203</a>
        <span className="mx-6">•</span>
        <span onClick={() => {navigator.clipboard.writeText('4kCsDcsoyiYcHPvaLpaiqZnXc54x1z3kF7gyRhA2Nt6T'); alert('SOL copied');}} className="cursor-pointer hover:text-emerald-400">SOL: 4kCs...Nt6T</span>
        <span className="mx-4">•</span>
        <span onClick={() => {navigator.clipboard.writeText('bc1q7jljgzwuuywxqtc0cd0ur389y00fh885ujhr82'); alert('BTC copied');}} className="cursor-pointer hover:text-emerald-400">BTC: bc1q7...jhr82</span>
        <span className="mx-4">•</span>
        <span onClick={() => {navigator.clipboard.writeText('kaspa:qpex0aq3r7a2ek26dyscew88qduul7jldffmcyjqvsygku3jhrp5v5dx7upje'); alert('KAS copied');}} className="cursor-pointer hover:text-emerald-400">KAS: qpex...upje</span>
      </footer>
    </div>
  );
};

export default App;
