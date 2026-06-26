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

// Geographic SVG paths for Austria's 9 Bundesländer
// ViewBox: 0 0 760 480
// Projection: x=(lon-9.5)*94, y=(49.15-lat)*155
const REGIONS: Region[] = [
  {
    id: "vorarlberg",
    name: "Vorarlberg",
    count: 42,
    labelX: 38,
    labelY: 218,
    path: "M 6,148 L 68,136 L 74,160 L 78,196 L 70,232 L 48,246 L 18,250 L 4,238 Z",
  },
  {
    id: "tirol",
    name: "Tirol",
    count: 118,
    labelX: 182,
    labelY: 196,
    // Main body + East Tirol (Osttirol) as detached polygon
    path: "M 68,136 L 78,108 L 150,86 L 234,82 L 314,90 L 352,104 L 358,128 L 345,158 L 308,180 L 265,200 L 220,218 L 178,228 L 142,232 L 105,226 L 82,218 L 70,232 L 78,196 L 74,160 Z M 296,292 L 340,276 L 366,282 L 382,306 L 370,334 L 340,344 L 310,336 L 288,318 L 282,296 Z",
  },
  {
    id: "salzburg",
    name: "Salzburg",
    count: 96,
    labelX: 358,
    labelY: 162,
    path: "M 314,90 L 362,84 L 398,92 L 422,108 L 428,133 L 418,160 L 398,180 L 372,198 L 346,213 L 323,220 L 300,210 L 298,186 L 308,180 L 345,158 L 358,128 L 352,104 Z",
  },
  {
    id: "oberoesterreich",
    name: "Oberösterreich",
    count: 156,
    labelX: 428,
    labelY: 130,
    path: "M 314,90 L 362,84 L 398,92 L 438,82 L 487,76 L 521,82 L 536,102 L 530,130 L 514,154 L 484,170 L 452,178 L 422,178 L 398,180 L 418,160 L 428,133 L 422,108 L 398,92 Z",
  },
  {
    id: "niederoesterreich",
    name: "Niederösterreich",
    count: 248,
    labelX: 575,
    labelY: 130,
    path: "M 438,82 L 487,76 L 521,82 L 536,102 L 572,86 L 622,78 L 664,85 L 699,101 L 716,122 L 718,148 L 708,173 L 689,190 L 664,204 L 632,211 L 599,214 L 566,211 L 538,208 L 516,202 L 484,192 L 484,170 L 514,154 L 530,130 L 536,102 L 521,82 L 487,76 Z",
  },
  {
    id: "wien",
    name: "Wien",
    count: 312,
    labelX: 700,
    labelY: 192,
    path: "M 664,204 L 689,190 L 708,173 L 718,148 L 728,164 L 730,190 L 722,212 L 708,224 L 692,230 L 674,224 Z",
  },
  {
    id: "burgenland",
    name: "Burgenland",
    count: 38,
    labelX: 720,
    labelY: 298,
    path: "M 692,230 L 708,224 L 722,212 L 730,190 L 735,218 L 738,250 L 733,284 L 724,317 L 712,344 L 698,355 L 680,343 L 676,314 L 671,283 L 673,252 L 674,224 Z",
  },
  {
    id: "steiermark",
    name: "Steiermark",
    count: 174,
    labelX: 552,
    labelY: 296,
    path: "M 422,178 L 452,178 L 484,192 L 516,202 L 538,208 L 566,211 L 599,214 L 632,211 L 664,204 L 674,224 L 671,283 L 676,314 L 664,344 L 635,364 L 600,376 L 562,368 L 528,349 L 501,324 L 481,298 L 462,272 L 444,247 L 427,232 L 398,180 Z",
  },
  {
    id: "kaernten",
    name: "Kärnten",
    count: 82,
    labelX: 406,
    labelY: 354,
    path: "M 218,315 L 242,294 L 268,282 L 296,292 L 288,318 L 310,336 L 340,344 L 370,334 L 382,306 L 400,298 L 427,295 L 454,292 L 481,298 L 462,272 L 444,247 L 427,232 L 398,180 L 372,198 L 346,213 L 323,220 L 300,210 L 296,234 L 285,258 L 268,274 L 242,284 Z",
  },
];

export default function AustriaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredRegion = REGIONS.find(r => r.id === hovered);

  return (
    <div style={{ position: "relative", width: "100%", userSelect: "none" }}>
      <svg
        viewBox="0 0 760 420"
        style={{ width: "100%", height: "auto", display: "block" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {REGIONS.map(r => {
          const isHovered = hovered === r.id;
          return (
            <g
              key={r.id}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <path
                d={r.path}
                fill={isHovered ? CTA_HEX : "#C8DCEE"}
                stroke="white"
                strokeWidth="1.5"
                strokeLinejoin="round"
                style={{ transition: "fill 0.18s ease" }}
              />
              <text
                x={r.labelX}
                y={r.labelY}
                textAnchor="middle"
                fontFamily={F}
                fontSize={isHovered ? 10 : 8.5}
                fontWeight={isHovered ? 700 : 500}
                fill={isHovered ? "white" : "#2D5B8D"}
                style={{ transition: "all 0.18s ease", pointerEvents: "none" }}
              >
                {r.name}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Hover tooltip */}
      <div
        style={{
          position: "absolute",
          bottom: 12,
          left: 12,
          background: "white",
          borderRadius: 12,
          padding: "10px 16px",
          boxShadow: "0 4px 20px rgba(45,91,141,0.18)",
          border: "1px solid #D6E4F7",
          minWidth: 170,
          opacity: hoveredRegion ? 1 : 0,
          transform: hoveredRegion ? "translateY(0)" : "translateY(4px)",
          transition: "opacity 0.18s ease, transform 0.18s ease",
          pointerEvents: "none",
        }}
      >
        {hoveredRegion && (
          <>
            <p style={{ fontFamily: F, fontWeight: 700, fontSize: 13, color: CTA_HEX, margin: "0 0 3px" }}>
              {hoveredRegion.name}
            </p>
            <p style={{ fontFamily: F, fontSize: 12, color: "#5C5C5C", margin: 0 }}>
              <span style={{ fontWeight: 700, fontSize: 20, color: CTA_HEX }}>{hoveredRegion.count}</span>
              {" "}Fachkräfte
            </p>
          </>
        )}
      </div>
    </div>
  );
}
