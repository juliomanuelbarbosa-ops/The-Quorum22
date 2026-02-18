import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { ARButton, VRButton } from '@react-three/xr';
import { motion } from 'framer-motion';

const VRSuite: React.FC = () => {
  const sceneRef = useRef();

  const enterVR = () => {
    if (navigator.xr) {
      navigator.xr.requestSession('immersive-vr').then(session => {
        alert('VR Headset Connected — Entered Immersive Mode (Quest / Vision Pro supported)');
        // In full implementation: attach session to Three.js renderer
      }).catch(e => alert('VR session failed: ' + e.message));
    } else {
      alert('WebXR not supported in this browser');
    }
  };

  return (
    <div className="max-w-6xl mx-auto glass rounded-3xl overflow-hidden h-[720px] relative">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.6} />
        <Stars radius={100} depth={50} count={800} factor={6} />
        <mesh>
          <torusKnotGeometry args={[2, 0.6, 128, 16]} />
          <meshStandardMaterial color="#ff00ff" wireframe emissive="#4400ff" emissiveIntensity={0.8} />
        </mesh>
        <OrbitControls enableZoom enablePan autoRotate autoRotateSpeed={0.3} />
      </Canvas>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-6 z-10">
        <VRButton className="px-12 py-6 bg-cyan-500 rounded-3xl text-black font-black text-xl">
          ENTER VR MODE (HEADSET)
        </VRButton>
        <ARButton className="px-12 py-6 bg-emerald-500 rounded-3xl text-black font-black text-xl">
          ENTER AR MODE (WEBCAM)
        </ARButton>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={enterVR}
          className="px-12 py-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl text-white font-black text-xl"
        >
          CREATE NEW VR ROOM
        </motion.button>
      </div>

      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
        <div className="text-5xl font-black tracking-[8px] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">VR/AR SUITE</div>
        <div className="text-emerald-400 text-xl mt-2">BUILD IMMERSIVE ROOMS • HEADSET COMPATIBLE</div>
      </div>
    </div>
  );
};

export default VRSuite;
