import { siteConfig } from "../../lib/site-config";

// Positions are projected from real lat/lng (roughly to scale), with the hub
// at PT's South Austin office — a coverage diagram, not a navigational map.
const nodes = [
  { name: "Austin", x: 130, y: 205, hub: true },
  { name: "Georgetown", x: 168, y: 38 },
  { name: "Leander", x: 100, y: 58 },
  { name: "Round Rock", x: 168, y: 86 },
  { name: "Cedar Park", x: 112, y: 86 },
  { name: "Pflugerville", x: 196, y: 120 },
  { name: "Buda", x: 104, y: 256 },
  { name: "Kyle", x: 88, y: 294 },
  { name: "San Marcos", x: 64, y: 338 },
];

const hub = nodes[0];

export default function ServiceAreaMap({ className = "" }: { className?: string }) {
  return (
    <div className={`relative aspect-[5/6] w-full overflow-hidden rounded-xl border border-charcoal-2 bg-ink ${className}`}>
      <div
        aria-hidden
        className="absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(204,183,138,0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(204,183,138,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <svg viewBox="0 0 260 370" className="relative h-full w-full" role="img" aria-label={`Service area: ${siteConfig.serviceAreaCities.join(", ")}`}>
        {[70, 130, 185].map((r) => (
          <circle key={r} cx={hub.x} cy={hub.y} r={r} fill="none" stroke="rgba(128,106,63,0.25)" strokeDasharray="2 5" />
        ))}

        {nodes
          .filter((n) => !n.hub)
          .map((n) => (
            <line key={n.name} x1={hub.x} y1={hub.y} x2={n.x} y2={n.y} stroke="rgba(204,183,138,0.7)" strokeWidth={1} />
          ))}

        {nodes.map((n) => (
          <g key={n.name}>
            <circle
              cx={n.x}
              cy={n.y}
              r={n.hub ? 7 : 4}
              fill={n.hub ? "#806a3f" : "#ffffff"}
              stroke={n.hub ? "#ffffff" : "#806a3f"}
              strokeWidth={n.hub ? 2 : 1.5}
            />
            {n.hub && (
              // CSS transform/opacity animation (composited) rather than SMIL, which
              // forces a style recalc every frame for as long as the page is open.
              <circle cx={n.x} cy={n.y} r={13} fill="none" stroke="#806a3f" strokeWidth={1} className="map-pulse" />
            )}
            <text
              x={n.x}
              y={n.hub ? n.y - 14 : n.y - 9}
              textAnchor="middle"
              fontSize={n.hub ? 11 : 8.5}
              fontWeight={n.hub ? 700 : 500}
              letterSpacing={n.hub ? 1.2 : 0.4}
              fill={n.hub ? "#1f1d1a" : "#6b665c"}
              style={{ textTransform: "uppercase", fontFamily: "var(--font-inter)" }}
            >
              {n.name}
            </text>
          </g>
        ))}
      </svg>

      <div className="absolute bottom-3 left-3 rounded bg-ink/90 px-2.5 py-1 text-[10px] font-semibold tracking-[0.14em] text-steel uppercase">
        Based in South Austin
      </div>
    </div>
  );
}
