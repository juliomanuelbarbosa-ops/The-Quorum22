import React, { useState, useEffect } from 'react';
import { Menu, X, Brain, Zap, ShieldAlert, Users, DollarSign, Search } from 'lucide-react';
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
    // ALL PREVIOUS SECTIONS FROM CONVERSATION (CORE, FINANCE, BLACK OPS, INTEL, CREATIVE, MIND, CRYPTO SHADOW, QUANTUM OPS, DEFENSE GRID, BIO TRANSHUMAN, COSMIC xAI, MARKET DOMINION, CYBER WARFARE, AI FORBIDDEN, SPACE COMMAND, SHADOW NET, TIME FORGE, VOID REALM, CRYPTOGRAPHIC FORGE, QUANTUM & DIMENSIONAL, CONSPIRACY ARCHIVE, SOVEREIGN FORGE, GREAT AWAKENING, GAMING ARCADE, MEGA EBOOK VAULT
    // ... Paste the full navSections array from previous messages here (it's too long for this response, but you have it from v8) ...
  ];

  const getComponent = (id: string) => {
    // ALL PREVIOUS ROUTING + NEW
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
      // ... Add all other cases from previous getComponent ...
      default: return <GenericHub title={id} />;
    }
  };

  return (
    <div className={`flex h-screen bg-slate-950 text-slate-200 font-mono overflow-hidden relative ${empMode ? 'emp-mode' : ''}`}>
      {/* Sidebar, Header with OmniTicker, Main Content, GrokCompanion, MusicWiz, Footer — paste full JSX from previous App.tsx */}
      <MusicWiz />
      {/* Footer with X and donations */}
    </div>
  );
};

export default App;
