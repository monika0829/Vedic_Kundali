import { LOVE_DATA } from '../data/sampleData';
import SectionTitle from './SectionTitle';
import InfoCard from './InfoCard';

export default function LoveTab() {
  return (
    <div>
      <SectionTitle title="Love & Union" subtitle="7th house analysis and relationship insights" icon="♀" />

      {/* 7th House Analysis */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 12,
        marginBottom: 24,
      }}>
        <InfoCard
          title="7th House"
          value={LOVE_DATA.seventhHouse.sign}
          icon="💕"
          accent="#ec4899"
          subtitle={`Lord: ${LOVE_DATA.seventhHouse.lord}`}
        />
        <InfoCard
          title="7th Lord Placement"
          value={`${LOVE_DATA.seventhLord.planet} in ${LOVE_DATA.seventhLord.placedIn}`}
          icon="💫"
          accent="#ec4899"
          subtitle={`Status: ${LOVE_DATA.seventhLord.status}`}
        />
      </div>

      {/* Venus Analysis */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(236,72,153,0.08), rgba(26,26,62,0.5))',
        borderRadius: 16,
        padding: 24,
        border: '1px solid rgba(236,72,153,0.15)',
        marginBottom: 24,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#ec4899', marginBottom: 12, letterSpacing: 1 }}>
          ♀ Venus Analysis
        </div>
        <p style={{
          color: '#cbd5e1',
          lineHeight: 1.8,
          fontSize: 14,
          marginBottom: 12,
        }}>
          {LOVE_DATA.venusAnalysis}
        </p>
        <div style={{
          padding: '12px 16px',
          borderRadius: 10,
          background: 'rgba(236,72,153,0.06)',
          border: '1px solid rgba(236,72,153,0.1)',
          fontSize: 13,
          color: '#f9a8d4',
        }}>
          <strong style={{ color: '#ec4899' }}>Relationship Style:</strong> {LOVE_DATA.relationshipStyle}
        </div>
      </div>

      {/* Marriage Timing */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(17,17,40,0.9))',
        borderRadius: 16,
        padding: 20,
        border: '1px solid rgba(212,168,67,0.15)',
        marginBottom: 24,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#d4a843', marginBottom: 16, letterSpacing: 1 }}>
          💍 Marriage Timing Indicators
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {LOVE_DATA.marriageTiming.map((timing, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '14px 16px',
              borderRadius: 10,
              background: timing.probability === 'High'
                ? 'rgba(34,197,94,0.08)'
                : 'rgba(59,130,246,0.08)',
              border: `1px solid ${timing.probability === 'High' ? 'rgba(34,197,94,0.15)' : 'rgba(59,130,246,0.15)'}`,
            }}>
              <div style={{
                padding: '4px 12px',
                borderRadius: 6,
                background: timing.probability === 'High'
                  ? 'rgba(34,197,94,0.2)'
                  : 'rgba(59,130,246,0.2)',
                fontSize: 12,
                fontWeight: 700,
                color: timing.probability === 'High' ? '#22c55e' : '#3b82f6',
                whiteSpace: 'nowrap',
              }}>
                {timing.probability}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0', marginBottom: 2 }}>
                  {timing.period}
                </div>
                <div style={{ fontSize: 12, color: '#94a3b8' }}>
                  {timing.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Compatibility */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
        gap: 16,
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(26,26,62,0.5))',
          borderRadius: 16,
          padding: 20,
          border: '1px solid rgba(34,197,94,0.15)',
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#22c55e', marginBottom: 12, letterSpacing: 1 }}>
            ✅ Best Matches
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {LOVE_DATA.compatibility.bestMatches.map((sign) => (
              <span key={sign} style={{
                padding: '6px 14px',
                borderRadius: 20,
                background: 'rgba(34,197,94,0.12)',
                border: '1px solid rgba(34,197,94,0.2)',
                fontSize: 13,
                color: '#86efac',
              }}>
                {sign}
              </span>
            ))}
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, rgba(245,158,11,0.08), rgba(26,26,62,0.5))',
          borderRadius: 16,
          padding: 20,
          border: '1px solid rgba(245,158,11,0.15)',
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#f59e0b', marginBottom: 12, letterSpacing: 1 }}>
            ⚡ Challenging Matches
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {LOVE_DATA.compatibility.challenging.map((sign) => (
              <span key={sign} style={{
                padding: '6px 14px',
                borderRadius: 20,
                background: 'rgba(245,158,11,0.12)',
                border: '1px solid rgba(245,158,11,0.2)',
                fontSize: 13,
                color: '#fcd34d',
              }}>
                {sign}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}