import React, { useState } from 'react';
import { Music, Play, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';

const MusicWiz: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [search, setSearch] = useState('');
  const [playlist, setPlaylist] = useState<string[]>(["Neon Nights - Cyberpunk 2077", "Midnight City - M83"]);
  const [nowPlaying, setNowPlaying] = useState('');

  const cloneTrack = () => {
    if (search.trim()) {
      setPlaylist([...playlist, search.trim()]);
      setNowPlaying(search.trim());
      setSearch('');
    }
  };

  return (
    <>
      <motion.div 
        drag 
        dragMomentum={false}
        className="fixed top-4 right-4 z-[1000] w-80 bg-slate-950 border border-pink-500/70 rounded-3xl shadow-2xl overflow-hidden"
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        <div className="p-4 border-b border-pink-500/50 flex items-center justify-between bg-black/80">
          <div className="flex items-center gap-3 text-pink-400">
            <Music className="w-6 h-6" />
            <span className="font-black tracking-widest text-sm">MUSIC WIZ • CLONER</span>
          </div>
          <X size={18} className="cursor-pointer hover:text-pink-400" onClick={() => setIsOpen(false)} />
        </div>

        <div className="p-4">
          <input 
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search or paste Spotify link..."
            className="w-full bg-black border border-pink-500/30 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-pink-400"
          />
          <motion.button 
            whileHover={{ scale: 1.03 }}
            onClick={cloneTrack}
            className="mt-3 w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-2xl text-black font-bold flex items-center justify-center gap-2"
          >
            <Plus size={18} /> CLONE TO VAULT
          </motion.button>
        </div>

        <div className="px-4 pb-4 max-h-60 overflow-y-auto space-y-2">
          {playlist.map((track, i) => (
            <div 
              key={i} 
              onClick={() => setNowPlaying(track)}
              className={`px-4 py-3 rounded-xl cursor-pointer flex justify-between items-center text-sm ${nowPlaying === track ? 'bg-pink-900/30' : 'hover:bg-slate-800'}`}
            >
              <span className="truncate flex-1">{track}</span>
              <Play size={16} className={nowPlaying === track ? 'text-pink-400' : 'text-slate-400'} />
            </div>
          ))}
        </div>

        {nowPlaying && (
          <div className="p-4 text-center text-xs text-pink-400 border-t border-pink-500/30">
            NOW CLONED: {nowPlaying}
            <div className="mt-1">(simulated playback — add real audio URLs later)</div>
          </div>
        )}
      </motion.div>

      {!isOpen && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setIsOpen(true)}
          className="fixed top-4 right-4 z-[999] w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center shadow-lg"
        >
          <Music size={24} />
        </motion.button>
      )}
    </>
  );
};

export default MusicWiz;
