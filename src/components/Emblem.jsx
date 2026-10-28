// The Station Zero emblem, split into its two parts:
// the dial (outer ring, ticks, diamond index) and the fixed zero (inner ring, slashed oval, bars).
export function DialRing({ color = "#C8A24B" }) {
  return (
    <g>
      <circle cx="100" cy="100" r="96" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="100" cy="100" r="88" fill="none" stroke={color} strokeWidth="8" strokeDasharray="1.6 19.666" />
      <path d="M100 2 L105 8 L100 14 L95 8 Z" fill="#0D1F2D" stroke={color} strokeWidth="2" />
    </g>
  );
}

export function ZeroCore({ color = "#C8A24B" }) {
  return (
    <g>
      <circle cx="100" cy="100" r="80" fill="none" stroke={color} strokeWidth="1.5" />
      <ellipse cx="100" cy="100" rx="28" ry="46" fill="none" stroke={color} strokeWidth="7" />
      <line x1="80" y1="140" x2="120" y2="60" stroke={color} strokeWidth="5" />
      <g stroke={color} strokeWidth="3">
        <line x1="36" y1="88" x2="62" y2="88" />
        <line x1="30" y1="100" x2="62" y2="100" />
        <line x1="36" y1="112" x2="62" y2="112" />
        <line x1="138" y1="88" x2="164" y2="88" />
        <line x1="138" y1="100" x2="170" y2="100" />
        <line x1="138" y1="112" x2="164" y2="112" />
      </g>
    </g>
  );
}

export function Emblem({ size = 40, color = "#C8A24B", title }) {
  return (
    <svg viewBox="0 0 200 200" width={size} height={size} role={title ? "img" : undefined} aria-label={title} aria-hidden={title ? undefined : true}>
      <DialRing color={color} />
      <ZeroCore color={color} />
    </svg>
  );
}
