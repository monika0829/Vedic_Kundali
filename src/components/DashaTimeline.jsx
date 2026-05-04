import { DASHA_DATA } from '../data/sampleData';

const PLANET_COLORS = {
  'Ketu': '#a855f7', 'Venus': '#ec4899', 'Sun': '#f59e0b', 'Moon': '#e2e8f0',
  'Mars': '#ef4444', 'Rahu': '#8b5cf6', 'Jupiter': '#f97316', 'Saturn': '#6366f1',
  'Mercury': '#22c55e',
};

export default function DashaTimeline() {
  const currentYear = new Date().getFullYear();
  const currentDasha = DASHA_DATA.mahadashas.find(d => d.isCurrent);

  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(17,17,40,0.9))',
      borderRadius: 20,
      padding: 24,
      border: '1px solid rgba(212,168,67,0.2)',
    }}>
      <div style={{
        fontSize: 14,
        fontWeight: 600,
        color: '#d4a843',
        marginBottom: 20,
        letterSpacing: 2,
        textTransform: 'uppercase',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span>⏳</span> Dasha Timeline
      </div>

      {/* Current Dasha Highlight */}
      {currentDasha && (
        <div style={{
          background: `linear-gradient(135deg, ${PLANET_COLORS[currentDasha.planet]}15, rgba(26,26,62,0.8))`,
          borderRadius: 16,
          padding: 20,
          border: `1px solid ${PLANET_COLORS[currentDasha.planet]}40`,
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 120,
            height: '100%',
            background: `radial-gradient(circle at right, ${PLANET_COLORS[currentDasha.planet]}10, transparent)`,
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 4 }}>
                Current Mahadasha
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: PLANET_COLORS[currentDasha.planet] }}>
                {currentDasha.planet} Mahadasha
              </div>
            </div>
            <div style={{
              padding: '6px 14px',
              borderRadius: 20,
              background: `${PLANET_COLORS[currentDasha.planet]}20`,
              border: `1px solid ${PLANET_COLORS[currentDasha.planet]}40`,
              fontSize: 12,
              color: PLANET_COLORS[currentDasha.planet],
              fontWeight: 600,
            }}>
              {currentDasha.years} Years
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#64748b', marginBottom: 6 }}>
              <span>{currentDasha.startYear}</span>
              <span>{currentDasha.endYear}</span>
            </div>
            <div style={{
              height: 6,
              borderRadius: 3,
              background: 'rgba(26,26,62,0.8)',
              overflow: 'hidden',
            }}>
              <div style={{
                height: '100%',
                borderRadius: 3,
                background: `linear-gradient(90deg, ${PLANET_COLORS[currentDasha.planet]}, ${PLANET_COLORS[currentDasha.planet]}80)`,
                width: `${((currentYear - currentDasha.startYear) / currentDasha.years) * 100}%`,
                transition: 'width 1s ease',
                boxShadow: `0 0 10px ${PLANET_COLORS[currentDasha.planet]}40`,
              }} />
            </div>
          </div>
        </div>
      )}

      {/* Mahadasha Timeline */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
          Mahadasha Periods
        </div>
        <div style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          paddingBottom: 8,
          scrollbarWidth: 'thin',
        }}>
          {DASHA_DATA.mahadashas.map((dasha) => {
            const color = PLANET_COLORS[dasha.planet];
            const isActive = dasha.isCurrent;
            return (
              <div
                key={dasha.planet}
                style={{
                  minWidth: 90,
                  padding: '12px 14px',
                  borderRadius: 12,
                  background: isActive
                    ? `linear-gradient(135deg, ${color}25, ${color}10)`
                    : 'rgba(26,26,62,0.6)',
                  border: isActive
                    ? `1.5px solid ${color}60`
                    : '1px solid rgba(100,116,139,0.15)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  opacity: dasha.isPast ? 0.6 : 1,
                }}
                onMouseEnter={(e) => {
                  if (!dasha.isPast) {
                    e.currentTarget.style.borderColor = `${color}60`;
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.borderColor = 'rgba(100,116,139,0.15)';
                  }
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  fontSize: 16,
                  fontWeight: 700,
                  color: color,
                  marginBottom: 4,
                }}>
                  {dasha.planet}
                </div>
                <div style={{ fontSize: 11, color: '#64748b' }}>
                  {dasha.startYear}–{dasha.endYear}
                </div>
                <div style={{
                  fontSize: 10,
                  color: dasha.isPast ? '#475569' : '#94a3b8',
                  marginTop: 2,
                }}>
                  {dasha.years}y
                </div>
                {isActive && (
                  <div style={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: color,
                    margin: '6px auto 0',
                    boxShadow: `0 0 8px ${color}60`,
                    animation: 'pulse-glow 1.5s ease-in-out infinite',
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Antardasha List */}
      <div>
        <div style={{ fontSize: 12, color: '#94a3b8', marginBottom: 12, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
          Antardasha — {currentDasha?.planet} Mahadasha
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {DASHA_DATA.antardashas.map((ad, i) => {
            const color = PLANET_COLORS[ad.planet];
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '10px 14px',
                  borderRadius: 10,
                  background: ad.isCurrent
                    ? `linear-gradient(90deg, ${color}15, transparent)`
                    : 'rgba(26,26,62,0.4)',
                  border: ad.isCurrent
                    ? `1px solid ${color}30`
                    : '1px solid rgba(100,116,139,0.08)',
                  transition: 'all 0.2s',
                }}
              >
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: ad.isCurrent ? color : '#475569',
                  boxShadow: ad.isCurrent ? `0 0 8px ${color}40` : 'none',
                  flexShrink: 0,
                }} />
                <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{
                    fontSize: 13,
                    fontWeight: ad.isCurrent ? 600 : 400,
                    color: ad.isCurrent ? color : '#94a3b8',
                  }}>
                    {ad.planet} Antardasha
                  </span>
                  <span style={{ fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>
                    {ad.startYear}–{ad.endYear}
                  </span>
                </div>
                {ad.isCurrent && (
                  <span style={{
                    fontSize: 10,
                    padding: '2px 8px',
                    borderRadius: 10,
                    background: `${color}20`,
                    color: color,
                    fontWeight: 600,
                  }}>
                    ACTIVE
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}