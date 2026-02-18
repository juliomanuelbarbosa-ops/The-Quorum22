import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { WalletProvider } from './context/WalletContext'
import { LiveDataProvider } from './context/LiveDataContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WalletProvider>
      <LiveDataProvider>
        <App />
      </LiveDataProvider>
    </WalletProvider>
  </React.StrictMode>,
)
