"use client";
import { useState } from "react";

const F = "'Poppins', sans-serif";
const CTA_HEX = "#2D5B8D";

type Region = {
  id: string;
  name: string;
  count: number;
  path: string;
  labelX: number;
  labelY: number;
};

const REGIONS: Region[] = [
  {
    id: "vorarlberg",
    name: "Vorarlberg",
    count: 42,
    labelX: 52,
    labelY: 195,
    path: "M 48 148 L 72 140 L 78 158 L 80 178 L 74 200 L 64 218 L 52 222 L 44 208 L 42 188 L 46 168 Z",
  },
  {
    id: "tirol",
    name: "Tirol",
    count: 118,
    labelX: 180,
    labelY: 210,
    path: "M 78 158 L 80 138 L 120 122 L 180 118 L 240 124 L 268 138 L 272 160 L 260 182 L 248 204 L 220 218 L 196 228 L 164 230 L 132 222 L 100 218 L 74 200 L 80 178 Z",
  },
  {
    id: "salzburg",
    name: "Salzburg",
    count: 96,
    labelX: 318,
    labelY: 210,
    path: "M 248 204 L 260 182 L 272 160 L 304 154 L 340 152 L 368 158 L 380 172 L 378 196 L 370 218 L 352 238 L 328 250 L 304 248 L 280 240 L 260 224 L 248 204 Z",
  },
  {
    id: "oberoesterreich",
    name: "Oberösterreich",
    count: 156,
    labelX: 400,
    labelY: 152,
    path: "M 304 154 L 340 152 L 368 158 L 404 148 L 448 144 L 484 148 L 500 162 L 498 188 L 484 208 L 456 220 L 420 224 L 390 220 L 370 218 L 378 196 L 380 172 L 368 158 Z",
  },
  {
    id: "niederoesterreich",
    name: "Niederösterreich",
    count: 248,
    labelX: 568,
    labelY: 152,
    path: "M 484 148 L 530 136 L 580 128 L 628 130 L 668 138 L 692 154 L 696 174 L 688 194 L 668 210 L 644 218 L 620 224 L 592 224 L 564 220 L 536 218 L 512 218 L 484 208 L 498 188 L 500 162 Z",
  },
  {
    id: "wien",
    name: "Wien",
    count: 312,
    labelX: 688,
    labelY: 204,
    path: "M 668 210 L 688 194 L 696 174 L 704 188 L 708 208 L 700 226 L 688 230 L 672 226 Z",
  },
  {
    id: "burgenland",
    name: "Burgenland",
    count: 38,
    labelX: 706,
    labelY: 270,
    path: "M 688 230 L 700 226 L 708 208 L 716 228 L 718 258 L 714 290 L 706 318 L 694 336 L 682 332 L 676 312 L 674 280 L 672 252 L 672 226 Z",
  },
  {
    id: "steiermark",
    name: "Steiermark",
    count: 174,
    labelX: 536,
    labelY: 300,
    path: "M 456 220 L 484 208 L 512 218 L 536 218 L 564 220 L 592 224 L 620 224 L 644 218 L 668 210 L 672 226 L 672 252 L 674 280 L 668 310 L 648 334 L 616 348 L 580 352 L 548 342 L 516 322 L 492 300 L 472 278 L 456 254 L 450 236 Z",
  },
  {
    id: "kaernten",
    name: "Kärnten",
    count: 82,
    labelX: 406,
    labelY: 316,
    path: "M 280 240 L 304 248 L 328 250 L 352 238 L 370 218 L 390 220 L 420 224 L 450 236 L 456 254 L 472 278 L 492 300 L 492 326 L 474 344 L 444 352 L 408 354 L 372 342 L 344 318 L 322 292 L 308 268 L 296 248 Z",
  },
];

export default function AustriaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredRegion = REGIONS.find(r => r.id === hovered);

  return (
    <div style={{ position: "relative", width: "100%", userSelect: "none" }}>
      <svg
        viewBox="0 0 760 400"
        style={{ width: "100%", height: "auto", display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {REGIONS.map(r => {
          const isHovered = hovered === r.id;
          return (
            <g key={r.id}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <path
                d={r.path}
                fill={isHovered ? CTA_HEX : "#D6E4F7"}
                stroke="white"
                strokeWidth="2"
                strokeLinejoin="round"
                style={{ transition: "fill 0.2s ease" }}
              />
              {/* City dot */}
              <circle
                cx={r.labelX}
                cy={r.labelY}
                r={isHovered ? 5 : 3.5}
                fill={isHovered ? "white" : CTA_HEX}
                style={{ transition: "all 0.2s ease" }}
              />
              {/* Label */}
              <text
                x={r.labelX}
                y={r.labelY - 10}
                textAnchor="middle"
                fontFamily={F}
                fontSize={isHovered ? 11 : 9}
                fontWeight={isHovered ? 700 : 500}
                fill={isHovered ? "white" : "#4A6FA5"}
                style={{ transition: "all 0.2s ease", pointerEvents: "none" }}
              >
                {r.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      <div style={{
        position: "absolute",
        bottom: 16,
        left: 16,
        background: "white",
        borderRadius: 12,
        padding: "12px 16px",
        boxShadow: "0 4px 20px rgba(45,91,141,0.15)",
        border: "1px solid #D6E4F7",
        minWidth: 160,
        transition: "opacity 0.2s",
        opacity: hoveredRegion ? 1 : 0,
        pointerEvents: "none",
      }}>
        {hoveredRegion && (
          <>
            <p style={{ fontFamily: F, fontWeight: 700, fontSize: 14, color: CTA_HEX, margin: "0 0 4px" }}>{hoveredRegion.name}</p>
            <p style={{ fontFamily: F, fontSize: 12, color: "#5C5C5C", margin: 0 }}>
              <span style={{ fontWeight: 700, fontSize: 18, color: CTA_HEX }}>{hoveredRegion.count}</span> Fachkräfte verfügbar
            </p>
          </>
        )}
      </div>
    </div>
  );
}
