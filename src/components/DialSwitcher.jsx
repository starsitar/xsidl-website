import { useEffect, useRef, useState } from "react";

const reduceMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The emblem's dial as a physical control. The brass rim turns until its diamond index points at
// the chosen case; the slashed zero at the centre never moves. First load: it cracks like a safe.
export default function DialSwitcher({ cases, value, onChange }) {
  const target = cases.find((c) => c.id === value).angle;
  const [rotation, setRotation] = useState(() => (reduceMotion() ? target : target - 1080));
  const [transition, setTransition] = useState("none");
  const [settled, setSettled] = useState(reduceMotion());
  const cracked = useRef(false);

  useEffect(() => {
    if (!cracked.current) {
      cracked.current = true;
      if (reduceMotion()) return;
      const id = requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          setTransition("transform 2.6s cubic-bezier(0.16, 1, 0.3, 1)");
          setRotation(target);
          setTimeout(() => setSettled(true), 2400);
        })
      );
      return () => cancelAnimationFrame(id);
    }
    setTransition(reduceMotion() ? "none" : "transform 0.8s cubic-bezier(0.34, 1.4, 0.64, 1)");
    setRotation((r) => target + Math.round((r - target) / 360) * 360);
  }, [target]);

  const index = cases.findIndex((c) => c.id === value);
  const pick = (i) => onChange(cases[(i + cases.length) % cases.length].id);

  return (
    <div className="relative">
      <div className="relative mx-auto w-[316px] max-sm:w-[264px]" aria-hidden="true">
        <svg viewBox="0 0 300 300" className="block size-full overflow-visible">
          <defs>
            <radialGradient id="rim" cx="35%" cy="30%" r="80%">
              <stop offset="0" stopColor="#F0D88E" />
              <stop offset="0.45" stopColor="#C8A24B" />
              <stop offset="1" stopColor="#7C5F1E" />
            </radialGradient>
            <radialGradient id="well" cx="50%" cy="45%" r="60%">
              <stop offset="0" stopColor="#1B3042" />
              <stop offset="1" stopColor="#0A1822" />
            </radialGradient>
            <linearGradient id="bevel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#FFF0BE" stopOpacity="0.9" />
              <stop offset="0.5" stopColor="#C8A24B" stopOpacity="0" />
              <stop offset="1" stopColor="#3B2C0C" stopOpacity="0.7" />
            </linearGradient>
            <filter id="drop" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#000" floodOpacity="0.55" />
            </filter>
            <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            {cases.map((c) => (
              <path key={c.id} id={`arc-${c.id}`} d={arcPath(150, 150, 142, c.angle - 40, c.angle + 40)} />
            ))}
          </defs>

          {/* Engraved case labels on the bezel, fixed; the index comes to them. */}
          {cases.map((c) => {
            const on = c.id === value;
            return (
              <text
                key={c.id}
                className="cursor-pointer select-none"
                onClick={() => onChange(c.id)}
                fontFamily="IBM Plex Mono, monospace"
                fontSize="12.5"
                letterSpacing="3.2"
                fill={on ? "#F1EBDD" : "#8E8878"}
                style={{ transition: "fill 400ms" }}
              >
                <textPath href={`#arc-${c.id}`} startOffset="50%" textAnchor="middle">
                  {c.label.toUpperCase()}
                </textPath>
              </text>
            );
          })}

          {/* Rim: turns */}
          <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: "150px 150px", transition }} filter="url(#drop)">
            <circle cx="150" cy="150" r="118" fill="url(#rim)" />
            <circle cx="150" cy="150" r="118" fill="url(#bevel)" />
            <circle cx="150" cy="150" r="118" fill="none" stroke="#2A1E07" strokeWidth="1" />
            <circle cx="150" cy="150" r="104" fill="none" stroke="#3B2C0C" strokeOpacity="0.55" strokeWidth="1" />
            {Array.from({ length: 60 }, (_, i) => {
              const a = (i * 6 * Math.PI) / 180;
              const long = i % 5 === 0;
              const r1 = long ? 106 : 110;
              return (
                <line
                  key={i}
                  x1={150 + r1 * Math.sin(a)} y1={150 - r1 * Math.cos(a)}
                  x2={150 + 116 * Math.sin(a)} y2={150 - 116 * Math.cos(a)}
                  stroke="#2A1E07" strokeOpacity={long ? 0.75 : 0.45} strokeWidth={long ? 1.6 : 1}
                />
              );
            })}
            <path d="M150 28 L156 36 L150 44 L144 36 Z" fill="#F1EBDD" stroke="#2A1E07" strokeWidth="0.8" filter={settled ? "url(#glow)" : undefined} />
          </g>

          {/* Well and the fixed zero */}
          <circle cx="150" cy="150" r="96" fill="url(#well)" />
          <circle cx="150" cy="150" r="96" fill="none" stroke="#000" strokeOpacity="0.5" strokeWidth="3" />
          <circle cx="150" cy="150" r="90" fill="none" stroke="#C8A24B" strokeWidth="1.2" strokeOpacity="0.8" />
          <g stroke="#C8A24B" strokeLinecap="square">
            <ellipse cx="150" cy="150" rx="29" ry="47" fill="none" strokeWidth="7" />
            <line x1="129" y1="191" x2="171" y2="109" strokeWidth="5" />
            <g strokeWidth="3">
              <line x1="84" y1="138" x2="111" y2="138" /><line x1="78" y1="150" x2="111" y2="150" /><line x1="84" y1="162" x2="111" y2="162" />
              <line x1="189" y1="138" x2="216" y2="138" /><line x1="189" y1="150" x2="222" y2="150" /><line x1="189" y1="162" x2="216" y2="162" />
            </g>
          </g>
        </svg>
      </div>

      {/* Accessible, keyboard and touch control for the same choice */}
      <div
        role="radiogroup"
        aria-label="Choose your case"
        className="mt-6 flex justify-center gap-1 font-mono text-[12px] tracking-[0.18em] uppercase"
        onKeyDown={(e) => {
          if (["ArrowRight", "ArrowDown"].includes(e.key)) { e.preventDefault(); pick(index + 1); }
          if (["ArrowLeft", "ArrowUp"].includes(e.key)) { e.preventDefault(); pick(index - 1); }
        }}
      >
        {cases.map((c) => {
          const on = c.id === value;
          return (
            <button
              key={c.id}
              role="radio"
              aria-checked={on}
              tabIndex={on ? 0 : -1}
              onClick={() => onChange(c.id)}
              className={`px-3 py-1.5 transition-colors ${on ? "bg-gold text-navy" : "text-muted/70 hover:text-cream"}`}
            >
              {c.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function arcPath(cx, cy, r, a1, a2) {
  const p = (a) => [cx + r * Math.sin((a * Math.PI) / 180), cy - r * Math.cos((a * Math.PI) / 180)];
  const [x1, y1] = p(a1);
  const [x2, y2] = p(a2);
  return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
}
