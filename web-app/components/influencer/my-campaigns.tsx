"use client";

import { useState } from "react";

interface ActiveCampaign {
  id: string;
  name: string;
  brand: string;
  trackingLink: string;
  qrCode: string;
  stats: {
    views: number;
    carts: number;
    checkouts: number;
  };
  earnings: number;
  status: "active" | "pending" | "completed";
}

const MOCK_ACTIVE_CAMPAIGNS: ActiveCampaign[] = [
  {
    id: "1",
    name: "Nike Summer Collection",
    brand: "Nike",
    trackingLink: "growi.me/alex/nike-summer",
    qrCode: "NIKE-ALEX-001",
    stats: { views: 12500, carts: 890, checkouts: 124 },
    earnings: 1890.5,
    status: "active",
  },
  {
    id: "2",
    name: "Adidas Sport Line",
    brand: "Adidas",
    trackingLink: "growi.me/alex/adidas-sport",
    qrCode: "ADIDAS-ALEX-002",
    stats: { views: 8200, carts: 520, checkouts: 78 },
    earnings: 980.0,
    status: "active",
  },
  {
    id: "3",
    name: "H&M Fashion Week",
    brand: "H&M",
    trackingLink: "growi.me/alex/hm-fashion",
    qrCode: "HM-ALEX-003",
    stats: { views: 3500, carts: 210, checkouts: 32 },
    earnings: 210.0,
    status: "pending",
  },
];

export function MyCampaigns() {
  const [campaigns] = useState<ActiveCampaign[]>(MOCK_ACTIVE_CAMPAIGNS);
  const [selectedCampaign, setSelectedCampaign] = useState<ActiveCampaign | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  const handleCopyLink = (link: string) => {
    navigator.clipboard.writeText(`https://${link}`);
    setCopiedLink(link);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Campaigns", value: campaigns.filter((c) => c.status === "active").length },
          { label: "Total Views", value: campaigns.reduce((acc, c) => acc + c.stats.views, 0).toLocaleString() },
          { label: "Total Checkouts", value: campaigns.reduce((acc, c) => acc + c.stats.checkouts, 0) },
          { label: "Total Earnings", value: `$${campaigns.reduce((acc, c) => acc + c.earnings, 0).toFixed(2)}` },
        ].map((stat) => (
          <div key={stat.label} className="p-4 bg-card rounded-xl border border-border">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Campaign List */}
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <div
            key={campaign.id}
            className="p-6 bg-card rounded-2xl border border-border"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary font-bold">
                  {campaign.brand.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-semibold text-foreground">{campaign.name}</h3>
                    <span
                      className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                        campaign.status === "active"
                          ? "bg-primary/10 text-primary"
                          : campaign.status === "pending"
                          ? "bg-secondary/10 text-secondary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{campaign.brand}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">${campaign.earnings.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">earned</p>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 gap-4">
              <div className="p-3 bg-muted/50 rounded-xl">
                <p className="text-sm text-muted-foreground">Views</p>
                <p className="text-xl font-semibold text-foreground">{campaign.stats.views.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-xl">
                <p className="text-sm text-muted-foreground">Add to Cart</p>
                <p className="text-xl font-semibold text-foreground">{campaign.stats.carts.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-muted/50 rounded-xl">
                <p className="text-sm text-muted-foreground">Checkouts</p>
                <p className="text-xl font-semibold text-foreground">{campaign.stats.checkouts}</p>
              </div>
            </div>

            {/* Tracking Links */}
            <div className="mt-6 flex items-center gap-4">
              <div className="flex-1 flex items-center gap-2 p-3 bg-muted rounded-xl">
                <svg className="w-5 h-5 text-muted-foreground flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                <span className="text-sm font-mono text-foreground truncate">{campaign.trackingLink}</span>
                <button
                  onClick={() => handleCopyLink(campaign.trackingLink)}
                  className="ml-auto px-3 py-1 bg-card border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors text-foreground"
                >
                  {copiedLink === campaign.trackingLink ? "Copied!" : "Copy"}
                </button>
              </div>
              <button
                onClick={() => setSelectedCampaign(campaign)}
                className="px-4 py-3 bg-secondary/10 text-secondary rounded-xl font-medium hover:bg-secondary/20 transition-colors flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
                QR Code
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* QR Code Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-foreground/50 backdrop-blur-sm"
            onClick={() => setSelectedCampaign(null)}
          />
          <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-sm mx-4 p-6 text-center">
            <button
              onClick={() => setSelectedCampaign(null)}
              className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h3 className="text-lg font-semibold text-foreground mb-2">{selectedCampaign.name}</h3>
            <p className="text-sm text-muted-foreground mb-6">Scan to visit your tracking link</p>

            {/* QR Code Placeholder */}
            <div className="w-48 h-48 mx-auto bg-white p-4 rounded-xl">
              <div className="w-full h-full border-4 border-foreground rounded flex items-center justify-center">
                <svg className="w-24 h-24 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                </svg>
              </div>
            </div>

            <p className="mt-4 text-sm text-muted-foreground font-mono">{selectedCampaign.trackingLink}</p>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => handleCopyLink(selectedCampaign.trackingLink)}
                className="flex-1 px-4 py-2 border border-border rounded-xl font-medium hover:bg-muted transition-colors text-foreground"
              >
                Copy Link
              </button>
              <button className="flex-1 px-4 py-2 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/90 transition-colors">
                Download QR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
