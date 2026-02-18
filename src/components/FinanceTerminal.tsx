import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { TrendingUp, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';
import { playSound } from './SoundEffects';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const FinanceTerminal: React.FC<{ title: string }> = ({ title }) => {
  const [coins, setCoins] = useState<any[]>([]);
  const [fearGreed, setFearGreed] = useState<any>(null);
  const [chartData, setChartData] = useState<any>({ labels: [], datasets: [] });

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=8&page=1');
        const data = await res.json();
        setCoins(data);
        setChartData({
          labels: data.map((c: any) => c.symbol.toUpperCase()),
          datasets: [{
            label: 'Price USD',
            data: data.map((c: any) => c.current_price),
            borderColor: '#00ff41',
            tension: 0.4,
            borderWidth: 3,
          }]
        });
        playSound('scan');
      } catch (e) {}
    };

    const fetchFearGreed = async () => {
      const res = await fetch('https://api.alternative.me/fng/?limit=1');
      const data = await res.json();
      setFearGreed(data.data[0]);
    };

    fetchCoins(); fetchFearGreed();
    const i = setInterval(() => { fetchCoins(); fetchFearGreed(); }, 9000);
    return () => clearInterval(i);
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-3xl p-10 neon-cyan">
        <div className="flex justify-between mb-10">
          <div>
            <div className="text-emerald-400 text-sm tracking-[4px]">COINGECKO + FEAR & GREED LIVE</div>
            <div className="text-5xl font-black tracking-widest">{title}</div>
          </div>
          <DollarSign className="w-20 h-20 text-emerald-400" />
        </div>

        {fearGreed && (
          <div className="mb-8 glass rounded-2xl p-6 flex items-center gap-8">
            <div className="text-6xl font-black text-amber-400">{fearGreed.value}</div>
            <div>
              <div className="uppercase text-xs tracking-widest">CRYPTO FEAR & GREED</div>
              <div className="text-3xl font-bold">{fearGreed.value_classification}</div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass rounded-2xl p-6 border border-emerald-500/30">
            <Line data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
          <div className="glass rounded-2xl overflow-hidden border border-emerald-500/30 max-h-[420px] overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-950 sticky top-0">
                <tr className="border-b border-emerald-500/30">
                  <th className="text-left p-5">COIN</th>
                  <th className="text-right p-5">PRICE</th>
                  <th className="text-right p-5">24H</th>
                </tr>
              </thead>
              <tbody>
                {coins.map((coin, i) => (
                  <tr key={i} className="border-b border-slate-800 hover:bg-slate-900/60">
                    <td className="p-5 font-medium">{coin.name}</td>
                    <td className="p-5 text-right font-mono">${coin.current_price.toLocaleString()}</td>
                    <td className={`p-5 text-right font-bold ${coin.price_change_percentage_24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                      {coin.price_change_percentage_24h?.toFixed(1)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.03 }}
          onClick={() => { playSound('launch'); window.dispatchEvent(new CustomEvent('askGrok', { detail: `Real-time alpha + Fear & Greed on ${title}` })); }}
          className="mt-12 w-full py-7 bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-3xl text-black font-black text-2xl tracking-widest flex items-center justify-center gap-3"
        >
          <TrendingUp /> ASK GROK FOR DEEP ALPHA
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FinanceTerminal;
