import React, { useState } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'qrcode';
import { Download, Shield } from 'lucide-react';
import * as bip39 from 'bip39';
import { playSound } from './SoundEffects';

const ColdStorageSimulator: React.FC = () => {
  const [seed, setSeed] = useState('');
  const [address, setAddress] = useState('');
  const [qr, setQr] = useState('');
  const [airGapped, setAirGapped] = useState(false);

  const generateColdWallet = () => {
    const mnemonic = bip39.generateMnemonic();
    setSeed(mnemonic);
    const fakeAddr = '0x' + Array.from({length:40},()=>Math.floor(Math.random()*16).toString(16)).join('');
    setAddress(fakeAddr);
    QRCode.toDataURL(fakeAddr).then(setQr);
    setAirGapped(true);
    playSound('success');
  };

  const printPaperWallet = () => {
    const printWindow = window.open('', '_blank');
    printWindow?.document.write(`
      <h1 style="font-family:monospace;color:#00ff41">THE QUORUM — COLD STORAGE PAPER WALLET</h1>
      <pre>${seed}</pre>
      <img src="${qr}" />
      <p>Address: ${address}</p>
      <p>NEVER SHARE THIS SEED • AIR-GAPPED MODE ACTIVE</p>
    `);
    printWindow?.print();
  };

  return (
    <div className="max-w-4xl mx-auto glass rounded-3xl p-12">
      <div className="flex items-center gap-6 mb-12">
        <Shield className="w-20 h-20 text-red-400" />
        <div>
          <div className="text-6xl font-black tracking-widest text-red-400">COLD STORAGE SIMULATOR</div>
          <div className="text-xl text-slate-400">AIR-GAPPED • PAPER WALLET • OFFLINE SIGNING</div>
        </div>
      </div>

      {!airGapped ? (
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={generateColdWallet}
          className="w-full py-16 bg-gradient-to-r from-red-900 to-black border-2 border-red-500 rounded-3xl text-4xl font-black tracking-widest"
        >
          GENERATE AIR-GAPPED WALLET
        </motion.button>
      ) : (
        <div className="space-y-12">
          <div className="glass p-8 rounded-3xl">
            <div className="text-xs uppercase tracking-widest text-red-400 mb-2">24-WORD SEED PHRASE (NEVER STORE DIGITALLY)</div>
            <div className="font-mono text-xl bg-black p-8 rounded-2xl leading-relaxed tracking-widest break-words">{seed}</div>
          </div>

          <div className="flex gap-8">
            <div className="flex-1 glass p-8 rounded-3xl text-center">
              <div className="text-emerald-400 text-sm">DERIVED ADDRESS</div>
              <div className="font-mono text-2xl mt-4 break-all">{address}</div>
            </div>
            <div className="flex-1 glass p-8 rounded-3xl text-center">
              <img src={qr} alt="QR" className="mx-auto rounded-3xl" />
            </div>
          </div>

          <div className="flex gap-6">
            <motion.button whileHover={{scale:1.03}} onClick={printPaperWallet} className="flex-1 py-8 bg-red-600 rounded-3xl font-black text-2xl flex items-center justify-center gap-4">
              <Download /> PRINT PAPER WALLET
            </motion.button>
            <motion.button whileHover={{scale:1.03}} onClick={() => { setAirGapped(false); setSeed(''); setAddress(''); setQr(''); }} className="flex-1 py-8 bg-slate-800 border border-slate-500 rounded-3xl font-black text-2xl">
              NEW COLD WALLET
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColdStorageSimulator;
