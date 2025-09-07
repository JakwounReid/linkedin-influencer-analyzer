import React, { useState } from "react";

export default function InfluencerAnalyzerLanding() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/70">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-white/90 to-white/40 grid place-items-center">
              <span className="text-neutral-900 text-lg font-black">in</span>
            </div>
            <span className="font-semibold tracking-tight">Influencer Analyzer</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-neutral-300">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#how" className="hover:text-white">How it works</a>
            <a href="#sample" className="hover:text-white">Sample report</a>
            <a href="#pricing" className="hover:text-white">Pricing</a>
          </nav>
          <a href="#cta" className="inline-flex items-center gap-2 rounded-xl bg-white/90 text-neutral-900 px-4 py-2 text-sm font-semibold hover:bg-white">
            Join waitlist
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(99,102,241,0.15),rgba(0,0,0,0))]"/>
        <div className="mx-auto max-w-6xl px-4 py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Reverse‑engineer top LinkedIn creators.
            </h1>
            <p className="mt-4 text-neutral-300 text-lg">
              Find what actually drives engagement: hooks, posting cadence, content pillars, sentiment, hashtags, and best time to post — distilled into a bite‑size report.
            </p>
            <form
              id="cta"
              className="mt-6 flex flex-col sm:flex-row gap-3"
              onSubmit={async (e) => {
                e.preventDefault();
                const utms = {
                  utm_source: sessionStorage.getItem("utm_source") || "direct",
                  utm_medium: sessionStorage.getItem("utm_medium") || "direct",
                  utm_campaign: sessionStorage.getItem("utm_campaign") || "landing",
                  utm_content: sessionStorage.getItem("utm_content"),
                  utm_term: sessionStorage.getItem("utm_term"),
                };

                try {
                  await fetch("/api/lead", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      email,
                      tag: "early-access",
                      utms,
                      path: location.pathname + location.search,
                      referrer: document.referrer || ""
                    }),
                  });
                  alert(`Thanks! We'll reach out at ${email}.`);
                } catch (err) {
                  alert("Something went wrong. Please try again.");
                }
              }}
            >
              <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="email"
                required
                placeholder="you@company.com"
                className="flex-1 rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500 focus:border-neutral-600"
              />
              <button className="rounded-xl bg-white text-neutral-900 px-6 py-3 font-semibold hover:bg-neutral-200">
                Get early access
              </button>
            </form>
            <p className="mt-3 text-xs text-neutral-400">No spam. Optional CSV upload for private analysis. </p>
          </div>

          {/* Hero mock */}
          <div className="relative">
            <div className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-4 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <Stat label="Engagement rate" value="7.4%" sub="last 30 posts"/>
                <Stat label="Avg comments" value="46" sub="per post"/>
                <Stat label="Best post time" value="Tue 9–11am" sub="local"/>
                <Stat label="Top hook style" value="Contrarian" sub="34% of hits"/>
              </div>
              <div className="mt-6">
                <h3 className="text-sm text-neutral-400">Content pillars</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Career Stories','Hot Takes','How‑To Threads','Case Studies','Founder Diary'].map(t=> (
                    <span key={t} className="text-xs bg-neutral-800/80 border border-neutral-700 rounded-full px-3 py-1">{t}</span>
                  ))}
                </div>
              </div>
              <div className="mt-6">
                <h3 className="text-sm text-neutral-400">Hashtag clusters</h3>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="rounded-xl border border-neutral-800 p-3">#buildinpublic · #founder · #saas</div>
                  <div className="rounded-xl border border-neutral-800 p-3">#careeradvice · #tech · #software</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social proof */}
      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-12">
          <p className="text-center text-neutral-400 text-sm">Trusted by makers, freelancers, and growth teams</p>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-6 opacity-70">
            {['HackerLab Studio','Engineering Growth Lab','Side‑Gig Stats Central','Shovel Studio'].map(n => (
              <div key={n} className="text-center text-sm border border-neutral-900 rounded-xl py-3">{n}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold">What you get</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <Feature title="Creator fingerprint" desc="Posting cadence, day/time heatmap, pillar mix, link vs. non‑link split."/>
            <Feature title="Hook & format library" desc="Auto‑collected hooks from top posts with labels like story, contrarian, list, or tutorial."/>
            <Feature title="Engagement drivers" desc="Correlate emojis, hashtags, post length, and CTA style with reach & comments."/>
            <Feature title="Audience sentiment" desc="Quick sentiment and topic clustering from comments to surface what resonates."/>
            <Feature title="Compare creators" desc="Benchmark 2–5 influencers side‑by‑side on key metrics and topics."/>
            <Feature title="Export & share" desc="PDF/CSV exports for team reviews, plus a private sharable link."/>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold">How it works</h2>
          <ol className="mt-8 grid md:grid-cols-3 gap-6 list-decimal list-inside">
            <li className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900/40">
              <h3 className="font-semibold">Start with a profile</h3>
              <p className="text-neutral-300 text-sm mt-2">Paste a public profile URL or upload a CSV of post URLs.*</p>
            </li>
            <li className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900/40">
              <h3 className="font-semibold">We analyze patterns</h3>
              <p className="text-neutral-300 text-sm mt-2">We extract hooks, topics, cadence, and engagement metrics.</p>
            </li>
            <li className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900/40">
              <h3 className="font-semibold">Get a playbook</h3>
              <p className="text-neutral-300 text-sm mt-2">Receive a sharable report with tactical recommendations.</p>
            </li>
          </ol>
          <p className="text-xs text-neutral-500 mt-4">*Respect platform terms. Use publicly available data or your own exported content.</p>
        </div>
      </section>

      {/* Sample */}
      <section id="sample" className="border-t border-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Sample report</h2>
            <a href="#" className="text-sm text-neutral-300 hover:text-white underline underline-offset-4">View full sample (PDF)</a>
          </div>
          <div className="mt-6 grid md:grid-cols-3 gap-6">
            <Card title="Posting cadence heatmap" text="See high‑performing day/time windows."/>
            <Card title="Hook patterns" text="Tagged hooks from top 10% posts with examples."/>
            <Card title="Topic clusters" text="What themes drive comments and saves."/>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold">Early access pricing</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <PriceCard tier="Starter" price="$9" period="per report" bullets={["Up to 1 profile","Last 30 posts","PDF export"]}/>
            <PriceCard tier="Pro" price="$29" period="per month" bullets={["Up to 5 profiles","90‑day history","Compare creators","CSV export"]} highlight/>
            <PriceCard tier="Team" price="$79" period="per month" bullets={["Up to 15 profiles","Comment analysis","Sharable links","Priority support"]}/>
          </div>
          <p className="text-xs text-neutral-500 mt-4">Pricing subject to change during beta. You will be grandfathered in.</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="text-2xl font-bold">FAQ</h2>
          <div className="mt-8 grid md:grid-cols-2 gap-6 text-sm text-neutral-300">
            <FAQ q="Is this compliant with LinkedIn?" a="We analyze public content or user‑provided exports. We avoid actions that violate platform terms and provide tools for first‑party data uploads."/>
            <FAQ q="Do you need my login?" a="No. You can paste public post URLs or upload your own exported posts."/>
            <FAQ q="What data do you store?" a="Only the URLs and metrics necessary to compute your report, plus optional email for your account. See our Privacy Summary below."/>
            <FAQ q="Can I analyze multiple creators?" a="Yes — Pro plan supports multi‑profile comparison."/>
          </div>
          <div className="mt-10 rounded-2xl border border-neutral-800 p-6 bg-neutral-900/40">
            <h3 className="font-semibold">Privacy & data use</h3>
            <p className="mt-2 text-neutral-300 text-sm">We prioritize privacy: bring your own data (CSV/URLs), delete anytime, and we never sell data. Enterprise data‑processing addendum available.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900">
        <div className="mx-auto max-w-6xl px-4 py-12 grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-white/90 to-white/40 grid place-items-center">
                <span className="text-neutral-900 text-lg font-black">in</span>
              </div>
              <span className="font-semibold tracking-tight">Influencer Analyzer</span>
            </div>
            <p className="mt-4 text-neutral-400 text-sm">Build smarter, faster LinkedIn content by learning exactly what works for top creators.</p>
          </div>
          <div>
            <form className="flex gap-3" onSubmit={async (e) => {
              e.preventDefault();
              const utms = {
                utm_source: sessionStorage.getItem("utm_source") || "direct",
                utm_medium: sessionStorage.getItem("utm_medium") || "direct",
                utm_campaign: sessionStorage.getItem("utm_campaign") || "landing",
                utm_content: sessionStorage.getItem("utm_content"),
                utm_term: sessionStorage.getItem("utm_term"),
              };

              try {
                await fetch("/api/lead", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    email,
                    tag: "newsletter",
                    utms,
                    path: location.pathname + location.search,
                    referrer: document.referrer || ""
                  }),
                });
                alert(`Subscribed: ${email}`);
              } catch (err) {
                alert("Something went wrong. Please try again.");
              }
            }}>
              <input
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                type="email"
                required
                placeholder="you@company.com"
                className="flex-1 rounded-xl bg-neutral-900 border border-neutral-800 px-4 py-3 outline-none placeholder:text-neutral-500 focus:border-neutral-600"
              />
              <button className="rounded-xl bg-white text-neutral-900 px-6 py-3 font-semibold hover:bg-neutral-200">Subscribe</button>
            </form>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 pb-10 text-xs text-neutral-500">
          © {new Date().getFullYear()} Influencer Analyzer • Built by The Non‑Traditional Engineer
        </div>
      </footer>
    </div>
  );
}

