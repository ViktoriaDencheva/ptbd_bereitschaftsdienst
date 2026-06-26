"use client";
import { useState } from "react";

const F = "'Poppins', sans-serif";
const CTA_HEX = "#2D5B8D";

// The Austria SVG image is 1255.891 x 700.417 px (Inkscape, Mercator-like projection)
// Austria fills roughly x: 0..1255, y: 0..700 of that image
// We display it in a 760x420 viewBox (scale ~0.605x, 0.599y)
// Each state's clickable region is an approximate polygon in the IMAGE's coordinate space,
// then we use a transform="scale(0.605, 0.599)" to map them to our viewBox.
// These coords are rough but the real Austria image underneath makes it look accurate.

type Region = {
  id: string;
  name: string;
  count: number;
  // Polygon points in the Austria_location_map.svg coordinate space (1255x700)
  polygon: string;
  labelX: number;
  labelY: number;
};

// Approximate state regions in the SVG image coordinate space
// Image coordinates: x goes left→right (W→E), y goes top→bottom (N→S)
// Austria center is roughly (620, 380) in the 1255x700 SVG
const REGIONS: Region[] = [
  {
    id: "vorarlberg",
    name: "Vorarlberg",
    count: 42,
    labelX: 44,
    labelY: 290,
    polygon: "10,364 28,363 25,385 48,392 55,409 66,422 88,440 110,442 109,468 101,494 72,517 44,538 15,501 5,440 5,401",
  },
  {
    id: "tirol",
    name: "Tirol",
    count: 118,
    labelX: 224,
    labelY: 355,
    polygon:
      // Main body
      "110,442 136,440 161,406 178,397 200,391 228,373 239,374 258,372 285,345 313,337 340,338 354,330 366,326 370,328 390,333 440,340 441,333 499,338 499,337 524,337 548,328 548,364 543,392 534,416 527,443 510,472 488,503 476,523 453,525 445,514 422,523 396,543 370,564 351,574 306,590 282,591 269,585 221,583 172,590 148,575 131,559 110,547 95,543 85,540 101,494 109,468 110,442",
  },
  {
    id: "salzburg",
    name: "Salzburg",
    count: 96,
    labelX: 412,
    labelY: 376,
    polygon: "548,328 548,364 543,392 534,416 527,443 557,462 570,481 593,484 612,492 637,502 649,494 655,473 659,450 662,427 662,404 656,381 641,347 619,331 601,324 585,320 565,314 553,320",
  },
  {
    id: "oberoesterreich",
    name: "Oberösterreich",
    count: 156,
    labelX: 538,
    labelY: 308,
    polygon: "548,328 553,320 565,314 585,320 601,324 619,331 641,347 656,381 662,404 662,427 659,450 673,403 687,394 703,388 719,381 733,387 748,393 762,396 780,402 795,406 814,409 828,407 840,390 845,362 839,337 822,307 803,291 780,280 756,272 731,268 706,269 680,270 655,273 629,277 603,280 578,268 556,260 537,252 524,255",
  },
  {
    id: "niederoesterreich",
    name: "Niederösterreich",
    count: 248,
    labelX: 740,
    labelY: 270,
    polygon:
      "828,407 840,390 845,362 839,337 822,307 803,291 780,280 890,260 930,245 970,225 1010,205 1048,182 1080,155 1110,125 1140,95 1165,65 1185,35 1198,10 1220,18 1245,45 1252,75 1250,110 1240,142 1225,170 1210,198 1200,230 1193,260 1190,292 1185,322 1175,350 1165,378 1150,400 1135,420 1115,440 1095,455 1080,470 1060,480 1040,490 1020,496 998,500 980,504 960,505 940,502 920,498 900,490 880,480 866,468 850,455 838,440 825,425",
  },
  {
    id: "wien",
    name: "Wien",
    count: 312,
    labelX: 1090,
    labelY: 370,
    polygon: "1090,352 1118,357 1137,381 1143,408 1140,435 1127,455 1110,465 1090,460 1077,440 1072,415 1078,388",
  },
  {
    id: "burgenland",
    name: "Burgenland",
    count: 38,
    labelX: 1178,
    labelY: 440,
    polygon: "1175,350 1165,378 1150,400 1135,420 1115,440 1152,447 1165,467 1174,492 1180,518 1184,544 1185,568 1180,590 1172,612 1160,628 1200,600 1218,568 1228,535 1230,500 1225,468 1215,438 1200,410 1190,380",
  },
  {
    id: "steiermark",
    name: "Steiermark",
    count: 174,
    labelX: 870,
    labelY: 560,
    polygon: "662,427 659,450 655,473 649,494 637,502 648,530 660,556 671,584 682,612 690,640 698,665 712,685 728,698 748,702 768,700 788,694 808,683 822,668 832,650 820,628 810,606 800,582 793,556 790,528 794,504 806,482 820,460 832,438 838,440 825,425 828,407 814,409 795,406 780,402 762,396 748,393 733,387 719,381 703,388 687,394 673,403 659,450",
  },
  {
    id: "kaernten",
    name: "Kärnten",
    count: 82,
    labelX: 560,
    labelY: 620,
    polygon: "527,443 510,472 488,503 476,523 453,525 445,514 433,556 445,575 460,594 478,612 498,628 520,640 542,648 564,654 588,658 612,660 636,660 658,656 678,648 698,638 712,625 714,645 698,665 682,612 671,584 660,556 648,530 637,502 612,492 593,484 570,481 557,462 527,443",
  },
];

const SCALE_X = 760 / 1255.891;
const SCALE_Y = 420 / 700.417;

function toViewBox(polygon: string): string {
  return polygon
    .split(" ")
    .map(pair => {
      const [x, y] = pair.split(",").map(Number);
      return `${(x * SCALE_X).toFixed(1)},${(y * SCALE_Y).toFixed(1)}`;
    })
    .join(" ");
}

export default function AustriaMap() {
  const [hovered, setHovered] = useState<string | null>(null);
  const hoveredRegion = REGIONS.find(r => r.id === hovered);

  return (
    <div style={{ position: "relative", width: "100%", userSelect: "none" }}>
      {/* Real Austria map as base image */}
      <img
        src="/Austria_location_map.svg"
        alt="Österreich Karte"
        style={{ width: "100%", height: "auto", display: "block", position: "relative" }}
        draggable={false}
      />

      {/* SVG overlay for interactive regions */}
      <svg
        viewBox="0 0 760 420"
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {REGIONS.map(r => {
          const isHovered = hovered === r.id;
          const scaledLabel = {
            x: r.labelX * SCALE_X,
            y: r.labelY * SCALE_Y,
          };
          return (
            <g
              key={r.id}
              onMouseEnter={() => setHovered(r.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: "pointer" }}
            >
              <polygon
                points={toViewBox(r.polygon)}
                fill={isHovered ? `${CTA_HEX}99` : "transparent"}
                stroke={isHovered ? "white" : "transparent"}
                strokeWidth="1"
                style={{ transition: "fill 0.18s ease" }}
              />
              {isHovered && (
                <text
                  x={scaledLabel.x}
                  y={scaledLabel.y}
                  textAnchor="middle"
                  fontFamily={F}
                  fontSize={10}
                  fontWeight={700}
                  fill="white"
                  style={{ pointerEvents: "none" }}
                >
                  {r.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
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
