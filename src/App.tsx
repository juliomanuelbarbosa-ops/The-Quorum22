import { useState } from 'react'
import { motion } from 'framer-motion'

// Real Hubs (28 fully functional)
import TensorFlowJsPlayground from './components/TensorFlowJsPlayground'
import TransformersJsHub from './components/TransformersJsHub'
import OllamaLocalRunner from './components/OllamaLocalRunner'
import LangChainAgentsHub from './components/LangChainAgentsHub'
import FreeCodeCampHub from './components/FreeCodeCampHub'
import DeveloperRoadmapExplorer from './components/DeveloperRoadmapExplorer'
import JsAlgorithmsVisualizer from './components/JsAlgorithmsVisualizer'
import PublicApisExplorer from './components/PublicApisExplorer'
import AwesomeListsDirectory from './components/AwesomeListsDirectory'
import SystemDesignPrimerHub from './components/SystemDesignPrimerHub'
import ReactPlayground from './components/ReactPlayground'
import VuePlayground from './components/VuePlayground'
import CodingInterviewUniversityHub from './components/CodingInterviewUniversityHub'
import AirbnbStyleGuideHub from './components/AirbnbStyleGuideHub'
import OhMyZshConfigurator from './components/OhMyZshConfigurator'
import WalletConnectorHub from './components/WalletConnectorHub'
import SmartContractHub from './components/SmartContractHub'
import GitHubAPIHub from './components/GitHubAPIHub'
import StripePaymentHub from './components/StripePaymentHub'
import TokenCreatorHub from './components/TokenCreatorHub'
import NftCollectionCreatorHub from './components/NftCollectionCreatorHub'
import ApiDashboardHub from './components/ApiDashboardHub'
import RAGChatHub from './components/RAGChatHub'
import LocalLLMRunner from './components/LocalLLMRunner'
import BasicAgentBuilder from './components/BasicAgentBuilder'
import GitHubRepoChat from './components/GitHubRepoChat'
import AnythingLLMEmbed from './components/AnythingLLMEmbed'
import AIToolsDirectoryHub from './components/AIToolsDirectoryHub'

function App() {
  const [activeModule, setActiveModule] = useState('home')

  const navSections = [
    { title: "CORE", items: [{ id: 'home', label: 'GROK NEXUS' }] },
    { title: "AI & ML", items: [
      { id: 'tensorflow-playground', label: 'TENSORFLOW.JS PLAYGROUND' },
      { id: 'transformers-js', label: 'TRANSFORMERS.JS MODELS' },
      { id: 'ollama-runner', label: 'OLLAMA LOCAL LLM' },
      { id: 'langchain-agents', label: 'LANGCHAIN.JS AGENTS' },
      { id: 'rag-chat', label: 'RAG CHAT HUB' },
      { id: 'local-llm', label: 'LOCAL LLM RUNNER' }
    ] },
    { title: "DEVELOPER TOOLS", items: [
      { id: 'developer-roadmap', label: 'DEVELOPER ROADMAP EXPLORER' },
      { id: 'js-algorithms', label: 'JS ALGORITHMS VISUALIZER' },
      { id: 'react-playground', label: 'REACT PLAYGROUND' },
      { id: 'vue-playground', label: 'VUE PLAYGROUND' },
      { id: 'coding-interview', label: 'CODING INTERVIEW UNIVERSITY' },
      { id: 'github-api', label: 'GITHUB API EXPLORER' }
    ] },
    { title: "CREATOR & FINANCE", items: [
      { id: 'token-creator', label: 'TOKEN CREATOR' },
      { id: 'nft-collection-creator', label: 'NFT COLLECTION CREATOR' },
      { id: 'stripe-payment', label: 'STRIPE PAYMENTS' },
      { id: 'wallet-connector', label: 'WALLET CONNECTOR' }
    ] },
    { title: "ALL AI TOOLS (600+)", items: [
      { id: 'ai-tools-directory', label: 'AI TOOLS DIRECTORY' }
    ] }
  ]

  const getComponent = (id: string) => {
    switch (id) {
      case 'home': return <div className="text-6xl font-black text-center p-12">GROK NEXUS v600.0</div>
      case 'tensorflow-playground': return <TensorFlowJsPlayground />
      case 'transformers-js': return <TransformersJsHub />
      case 'ollama-runner': return <OllamaLocalRunner />
      case 'langchain-agents': return <LangChainAgentsHub />
      case 'rag-chat': return <RAGChatHub />
      case 'local-llm': return <LocalLLMRunner />
      case 'developer-roadmap': return <DeveloperRoadmapExplorer />
      case 'js-algorithms': return <JsAlgorithmsVisualizer />
      case 'react-playground': return <ReactPlayground />
      case 'vue-playground': return <VuePlayground />
      case 'coding-interview': return <CodingInterviewUniversityHub />
      case 'github-api': return <GitHubAPIHub />
      case 'token-creator': return <TokenCreatorHub />
      case 'nft-collection-creator': return <NftCollectionCreatorHub />
      case 'stripe-payment': return <StripePaymentHub />
      case 'wallet-connector': return <WalletConnectorHub />
      case 'ai-tools-directory': return <AIToolsDirectoryHub />
      default: return <div className="text-4xl text-center p-12">HUB: {id}</div>
    }
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-mono overflow-hidden">
      <div className="w-72 bg-slate-900 border-r border-cyan-500/30 p-4 overflow-y-auto">
        <div className="text-3xl font-black tracking-widest mb-8">THE QUORUM v600</div>
        {navSections.map((section, i) => (
          <div key={i} className="mb-8">
            <div className="uppercase text-xs tracking-widest text-cyan-400 mb-3">{section.title}</div>
            {section.items.map(item => (
              <motion.button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className="w-full text-left py-3 px-4 rounded-2xl hover:bg-slate-800 transition"
                whileHover={{ scale: 1.02 }}
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        ))}
      </div>

      <div className="flex-1 overflow-auto p-8">
        {getComponent(activeModule)}
      </div>

      <MusicWiz />
    </div>
  )
}

export default App
