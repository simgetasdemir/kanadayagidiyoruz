"use client";

// Ottawa merkezli, sadeleştirilmiş harita. Konumlar gerçek enlem/boylamdan hesaplanır.
import { motion } from "motion/react";

const W = 640;
const H = 400;
const project = (lat: number, lon: number) => ({ x: (lon + 80.5) * 60, y: (47.6 - lat) * 85 + 10 });

const CITIES = [
  { name: "Toronto", lat: 43.65, lon: -79.38, time: "4–5 saat", anchor: "start" as const, dx: -4, dy: -30 },
  { name: "Ottawa", lat: 45.42, lon: -75.7, time: "", anchor: "middle" as const, dx: 0, dy: -20 },
  { name: "Montreal", lat: 45.5, lon: -73.57, time: "2 saat", anchor: "start" as const, dx: 12, dy: 22 },
  { name: "Quebec City", lat: 46.81, lon: -71.21, time: "4,5 saat", anchor: "end" as const, dx: -12, dy: -14 },
];

export function CityMap() {
  const p = Object.fromEntries(CITIES.map((c) => [c.name, project(c.lat, c.lon)]));
  const o = p.Ottawa;

  const arc = (to: { x: number; y: number }, lift: number) => {
    const mx = (o.x + to.x) / 2;
    const my = (o.y + to.y) / 2 - lift;
    return `M${o.x} ${o.y} Q ${mx} ${my} ${to.x} ${to.y}`;
  };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label="Ottawa, Montreal, Quebec City ve Toronto'nun haritadaki konumu">
      <defs>
        <pattern id="map-dots" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.1" fill="var(--line)" />
        </pattern>
      </defs>
      {/* Kara: noktalı doku */}
      <rect width={W} height={H} fill="url(#map-dots)" />

      {/* Ontario Gölü */}
      <path
        d="M42 375 C 50 355, 60 348, 67 347 C 100 335, 130 322, 150 320 C 190 316, 220 300, 240 299 C 255 300, 262 330, 252 358 C 220 372, 180 378, 150 376 C 100 380, 55 385, 42 375 Z"
        fill="color-mix(in oklab, var(--accent) 12%, var(--paper))"
        stroke="color-mix(in oklab, var(--accent) 22%, var(--paper))"
      />
      {/* St. Lawrence nehri */}
      <path
        d="M242 300 C 290 268, 340 238, 380 214 C 405 199, 420 188, 440 176 C 480 150, 520 110, 557 74 C 585 46, 610 26, 650 4"
        fill="none"
        stroke="color-mix(in oklab, var(--accent) 22%, var(--paper))"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {/* Ottawa nehri */}
      <path d="M120 120 C 180 140, 240 170, 288 176 C 330 182, 380 186, 416 182" fill="none" stroke="color-mix(in oklab, var(--accent) 22%, var(--paper))" strokeWidth="3.5" strokeLinecap="round" />

      {/* Ottawa'dan rotalar */}
      {CITIES.filter((c) => c.name !== "Ottawa").map((c, i) => (
        <motion.path
          key={c.name}
          d={arc(p[c.name], c.name === "Montreal" ? 34 : 60)}
          fill="none"
          stroke="var(--brand)"
          strokeWidth="2"
          strokeDasharray="4 6"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, delay: 0.2 + i * 0.25, ease: "easeInOut" }}
        />
      ))}

      {/* Şehirler */}
      {CITIES.map((c) => {
        const pt = p[c.name];
        const home = c.name === "Ottawa";
        return (
          <g key={c.name}>
            {home ? (
              <motion.circle
                cx={pt.x}
                cy={pt.y}
                r={10}
                fill="var(--brand)"
                initial={{ opacity: 0.35, scale: 1 }}
                animate={{ opacity: 0, scale: 2.6 }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
              />
            ) : null}
            <circle cx={pt.x} cy={pt.y} r={home ? 8 : 6} fill={home ? "var(--brand)" : "var(--paper)"} stroke="var(--brand)" strokeWidth={home ? 0 : 2.5} />
            <text
              x={pt.x + c.dx}
              y={pt.y + c.dy}
              textAnchor={c.anchor}
              className="fill-ink font-body"
              style={{ fontSize: 16, fontWeight: 700 }}
            >
              {c.name}
            </text>
            {c.time ? (
              <text
                x={pt.x + c.dx}
                y={pt.y + c.dy + 18}
                textAnchor={c.anchor}
                className="fill-muted font-mono"
                style={{ fontSize: 14, fontWeight: 400 }}
              >
                Ottawa&apos;ya {c.time}
              </text>
            ) : null}
          </g>
        );
      })}

      <text x={W - 16} y={H - 16} textAnchor="end" className="fill-muted font-mono" style={{ fontSize: 14, fontWeight: 400 }}>
        Süreler arabayla, yaklaşık
      </text>
    </svg>
  );
}
