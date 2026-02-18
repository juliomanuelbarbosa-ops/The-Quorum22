import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Environment } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import { motion } from 'framer-motion';
import { Stars as IconStars, MapPin } from 'lucide-react';
import { playSound } from './SoundEffects';

const Planet = () => (
  <mesh>
    <sphereGeometry args={[2.2]} />
    <meshStandardMaterial color="#00aaff" emissive="#004466" metalness={0.3} roughness={0.7} />
    {/* Atmosphere glow */}
    <mesh scale={1.12}>
      <sphereGeometry args={[2.2]} />
      <meshBasicMaterial color="#00f3ff" transparent opacity={0.18} />
    </mesh>
    {/* Rings */}
    <mesh rotation={[1.6, 0, 0]}>
      <ringGeometry args={[3.2, 4.8, 64]} />
      <meshBasicMaterial color="#ffdd88" transparent opacity={0.45} side={2} />
    </mesh>
  </mesh>
);

const CosmicPlanetHub: React.FC<{ title: string }> = ({ title }) => {
  const [apod, setApod] = useState<any>(null);
  const [iss, setIss] = useState<any>(null);

  useEffect(() => {
    // NASA Astronomy Picture of the Day
    fetch('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY')
      .then(r => r.json())
      .then(data => setApod(data))
      .catch(() => setApod({ title: "Universe is beautiful", url: "https://picsum.photos/id/1015/1200/600" }));

    // Live ISS location
    const issInterval = setInterval(() => {
      fetch('http://api.open-notify.org/iss-now.json')
        .then(r => r.json())
        .then(setIss)
        .catch(() => {});
    }, 4500);

    return () => clearInterval(issInterval);
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-3xl overflow-hidden h-[680px] relative">
        <Canvas camera={{ position: [0, 0, 8] }} style={{ background: 'transparent' }}>
          <ambientLight intensity={0.3} />
          <pointLight position={[10, 10, 10]} color="#ffaa00" />
          <Planet />
          <Stars radius={300} depth={50} count={1200} factor={6} />
          <Environment preset="space" />
          <OrbitControls enableZoom enablePan={false} autoRotate autoRotateSpeed={0.35} />
          <EffectComposer>
            <Bloom luminanceThreshold={0.6} luminanceSmoothing={0.8} />
          </EffectComposer>
        </Canvas>

        {iss && (
          <div className="absolute top-8 right-8 glass px-6 py-4 rounded-2xl flex items-center gap-4 z-20">
            <MapPin className="text-cyan-400" />
            <div>
              <div className="text-xs text-cyan-400">ISS LIVE POSITION</div>
              <div className="font-mono text-xl">Lat {iss.iss_position.latitude} • Lon {iss.iss_position.longitude}</div>
            </div>
          </div>
        )}

        {apod && (
          <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-3xl flex gap-6 z-20">
            <img src={apod.url} className="w-48 h-32 object-cover rounded-2xl" />
            <div>
              <div className="text-cyan-300 text-sm">NASA ASTRONOMY PICTURE OF THE DAY</div>
              <div className="text-xl font-medium">{apod.title}</div>
            </div>
          </div>
        )}

        <motion.button
          whileHover={{ scale: 1.08 }}
          onClick={() => { playSound('success'); window.dispatchEvent(new CustomEvent('askGrok', { detail: `Analyze NASA APOD + ISS position + ${title}` })); }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 px-24 py-8 bg-gradient-to-r from-cyan-400 to-white rounded-full text-black font-black text-2xl tracking-widest shadow-2xl"
        >
          QUERY THE COSMOS
        </motion.button>
      </motion.div>
    </div>
  );
};

export default CosmicPlanetHub;
