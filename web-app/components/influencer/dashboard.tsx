"use client";

import Image from "next/image";
import { useState } from "react";
import { InfluencerSidebar } from "./sidebar";
import { CampaignBrowser } from "./campaign-browser";
import { MyCampaigns } from "./my-campaigns";
import { EarningsView } from "./earnings";

interface InfluencerDashboardProps {
  walletAddress: string;
}

type View = "dashboard" | "browse" | "my-campaigns" | "earnings" | "statistics";

export function InfluencerDashboard({ walletAddress }: InfluencerDashboardProps) {
  const [currentView, setCurrentView] = useState<View>("dashboard");

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <InfluencerSidebar
        currentView={currentView}
        onViewChange={setCurrentView}
        walletAddress={walletAddress}
      />

      {/* Main Content */}
      <div className="flex-1 ml-64">
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="px-8 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-foreground">
              {currentView === "dashboard" && "Dashboard"}
              {currentView === "browse" && "Browse Campaigns"}
              {currentView === "my-campaigns" && "My Campaigns"}
              {currentView === "earnings" && "Rewards"}
              {currentView === "statistics" && "Statistics"}
            </h1>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="w-9 h-9 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground font-medium">
                {walletAddress.slice(2, 4).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          {currentView === "dashboard" && (
            <DashboardView onViewChange={setCurrentView} />
          )}
          {currentView === "browse" && <CampaignBrowser />}
          {currentView === "my-campaigns" && <MyCampaigns />}
          {currentView === "earnings" && <EarningsView />}
          {currentView === "statistics" && <StatisticsView />}
        </main>
      </div>
    </div>
  );
}

function DashboardView({ onViewChange }: { onViewChange: (view: View) => void }) {
  const earnings = {
    total: 12450.0,
    pending: 245.5,
    available: 12204.5,
  };

  const recentTransactions = [
    { type: "checkout", campaign: "Nike Summer", amount: 12.5, time: "Just now" },
    { type: "cart", campaign: "Nike Summer", amount: 0.5, time: "2 min ago" },
    { type: "view", campaign: "Adidas Sport", amount: 0.1, time: "5 min ago" },
    { type: "checkout", campaign: "Nike Summer", amount: 12.5, time: "12 min ago" },
    { type: "view", campaign: "H&M Fashion", amount: 0.1, time: "15 min ago" },
  ];

  const activity = [
    { platform: "TikTok", link: "growi.me/alex/d1", clicks: 1200 },
    { platform: "Story QR", scans: 482 },
  ];

  return (
    <div className="space-y-8">
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-card rounded-2xl border border-border">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-sm text-muted-foreground">Real-time Earnings</p>
              <p className="text-4xl font-bold text-foreground">${earnings.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>
            <button
              onClick={() => onViewChange("earnings")}
              className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Withdraw
            </button>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted/50 rounded-xl">
              <p className="text-sm text-muted-foreground">Available</p>
              <p className="text-2xl font-semibold text-primary">${earnings.available.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>
            <div className="p-4 bg-muted/50 rounded-xl">
              <p className="text-sm text-muted-foreground">Pending</p>
              <p className="text-2xl font-semibold text-secondary">${earnings.pending.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </div>

        {/* Live Transactions */}
        <div className="p-6 bg-card rounded-2xl border border-border">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <h3 className="font-semibold text-foreground">Live Transactions</h3>
          </div>
          <div className="space-y-3 max-h-52 overflow-y-auto">
            {recentTransactions.map((tx, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${
                    tx.type === "checkout" ? "bg-primary" : tx.type === "cart" ? "bg-secondary" : "bg-muted-foreground"
                  }`} />
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.campaign}</p>
                    <p className="text-xs text-muted-foreground">{tx.time}</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-primary">+${tx.amount.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Activity & Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Activity */}
        <div className="p-6 bg-card rounded-2xl border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Activity</h3>
          <div className="grid grid-cols-2 gap-4">
            {activity.map((item, i) => (
              <div key={i} className="p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                  {item.platform === "TikTok" ? (
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                    </svg>
                  )}
                  {item.platform}
                </div>
                {item.link && <p className="text-xs text-muted-foreground mb-1 font-mono">{item.link}</p>}
                <p className="text-xl font-semibold text-foreground">
                  {item.clicks ? `${item.clicks.toLocaleString()} clicks` : `${item.scans} scans`}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 bg-card rounded-2xl border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button
              onClick={() => onViewChange("browse")}
              className="w-full flex items-center gap-4 p-4 bg-muted/50 hover:bg-muted rounded-xl transition-colors text-left"
            >
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">Browse Campaigns</p>
                <p className="text-sm text-muted-foreground">Find new opportunities</p>
              </div>
            </button>
            <button
              onClick={() => onViewChange("my-campaigns")}
              className="w-full flex items-center gap-4 p-4 bg-muted/50 hover:bg-muted rounded-xl transition-colors text-left"
            >
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center text-secondary">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-foreground">My Campaigns</p>
                <p className="text-sm text-muted-foreground">View active bounties</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Available Campaigns Preview */}
      <div className="bg-card rounded-2xl border border-border">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Hot Campaigns</h3>
          <button
            onClick={() => onViewChange("browse")}
            className="text-sm text-primary font-medium hover:underline"
          >
            View All
          </button>
        </div>
        <div className="p-6 grid md:grid-cols-3 gap-4">
          {[
            { name: "Nike Summer", type: "CPA", payout: "$12.50/sale", hot: true },
            { name: "Adidas Sport", type: "CPA", payout: "$10.00/sale", hot: true },
            { name: "H&M Fashion", type: "CPL", payout: "$5.00/lead", hot: false },
          ].map((campaign, i) => (
            <div key={i} className="p-4 bg-muted/50 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-xs font-bold">
                  {campaign.name.slice(0, 2).toUpperCase()}
                </div>
                {campaign.hot && (
                  <span className="px-2 py-0.5 bg-secondary/10 text-secondary text-xs font-medium rounded">HOT</span>
                )}
              </div>
              <h4 className="mt-3 font-medium text-foreground">{campaign.name}</h4>
              <p className="text-sm text-muted-foreground">{campaign.type}</p>
              <p className="mt-2 font-semibold text-primary">{campaign.payout}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatisticsView() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: "Total Views Generated", value: "45,230", change: "+12%" },
          { label: "Total Add to Carts", value: "3,420", change: "+8%" },
          { label: "Total Checkouts", value: "289", change: "+23%" },
        ].map((stat) => (
          <div key={stat.label} className="p-6 bg-card rounded-2xl border border-border">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-foreground">{stat.value}</p>
            <p className="mt-1 text-sm text-primary">{stat.change} this month</p>
          </div>
        ))}
      </div>

      <div className="p-6 bg-card rounded-2xl border border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Conversion Funnel</h3>
        <div className="flex items-end justify-center gap-8 h-64">
          {[
            { label: "Views", value: 45230, height: "100%" },
            { label: "Add to Cart", value: 3420, height: "60%" },
            { label: "Checkout", value: 289, height: "25%" },
          ].map((stage, i) => (
            <div key={i} className="flex flex-col items-center">
              <div
                className="w-24 bg-primary/80 rounded-t-lg transition-all"
                style={{ height: stage.height }}
              />
              <p className="mt-2 font-medium text-foreground">{stage.label}</p>
              <p className="text-sm text-muted-foreground">{stage.value.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