function Stat({label, value, sub}:{label:string; value:string; sub?:string}){
  return (
    <div className="rounded-2xl border border-neutral-800 p-4 bg-neutral-900/40">
      <div className="text-xs text-neutral-400">{label}</div>
      <div className="text-2xl font-bold">{value}</div>
      {sub && <div className="text-xs text-neutral-500 mt-1">{sub}</div>}
    </div>
  );
}

function Feature({title, desc}:{title:string; desc:string}){
  return (
    <div className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900/40">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-neutral-300 text-sm mt-2">{desc}</p>
    </div>
  );
}

function Card({title, text}:{title:string; text:string}){
  return (
    <div className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900/40">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-neutral-300 text-sm mt-2">{text}</p>
    </div>
  );
}

function FAQ({q, a}:{q:string; a:string}){
  return (
    <div className="rounded-2xl border border-neutral-800 p-6 bg-neutral-900/40">
      <h3 className="font-semibold">{q}</h3>
      <p className="text-neutral-300 mt-2">{a}</p>
    </div>
  );
}

function PriceCard({tier, price, period, bullets, highlight}:{tier:string; price:string; period:string; bullets:string[]; highlight?:boolean}){
  return (
    <div className={`rounded-2xl border p-6 ${highlight ? 'border-white/60 bg-neutral-900/60 shadow-xl' : 'border-neutral-800 bg-neutral-900/40'}`}>
      <div className="flex items-baseline gap-2">
        <h3 className="font-semibold">{tier}</h3>
      </div>
      <div className="mt-2 text-3xl font-black">{price}<span className="text-sm font-medium text-neutral-400">/{period}</span></div>
      <ul className="mt-4 space-y-2 text-sm text-neutral-300">
        {bullets.map(b => <li key={b} className="flex items-start gap-2"><span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/80"/> {b}</li>)}
      </ul>
      <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="mt-6 inline-block rounded-xl bg-white text-neutral-900 px-5 py-3 font-semibold hover:bg-neutral-200">Get started</button>
    </div>
  );
}