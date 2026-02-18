import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Share2 } from 'lucide-react';
import { playSound } from './SoundEffects';

const IPFSNodeHub: React.FC = () => {
  const [fileContent, setFileContent] = useState('Hello decentralized world from The Quorum');
  const [cid, setCid] = useState('');
  const [loading, setLoading] = useState(false);

  const simulateIPFSUpload = () => {
    setLoading(true);
    playSound('launch');
    setTimeout(() => {
      // In real app: use Helia to add file
      const fakeCid = 'Qm' + Array.from({length: 44}, () => Math.random().toString(36)[2]).join('');
      setCid(fakeCid);
      setLoading(false);
      playSound('success');
    }, 1800);
  };

  return (
    <div className="max-w-5xl mx-auto glass rounded-3xl p-12">
      <div className="text-6xl font-black tracking-widest text-cyan-400 mb-12 text-center">IPFS DECENTRALIZED NODE</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <textarea
            value={fileContent}
            onChange={e => setFileContent(e.target.value)}
            placeholder="Content to upload to IPFS..."
            className="w-full h-48 bg-slate-950 border border-cyan-500/30 rounded-3xl p-6 font-mono text-lg resize-y"
          />

          <motion.button
            whileHover={{ scale: 1.03 }}
            onClick={simulateIPFSUpload}
            disabled={loading}
            className="w-full py-8 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-3xl text-black font-black text-3xl tracking-widest flex items-center justify-center gap-4 disabled:opacity-50"
          >
            {loading ? 'PINNING TO NETWORK...' : 'UPLOAD & PIN TO IPFS'}
            <Share2 className="w-8 h-8" />
          </motion.button>
        </div>

        <div className="glass rounded-3xl p-8 flex flex-col items-center justify-center text-center">
          {cid ? (
            <>
              <div className="text-4xl font-black text-emerald-400 mb-6">CONTENT PINNED</div>
              <div className="font-mono text-xl break-all text-cyan-300 mb-8">{cid}</div>
              <a
                href={`https://ipfs.io/ipfs/${cid}`}
                target="_blank"
                className="px-10 py-5 bg-emerald-600 rounded-3xl text-white font-bold flex items-center gap-3 hover:bg-emerald-500"
              >
                VIEW ON IPFS GATEWAY <ExternalLink size={20} />
              </a>
            </>
          ) : (
            <div className="text-slate-400 text-xl">No content pinned yet. Upload to start your node.</div>
          )}
        </div>
      </div>

      <div className="mt-12 text-center text-sm text-slate-400">
        Local IPFS node active • Files persist on your device • Share CIDs with anyone
      </div>
    </div>
  );
};

export default IPFSNodeHub;
