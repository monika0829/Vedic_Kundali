import { CHART_DATA } from '../data/sampleData';

const SIGN_ABBR = {
  'Aries': 'Ar', 'Taurus': 'Ta', 'Gemini': 'Ge', 'Cancer': 'Cn',
  'Leo': 'Le', 'Virgo': 'Vi', 'Libra': 'Li', 'Scorpio': 'Sc',
  'Sagittarius': 'Sg', 'Capricorn': 'Cp', 'Aquarius': 'Aq', 'Pisces': 'Pi',
};

const SIGN_SYMBOLS = {
  'Aries': '♈', 'Taurus': '♉', 'Gemini': '♊', 'Cancer': '♋',
  'Leo': '♌', 'Virgo': '♍', 'Libra': '♎', 'Scorpio': '♏',
  'Sagittarius': '♐', 'Capricorn': '♑', 'Aquarius': '♒', 'Pisces': '♓',
};

const PLANET_COLORS = {
  'Su': '#f59e0b', 'Mo': '#e2e8f0', 'Ma': '#ef4444', 'Me': '#22c55e',
  'Ju': '#f97316', 'Ve': '#ec4899', 'Sa': '#6366f1', 'Ra': '#8b5cf6', 'Ke': '#a855f7',
};

export default function KundaliChart() {
  const size = 400;
  const mid = size / 2;
  const border = 10;

  // North Indian chart: 12 triangular sections in a square
  // The chart is a square divided by diagonals and midlines
  const p1 = { x: border, y: border };           // top-left
  const p2 = { x: mid, y: border };               // top-mid
  const p3 = { x: size - border, y: border };     // top-right
  const p4 = { x: size - border, y: mid };         // mid-right
  const p5 = { x: size - border, y: size - border }; // bottom-right
  const p6 = { x: mid, y: size - border };         // bottom-mid
  const p7 = { x: border, y: size - border };       // bottom-left
  const p8 = { x: border, y: mid };                 // mid-left
  const center = { x: mid, y: mid };

  // House positions for North Indian style
  const housePositions = [
    // H1 - center (Ascendant)
    { cx: mid, cy: mid },
    // H2 - top row left
    { cx: (p1.x + p2.x) / 2, cy: (p1.y + center.y) / 2 - 5 },
    // H3 - left column top
    { cx: (p1.x + center.x) / 2 - 5, cy: (p1.y + p8.y) / 2 },
    // H4 - left column bottom
    { cx: (p1.x + center.x) / 2 - 5, cy: (p8.y + p7.y) / 2 },
    // H5 - bottom row left
    { cx: (p7.x + p6.x) / 2, cy: (center.y + p7.y) / 2 + 5 },
    // H6 - bottom row right
    { cx: (p6.x + p5.x) / 2, cy: (center.y + p7.y) / 2 + 5 },
    // H7 - right column bottom
    { cx: (p5.x + center.x) / 2 + 5, cy: (p4.y + p5.y) / 2 },
    // H8 - right column top
    { cx: (p5.x + center.x) / 2 + 5, cy: (p3.y + p4.y) / 2 },
    // H9 - top row right
    { cx: (p3.x + p2.x) / 2, cy: (p3.y + center.y) / 2 - 5 },
    // H10 - top center
    { cx: mid, cy: (p1.y + p2.y + center.y) / 3 },
    // H11 - center right
    { cx: (mid + p4.x) / 2, cy: mid },
    // H12 - center bottom
    { cx: mid, cy: (mid + p6.y) / 2 },
  ];

  const houses = CHART_DATA.houses;

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(17,17,40,0.9))',
      borderRadius: 20,
      padding: 24,
      border: '1px solid rgba(212,168,67,0.2)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Glow effect */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        fontSize: 14,
        fontWeight: 600,
        color: '#d4a843',
        marginBottom: 16,
        textAlign: 'center',
        letterSpacing: 2,
        textTransform: 'uppercase',
      }}>
        🪐 North Indian Kundali
      </div>

      <svg
        viewBox={`0 0 ${size} ${size}`}
        width="100%"
        style={{ maxWidth: 420, margin: '0 auto', display: 'block' }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="goldGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feFlood floodColor="#d4a843" floodOpacity="0.3" />
            <feComposite in2="blur" operator="in" />
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4a843" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#d4a843" stopOpacity="0.6" />
          </linearGradient>
        </defs>

        {/* Background square */}
        <rect
          x={border} y={border}
          width={size - border * 2} height={size - border * 2}
          fill="rgba(10,10,26,0.6)"
          stroke="url(#lineGrad)"
          strokeWidth="1.5"
          rx="4"
        />

        {/* Diagonal lines - forming the diamond pattern */}
        {/* Outer diagonals */}
        <line x1={p1.x} y1={p1.y} x2={p5.x} y2={p5.y} stroke="url(#lineGrad)" strokeWidth="1" />
        <line x1={p3.x} y1={p3.y} x2={p7.x} y2={p7.y} stroke="url(#lineGrad)" strokeWidth="1" />

        {/* Inner diamond (rotated square) */}
        <polygon
          points={`${p2.x},${p2.y} ${p4.x},${p4.y} ${p6.x},${p6.y} ${p8.x},${p8.y}`}
          fill="none"
          stroke="url(#lineGrad)"
          strokeWidth="1"
        />

        {/* Center diamond lines connecting to center */}
        <line x1={center.x} y1={center.y} x2={p2.x} y2={p2.y} stroke="url(#lineGrad)" strokeWidth="0.8" />
        <line x1={center.x} y1={center.y} x2={p4.x} y2={p4.y} stroke="url(#lineGrad)" strokeWidth="0.8" />
        <line x1={center.x} y1={center.y} x2={p6.x} y2={p6.y} stroke="url(#lineGrad)" strokeWidth="0.8" />
        <line x1={center.x} y1={center.y} x2={p8.x} y2={p8.y} stroke="url(#lineGrad)" strokeWidth="0.8" />

        {/* House numbers and content */}
        {houses.map((house, i) => {
          const pos = housePositions[i];
          const signSymbol = SIGN_SYMBOLS[house.sign] || '';
          const signAbbr = SIGN_ABBR[house.sign] || '';

          return (
            <g key={house.number}>
              {/* House number - small */}
              <text
                x={pos.cx - 22}
                y={pos.cy - 18}
                fill="#64748b"
                fontSize="9"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {house.number}
              </text>

              {/* Zodiac sign symbol */}
              <text
                x={pos.cx - 22}
                y={pos.cy - 4}
                fill="#8b5cf6"
                fontSize="12"
                textAnchor="middle"
                opacity="0.7"
              >
                {signSymbol}
              </text>

              {/* Sign abbreviation */}
              <text
                x={pos.cx - 22}
                y={pos.cy + 10}
                fill="#94a3b8"
                fontSize="8"
                fontFamily="monospace"
                textAnchor="middle"
              >
                {signAbbr}
              </text>

              {/* Planets */}
              {house.planets.map((planet, pi) => (
                <g key={planet}>
                  <text
                    x={pos.cx + 12}
                    y={pos.cy - 8 + pi * 16}
                    fill={PLANET_COLORS[planet] || '#e8c65a'}
                    fontSize="13"
                    fontWeight="700"
                    fontFamily="monospace"
                    textAnchor="middle"
                    filter="url(#glow)"
                  >
                    {planet}
                  </text>
                </g>
              ))}
            </g>
          );
        })}

        {/* Ascendant marker */}
        <circle
          cx={mid}
          cy={mid}
          r={4}
          fill="#d4a843"
          filter="url(#goldGlow)"
          opacity="0.6"
        >
          <animate attributeName="r" values="3;5;3" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" />
        </circle>

        {/* Asc label */}
        <text
          x={mid}
          y={mid + 20}
          fill="#d4a843"
          fontSize="9"
          textAnchor="middle"
          fontWeight="600"
        >
          ASC
        </text>

        {/* Corner decorations */}
        {[
          { x: border + 15, y: border + 15 },
          { x: size - border - 15, y: border + 15 },
          { x: border + 15, y: size - border - 15 },
          { x: size - border - 15, y: size - border - 15 },
        ].map((corner, i) => (
          <circle
            key={i}
            cx={corner.x}
            cy={corner.y}
            r="2"
            fill="#d4a843"
            opacity="0.5"
          />
        ))}
      </svg>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: 16,
        marginTop: 16,
        flexWrap: 'wrap',
      }}>
        <div style={{
          fontSize: 11,
          color: '#94a3b8',
          display: 'flex',
          alignItems: 'center',
          gap: 4,
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#d4a843', display: 'inline-block' }} />
          Ascendant: Leo
        </div>
        <div style={{ fontSize: 11, color: '#94a3b8' }}>
          Moon: Taurus (H10)
        </div>
        <div style={{ fontSize: 11, color: '#94a3b8' }}>
          Sun: Leo (H1)
        </div>
      </div>
    </div>
  );
}