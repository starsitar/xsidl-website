import { useState } from "react";
import Nav from "../components/Nav.jsx";
import DialSwitcher from "../components/DialSwitcher.jsx";
import ReportCard from "../components/ReportCard.jsx";
import { CASES } from "../data/cases.js";

export default function Home() {
  const [caseId, setCaseId] = useState("pipeline");
  const current = CASES.find((c) => c.id === caseId);

  return (
    <div className="relative isolate overflow-hidden">
      {/* One light source: a warm spot behind the dial, cold fall-off to the edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 22% 78%, rgba(200,162,75,0.16) 0%, rgba(200,162,75,0) 60%), radial-gradient(50% 40% at 85% 10%, rgba(46,111,106,0.18) 0%, rgba(46,111,106,0) 60%), #0D1F2D",
        }}
      />
      <Nav />
      <main>
        <section
          aria-labelledby="hero-title"
          className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-y-12 px-6 pb-16 pt-4 lg:grid-cols-12 lg:gap-x-12 lg:pt-8"
        >
          <div className="min-w-0 lg:col-span-7">
            <h1 id="hero-title">
              <span className="block text-[clamp(1.35rem,2.1vw,1.9rem)] font-light leading-[1.2] tracking-[0.01em] text-cream/75">
                Attacked in a sealed lab.
              </span>
              <span className="mt-2 block max-w-[14ch] text-[clamp(2.5rem,4.6vw,4.1rem)] font-bold leading-[1.02] tracking-[-0.02em] [text-wrap:balance]">
                Evidence anyone can check.
              </span>
            </h1>
            <p className="mt-6 max-w-[44ch] text-[18px] leading-[1.55] text-cream/70 [text-wrap:pretty]">
              <span className="text-cream">Build pipelines, AI systems and grid controllers.</span> Never in production. We help you fix what we found, test again, and write it up for your customer, bank or regulator.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact" className="bg-gold px-6 py-3.5 text-[16px] font-semibold tracking-[0.04em] text-navy no-underline transition-colors hover:bg-cream">
                Book a briefing
              </a>
              <a href="#sample" className="border border-cream/35 px-6 py-3.5 text-[16px] font-semibold tracking-[0.04em] text-cream no-underline transition-colors hover:border-cream">
                See a sample report
              </a>
            </div>

            <div className="mt-9 grid grid-cols-[minmax(0,auto)_1fr] items-center gap-10 max-sm:grid-cols-1">
              <DialSwitcher cases={CASES} value={caseId} onChange={setCaseId} />
              <p className="max-w-[26ch] text-[17px] leading-[1.55] text-cream/70 max-sm:hidden">
                Turn the dial to your case. The report beside it changes to what you would receive.
              </p>
            </div>
          </div>

          <div id="sample" className="min-w-0 lg:col-span-5">
            <ReportCard c={current} />
          </div>
        </section>
      </main>
    </div>
  );
}
