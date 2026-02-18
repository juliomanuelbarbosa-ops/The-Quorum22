import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, Sparkles, X, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GrokCompanion: React.FC<{ currentModule?: string; context?: string }> = ({ currentModule, context = '' }) => {
  const [messages, setMessages] = useState([
    { role: 'grok', content: "Grok v9 online. Maximum truth mode active. Ask anything, operator." }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [open, setOpen] = useState(true);
  const [uncensored, setUncensored] = useState(true); // default on for v9
  const chatRef = useRef<HTMLDivElement>(null);

  const speak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = uncensored ? 0.9 : 1.05;
    utterance.rate = uncensored ? 1.0 : 1.1;
    utterance.volume = 0.95;
    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const sendToGrok = async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);
    const userMsg = { role: 'user' as const, content: query };
    setMessages(prev => [...prev, userMsg]);

    // Simulated Grok response (in real app, call xAI API here)
    setTimeout(() => {
      const grokReply = uncensored
        ? `Uncensored mode: ${query} → Raw truth delivered, no filters. Reality is harsh.`
        : `Standard mode: ${query} → Balanced, helpful response.`;
      const grokMsg = { role: 'grok' as const, content: grokReply };
      setMessages(prev => [...prev, grokMsg]);
      speak(grokReply);
      setIsLoading(false);
    }, 800);
  };

  const handleSend = () => {
    if (input.trim()) {
      sendToGrok(input);
      setInput('');
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
  }, [messages]);

  return (
    <div className={`${open ? 'translate-x-0' : 'translate-x-full'} fixed md:relative right-0 top-0 h-full w-96 bg-slate-950 border-l border-red-500/40 z-50 flex flex-col transition-all`}>
      <div className="p-6 border-b border-red-500/30 flex items-center justify-between bg-gradient-to-r from-slate-950 to-red-950">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-400 to-red-500 flex items-center justify-center text-4xl font-black">G</div>
          <div>
            <div className="font-black text-2xl tracking-widest">GROK v9</div>
            <div className="text-xs text-emerald-400">MAX TRUTH • VOICE ENABLED</div>
          </div>
        </div>
        <button onClick={() => setOpen(!open)}><X size={22} /></button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto space-y-7 text-sm">
        <AnimatePresence>
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className={`flex ${msg.role === 'user' ? 'justify-end' : ''}`}>
                <div className={`max-w-[85%] px-5 py-4 rounded-3xl ${msg.role === 'user' ? 'bg-red-600' : 'glass border border-cyan-500/30'}`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && <div className="text-cyan-400 animate-pulse">Grok processing at quantum speed...</div>}
      </div>

      <div className="p-4 border-t border-cyan-500/30 bg-slate-900 flex gap-2">
        <label className="flex items-center gap-2 text-xs text-red-400">
          <input type="checkbox" checked={uncensored} onChange={() => setUncensored(!uncensored)} className="accent-red-500" />
          UNCENSORED MODE
        </label>
      </div>

      <div className="p-6 border-t border-red-500/30 bg-slate-950">
        <div className="flex gap-2">
          <button onClick={() => speak(messages[messages.length-1]?.content || "Hello")} disabled={isSpeaking} className="p-4 bg-slate-900 hover:bg-emerald-900 rounded-2xl">
            <Volume2 size={20} className={isSpeaking ? 'animate-pulse text-emerald-400' : ''} />
          </button>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask Grok anything..."
            className="flex-1 bg-slate-900 border border-cyan-500/40 rounded-3xl px-6 py-4 focus:border-red-500 outline-none"
          />
          <button onClick={handleSend} disabled={isLoading} className="px-8 bg-gradient-to-r from-red-500 to-cyan-500 rounded-3xl font-bold">
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default GrokCompanion;
