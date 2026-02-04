"use client";

import { useState } from "react";

interface Transaction {
  id: string;
  type: "view" | "cart" | "checkout" | "withdrawal";
  campaign: string;
  amount: number;
  date: string;
  status: "completed" | "pending";
}

const MOCK_TRANSACTIONS: Transaction[] = [
  { id: "1", type: "checkout", campaign: "Nike Summer", amount: 12.5, date: "2026-02-04 14:32", status: "completed" },
  { id: "2", type: "cart", campaign: "Nike Summer", amount: 0.5, date: "2026-02-04 14:30", status: "completed" },
  { id: "3", type: "view", campaign: "Adidas Sport", amount: 0.1, date: "2026-02-04 14:25", status: "completed" },
  { id: "4", type: "checkout", campaign: "Nike Summer", amount: 12.5, date: "2026-02-04 14:20", status: "completed" },
  { id: "5", type: "withdrawal", campaign: "-", amount: -500.0, date: "2026-02-03 10:00", status: "completed" },
  { id: "6", type: "checkout", campaign: "H&M Fashion", amount: 5.0, date: "2026-02-03 09:45", status: "completed" },
  { id: "7", type: "cart", campaign: "Adidas Sport", amount: 0.4, date: "2026-02-03 09:30", status: "pending" },
];

export function EarningsView() {
  const [transactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const earnings = {
    total: 12450.0,
    available: 12204.5,
    pending: 245.5,
    withdrawn: 500.0,
  };

  const handleWithdraw = () => {
    alert(`Withdrawing $${withdrawAmount} to your wallet (Demo)`);
    setShowWithdrawModal(false);
    setWithdrawAmount("");
  };

  return (
    <div className="space-y-8">
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 bg-card rounded-2xl border border-border">
          <p className="text-sm text-muted-foreground">Total Earnings</p>
          <p className="mt-2 text-3xl font-bold text-foreground">${earnings.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="p-6 bg-card rounded-2xl border border-border">
          <p className="text-sm text-muted-foreground">Available Balance</p>
          <p className="mt-2 text-3xl font-bold text-primary">${earnings.available.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="p-6 bg-card rounded-2xl border border-border">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="mt-2 text-3xl font-bold text-secondary">${earnings.pending.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        </div>
        <div className="p-6 bg-card rounded-2xl border border-border">
          <p className="text-sm text-muted-foreground">Total Withdrawn</p>
          <p className="mt-2 text-3xl font-bold text-foreground">${earnings.withdrawn.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
        </div>
      </div>

      {/* Withdraw Card */}
      <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Withdraw Earnings</h3>
            <p className="text-muted-foreground">Transfer your earnings to your connected wallet</p>
          </div>
          <button
            onClick={() => setShowWithdrawModal(true)}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Withdraw to Wallet
          </button>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-card rounded-2xl border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Transaction History</h3>
        </div>
        <div className="divide-y divide-border">
          {transactions.map((tx) => (
            <div key={tx.id} className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    tx.type === "checkout"
                      ? "bg-primary/10 text-primary"
                      : tx.type === "cart"
                      ? "bg-secondary/10 text-secondary"
                      : tx.type === "withdrawal"
                      ? "bg-muted text-muted-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {tx.type === "checkout" && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                  {tx.type === "cart" && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                  {tx.type === "view" && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                  {tx.type === "withdrawal" && (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  )}
                </div>
                <div>
                  <p className="font-medium text-foreground capitalize">
                    {tx.type === "withdrawal" ? "Withdrawal" : `${tx.type} conversion`}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {tx.campaign} - {tx.date}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${tx.amount > 0 ? "text-primary" : "text-foreground"}`}>
                  {tx.amount > 0 ? "+" : ""}${Math.abs(tx.amount).toFixed(2)}
                </p>
                <p className={`text-xs ${tx.status === "completed" ? "text-primary" : "text-secondary"}`}>
                  {tx.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setShowWithdrawModal(false)}
          />
          <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Withdraw Earnings</h2>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-4 bg-muted/50 rounded-xl mb-6">
              <p className="text-sm text-muted-foreground">Available Balance</p>
              <p className="text-2xl font-bold text-primary">${earnings.available.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Amount to Withdraw</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder="0.00"
                    max={earnings.available}
                    className="w-full pl-8 pr-4 py-3 bg-muted rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
              <button
                onClick={() => setWithdrawAmount(earnings.available.toString())}
                className="text-sm text-primary font-medium hover:underline"
              >
                Withdraw Max
              </button>
            </div>

            <button
              onClick={handleWithdraw}
              disabled={!withdrawAmount || parseFloat(withdrawAmount) <= 0 || parseFloat(withdrawAmount) > earnings.available}
              className="mt-6 w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm Withdrawal
            </button>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              Funds will be sent to your connected wallet address
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
