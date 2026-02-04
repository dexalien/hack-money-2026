"use client";

import { useState } from "react";

interface WalletConnectModalProps {
  onClose: () => void;
  onConnect: (address: string) => void;
}

const WALLETS = [
  {
    name: "MetaMask",
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <path fill="#E17726" d="M38.17 3.02L22.95 14.18l2.82-6.66 12.4-4.5z"/>
        <path fill="#E27625" d="M1.83 3.02l15.08 11.28-2.68-6.78-12.4-4.5zM32.6 28.02l-4.05 6.2 8.67 2.38 2.49-8.45-7.11-.13zM.32 28.15l2.47 8.45 8.65-2.38-4.03-6.2-7.09.13z"/>
        <path fill="#E27625" d="M11.02 17.38l-2.4 3.64 8.56.38-.3-9.22-5.86 5.2zM28.98 17.38l-5.94-5.32-.2 9.34 8.54-.38-2.4-3.64zM11.44 34.22l5.15-2.5-4.45-3.47-.7 5.97zM23.41 31.72l5.14 2.5-.7-5.97-4.44 3.47z"/>
        <path fill="#D5BFB2" d="M28.55 34.22l-5.14-2.5.41 3.35-.04 1.42 4.77-2.27zM11.44 34.22l4.78 2.27-.03-1.42.4-3.35-5.15 2.5z"/>
        <path fill="#233447" d="M16.3 26.1l-4.28-1.26 3.02-1.38 1.26 2.64zM23.7 26.1l1.26-2.64 3.04 1.38-4.3 1.26z"/>
        <path fill="#CC6228" d="M11.44 34.22l.73-6.2-4.78.13 4.05 6.07zM27.83 28.02l.72 6.2 4.05-6.07-4.77-.13zM31.38 21.02l-8.54.38.8 4.7 1.26-2.64 3.04 1.38 3.44-3.82zM12.02 24.84l3.02-1.38 1.26 2.64.8-4.7-8.56-.38 3.48 3.82z"/>
        <path fill="#E27625" d="M8.54 21.02l3.6 7.01-.12-3.19-3.48-3.82zM27.94 24.84l-.14 3.19 3.58-7.01-3.44 3.82zM17.1 21.4l-.8 4.7 1 5.18.22-6.82-0.42-3.06zM22.84 21.4l-.4 3.04.2 6.84 1.02-5.18-.82-4.7z"/>
        <path fill="#F5841F" d="M23.66 26.1l-1.02 5.18.73.5 4.44-3.47.14-3.19-4.29 1zM12.02 24.84l.12 3.19 4.45 3.47.73-.5-1-5.18-4.3-1z"/>
        <path fill="#C0AC9D" d="M23.75 36.49l.04-1.42-.39-.33h-6.8l-.37.33.03 1.42-4.78-2.27 1.67 1.37 3.39 2.35h6.9l3.4-2.35 1.68-1.37-4.77 2.27z"/>
        <path fill="#161616" d="M23.41 31.72l-.73-.5h-5.36l-.73.5-.4 3.35.37-.33h6.8l.39.33-.34-3.35z"/>
        <path fill="#763E1A" d="M38.96 15l1.29-6.27-1.93-5.9-14.91 11.05 5.74 4.85 8.1 2.36 1.79-2.08-.78-.56 1.23-1.12-.94-.73 1.23-.94-.82-.64zM0 8.73L1.3 15l-.83.62 1.24.94-.94.73 1.23 1.12-.78.56 1.78 2.08 8.1-2.36 5.74-4.85L2.93 2.77.99 8.73z"/>
        <path fill="#F5841F" d="M37.25 21.09l-8.1-2.36 2.4 3.64-3.58 7.01 4.73-.06h7.07l-2.52-8.23zM10.85 18.73l-8.1 2.36-2.47 8.23h7.07l4.72.06-3.6-7.01 2.38-3.64zM22.84 21.4l.52-8.93 2.36-6.38H14.28l2.36 6.38.52 8.93.18 3.08.02 6.8h5.36l.02-6.8.1-3.08z"/>
      </svg>
    ),
  },
  {
    name: "WalletConnect",
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#3B99FC"/>
        <path d="M12.12 15.24c4.35-4.26 11.41-4.26 15.76 0l.52.51a.54.54 0 010 .78l-1.79 1.75a.28.28 0 01-.39 0l-.72-.71c-3.04-2.97-7.96-2.97-11 0l-.77.75a.28.28 0 01-.39 0l-1.79-1.75a.54.54 0 010-.78l.57-.55zm19.47 3.63l1.6 1.56a.54.54 0 010 .78l-7.2 7.06a.56.56 0 01-.79 0l-5.11-5.01a.14.14 0 00-.2 0l-5.11 5.01a.56.56 0 01-.79 0L6.8 21.21a.54.54 0 010-.78l1.6-1.56a.56.56 0 01.79 0l5.11 5.01c.06.06.15.06.2 0l5.11-5.01a.56.56 0 01.79 0l5.11 5.01c.06.06.15.06.2 0l5.11-5.01a.56.56 0 01.78 0z" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: "Coinbase Wallet",
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#0052FF"/>
        <path d="M20 6a14 14 0 100 28 14 14 0 000-28zm0 22.4a8.4 8.4 0 110-16.8 8.4 8.4 0 010 16.8z" fill="#fff"/>
        <path d="M17.2 17.2h5.6v5.6h-5.6z" fill="#fff"/>
      </svg>
    ),
  },
  {
    name: "Phantom",
    icon: (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="8" fill="#AB9FF2"/>
        <path d="M29.22 20.67c-1.54 0-2.3-1.13-2.3-2.22 0-1.1.76-2.23 2.3-2.23 1.53 0 2.3 1.13 2.3 2.23 0 1.09-.77 2.22-2.3 2.22zm-8.5 0c-1.54 0-2.3-1.13-2.3-2.22 0-1.1.76-2.23 2.3-2.23 1.53 0 2.3 1.13 2.3 2.23 0 1.09-.77 2.22-2.3 2.22zm-8.5 0c-1.54 0-2.3-1.13-2.3-2.22 0-1.1.76-2.23 2.3-2.23 1.53 0 2.3 1.13 2.3 2.23 0 1.09-.77 2.22-2.3 2.22z" fill="#fff"/>
      </svg>
    ),
  },
];

export function WalletConnectModal({ onClose, onConnect }: WalletConnectModalProps) {
  const [connecting, setConnecting] = useState<string | null>(null);

  const handleConnect = async (walletName: string) => {
    setConnecting(walletName);
    // Simulate wallet connection
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // Generate mock wallet address
    const mockAddress = `0x${Math.random().toString(16).slice(2, 10)}...${Math.random().toString(16).slice(2, 6)}`;
    onConnect(mockAddress);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Connect Wallet</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Wallet Options */}
        <div className="space-y-3">
          {WALLETS.map((wallet) => (
            <button
              key={wallet.name}
              onClick={() => handleConnect(wallet.name)}
              disabled={connecting !== null}
              className="w-full flex items-center gap-4 p-4 bg-muted hover:bg-muted/80 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {wallet.icon}
              <span className="font-medium text-foreground">{wallet.name}</span>
              {connecting === wallet.name && (
                <div className="ml-auto">
                  <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-muted-foreground">
          By connecting, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
