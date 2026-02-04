"use client";

import Image from "next/image";
import { useState } from "react";
import { Sidebar } from "./sidebar";
import { CampaignList } from "./campaign-list";
import { CreateCampaign } from "./create-campaign";
import { APISetup } from "./api-setup";

interface CampaignManagerDashboardProps {
  walletAddress: string;
}

type View = "dashboard" | "campaigns" | "create" | "api-setup" | "inbox";

export function CampaignManagerDashboard({ walletAddress }: CampaignManagerDashboardProps) {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [hasApiConnected, setHasApiConnected] = useState(false);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar
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
              {currentView === "campaigns" && "Your Campaigns"}
              {currentView === "create" && "Create Campaign"}
              {currentView === "api-setup" && "API Setup"}
              {currentView === "inbox" && "Inbox"}
            </h1>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                {walletAddress.slice(2, 4).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        <main className="p-8">
          {currentView === "dashboard" && (
            <DashboardView
              hasApiConnected={hasApiConnected}
              onSetupApi={() => setCurrentView("api-setup")}
              onCreateCampaign={() => setCurrentView("create")}
            />
          )}
          {currentView === "campaigns" && <CampaignList />}
          {currentView === "create" && (
            <CreateCampaign
              hasApiConnected={hasApiConnected}
              onSetupApi={() => setCurrentView("api-setup")}
            />
          )}
          {currentView === "api-setup" && (
            <APISetup
              onComplete={() => {
                setHasApiConnected(true);
                setCurrentView("create");
              }}
            />
          )}
          {currentView === "inbox" && <InboxView />}
        </main>
      </div>
    </div>
  );
}

function DashboardView({
  hasApiConnected,
  onSetupApi,
  onCreateCampaign,
}: {
  hasApiConnected: boolean;
  onSetupApi: () => void;
  onCreateCampaign: () => void;
}) {
  const stats = [
    { label: "Total Spent", value: "$4,250.00", change: "+12.5%", trend: "up" },
    { label: "Active Campaigns", value: "3", change: "+1", trend: "up" },
    { label: "Total Conversions", value: "1,247", change: "+23.1%", trend: "up" },
    { label: "Active Influencers", value: "18", change: "+4", trend: "up" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="p-6 bg-card rounded-2xl border border-border">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-3xl font-semibold text-foreground">{stat.value}</p>
            <div className="mt-2 flex items-center gap-1">
              <span className={`text-sm ${stat.trend === "up" ? "text-primary" : "text-red-500"}`}>
                {stat.change}
              </span>
              <span className="text-sm text-muted-foreground">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Create Campaign CTA */}
        <div className="p-8 bg-card rounded-2xl border border-border">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">Create New Campaign</h3>
              <p className="mt-1 text-muted-foreground">
                {hasApiConnected
                  ? "Launch a new influencer campaign with AI-powered optimization"
                  : "Connect your API first to start creating campaigns"}
              </p>
              <button
                onClick={hasApiConnected ? onCreateCampaign : onSetupApi}
                className="mt-4 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {hasApiConnected ? "Create Campaign" : "Setup API"}
              </button>
            </div>
          </div>
        </div>

        {/* API Status */}
        <div className="p-8 bg-card rounded-2xl border border-border">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${hasApiConnected ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground">API Connection</h3>
              <p className="mt-1 text-muted-foreground">
                {hasApiConnected
                  ? "Your ecommerce API is connected and tracking events"
                  : "Connect your ecommerce platform to track conversions"}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${hasApiConnected ? "bg-primary" : "bg-secondary"}`} />
                <span className="text-sm text-muted-foreground">
                  {hasApiConnected ? "Connected" : "Not Connected"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-card rounded-2xl border border-border">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {[
              { event: "New checkout conversion", campaign: "Summer Sale", influencer: "@alex_tech", amount: "+$12.50", time: "2 min ago" },
              { event: "New add to cart", campaign: "Summer Sale", influencer: "@fitness_jane", amount: "+$0.50", time: "5 min ago" },
              { event: "New page view", campaign: "Product Launch", influencer: "@style_mike", amount: "+$0.10", time: "8 min ago" },
              { event: "New checkout conversion", campaign: "Summer Sale", influencer: "@travel_sara", amount: "+$12.50", time: "15 min ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{activity.event}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.campaign} - {activity.influencer}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-primary">{activity.amount}</p>
                  <p className="text-sm text-muted-foreground">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InboxView() {
  const messages = [
    { from: "@alex_tech", subject: "Question about Summer Sale campaign", time: "1h ago", unread: true },
    { from: "@fitness_jane", subject: "Ready to start promoting!", time: "3h ago", unread: true },
    { from: "@style_mike", subject: "Campaign performance update", time: "1d ago", unread: false },
  ];

  return (
    <div className="bg-card rounded-2xl border border-border">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground">Messages</h3>
      </div>
      <div className="divide-y divide-border">
        {messages.map((msg, i) => (
          <div key={i} className={`p-6 hover:bg-muted/50 cursor-pointer transition-colors ${msg.unread ? "bg-primary/5" : ""}`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {msg.unread && <span className="w-2 h-2 bg-primary rounded-full" />}
                <span className="font-medium text-foreground">{msg.from}</span>
              </div>
              <span className="text-sm text-muted-foreground">{msg.time}</span>
            </div>
            <p className="mt-1 text-muted-foreground">{msg.subject}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
