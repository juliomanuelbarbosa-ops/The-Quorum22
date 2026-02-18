import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const MultiSigHub: React.FC = () => {
  const [signatures, setSignatures] = useState(0);
  const [txProposed, setTxProposed] = useState(false);

  const approve = () => {
    setSignatures(s => Math.min(3, s + 1));
  };

  return (
    <div className="max-w-4xl mx-auto glass rounded-3xl p-12">
      <div className="text-center mb-12">
        <Users className="mx-auto w-24 h-24 text-purple-400" />
        <div className="text-6xl font-black tracking-widest mt-6">MULTI-SIG VAULT 2-OF-3</div>
      </div>

      {!txProposed ? (
        <motion.button onClick={() => setTxProposed(true)} className="w-full py-16 bg-purple-600 rounded-3xl text-3xl font-black">
          PROPOSE NEW TRANSACTION
        </motion.button>
      ) : (
        <div className="space-y-8">
          <div className="glass p-8 rounded-3xl text-center text-2xl">0x123... → 1.5 ETH</div>
          <div className="flex justify-center gap-8">
            {[1,2,3].map(i => (
              <motion.button
                key={i}
                whileHover={{scale:1.1}}
                onClick={approve}
                disabled={signatures >= i}
                className="w-48 h-48 glass rounded-3xl flex flex-col items-center justify-center border-2 border-purple-400 disabled:opacity-30"
              >
                SIGNER {i} {signatures >= i && '✅'}
              </motion.button>
            ))}
          </div>
          <div className="text-center text-4xl font-black text-emerald-400">{signatures}/3 SIGNED</div>
        </div>
      )}
    </div>
  );
};

export default MultiSigHub;
