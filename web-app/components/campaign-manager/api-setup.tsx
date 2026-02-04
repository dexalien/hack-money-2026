"use client";

import { useState } from "react";

interface APISetupProps {
  onComplete: () => void;
}

type Platform = "shopify" | "woocommerce" | "custom" | null;

export function APISetup({ onComplete }: APISetupProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [platform, setPlatform] = useState<Platform>(null);
  const [copied, setCopied] = useState(false);

  const trackingCode = `<!-- Growi Tracking Code -->
<script>
  (function(g,r,o,w,i){
    g[i]=g[i]||function(){(g[i].q=g[i].q||[]).push(arguments)};
    var s=r.createElement('script');s.async=1;
    s.src='https://cdn.growi.app/track.js';
    r.head.appendChild(s);
  })(window,document,'growi','track','growi');
  
  growi('init', 'YOUR_CAMPAIGN_ID');
</script>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(trackingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = [
    {
      id: "shopify" as Platform,
      name: "Shopify",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.337 3.415c-.025-.122-.147-.184-.269-.159-.097.024-2.146.659-2.146.659s-1.403-1.414-1.551-1.575c-.148-.159-.44-.11-.553-.073l-.758.232C9.94 1.815 9.793 1.22 9.498.88 8.97.278 8.193 0 7.293 0 4.22 0 2.033 3.95 1.3 5.953c-.984.305-1.683.522-1.78.554-.496.159-.513.172-.578.637C.87 7.635 0 14.927 0 14.927l11.237 2.083L17.4 15.5s-2.037-11.888-2.063-12.085zM10.06 4.83l-1.44.446s-.633-1.345-1.758-1.345c-.024 0-.049 0-.074.002.086-.11.172-.22.262-.322.547-.597 1.27-.916 1.835-.916.464 0 .87.183 1.175.542v.001l.001.002.001.001s.001.001.001.002c.109.133.202.28.282.437l-.285.088v.062zm-1.8-2.61c-.049 0-.098.002-.148.007.072-.137.155-.265.245-.382.354-.476.843-.733 1.35-.733.263 0 .509.068.729.19-.426.22-.858.535-1.29.96-.29.289-.554.63-.786 1.01-.03-.003-.061-.005-.093-.005h-.007v-.001-.001l.001-.001v-.044zm1.18 7.43s-.598-.318-1.324-.318c-1.072 0-1.125.673-1.125.843 0 .926 2.414 1.28 2.414 3.446 0 1.705-1.082 2.804-2.54 2.804-1.751 0-2.648-1.09-2.648-1.09l.47-1.552s.92.79 1.697.79c.507 0 .715-.4.715-.691 0-1.21-1.98-1.264-1.98-3.243 0-1.669 1.198-3.285 3.616-3.285.93 0 1.39.267 1.39.267l-.685 2.029z"/>
        </svg>
      ),
    },
    {
      id: "woocommerce" as Platform,
      name: "WooCommerce",
      icon: (
        <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2.227 4.857A2.228 2.228 0 000 7.094v7.457c0 1.236 1.001 2.237 2.237 2.237h4.083l.711 2.369 3.032-2.369h11.7A2.237 2.237 0 0024 14.551V7.094a2.237 2.237 0 00-2.237-2.237H2.227zm.378 1.238h18.79c.554 0 1.003.45 1.003 1.003v7.46c0 .554-.45 1.003-1.003 1.003H9.525l-1.964 1.534-.46-1.534H2.605a1.003 1.003 0 01-1.003-1.003V7.098c0-.554.45-1.003 1.003-1.003zM4.94 8.178c-.476.025-.884.474-1.007 1.152-.196 1.083.09 2.14.703 2.585.085.064.18.097.283.097.123 0 .255-.053.397-.157.238-.177.339-.403.303-.678-.025-.194-.131-.35-.318-.467-.214-.133-.326-.372-.337-.716-.012-.4.078-.636.27-.709.104-.035.248.024.432.18.447.383.814 1.23 1.097 2.534.081.368.277.553.588.553.227 0 .414-.09.562-.27.137-.166.206-.37.206-.61 0-.115-.038-.443-.115-.984-.077-.54-.115-.913-.115-1.118 0-.453.116-.68.348-.68.168 0 .34.202.513.607.107.25.219.594.337 1.032l.13.488c.116.427.332.64.649.64.194 0 .356-.077.485-.232.13-.154.194-.34.194-.558 0-.133-.04-.457-.12-.973l-.093-.61c-.056-.363-.084-.617-.084-.76 0-.414.107-.62.32-.62.214 0 .405.27.575.81.169.54.33 1.212.483 2.017.072.378.268.567.588.567.227 0 .414-.09.562-.27.137-.166.206-.37.206-.61 0-.115-.039-.443-.115-.984-.077-.54-.115-.913-.115-1.118 0-.453.116-.68.348-.68.168 0 .34.202.513.607.107.25.219.594.337 1.032l.13.488c.116.427.332.64.649.64.194 0 .356-.077.485-.232.13-.154.194-.34.194-.558 0-.133-.04-.457-.12-.973-.04-.26-.07-.46-.092-.603-.056-.37-.084-.625-.084-.768 0-.414.107-.62.32-.62.214 0 .405.27.575.81.169.54.33 1.212.483 2.017.072.378.268.567.588.567.227 0 .414-.09.562-.27.137-.166.206-.37.206-.61 0-.115-.039-.443-.115-.984-.077-.54-.115-.913-.115-1.118 0-.453.116-.68.348-.68.168 0 .34.202.513.607.107.25.219.594.337 1.032l.13.488c.116.427.332.64.649.64.194 0 .356-.077.485-.232.13-.154.194-.34.194-.558a4.32 4.32 0 00-.155-1.035c-.231-.818-.615-1.227-1.15-1.227-.483 0-.817.247-1.003.742a1.18 1.18 0 00-.92-.742c-.483 0-.817.247-1.003.742a1.18 1.18 0 00-.92-.742c-.483 0-.817.247-1.003.742a1.18 1.18 0 00-.92-.742c-.483 0-.817.247-1.003.742a1.18 1.18 0 00-.92-.742c-.347 0-.633.146-.857.437-.136-.29-.358-.436-.666-.436-.398 0-.71.198-.938.595a1.426 1.426 0 00-.895-.594z"/>
        </svg>
      ),
    },
    {
      id: "custom" as Platform,
      name: "Custom API",
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                  s <= step
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
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
                <div
                  className={`w-24 md:w-40 h-1 mx-2 rounded ${
                    s < step ? "bg-primary" : "bg-muted"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className={step >= 1 ? "text-foreground" : "text-muted-foreground"}>
            Select Platform
          </span>
          <span className={step >= 2 ? "text-foreground" : "text-muted-foreground"}>
            Install Code
          </span>
          <span className={step >= 3 ? "text-foreground" : "text-muted-foreground"}>
            Verify
          </span>
        </div>
      </div>

      {/* Step 1: Select Platform */}
      {step === 1 && (
        <div className="bg-card rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Select Your Platform
          </h2>
          <p className="text-muted-foreground mb-8">
            Choose your ecommerce platform to get started with tracking
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {platforms.map((p) => (
              <button
                key={p.id}
                onClick={() => setPlatform(p.id)}
                className={`p-6 rounded-xl border-2 transition-all text-center ${
                  platform === p.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className={`mx-auto w-12 h-12 flex items-center justify-center ${
                  platform === p.id ? "text-primary" : "text-muted-foreground"
                }`}>
                  {p.icon}
                </div>
                <p className="mt-3 font-medium text-foreground">{p.name}</p>
              </button>
            ))}
          </div>

          <button
            onClick={() => platform && setStep(2)}
            disabled={!platform}
            className="mt-8 w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Continue
          </button>
        </div>
      )}

      {/* Step 2: Install Code */}
      {step === 2 && (
        <div className="bg-card rounded-2xl border border-border p-8">
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Install Tracking Code
          </h2>
          <p className="text-muted-foreground mb-8">
            Add this code to your website to start tracking conversions
          </p>

          <div className="relative">
            <pre className="p-4 bg-muted rounded-xl overflow-x-auto text-sm font-mono text-foreground">
              {trackingCode}
            </pre>
            <button
              onClick={handleCopy}
              className="absolute top-3 right-3 px-3 py-1.5 bg-card border border-border rounded-lg text-sm font-medium hover:bg-muted transition-colors text-foreground"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <h4 className="font-medium text-foreground">Instructions for {platform}</h4>
            <ol className="mt-2 space-y-2 text-sm text-muted-foreground list-decimal list-inside">
              {platform === "shopify" && (
                <>
                  <li>Go to Online Store -&gt; Themes -&gt; Edit Code</li>
                  <li>{"Open theme.liquid file"}</li>
                  <li>{"Paste the code before </head>"}</li>
                  <li>Save changes</li>
                </>
              )}
              {platform === "woocommerce" && (
                <>
                  <li>Go to Appearance -&gt; Theme Editor</li>
                  <li>{"Open header.php file"}</li>
                  <li>{"Paste the code before </head>"}</li>
                  <li>Save changes</li>
                </>
              )}
              {platform === "custom" && (
                <>
                  <li>{"Open your website's HTML file"}</li>
                  <li>{"Locate the <head> section"}</li>
                  <li>{"Paste the code before </head>"}</li>
                  <li>Deploy your changes</li>
                </>
              )}
            </ol>
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
              I've Added the Code
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Verify */}
      {step === 3 && (
        <div className="bg-card rounded-2xl border border-border p-8 text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <svg className="w-10 h-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-foreground">
            API Successfully Connected!
          </h2>
          <p className="mt-2 text-muted-foreground">
            Your ecommerce platform is now connected and ready to track conversions
          </p>

          <div className="mt-8 p-4 bg-muted rounded-xl">
            <div className="flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
              <span className="text-sm text-muted-foreground">Listening for events...</span>
            </div>
          </div>

          <button
            onClick={onComplete}
            className="mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            Create Your First Campaign
          </button>
        </div>
      )}
    </div>
  );
}
