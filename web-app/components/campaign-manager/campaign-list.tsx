"use client";

import { useState } from "react";

interface Campaign {
  id: string;
  name: string;
  status: "active" | "paused" | "ended";
  budget: number;
  spent: number;
  conversions: {
    views: number;
    carts: number;
    checkouts: number;
  };
  influencers: number;
  startDate: string;
  endDate: string;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale 2026",
    status: "active",
    budget: 5000,
    spent: 2450,
    conversions: { views: 12500, carts: 890, checkouts: 124 },
    influencers: 8,
    startDate: "2026-01-15",
    endDate: "2026-02-15",
  },
  {
    id: "2",
    name: "Product Launch - Eco Line",
    status: "active",
    budget: 3000,
    spent: 1200,
    conversions: { views: 8200, carts: 520, checkouts: 78 },
    influencers: 5,
    startDate: "2026-01-20",
    endDate: "2026-02-20",
  },
  {
    id: "3",
    name: "Holiday Special",
    status: "ended",
    budget: 2000,
    spent: 2000,
    conversions: { views: 15000, carts: 1100, checkouts: 210 },
    influencers: 12,
    startDate: "2025-12-01",
    endDate: "2025-12-31",
  },
];

export function CampaignList() {
  const [campaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [filter, setFilter] = useState<"all" | "active" | "paused" | "ended">("all");

  const filteredCampaigns = campaigns.filter(
    (c) => filter === "all" || c.status === filter
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center gap-2">
        {(["all", "active", "paused", "ended"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
              filter === status
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Campaign Cards */}
      <div className="grid gap-6">
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="p-6 bg-card rounded-2xl border border-border hover:border-primary/50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-foreground">{campaign.name}</h3>
                  <span
                    className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                      campaign.status === "active"
                        ? "bg-primary/10 text-primary"
                        : campaign.status === "paused"
                        ? "bg-secondary/10 text-secondary"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {campaign.startDate} - {campaign.endDate}
                </p>
              </div>
              <button className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>

            {/* Budget Progress */}
            <div className="mt-6">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Budget Used</span>
                <span className="font-medium text-foreground">
                  ${campaign.spent.toLocaleString()} / ${campaign.budget.toLocaleString()}
                </span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${(campaign.spent / campaign.budget) * 100}%` }}
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Views
                </div>
                <p className="mt-1 text-xl font-semibold text-foreground">
                  {campaign.conversions.views.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to Cart
                </div>
                <p className="mt-1 text-xl font-semibold text-foreground">
                  {campaign.conversions.carts.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Checkouts
                </div>
                <p className="mt-1 text-xl font-semibold text-foreground">
                  {campaign.conversions.checkouts.toLocaleString()}
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl">
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Influencers
                </div>
                <p className="mt-1 text-xl font-semibold text-foreground">{campaign.influencers}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No campaigns found</p>
        </div>
      )}
    </div>
  );
}
