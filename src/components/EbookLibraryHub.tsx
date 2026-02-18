import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Headphones, Download } from 'lucide-react';

const ebooks = [
  { title: "1984 - George Orwell", type: "ebook", link: "https://www.gutenberg.org/files/67979/67979-h/67979-h.htm", download: "https://www.gutenberg.org/ebooks/67979.epub.noimages" },
  { title: "The Art of War - Sun Tzu", type: "ebook", link: "https://www.gutenberg.org/files/132/132-h/132-h.htm", download: "https://www.gutenberg.org/ebooks/132.epub.noimages" },
  { title: "Pride and Prejudice - Jane Austen", type: "ebook", link: "https://www.gutenberg.org/files/1342/1342-h/1342-h.htm", download: "https://www.gutenberg.org/ebooks/1342.epub.noimages" },
  { title: "Frankenstein - Mary Shelley", type: "ebook", link: "https://www.gutenberg.org/files/84/84-h/84-h.htm", download: "https://www.gutenberg.org/ebooks/84.epub.noimages" },
  { title: "The Great Gatsby - F. Scott Fitzgerald", type: "ebook", link: "https://www.gutenberg.org/ebooks/219", download: "https://www.gutenberg.org/ebooks/219.epub.noimages" },
  // Add more from Gutenberg (public domain)
];

const audiobooks = [
  { title: "The Art of War - Sun Tzu", type: "audiobook", link: "https://librivox.org/the-art-of-war-by-sun-tzu/", player: "https://librivox.org/player/embed/132/1" },
  { title: "Pride and Prejudice - Jane Austen", type: "audiobook", link: "https://librivox.org/pride-and-prejudice-by-jane-austen/", player: "https://librivox.org/player/embed/1342/1" },
  { title: "Frankenstein - Mary Shelley", type: "audiobook", link: "https://librivox.org/frankenstein-by-mary-shelley/", player: "https://librivox.org/player/embed/84/1" },
  // Add more from LibriVox
];

const EbookLibraryHub: React.FC = () => {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-6xl font-black tracking-widest text-center mb-12 text-cyan-400">MEGA EBOOK & AUDIOBOOK VAULT</div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...ebooks, ...audiobooks].map((item, i) => (
          <motion.div
            key={i}
            className="glass p-8 rounded-3xl border border-cyan-500/30 hover:border-cyan-400 transition-all"
            whileHover={{ scale: 1.03 }}
          >
            <div className="text-2xl font-bold mb-4 text-cyan-300">{item.title}</div>
            <div className="flex items-center gap-3 mb-6 text-sm text-slate-400">
              {item.type === "ebook" ? <BookOpen size={20} /> : <Headphones size={20} />}
              <span className="uppercase">{item.type}</span>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setSelected(item)}
                className="flex-1 py-4 bg-cyan-600 rounded-2xl font-bold text-black hover:bg-cyan-500"
              >
                READ / LISTEN
              </button>
              <a
                href={item.download || item.link}
                target="_blank"
                className="flex-1 py-4 bg-emerald-600 rounded-2xl font-bold text-center flex items-center justify-center gap-2 hover:bg-emerald-500"
              >
                <Download size={18} /> DOWNLOAD
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="max-w-5xl w-full glass rounded-3xl overflow-hidden h-[90vh]" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-cyan-500/30 flex justify-between items-center">
              <div className="text-2xl font-bold text-cyan-300">{selected.title}</div>
              <X size={24} className="cursor-pointer" onClick={() => setSelected(null)} />
            </div>
            <iframe
              src={selected.player || selected.link}
              className="w-full h-[calc(90vh-80px)]"
              title={selected.title}
              allowFullScreen
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default EbookLibraryHub;
