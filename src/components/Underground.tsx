import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Mic, Camera } from 'lucide-react';
import { motion } from 'framer-motion';

const Underground: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'brute' | 'voice' | 'cam'>('brute');
  const [password, setPassword] = useState('');
  const [cracking, setCracking] = useState(false);
  const [entropy, setEntropy] = useState(0);

  // Voice
  const [text, setText] = useState('I am anonymous. The system cannot trace me.');
  const [pitch, setPitch] = useState(0.8);
  const [rate, setRate] = useState(1.0);

  // Cam
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [glitching, setGlitching] = useState(false);

  // Matrix rain for brute force
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (activeTab === 'brute') {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d')!;
      canvas.width = 520;
      canvas.height = 260;

      const chars = '01アイウエオカキクケコ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
      const fontSize = 14;
      const columns = canvas.width / fontSize;
      const drops = Array(Math.floor(columns)).fill(1);

      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#00ff41';
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = chars[Math.floor(Math.random() * chars.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };

      const interval = setInterval(draw, 35);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  const startCrack = () => {
    if (!password) return;
    setCracking(true);
    let e = Math.min(120, password.length * 8 + (password.match(/[A-Z]/) ? 15 : 0) + (password.match(/[0-9!@]/) ? 25 : 0));
    setEntropy(e);

    setTimeout(() => setCracking(false), 2200);
  };

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.volume = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  const toggleCam = async () => {
    if (stream) {
      stream.getTracks().forEach(t => t.stop());
      setStream(null);
      if (videoRef.current) videoRef.current.srcObject = null;
    } else {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        setStream(s);
        if (videoRef.current) videoRef.current.srcObject = s;
      } catch (e) {
        alert("Camera permission denied or unavailable.");
      }
    }
  };

  const triggerGlitch = () => {
    setGlitching(true);
    setTimeout(() => setGlitching(false), 600);
  };

  return (
    <div className="max-w-4xl mx-auto glass rounded-3xl overflow-hidden">
      <div className="flex border-b border-cyan-500/30">
        {[
          { id: 'brute', label: 'BRUTE FORCE', icon: Terminal },
          { id: 'voice', label: 'VOICE MASK', icon: Mic },
          { id: 'cam', label: 'GLITCH CAM', icon: Camera },
        ].map(tab => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-5 flex items-center justify-center gap-3 text-sm uppercase tracking-widest transition ${activeTab === tab.id ? 'bg-slate-950 text-cyan-400 border-b-2 border-cyan-400' : 'hover:bg-slate-900'}`}
            >
              <Icon size={18} /> {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === 'brute' && (
        <div className="p-10">
          <div className="relative">
            <canvas ref={canvasRef} className="w-full rounded-2xl border border-green-500/40 bg-black" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <div className="text-green-400 text-xl mb-4">MATRIX ENTROPY CRACKER</div>
                <input
                  type="text"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="ENTER TARGET PASSWORD"
                  className="bg-transparent border-b border-green-500 text-center text-3xl w-96 outline-none"
                />
              </div>
            </div>
          </div>

          <button
            onClick={startCrack}
            disabled={cracking || !password}
            className="mt-8 w-full py-6 bg-green-500 hover:bg-green-400 disabled:bg-slate-700 text-black font-bold text-xl tracking-[3px]"
          >
            {cracking ? 'CRACKING IN PROGRESS...' : 'INITIATE BRUTE FORCE'}
          </button>

          {entropy > 0 && (
            <div className="mt-8 text-center">
              <div className="text-xs uppercase tracking-widest text-green-400">ENTROPY STRENGTH</div>
              <div className="text-6xl font-bold text-green-400">{entropy}</div>
              <div className="text-sm text-slate-400">BITS • {entropy > 80 ? 'UNCRACKABLE IN 10^12 YEARS' : 'CRACKED IN 4.2s'}</div>
            </div>
          )}
        </div>
      )}

      {activeTab === 'voice' && (
        <div className="p-10 space-y-8">
          <textarea
            value={text}
            onChange={e => setText(e.target.value)}
            className="w-full h-32 bg-slate-950 border border-cyan-400/30 rounded-2xl p-6 text-lg"
          />

          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">PITCH SHIFT</label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={pitch}
                onChange={e => setPitch(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <div className="text-right text-xs text-cyan-400">{pitch.toFixed(1)}x</div>
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest mb-2">SPEED</label>
              <input
                type="range"
                min="0.7"
                max="1.6"
                step="0.1"
                value={rate}
                onChange={e => setRate(parseFloat(e.target.value))}
                className="w-full accent-cyan-400"
              />
              <div className="text-right text-xs text-cyan-400">{rate.toFixed(1)}x</div>
            </div>
          </div>

          <button onClick={speak} className="w-full py-7 bg-cyan-500 text-black text-xl font-bold tracking-widest rounded-2xl">
            TRANSMIT MASKED VOICE
          </button>
        </div>
      )}

      {activeTab === 'cam' && (
        <div className="p-10">
          <div className="relative rounded-3xl overflow-hidden border-2 border-green-500/60 bg-black aspect-video">
            <video
              ref={videoRef}
              autoPlay
              muted
              className={`w-full h-full object-cover ${stream ? '' : 'hidden'} ${glitching ? 'glitch' : ''}`}
              style={{ filter: 'hue-rotate(90deg) brightness(1.2) contrast(1.4)' }}
            />
            
            {!stream && (
              <div className="absolute inset-0 flex items-center justify-center text-slate-500 text-xl">
                NIGHT VISION FEED OFFLINE
              </div>
            )}

            {stream && (
              <div className="scanlines absolute inset-0 pointer-events-none" />
            )}

            <div className="absolute top-4 right-4 flex gap-3">
              <button
                onClick={toggleCam}
                className="px-6 py-2 bg-black/70 hover:bg-red-900 border border-white/30 text-sm rounded-xl"
              >
                {stream ? 'DISABLE CAM' : 'ENABLE NIGHT VISION'}
              </button>
              {stream && (
                <button
                  onClick={triggerGlitch}
                  className="px-6 py-2 bg-black/70 hover:bg-orange-900 border border-white/30 text-sm rounded-xl"
                >
                  TRIGGER GLITCH
                </button>
              )}
            </div>

            <div className="absolute bottom-4 left-4 text-[10px] text-green-400 font-mono tracking-widest">LIVE // ENCRYPTED // 00:00:00</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Underground;
