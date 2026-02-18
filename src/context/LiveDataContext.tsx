import React, { createContext, useContext, useEffect, useState } from 'react';

type LivePrice = { symbol: string; price: number };

const LiveDataContext = createContext<{ prices: LivePrice[]; fearGreed: number }>({ prices: [], fearGreed: 50 });

export const LiveDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prices, setPrices] = useState<LivePrice[]>([
    { symbol: 'BTCUSDT', price: 92847 },
    { symbol: 'ETHUSDT', price: 3284 },
    { symbol: 'SOLUSDT', price: 148.9 },
  ]);
  const [fearGreed, setFearGreed] = useState(52);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@ticker/ethusdt@ticker/solusdt@ticker');
    
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.s && data.c) {
        setPrices(prev => prev.map(p => 
          p.symbol === data.s ? { ...p, price: parseFloat(data.c) } : p
        ));
      }
    };

    const fg = setInterval(() => setFearGreed(Math.floor(30 + Math.random() * 60)), 14000);

    return () => { ws.close(); clearInterval(fg); };
  }, []);

  return (
    <LiveDataContext.Provider value={{ prices, fearGreed }}>
      {children}
    </LiveDataContext.Provider>
  );
};

export const useLiveData = () => useContext(LiveDataContext);
