
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Download, Gamepad2 } from 'lucide-react';

const emulators = [
  { name: "RetroArch", desc: "All-in-one: NES, SNES, PS1, N64, Arcade, Sega, and more", link: "https://www.retroarch.com", legalNote: "Use your own legally owned ROMs" },
  { name: "Dolphin", desc: "GameCube & Wii emulator", link: "https://dolphin-emu.org", legalNote: "Requires dumped game files" },
  { name: "PCSX2", desc: "PlayStation 2 emulator", link: "https://pcsx2.net", legalNote: "Use legally owned PS2 discs/ISO" },
  { name: "Citra", desc: "Nintendo 3DS emulator", link: "https://citra-emu.org", legalNote: "Requires dumped 3DS games" },
  { name: "RPCS3", desc: "PlayStation 3 emulator", link: "https://rpcs3.net", legalNote: "Use legally owned PS3 games" },
  { name: "Yuzu / Ryujinx", desc: "Nintendo Switch emulator", link: "https://yuzu-emu.org", legalNote: "Requires dumped Switch games" },
  { name: "PPSSPP", desc: "PlayStation Portable (PSP)", link: "https://www.ppsspp.org", legalNote: "Use legally owned PSP games" },
  { name: "DuckStation", desc: "PlayStation 1 (enhanced)", link: "https://www.duckstation.org", legalNote: "Use legally owned PS1 discs" },
];

const GamingArcadeHub: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto glass rounded-3xl p-12 overflow-hidden">
      <div className="text-center mb-12">
        <Gamepad2 className="mx-auto w-24 h-24 text-cyan-400 mb-6" />
        <div className="text-6xl font-black tracking-widest text-cyan-300">ULTIMATE GAMING ARCADE</div>
        <div className="text-emerald-400 text-xl mt-2">ALL EMULATORS • LEGAL LIBRARIES • RETRO HEAVEN</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {emulators.map((emu, i) => (
          <motion.div
            key={i}
            className="glass p-8 rounded-3xl border border-cyan-500/30 hover:border-cyan-400 transition-all"
            whileHover={{ scale: 1.03 }}
          >
            <div className="text-3xl font-bold mb-4 text-cyan-300">{emu.name}</div>
            <div className="text-slate-300 mb-4">{emu.desc}</div>
            <div className="text-xs text-emerald-400 mb-6 italic">{emu.legalNote}</div>
            <a 
              href={emu.link} 
              target="_blank" 
              className="block w-full py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-2xl text-black font-bold text-center flex items-center justify-center gap-3 hover:brightness-110"
            >
              <Play size={20} /> LAUNCH EMULATOR
            </a>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <div className="text-2xl font-bold text-emerald-400 mb-6">LEGAL GAME SOURCES</div>
        <div className="text-slate-300 mb-4">
          Internet Archive • OpenEmu • Public Domain ROM Packs • No piracy allowed
        </div>
        <a href="https://archive.org/details/internetarcade" target="_blank" className="text-cyan-400 hover:underline">
          Browse Internet Arcade Collection →
        </a>
      </div>
    </div>
  );
};

export default GamingArcadeHub;
