import { CAREER_DATA } from '../data/sampleData';
import SectionTitle from './SectionTitle';
import InfoCard from './InfoCard';

const typeColors = {
  growth: { bg: 'rgba(34,197,94,0.15)', text: '#22c55e', border: 'rgba(34,197,94,0.3)' },
  stable: { bg: 'rgba(59,130,246,0.15)', text: '#3b82f6', border: 'rgba(59,130,246,0.3)' },
  peak: { bg: 'rgba(212,168,67,0.15)', text: '#d4a843', border: 'rgba(212,168,67,0.3)' },
};

export default function CareerTab() {
  return (
    <div>
      <SectionTitle title="Career & Karma" subtitle="10th house analysis and professional insights" icon="⚡" />

      {/* 10th House Analysis */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 12,
        marginBottom: 24,
      }}>
        <InfoCard
          title="10th House"
          value={CAREER_DATA.tenthHouse.sign}
          icon="🏛️"
          accent="#f59e0b"
          subtitle={`Lord: ${CAREER_DATA.tenthHouse.lord} | Planets: ${CAREER_DATA.tenthHouse.planetsInHouse.join(', ') || 'None'}`}
        />
        <InfoCard
          title="10th Lord Placement"
          value={`${CAREER_DATA.tenthLord.planet} in ${CAREER_DATA.tenthLord.placedIn}`}
          icon="📍"
          accent="#8b5cf6"
          subtitle={`Status: ${CAREER_DATA.tenthLord.status}`}
        />
      </div>

      {/* Key Combinations */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(17,17,40,0.9))',
        borderRadius: 16,
        padding: 20,
        border: '1px solid rgba(245,158,11,0.15)',
        marginBottom: 24,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#d4a843', marginBottom: 16, letterSpacing: 1 }}>
          🔑 Key Planetary Combinations
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CAREER_DATA.keyCombinations.map((combo, i) => (
            <div key={i} style={{
              padding: '12px 16px',
              borderRadius: 10,
              background: 'rgba(245,158,11,0.06)',
              border: '1px solid rgba(245,158,11,0.1)',
              fontSize: 13,
              color: '#cbd5e1',
              lineHeight: 1.5,
              display: 'flex',
              alignItems: 'flex-start',
              gap: 10,
            }}>
              <span style={{ color: '#f59e0b', fontSize: 16, lineHeight: '20px' }}>★</span>
              {combo}
            </div>
          ))}
        </div>
      </div>

      {/* Career Match */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(17,17,40,0.9))',
        borderRadius: 16,
        padding: 20,
        border: '1px solid rgba(139,92,246,0.15)',
        marginBottom: 24,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#d4a843', marginBottom: 16, letterSpacing: 1 }}>
          🎯 Career Path Match
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {CAREER_DATA.suggestedPaths.map((path) => (
            <div key={path.path} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '12px 16px',
              borderRadius: 10,
              background: 'rgba(139,92,246,0.06)',
              border: '1px solid rgba(139,92,246,0.1)',
            }}>
              <span style={{ fontSize: 24 }}>{path.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 4 }}>
                  {path.path}
                </div>
                <div style={{
                  height: 4,
                  borderRadius: 2,
                  background: 'rgba(139,92,246,0.15)',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    height: '100%',
                    width: `${path.match}%`,
                    borderRadius: 2,
                    background: path.match > 85
                      ? 'linear-gradient(90deg, #22c55e, #4ade80)'
                      : path.match > 70
                        ? 'linear-gradient(90deg, #d4a843, #f0d878)'
                        : 'linear-gradient(90deg, #8b5cf6, #a78bfa)',
                    transition: 'width 1s ease',
                  }} />
                </div>
              </div>
              <span style={{
                fontSize: 16,
                fontWeight: 700,
                color: path.match > 85 ? '#22c55e' : path.match > 70 ? '#d4a843' : '#a78bfa',
              }}>
                {path.match}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Career Timeline */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(17,17,40,0.9))',
        borderRadius: 16,
        padding: 20,
        border: '1px solid rgba(100,116,139,0.1)',
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#d4a843', marginBottom: 16, letterSpacing: 1 }}>
          📅 Career Timeline
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {CAREER_DATA.careerPeriods.map((period) => {
            const style = typeColors[period.type];
            return (
              <div key={period.period} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 16px',
                borderRadius: 10,
                background: style.bg,
                border: `1px solid ${style.border}`,
              }}>
                <div style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  background: style.bg,
                  fontSize: 12,
                  fontWeight: 700,
                  fontFamily: 'monospace',
                  color: style.text,
                  whiteSpace: 'nowrap',
                }}>
                  {period.period}
                </div>
                <div style={{ fontSize: 13, color: '#cbd5e1' }}>
                  {period.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}