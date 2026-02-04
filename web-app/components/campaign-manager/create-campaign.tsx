"use client";

import { useState } from "react";

interface CreateCampaignProps {
  hasApiConnected: boolean;
  onSetupApi: () => void;
}

export function CreateCampaign({ hasApiConnected, onSetupApi }: CreateCampaignProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [showAICoach, setShowAICoach] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [campaign, setCampaign] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    totalBudget: "",
    viewBounty: "0.10",
    cartBounty: "0.50",
    checkoutBounty: "12.50",
  });

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setCampaign({
      ...campaign,
      name: "Summer Sale Campaign",
      description: "Promote our summer collection with exclusive discounts up to 40% off",
      totalBudget: "5000",
      viewBounty: "0.10",
      cartBounty: "0.50",
      checkoutBounty: "12.50",
    });
    setIsGenerating(false);
    setShowAICoach(false);
  };

  if (!hasApiConnected) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
          <svg className="w-10 h-10 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-foreground">Connect Your API First</h2>
        <p className="mt-2 text-muted-foreground max-w-md mx-auto">
          To create campaigns, you need to connect your ecommerce platform so we can track conversions.
        </p>
        <button
          onClick={onSetupApi}
          className="mt-6 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
        >
          Setup API Connection
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* AI Coach Button */}
      <div className="mb-6 flex justify-end">
        <button
          onClick={() => setShowAICoach(true)}
          className="flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-lg font-medium hover:bg-secondary/20 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI Marketing Coach
        </button>
      </div>

      {/* AI Coach Modal */}
      {showAICoach && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-foreground/50 backdrop-blur-sm" onClick={() => setShowAICoach(false)} />
          <div className="relative bg-card rounded-2xl border border-border shadow-xl w-full max-w-lg mx-4 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">AI Marketing Coach</h3>
                <p className="text-sm text-muted-foreground">Describe your campaign goals</p>
              </div>
              <button
                onClick={() => setShowAICoach(false)}
                className="ml-auto p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="e.g., I want to promote our summer collection targeting young adults. My budget is $5000 and I want to maximize conversions."
              className="w-full h-32 p-4 bg-muted rounded-xl border-0 resize-none text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
            />
            <button
              onClick={handleAIGenerate}
              disabled={!aiPrompt.trim() || isGenerating}
              className="mt-4 w-full px-6 py-3 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/90 transition-colors disabled:opacity-50"
            >
              {isGenerating ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-secondary-foreground border-t-transparent rounded-full animate-spin" />
                  Generating...
                </span>
              ) : (
                "Generate Campaign"
              )}
            </button>
          </div>
        </div>
      )}

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  s <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {s < step ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s
                )}
              </div>
              {s < 3 && (
                <div className={`w-24 md:w-40 h-1 mx-2 rounded ${s < step ? "bg-primary" : "bg-muted"}`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={step >= 1 ? "text-foreground" : "text-muted-foreground"}>Basic Info</span>
          <span className={step >= 2 ? "text-foreground" : "text-muted-foreground"}>Set Bounties</span>
          <span className={step >= 3 ? "text-foreground" : "text-muted-foreground"}>Review</span>
        </div>
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <div className="bg-card rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Campaign Details</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Campaign Name</label>
              <input
                type="text"
                value={campaign.name}
                onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
                placeholder="e.g., Summer Sale 2026"
                className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Description</label>
              <textarea
                value={campaign.description}
                onChange={(e) => setCampaign({ ...campaign, description: e.target.value })}
                placeholder="Describe your campaign..."
                rows={3}
                className="w-full px-4 py-3 bg-muted rounded-xl border-0 resize-none text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Start Date</label>
                <input
                  type="date"
                  value={campaign.startDate}
                  onChange={(e) => setCampaign({ ...campaign, startDate: e.target.value })}
                  className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">End Date</label>
                <input
                  type="date"
                  value={campaign.endDate}
                  onChange={(e) => setCampaign({ ...campaign, endDate: e.target.value })}
                  className="w-full px-4 py-3 bg-muted rounded-xl border-0 text-foreground focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Total Budget (USD)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                <input
                  type="number"
                  value={campaign.totalBudget}
                  onChange={(e) => setCampaign({ ...campaign, totalBudget: e.target.value })}
                  placeholder="5000"
                  className="w-full pl-8 pr-4 py-3 bg-muted rounded-xl border-0 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>
          <button
            onClick={() => setStep(2)}
            disabled={!campaign.name || !campaign.totalBudget}
            className="mt-8 w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Set Bounties */}
      {step === 2 && (
        <div className="bg-card rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">Set Bounties</h2>
          <p className="text-muted-foreground mb-8">Define how much you pay per conversion event</p>

          <div className="space-y-6">
            {[
              { key: "viewBounty", label: "Page View", description: "Paid when user views a tracked page", icon: "eye" },
              { key: "cartBounty", label: "Add to Cart", description: "Paid when user adds product to cart", icon: "cart" },
              { key: "checkoutBounty", label: "Checkout", description: "Paid when user completes purchase", icon: "check" },
            ].map((bounty) => (
              <div key={bounty.key} className="p-6 bg-muted/50 rounded-xl">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                      {bounty.icon === "eye" && (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                      {bounty.icon === "cart" && (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      )}
                      {bounty.icon === "check" && (
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{bounty.label}</h4>
                      <p className="text-sm text-muted-foreground">{bounty.description}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <input
                      type="number"
                      step="0.01"
                      value={campaign[bounty.key as keyof typeof campaign]}
                      onChange={(e) => setCampaign({ ...campaign, [bounty.key]: e.target.value })}
                      className="w-28 pl-7 pr-3 py-2 bg-card rounded-lg border border-border text-foreground text-right focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="px-6 py-3 border border-border rounded-xl font-medium hover:bg-muted transition-colors text-foreground"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Review */}
      {step === 3 && (
        <div className="bg-card rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Review Campaign</h2>

          <div className="space-y-6">
            <div className="p-6 bg-muted/50 rounded-xl">
              <h3 className="font-semibold text-foreground text-lg">{campaign.name || "Untitled Campaign"}</h3>
              <p className="mt-1 text-muted-foreground">{campaign.description || "No description"}</p>
              <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                <span>{campaign.startDate || "TBD"} - {campaign.endDate || "TBD"}</span>
                <span className="text-primary font-medium">${campaign.totalBudget || "0"} Budget</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-muted/50 rounded-xl text-center">
                <p className="text-sm text-muted-foreground">Per View</p>
                <p className="text-2xl font-semibold text-foreground">${campaign.viewBounty}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl text-center">
                <p className="text-sm text-muted-foreground">Per Cart</p>
                <p className="text-2xl font-semibold text-foreground">${campaign.cartBounty}</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-xl text-center">
                <p className="text-sm text-muted-foreground">Per Checkout</p>
                <p className="text-2xl font-semibold text-foreground">${campaign.checkoutBounty}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <button
              onClick={() => setStep(2)}
              className="px-6 py-3 border border-border rounded-xl font-medium hover:bg-muted transition-colors text-foreground"
            >
              Back
            </button>
            <button
              onClick={() => alert("Campaign created! (Demo)")}
              className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              Launch Campaign
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
