import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Connection, PublicKey } from '@solana/web3.js';
import TransportWebHID from '@ledgerhq/hw-transport-webhid';
import Eth from '@ledgerhq/hw-app-eth';
import Solana from '@ledgerhq/hw-app-solana';
import TrezorConnect from '@trezor/connect-web';

type WalletContextType = {
  address: string | null;
  ethBalance: string;
  solBalance: string;
  connectMetaMask: () => Promise<void>;
  connectPhantom: () => Promise<void>;
  connectLedgerETH: () => Promise<void>;
  connectLedgerSOL: () => Promise<void>;
  connectTrezor: () => Promise<void>;
  disconnect: () => void;
  sendTransaction: (to: string, amount: string) => Promise<string>;
  signMessage: (message: string) => Promise<string>;
  isConnected: boolean;
};

const WalletContext = createContext<WalletContextType | null>(null);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [ethBalance, setEthBalance] = useState('0');
  const [solBalance, setSolBalance] = useState('0');
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [hardwareType, setHardwareType] = useState<'ledger' | 'trezor' | null>(null);

  const connectMetaMask = async () => {
    if (!window.ethereum) return alert('MetaMask not found');
    const p = new ethers.BrowserProvider(window.ethereum);
    const accounts = await p.send('eth_requestAccounts', []);
    setAddress(accounts[0]);
    setProvider(p);

    const bal = await p.getBalance(accounts[0]);
    setEthBalance(ethers.formatEther(bal));
    playSound('success');
  };

  const connectPhantom = async () => {
    const solWindow = (window as any).solana;
    if (!solWindow?.isPhantom) return alert('Phantom not found');
    const resp = await solWindow.connect();
    setAddress(resp.publicKey.toString());

    const conn = new Connection('https://api.mainnet-beta.solana.com');
    const bal = await conn.getBalance(new PublicKey(resp.publicKey.toString()));
    setSolBalance((bal / 1e9).toFixed(4));
    playSound('success');
  };

  const connectLedgerETH = async () => {
    try {
      const transport = await TransportWebHID.create();
      const eth = new Eth(transport);
      const { address } = await eth.getAddress("44'/60'/0'/0/0", false);
      setAddress(address);
      setHardwareType('ledger');

      const p = new ethers.BrowserProvider(window.ethereum!);
      const bal = await p.getBalance(address);
      setEthBalance(ethers.formatEther(bal));
      playSound('success');
    } catch (e) {
      alert('Ledger not detected. Make sure Ethereum app is open and Ledger Live is closed.');
    }
  };

  const connectLedgerSOL = async () => {
    try {
      const transport = await TransportWebHID.create();
      const sol = new Solana(transport);
      const { address } = await sol.getAddress("44'/501'/0'/0'");
      setAddress(address);
      setHardwareType('ledger');

      const conn = new Connection('https://api.mainnet-beta.solana.com');
      const bal = await conn.getBalance(new PublicKey(address));
      setSolBalance((bal / 1e9).toFixed(4));
      playSound('success');
    } catch (e) {
      alert('Ledger Solana app not open or permission denied.');
    }
  };

  const connectTrezor = async () => {
    await TrezorConnect.init({ lazyLoad: true });
    const result = await TrezorConnect.ethereumGetAddress({ path: "m/44'/60'/0'/0/0" });
    if (result.success) {
      setAddress(result.payload.address);
      setHardwareType('trezor');
      playSound('success');
    } else {
      alert('Trezor connection failed: ' + result.payload.error);
    }
  };

  const disconnect = () => {
    setAddress(null);
    setEthBalance('0');
    setSolBalance('0');
    setHardwareType(null);
    setProvider(null);
  };

  const sendTransaction = async (to: string, amount: string): Promise<string> => {
    if (!provider || !address) throw new Error('Wallet not connected');
    const signer = await provider.getSigner();
    const tx = await signer.sendTransaction({
      to,
      value: ethers.parseEther(amount),
    });
    await tx.wait();
    return tx.hash;
  };

  const signMessage = async (message: string): Promise<string> => {
    if (!provider) throw new Error('No provider');
    const signer = await provider.getSigner();
    return await signer.signMessage(message);
  };

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accs: string[]) => {
        if (accs.length > 0) setAddress(accs[0]);
        else disconnect();
      });
    }
  }, []);

  return (
    <WalletContext.Provider value={{
      address, ethBalance, solBalance,
      connectMetaMask, connectPhantom,
      connectLedgerETH, connectLedgerSOL, connectTrezor,
      disconnect, sendTransaction, signMessage,
      isConnected: !!address
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be inside WalletProvider');
  return ctx;
};
