import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, ExternalLink } from 'lucide-react';

const theories = [
  { name: "MKUltra", desc: "CIA mind control experiments (declassified 1975)", link: "https://en.wikipedia.org/wiki/MKUltra" },
  { name: "Operation Paperclip", desc: "US recruitment of Nazi scientists post-WWII", link: "https://en.wikipedia.org/wiki/Operation_Paperclip" },
  { name: "Tuskegee Syphilis Study", desc: "Unethical medical study on African American men", link: "https://en.wikipedia.org/wiki/Tuskegee_Syphilis_Study" },
  { name: "Gulf of Tonkin", desc: "Incident that escalated Vietnam War", link: "https://en.wikipedia.org/wiki/Gulf_of_Tonkin_incident" },
  { name: "Iran-Contra Affair", desc: "Secret arms sales and funding", link: "https://en.wikipedia.org/wiki/Iran%E2%80%93Contra_affair" },
  { name: "COINTELPRO", desc: "FBI disruption of political groups", link: "https://en.wikipedia.org/wiki/COINTELPRO" },
  { name: "Operation Northwoods", desc: "Proposed false flag operations (declassified)", link: "https://en.wikipedia.org/wiki/Operation_Northwoods" },
  { name: "Project Blue Book", desc: "USAF UFO investigation", link: "https://en.wikipedia.org/wiki/Project_Blue_Book" },
  { name: "JFK Assassination", desc: "Multiple theories on CIA involvement", link: "https://en.wikipedia.org/wiki/John_F._Kennedy_assassination_conspiracy_theories" },
  { name: "9/11 Inside Job", desc: "Controlled demolition and foreknowledge claims", link: "https://en.wikipedia.org/wiki/9/11_conspiracy_theories" },
  { name: "New World Order", desc: "Global elite control theories", link: "https://en.wikipedia.org/wiki/New_World_Order_(conspiracy_theory)" },
  { name: "Illuminati", desc: "Secret society influencing world events", link: "https://en.wikipedia.org/wiki/Illuminati" },
  { name: "Flat Earth", desc: "Earth is flat conspiracy", link: "https://en.wikipedia.org/wiki/Flat_Earth" },
  { name: "Moon Landing Hoax", desc: "NASA faked Apollo landings", link: "https://en.wikipedia.org/wiki/Moon_landing_conspiracy_theories" },
  { name: "Chemtrails", desc: "Aircraft trails used for population control", link: "https://en.wikipedia.org/wiki/Chemtrail_conspiracy_theory" },
  { name: "HAARP", desc: "Weather control weapon", link: "https://en.wikipedia.org/wiki/High-frequency_Active_Auroral_Research_Program" },
  { name: "Philadelphia Experiment", desc: "Navy invisibility/teleportation test", link: "https://en.wikipedia.org/wiki/Philadelphia_Experiment" },
  { name: "Dulce Base", desc: "Underground alien/human base", link: "https://en.wikipedia.org/wiki/Dulce_Base" },
  { name: "Majestic 12", desc: "Secret UFO committee", link: "https://en.wikipedia.org/wiki/Majestic_12" },
  { name: "Area 51", desc: "Alien technology reverse engineering", link: "https://en.wikipedia.org/wiki/Area_51" },
  { name: "Bohemian Grove", desc: "Elite occult rituals", link: "https://en.wikipedia.org/wiki/Bohemian_Grove" },
  { name: "Bilderberg Group", desc: "Secret global policy meetings", link: "https://en.wikipedia.org/wiki/Bilderberg_Meeting" },
  { name: "Federal Reserve Conspiracy", desc: "Private banking cartel control", link: "https://en.wikipedia.org/wiki/History_of_the_Federal_Reserve_System" },
  { name: "Reptilian Elite", desc: "Shapeshifting lizard people", link: "https://en.wikipedia.org/wiki/Reptilian_conspiracy_theory" },
  { name: "Mandela Effect", desc: "Collective false memories", link: "https://en.wikipedia.org/wiki/False_memory" },
  { name: "Simulation Theory", desc: "We live in a computer simulation", link: "https://en.wikipedia.org/wiki/Simulation_hypothesis" },
  { name: "Great Replacement", desc: "Demographic shift conspiracy", link: "https://en.wikipedia.org/wiki/Great_Replacement_conspiracy_theory" },
  { name: "Pizzagate", desc: "Child trafficking ring allegations", link: "https://en.wikipedia.org/wiki/Pizzagate_conspiracy_theory" },
  { name: "FEMA Camps", desc: "Government detention facilities", link: "https://en.wikipedia.org/wiki/FEMA_camps_conspiracy_theory" },
  { name: "Antarctica Secrets", desc: "Hidden bases / ancient civilization", link: "https://en.wikipedia.org/wiki/Vostok_Station" },
  { name: "Hollow Earth", desc: "Inner world with entrances at poles", link: "https://en.wikipedia.org/wiki/Hollow_Earth" },
  { name: "Time Travel Coverup", desc: "Government time travel tech", link: "https://en.wikipedia.org/wiki/Time_travel_claims_and_urban_legends" },
  { name: "Project Looking Glass", desc: "Future-viewing technology", link: "https://en.wikipedia.org/wiki/Project_Looking_Glass_(conspiracy_theory)" },
  { name: "Black Knight Satellite", desc: "Alien probe in orbit", link: "https://en.wikipedia.org/wiki/Black_Knight_satellite_conspiracy_theory" },
];

const GreatAwakeningHub: React.FC = () => {
  const [selected, setSelected] = useState<any>(null);

  return (
    <div className="max-w-6xl mx-auto relative h-[720px] glass rounded-3xl overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#ff00ff20_1px,transparent_1px)] bg-[length:30px_30px]" />
      
      <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center z-10">
        <div className="text-6xl font-black tracking-[8px] text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-purple-400">THE GREAT AWAKENING MAP v2</div>
        <div className="text-emerald-400 text-xl mt-2">35+ TRUTH NODES • INTERACTIVE EXPLORATION</div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        {theories.map((theory, i) => (
          <motion.div
            key={i}
            className="absolute w-48 text-center cursor-pointer"
            style={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
            }}
            whileHover={{ scale: 1.3, rotate: 5 }}
            onClick={() => setSelected(theory)}
          >
            <div className="w-5 h-5 mx-auto mb-3 bg-red-400 rounded-full animate-pulse" />
            <div className="font-bold text-red-300 text-lg tracking-wider">{theory.name}</div>
          </motion.div>
        ))}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute inset-0 flex items-center justify-center bg-black/90 z-50"
          onClick={() => setSelected(null)}
        >
          <div className="glass max-w-lg p-12 rounded-3xl text-center" onClick={e => e.stopPropagation()}>
            <div className="text-4xl font-black text-red-400 mb-6">{selected.name}</div>
            <p className="text-lg text-slate-300 leading-relaxed mb-8">{selected.desc}</p>
            <a href={selected.link} target="_blank" className="inline-flex items-center gap-3 px-10 py-5 bg-red-600 rounded-3xl text-white font-bold hover:bg-red-500">
              EXPLORE FULL ARCHIVE <ExternalLink size={20} />
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default GreatAwakeningHub;
