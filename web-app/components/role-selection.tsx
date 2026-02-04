"use client";

import Image from "next/image";
import { useState } from "react";
import { CampaignManagerDashboard } from "@/components/campaign-manager/dashboard";
import { InfluencerDashboard } from "@/components/influencer/dashboard";

interface RoleSelectionProps {
  walletAddress: string;
}

export function RoleSelection({ walletAddress }: RoleSelectionProps) {
  const [selectedRole, setSelectedRole] = useState<"manager" | "influencer" | null>(null);

  if (selectedRole === "manager") {
    return <CampaignManagerDashboard walletAddress={walletAddress} />;
  }

  if (selectedRole === "influencer") {
    return <InfluencerDashboard walletAddress={walletAddress} />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Image
            src="/growi-logo.png"
            alt="Growi"
            width={100}
            height={33}
            className="h-8 w-auto"
          />
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-muted rounded-full text-sm font-mono text-foreground">
              {walletAddress}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-3xl w-full">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground">
              Welcome to Growi
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Choose how you want to use the platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Campaign Manager Card */}
            <button
              onClick={() => setSelectedRole("manager")}
              className="group p-8 bg-card rounded-2xl border border-border hover:border-primary transition-all text-left"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Campaign Manager
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Create marketing campaigns, set bounties for conversions, and track
                performance with real-time analytics.
              </p>
              <ul className="space-y-2">
                {[
                  "AI-powered marketing coach",
                  "Set budgets per event (View, Cart, Checkout)",
                  "Real-time conversion tracking",
                  "Connect your ecommerce API",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2 text-primary font-medium">
                Get Started
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>

            {/* Influencer Card */}
            <button
              onClick={() => setSelectedRole("influencer")}
              className="group p-8 bg-card rounded-2xl border border-border hover:border-secondary transition-all text-left"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Influencer
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Browse available campaigns, apply for bounties, and earn rewards for
                every conversion you drive.
              </p>
              <ul className="space-y-2">
                {[
                  "Browse available campaigns",
                  "Earn per View, Add to Cart, Checkout",
                  "Real-time earnings dashboard",
                  "Instant blockchain payments",
                ].map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4 text-secondary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2 text-secondary font-medium">
                Start Earning
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
