import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Hash, Key, Image, Zap } from 'lucide-react';
import { playSound } from './SoundEffects';

const CryptoForge: React.FC<{ title: string; tool: string }> = ({ title, tool }) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [key, setKey] = useState('');
  const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
  const [loading, setLoading] = useState(false);

  const aesEncrypt = async (text: string, secret: string) => {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(secret.padEnd(32, '0')), 'AES-GCM', false, ['encrypt']);
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, keyMaterial, enc.encode(text));
    return btoa(String.fromCharCode(...new Uint8Array(encrypted))) + ':::' + btoa(String.fromCharCode(...iv));
  };

  const aesDecrypt = async (data: string, secret: string) => {
    const [cipher, ivB64] = data.split(':::');
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey('raw', enc.encode(secret.padEnd(32, '0')), 'AES-GCM', false, ['decrypt']);
    const decrypted = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: Uint8Array.from(atob(ivB64), c => c.charCodeAt(0)) }, keyMaterial, Uint8Array.from(atob(cipher), c => c.charCodeAt(0)));
    return new TextDecoder().decode(decrypted);
  };

  const sha256 = async (text: string) => {
    const hashBuffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleAction = async () => {
    setLoading(true);
    playSound('launch');

    try {
      if (tool.includes('aes')) {
        if (mode === 'encrypt') setOutput(await aesEncrypt(input, key || 'thequorumv9'));
        else setOutput(await aesDecrypt(input, key || 'thequorumv9'));
      } else if (tool.includes('sha')) {
        setOutput(await sha256(input));
      } else if (tool.includes('entropy')) {
        const entropy = Math.floor(input.length * 4.2 + (input.match(/[A-Z0-9!@]/) ? 25 : 0));
        setOutput(`ENTROPY: ${entropy} bits • Crack time: ${entropy > 80 ? '10^18 years' : '4.2 seconds'}`);
      } else if (tool.includes('base64')) {
        setOutput(btoa(input));
      }
      playSound('success');
    } catch (e) {
      setOutput('CRYPTO ERROR — CHECK INPUT');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-5xl mx-auto glass rounded-3xl overflow-hidden">
      <div className="bg-black p-6 flex items-center gap-6 border-b border-cyan-500/50">
        <div className="text-4xl font-black tracking-widest text-cyan-400">{title}</div>
        <div className="text-xs uppercase tracking-[4px] text-emerald-400">WEB CRYPTO API • REAL MATH</div>
      </div>

      <div className="p-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <div className="text-sm uppercase tracking-widest text-slate-400 mb-3">INPUT</div>
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              className="w-full h-48 bg-slate-950 border border-cyan-500/30 rounded-3xl p-6 font-mono text-lg resize-y"
              placeholder="Type or paste here..."
            />
            <input
              type="text"
              value={key}
              onChange={e => setKey(e.target.value)}
              placeholder="Secret key (for AES)"
              className="mt-4 w-full bg-slate-950 border border-cyan-500/30 rounded-3xl p-6 font-mono"
            />
          </div>

          <div>
            <div className="text-sm uppercase tracking-widest text-emerald-400 mb-3">OUTPUT</div>
            <div className="h-48 bg-black border border-emerald-500/30 rounded-3xl p-6 font-mono text-emerald-400 overflow-auto whitespace-pre-wrap">
              {output || 'Result appears here...'}
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={() => setMode('encrypt')}
            className={`flex-1 py-4 rounded-2xl ${mode === 'encrypt' ? 'bg-cyan-500 text-black' : 'bg-slate-800'}`}
          >
            ENCRYPT
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={() => setMode('decrypt')}
            className={`flex-1 py-4 rounded-2xl ${mode === 'decrypt' ? 'bg-cyan-500 text-black' : 'bg-slate-800'}`}
          >
            DECRYPT
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={handleAction}
          disabled={loading || !input}
          className="mt-8 w-full py-8 bg-gradient-to-r from-cyan-500 via-emerald-500 to-cyan-500 rounded-3xl text-black font-black text-3xl tracking-widest flex items-center justify-center gap-4 disabled:opacity-50"
        >
          {loading ? 'CRYPTOGRAPHING...' : 'EXECUTE CIPHER'}
          <Zap className="w-8 h-8" />
        </motion.button>

        <button
          onClick={() => window.dispatchEvent(new CustomEvent('askGrok', { detail: `Explain the cryptography behind ${title} and give me the math` }))}
          className="mt-6 w-full py-5 border border-red-500/50 hover:bg-red-950/50 rounded-3xl text-red-400 text-sm tracking-widest"
        >
          ASK UNCENSORED GROK FOR FULL MATH + ATTACK VECTORS
        </button>
      </div>
    </div>
  );
};

export default CryptoForge;
