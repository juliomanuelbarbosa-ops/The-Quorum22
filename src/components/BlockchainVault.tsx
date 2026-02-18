import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Send, Copy, ExternalLink, Shield, Zap, Users } from 'lucide-react';
import { useWallet } from '../context/WalletContext';
import { playSound } from './SoundEffects';

const BlockchainVault: React.FC = () => {
  const wallet = useWallet();
  const [tab, setTab] = useState<'main' | 'multisig' | 'cold' | 'ledgerlive'>('main');
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [txHash, setTxHash] = useState('');

  const handleSend = async () => {
    if (!to || !amount) return alert('Fill address and amount');
    try {
      const hash = await wallet.sendTransaction(to, amount);
      setTxHash(hash);
      playSound('success');
    } catch (e: any) {
      alert('Transaction rejected on device or failed: ' + e.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto glass rounded-3xl p-12 relative overflow-hidden">
      <div className="flex items-center gap-6 mb-12">
        <Wallet className="w-20 h-20 text-cyan-400" />
        <div>
          <div className="text-6xl font-black tracking-widest">BLOCKCHAIN VAULT v9.0</div>
          <div className="text-emerald-400 text-xl">MULTI-CHAIN • HARDWARE • COLD STORAGE • MULTI-SIG</div>
        </div>
      </div>

      <div className="flex gap-3 mb-12 border-b border-cyan-500/30 pb-4 overflow-x-auto">
        {[
          { id: 'main', label: 'HOT VAULT', icon: Wallet },
          { id: 'multisig', label: 'MULTI-SIG', icon: Users },
          { id: 'cold', label: 'COLD STORAGE', icon: Shield },
          { id: 'ledgerlive', label: 'LEDGER LIVE BRIDGE', icon: Zap }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => { setTab(t.id as any); playSound('click'); }}
            className={`px-8 py-4 rounded-2xl flex items-center gap-3 whitespace-nowrap transition-all ${tab === t.id ? 'bg-red-600 text-white' : 'hover:bg-slate-800'}`}
          >
            <t.icon size={20} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'main' && (
        <div className="space-y-10">
          {!wallet.isConnected ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.button whileHover={{ scale: 1.05 }} onClick={wallet.connectMetaMask} className="h-40 glass rounded-3xl flex flex-col items-center justify-center border border-orange-400 hover:border-orange-500">
                <div className="text-5xl mb-4">🦊</div>
                <div className="font-black text-2xl">METAMASK</div>
                <div className="text-xs text-orange-400">Ethereum + EVM</div>
              </motion.button>

              <motion.button whileHover={{ scale: 1.05 }} onClick={wallet.connectPhantom} className="h-40 glass rounded-3xl flex flex-col items-center justify-center border border-purple-400 hover:border-purple-500">
                <div className="text-5xl mb-4">👻</div>
                <div className="font-black text-2xl">PHANTOM</div>
                <div className="text-xs text-purple-400">Solana</div>
              </motion.button>

              <motion.button whileHover={{ scale: 1.05 }} onClick={wallet.connectLedgerETH} className="h-40 glass rounded-3xl flex flex-col items-center justify-center border border-cyan-400 hover:border-cyan-500">
                <div className="text-5xl mb-4">🔒</div>
                <div className="font-black text-2xl">LEDGER ETH</div>
                <div className="text-xs text-cyan-400">Hardware</div>
              </motion.button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="glass rounded-3xl p-8 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-400">CONNECTED ADDRESS</div>
                  <div className="font-mono text-xl break-all">{wallet.address}</div>
                </div>
                <button onClick={() => { navigator.clipboard.writeText(wallet.address || ''); playSound('click'); }} className="px-6 py-3 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center gap-3 hover:bg-cyan-500/20">
                  <Copy size={18} /> COPY
                </button>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="glass rounded-3xl p-8">
                  <div className="text-emerald-400 text-sm">ETH BALANCE</div>
                  <div className="text-6xl font-black tabular-nums">{parseFloat(wallet.ethBalance).toFixed(4)} ETH</div>
                </div>
                <div className="glass rounded-3xl p-8">
                  <div className="text-purple-400 text-sm">SOL BALANCE</div>
                  <div className="text-6xl font-black tabular-nums">{wallet.solBalance} SOL</div>
                </div>
              </div>

              <div className="glass rounded-3xl p-8">
                <div className="text-xl font-bold mb-6">SEND FUNDS</div>
                <input type="text" placeholder="0x... or Solana address" value={to} onChange={e => setTo(e.target.value)} className="w-full bg-slate-950 border border-cyan-500/30 rounded-2xl p-6 font-mono mb-4" />
                <input type="text" placeholder="Amount (ETH or SOL)" value={amount} onChange={e => setAmount(e.target.value)} className="w-full bg-slate-950 border border-cyan-500/30 rounded-2xl p-6 font-mono mb-6" />
                <motion.button whileHover={{ scale: 1.03 }} onClick={handleSend} className="w-full py-7 bg-gradient-to-r from-red-500 to-orange-500 rounded-3xl text-black font-black text-2xl">
                  CONFIRM & BROADCAST
                </motion.button>
              </div>

              {txHash && (
                <div className="glass p-6 rounded-3xl text-emerald-400 font-mono text-sm flex items-center gap-3">
                  TX HASH: <a href={`https://etherscan.io/tx/${txHash}`} target="_blank" className="underline flex-1 truncate">{txHash}</a>
                  <ExternalLink size={18} />
                </div>
              )}

              <button onClick={wallet.disconnect} className="w-full py-5 border border-red-500/50 text-red-400 rounded-3xl hover:bg-red-950/50">DISCONNECT WALLET</button>
            </div>
          )}
        </div>
      )}

      {tab === 'multisig' && <MultiSigHub />}
      {tab === 'cold' && <ColdStorageSimulator />}
      {tab === 'ledgerlive' && (
        <div className="glass rounded-3xl p-16 text-center">
          <div className="text-7xl mb-8">🔗</div>
          <div className="text-5xl font-black tracking-widest mb-6">LEDGER LIVE BRIDGE</div>
          <div className="text-xl text-emerald-400 max-w-md mx-auto">Plug in Ledger → Open Ethereum/Solana app → Click “Bridge” below for instant sync</div>
          <motion.button 
            whileHover={{scale:1.05}} 
            onClick={() => wallet.connectLedgerETH()} 
            className="mt-16 px-20 py-8 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-3xl text-black font-black text-3xl tracking-widest"
          >
            PAIR WITH LEDGER LIVE
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default BlockchainVault;
