import fs from 'fs';
import path from 'path';

const svgPath = path.resolve('public/Austria_all-map 1.svg');
const content = fs.readFileSync(svgPath, 'utf8');
const lines = content.split('\n');

// Extract path d attributes indexed by line number (1-based)
function getD(lineNum) {
  const l = lines[lineNum - 1];
  const m = l.match(/d="([^"]+)"/);
  return m ? m[1] : '';
}
function getFillRule(lineNum) {
  const l = lines[lineNum - 1];
  return l.includes('fill-rule="evenodd"') ? 'evenodd' : 'nonzero';
}
function getStroke(lineNum) {
  const l = lines[lineNum - 1];
  const m = l.match(/stroke="([^"]+)"/);
  return m ? m[1] : 'none';
}
function getStrokeWidth(lineNum) {
  const l = lines[lineNum - 1];
  const m = l.match(/stroke-width="([^"]+)"/);
  return m ? m[1] : '1';
}

// Province mapping: grey fill paths (line numbers) → province info
// Identified from center coordinates in 4540x2554 SVG space
const PROVINCES = [
  {
    id: 'vorarlberg',
    name: 'Vorarlberg',
    count: 42,
    labelX: 303, labelY: 1550,
    greyLines: [2],      // fill path(s)
    strokeLines: [3],    // stroke/border path(s)
  },
  {
    id: 'tirol',
    name: 'Tirol',
    count: 118,
    labelX: 1100, labelY: 1580,
    greyLines: [4],
    strokeLines: [5],
  },
  {
    id: 'salzburg',
    name: 'Salzburg',
    count: 96,
    labelX: 1980, labelY: 1320,
    greyLines: [6],
    strokeLines: [], // L7 is a second fill path
  },
  {
    id: 'kaernten',
    name: 'Kärnten',
    count: 82,
    labelX: 2200, labelY: 2050,
    greyLines: [7],
    strokeLines: [],
  },
  {
    id: 'steiermark',
    name: 'Steiermark',
    count: 174,
    labelX: 2900, labelY: 1600,
    greyLines: [8],
    strokeLines: [9],
  },
  {
    id: 'oberoesterreich',
    name: 'Oberösterreich',
    count: 156,
    labelX: 2387, labelY: 820,
    greyLines: [10],
    strokeLines: [11],
  },
  {
    id: 'burgenland',
    name: 'Burgenland',
    count: 38,
    labelX: 3850, labelY: 1250,
    greyLines: [12],
    strokeLines: [13],
  },
  {
    id: 'niederoesterreich',
    name: 'Niederösterreich',
    count: 248,
    labelX: 3250, labelY: 620,
    greyLines: [14],
    strokeLines: [],
  },
  {
    id: 'wien',
    name: 'Wien',
    count: 312,
    labelX: 3705, labelY: 560,
    greyLines: [15],
    strokeLines: [],
  },
];

// Background is L16 (the overall Austria outline used as base layer)
const BG_LINE = 16;

// Extract path data
function buildProvincePaths(p) {
  return p.greyLines.map(ln => ({
    d: getD(ln),
    fillRule: getFillRule(ln),
  }));
}

// Build the component
const provincesData = PROVINCES.map(p => ({
  ...p,
  paths: buildProvincePaths(p),
}));

const bgD = getD(BG_LINE);
const bgFillRule = getFillRule(BG_LINE);

// Generate TypeScript component
const componentLines = [
  '"use client";',
  'import { useState } from "react";',
  '',
  'const F = "\'Poppins\', sans-serif";',
  'const CTA_HEX = "#2D5B8D";',
  'const GREY = "#C8DCEE";',
  'const HOVER_FILL = "#4A86C8";',
  '',
  'type ProvinceId = ' + PROVINCES.map(p => `"${p.id}"`).join(' | ') + ';',
  '',
  'export type Province = {',
  '  id: ProvinceId;',
  '  name: string;',
  '  count: number;',
  '};',
  '',
  'export const PROVINCES: Province[] = [',
  ...PROVINCES.map(p => `  { id: "${p.id}", name: "${p.name}", count: ${p.count} },`),
  '];',
  '',
  'type Props = {',
  '  activeId?: ProvinceId | null;',
  '  onSelect?: (id: ProvinceId) => void;',
  '};',
  '',
  'export default function AustriaMap({ activeId, onSelect }: Props) {',
  '  const [hoveredId, setHoveredId] = useState<ProvinceId | null>(null);',
  '',
  '  function getFill(id: ProvinceId) {',
  '    if (id === activeId) return CTA_HEX;',
  '    if (id === hoveredId) return HOVER_FILL;',
  '    return GREY;',
  '  }',
  '',
  '  return (',
  '    <svg',
  '      viewBox="0 0 4540 2554"',
  '      style={{ width: "100%", height: "auto", display: "block" }}',
  '      xmlns="http://www.w3.org/2000/svg"',
  '    >',
  '      {/* Austria base background */}',
  `      <path d="${bgD}" fill="${'#E8F1F8'}" fillRule="${bgFillRule}" />`,
  '',
  '      {/* Interactive provinces */}',
  ...provincesData.flatMap(p => [
    `      {/* ${p.name} */}`,
    `      <g`,
    `        style={{ cursor: "pointer" }}`,
    `        onMouseEnter={() => setHoveredId("${p.id}")}`,
    `        onMouseLeave={() => setHoveredId(null)}`,
    `        onClick={() => onSelect?.("${p.id}")}`,
    `      >`,
    ...p.paths.map(({ d, fillRule }) =>
      `        <path d="${d}" fill={getFill("${p.id}")} fillRule="${fillRule}" style={{ transition: "fill 0.18s ease" }} />`
    ),
    `        <text x={${p.labelX}} y={${p.labelY}} textAnchor="middle" fontFamily={F}`,
    `          fontSize={${p.id === 'wien' ? 60 : 80}} fontWeight={activeId === "${p.id}" || hoveredId === "${p.id}" ? 700 : 500}`,
    `          fill={activeId === "${p.id}" || hoveredId === "${p.id}" ? "white" : CTA_HEX}`,
    `          style={{ pointerEvents: "none", transition: "fill 0.18s ease" }}`,
    `        >`,
    `          {${JSON.stringify(p.name)}}`,
    `        </text>`,
    `      </g>`,
  ]),
  '    </svg>',
  '  );',
  '}',
];

const output = componentLines.join('\n');
const outPath = path.resolve('components/AustriaMap.tsx');
fs.writeFileSync(outPath, output);
console.log('Written to', outPath);
console.log('Lines:', output.split('\n').length);
console.log('Size:', Math.round(output.length / 1024), 'KB');
