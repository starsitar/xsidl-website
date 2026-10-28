import { Emblem } from "./Emblem.jsx";

const SEVERITY = {
  Critical: { w: "w-full", c: "bg-navy" },
  High: { w: "w-2/3", c: "bg-teal" },
  Medium: { w: "w-1/3", c: "bg-gold" },
};

// A sample of the evidence a client receives, switched by the dial. Illustrative; labelled SAMPLE.
export default function ReportCard({ c }) {
  return (
    <article
      aria-label={`${c.title}, sample report`}
      className="on-paper relative text-navy"
      style={{
        background: "linear-gradient(170deg, #FDFAF2 0%, #F6F0E1 60%, #EFE7D4 100%)",
        boxShadow:
          "0 1px 0 rgba(255,255,255,0.9) inset, 0 0 0 1px rgba(13,31,45,0.08), 0 40px 70px -30px rgba(0,0,0,0.75), 0 14px 24px -14px rgba(0,0,0,0.5)",
      }}
    >
      <div className="absolute inset-x-0 top-0 h-[5px] bg-navy" aria-hidden="true" />

      <header className="flex items-start justify-between gap-4 px-9 pb-6 pt-9 max-sm:px-6">
        <div className="flex items-center gap-4">
          <Emblem size={46} color="#0D1F2D" />
          <div>
            <div className="text-[15px] font-semibold tracking-[0.2em] text-navy">STATION ZERO</div>
            <div className="mt-0.5 font-mono text-[10.5px] tracking-[0.2em] text-navy/55">TEST REPORT · SEALED COPY</div>
          </div>
        </div>
        <span
          aria-hidden="true"
          className="mt-1 rotate-[7deg] border-[2.5px] border-teal/80 px-2.5 py-1 font-mono text-[11px] font-medium tracking-[0.28em] text-teal/90 mix-blend-multiply"
        >
          SAMPLE
        </span>
      </header>

      <div className="mx-9 h-px bg-navy/15 max-sm:mx-6" />

      <div key={c.id} className="px-9 pb-8 pt-7 max-sm:px-6 motion-safe:animate-[sheet_0.7s_var(--ease-out-expo)]">
        <p className="font-mono text-[10.5px] tracking-[0.22em] text-navy/50">SCOPE</p>
        <h2 className="mt-1.5 text-[27px] font-semibold leading-[1.15] tracking-[-0.005em] [text-wrap:balance]">{c.title}</h2>
        <p className="mt-2 max-w-[44ch] text-[14.5px] leading-snug text-navy/70">{c.scope}</p>

        <ol className="mt-7 border-t border-navy/15">
          {c.findings.map(([f, s], i) => (
            <li key={f} className="grid grid-cols-[2ch_1fr_8.5rem] items-center gap-x-4 max-sm:grid-cols-[2ch_1fr] max-sm:gap-y-1.5 border-b border-navy/10 py-3">
              <span className="font-mono text-[11px] text-navy/45">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[15px] leading-snug">{f}</span>
              <span className="flex items-center justify-end gap-2 max-sm:col-start-2 max-sm:justify-start">
                <span className="h-[6px] w-14 bg-navy/10"><span className={`block h-full ${SEVERITY[s].w} ${SEVERITY[s].c}`} /></span>
                <span className="w-[4.6rem] font-mono text-[10.5px] tracking-[0.14em] text-navy/75">{s.toUpperCase()}</span>
              </span>
            </li>
          ))}
        </ol>

        <dl className="mt-7 grid grid-cols-[7.5rem_1fr] gap-x-4 gap-y-3 max-sm:grid-cols-1 max-sm:gap-y-1 text-[13.5px] leading-snug">
          <dt className="font-mono text-[10.5px] tracking-[0.22em] text-navy/50 pt-0.5">MAPPED TO</dt>
          <dd>{c.mapsTo}</dd>
          <dt className="font-mono text-[10.5px] tracking-[0.22em] text-navy/50 pt-0.5">NOT</dt>
          <dd>An audit by a CERT-In empanelled auditor. This report does not replace one.</dd>
        </dl>

        <footer className="mt-8 grid grid-cols-[1fr_auto] items-end gap-6 border-t border-navy/20 pt-5">
          <div>
            <div className="font-mono text-[10.5px] tracking-[0.22em] text-navy/50">ISSUED BY</div>
            <div className="mt-1 text-[16px] font-semibold">Super Intelligence Defence Lab</div>
            <div className="font-mono text-[11px] text-navy/60">digest sha256:4f2c…9e1a · re-test included</div>
          </div>
          <Emblem size={34} color="#0D1F2D" />
        </footer>
      </div>
    </article>
  );
}
