"use client";

import { useState } from "react";

interface Campaign {
  id: string;
  name: string;
  brand: string;
  type: "CPA" | "CPL" | "CPV";
  payouts: {
    view: number;
    cart: number;
    checkout: number;
  };
  isHot: boolean;
  description: string;
  requirements: string[];
}

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "1",
    name: "Nike Summer Collection",
    brand: "Nike",
    type: "CPA",
    payouts: { view: 0.1, cart: 0.5, checkout: 12.5 },
    isHot: true,
    description: "Promote our summer athletic wear collection targeting fitness enthusiasts",
    requirements: ["Min 10K followers", "Fitness/Sports niche", "English content"],
  },
  {
    id: "2",
    name: "Adidas Sport Line",
    brand: "Adidas",
    type: "CPA",
    payouts: { view: 0.1, cart: 0.4, checkout: 10.0 },
    isHot: true,
    description: "New sport line launch campaign for running and training gear",
    requirements: ["Min 5K followers", "Fitness niche", "Video content"],
  },
  {
    id: "3",
    name: "H&M Fashion Week",
    brand: "H&M",
    type: "CPL",
    payouts: { view: 0.05, cart: 0.3, checkout: 5.0 },
    isHot: false,
    description: "Fashion week inspired collection for young adults",
    requirements: ["Min 3K followers", "Fashion niche"],
  },
  {
    id: "4",
    name: "Zara Winter Collection",
    brand: "Zara",
    type: "CPA",
    payouts: { view: 0.08, cart: 0.35, checkout: 8.0 },
    isHot: false,
    description: "Winter essentials and cozy fashion items",
    requirements: ["Min 5K followers", "Fashion/Lifestyle niche"],
  },
  {
    id: "5",
    name: "Sephora Beauty Box",
    brand: "Sephora",
    type: "CPA",
    payouts: { view: 0.15, cart: 0.6, checkout: 15.0 },
    isHot: true,
    description: "Beauty and skincare product promotion",
    requirements: ["Min 8K followers", "Beauty niche", "Tutorial style"],
  },
  {
    id: "6",
    name: "Apple Accessories",
    brand: "Apple",
    type: "CPA",
    payouts: { view: 0.2, cart: 0.8, checkout: 20.0 },
    isHot: true,
    description: "Promote Apple accessories including AirPods, cases, and more",
    requirements: ["Min 15K followers", "Tech niche", "Quality content"],
  },
];

export function CampaignBrowser() {
  const [campaigns] = useState<Campaign[]>(MOCK_CAMPAIGNS);
  const [filter, setFilter] = useState<"all" | "hot">("all");
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const filteredCampaigns = campaigns.filter(
    (c) => filter === "all" || (filter === "hot" && c.isHot)
  );

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === "all"
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            All Campaigns
          </button>
          <button
            onClick={() => setFilter("hot")}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 ${
              filter === "hot"
                ? "bg-secondary text-secondary-foreground"
                : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            Hot
          </button>
        </div>
        <div className="relative">
          <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search campaigns..."
            className="pl-10 pr-4 py-2 bg-muted rounded-lg border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-secondary"
          />
        </div>
      </div>

      {/* Campaign Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCampaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="p-6 bg-card rounded-2xl border border-border hover:border-secondary/50 transition-colors cursor-pointer"
            onClick={() => setSelectedCampaign(campaign)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary font-bold">
                {campaign.brand.slice(0, 2).toUpperCase()}
              </div>
              {campaign.isHot && (
                <span className="px-2.5 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded-full">
                  HOT
                </span>
              )}
            </div>
            <h3 className="text-lg font-semibold text-foreground">{campaign.name}</h3>
            <p className="text-sm text-muted-foreground mt-1">{campaign.brand}</p>
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{campaign.description}</p>
            
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Per checkout</span>
                <span className="font-semibold text-primary">${campaign.payouts.checkout.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Campaign Detail Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setSelectedCampaign(null)}
          />
          <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-lg mx-4 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary font-bold text-lg">
                  {selectedCampaign.brand.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{selectedCampaign.name}</h2>
                  <p className="text-muted-foreground">{selectedCampaign.brand}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <p className="text-muted-foreground">{selectedCampaign.description}</p>

            <div className="mt-6">
              <h4 className="font-medium text-foreground mb-3">Bounty Rates</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-muted/50 rounded-xl text-center">
                  <p className="text-xs text-muted-foreground">Per View</p>
                  <p className="text-lg font-semibold text-foreground">${selectedCampaign.payouts.view.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-xl text-center">
                  <p className="text-xs text-muted-foreground">Per Cart</p>
                  <p className="text-lg font-semibold text-foreground">${selectedCampaign.payouts.cart.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-primary/10 rounded-xl text-center">
                  <p className="text-xs text-muted-foreground">Per Checkout</p>
                  <p className="text-lg font-semibold text-primary">${selectedCampaign.payouts.checkout.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h4 className="font-medium text-foreground mb-3">Requirements</h4>
              <ul className="space-y-2">
                {selectedCampaign.requirements.map((req, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => {
                alert("Applied to campaign! (Demo)");
                setSelectedCampaign(null);
              }}
              className="mt-8 w-full px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/90 transition-colors"
            >
              Apply for Bounty
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
