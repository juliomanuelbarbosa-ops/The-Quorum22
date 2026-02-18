import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import { playSound } from './SoundEffects';

const QuantumEncryptor: React.FC = () => {
  const [message, setMessage] = useState('The Quorum is unstoppable');
  const [encrypted, setEncrypted] = useState('');
  const [qubits, setQubits] = useState(8);
  const [step, setStep] = useState(0);

  const simulateQuantumEncrypt = () => {
    playSound('launch');
    const noise = Array.from({length: qubits}, () => Math.random() > 0.5 ? '1' : '0').join('');
    const base64 = btoa(message);
    setEncrypted(`${base64} [QUANTUM ENTANGLED NOISE: ${noise}]`);
    setStep(1);
    setTimeout(() => setStep(0), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto glass rounded-3xl p-12">
      <div className="text-6xl font-black tracking-widest text-cyan-400 mb-12 text-center">QUANTUM KEY DISTRIBUTION VISUALIZER</div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Message to quantum-encrypt..."
            className="w-full h-32 bg-slate-950 border border-cyan-500/30 rounded-3xl p-6 font-mono text-lg resize-none"
          />

          <div className="flex items-center gap-6">
            <label className="text-sm text-slate-400">Qubits:</label>
            <input
              type="range"
              min="4"
              max="16"
              value={qubits}
              onChange={e => setQubits(parseInt(e.target.value))}
              className="flex-1 accent-cyan-400"
            />
            <span className="text-cyan-400 font-bold">{qubits}</span>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={simulateQuantumEncrypt}
            className="w-full py-8 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl text-white font-black text-3xl tracking-widest flex items-center justify-center gap-4"
          >
            <Zap className="w-8 h-8" /> RUN BB84 PROTOCOL
          </motion.button>

          {encrypted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass p-8 rounded-3xl text-cyan-300 font-mono break-all text-sm"
            >
              {encrypted}
            </motion.div>
          )}
        </div>

        <div className="relative h-96 bg-black rounded-3xl overflow-hidden border border-purple-500/30">
          <Canvas camera={{ position: [0, 0, 10] }}>
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} color="#ff00ff" />
            <Stars radius={100} depth={50} count={500} factor={4} />
            <mesh>
              <torusGeometry args={[3, 0.4, 16, 100]} />
              <meshStandardMaterial color="#00f3ff" wireframe emissive="#4400ff" emissiveIntensity={0.8} />
            </mesh>
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>

          {step > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <div className="text-4xl font-black text-purple-400 animate-pulse">ENTANGLEMENT ACTIVE</div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuantumEncryptor;
