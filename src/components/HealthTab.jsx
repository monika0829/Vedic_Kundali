import { HEALTH_DATA } from '../data/sampleData';
import SectionTitle from './SectionTitle';
import InfoCard from './InfoCard';

const severityColors = {
  low: { bg: 'rgba(34,197,94,0.12)', text: '#22c55e', border: 'rgba(34,197,94,0.2)' },
  moderate: { bg: 'rgba(245,158,11,0.12)', text: '#f59e0b', border: 'rgba(245,158,11,0.2)' },
  high: { bg: 'rgba(239,68,68,0.12)', text: '#ef4444', border: 'rgba(239,68,68,0.2)' },
};

export default function HealthTab() {
  return (
    <div>
      <SectionTitle title="Health & Vitality" subtitle="Planetary health indicators and remedies" icon="🌿" />

      {/* 6th House */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 12,
        marginBottom: 24,
      }}>
        <InfoCard
          title="6th House (Health)"
          value={HEALTH_DATA.sixthHouse.sign}
          icon="🏥"
          accent="#22c55e"
          subtitle={`Lord: ${HEALTH_DATA.sixthHouse.lord}`}
        />
        <InfoCard
          title="6th Lord"
          value={HEALTH_DATA.sixthHouse.lord}
          icon="💪"
          accent="#22c55e"
          subtitle={`Planets in 6th: ${HEALTH_DATA.sixthHouse.planetsInHouse.join(', ')}`}
        />
      </div>

      {/* Weak Planetary Influences */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(17,17,40,0.9))',
        borderRadius: 16,
        padding: 20,
        border: '1px solid rgba(239,68,68,0.12)',
        marginBottom: 24,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#d4a843', marginBottom: 16, letterSpacing: 1 }}>
          ⚠️ Weak Planetary Influences
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {HEALTH_DATA.weakPlanets.map((wp, i) => {
            const style = severityColors[wp.severity];
            return (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 16px',
                borderRadius: 10,
                background: style.bg,
                border: `1px solid ${style.border}`,
              }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: 6,
                  background: style.bg,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: style.text,
                }}>
                  {wp.severity}
                </span>
                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>
                    {wp.planet}
                  </span>
                  <span style={{ fontSize: 13, color: '#94a3b8', marginLeft: 8 }}>
                    — {wp.issue}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Body Areas */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(17,17,40,0.9))',
        borderRadius: 16,
        padding: 20,
        border: '1px solid rgba(139,92,246,0.12)',
        marginBottom: 24,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#d4a843', marginBottom: 16, letterSpacing: 1 }}>
          🫀 Body Areas by Planetary Influence
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 10,
        }}>
          {HEALTH_DATA.bodyAreas.map((area) => {
            const style = severityColors[area.risk];
            return (
              <div key={area.area} style={{
                padding: '14px 16px',
                borderRadius: 12,
                background: 'rgba(26,26,62,0.6)',
                border: `1px solid ${style.border}`,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}>
                <span style={{ fontSize: 24 }}>{area.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>
                    {area.area}
                  </div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                    {area.ruling}
                  </div>
                  <span style={{
                    display: 'inline-block',
                    marginTop: 4,
                    padding: '2px 8px',
                    borderRadius: 4,
                    fontSize: 10,
                    fontWeight: 600,
                    background: style.bg,
                    color: style.text,
                  }}>
                    Risk: {area.risk}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Remedies & Lifestyle */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(34,197,94,0.06), rgba(26,26,62,0.5))',
        borderRadius: 16,
        padding: 20,
        border: '1px solid rgba(34,197,94,0.12)',
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#22c55e', marginBottom: 16, letterSpacing: 1 }}>
          🧘 Suggested Lifestyle Practices
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 10,
        }}>
          {HEALTH_DATA.remedies.map((remedy) => (
            <div key={remedy.practice} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 16px',
              borderRadius: 10,
              background: 'rgba(34,197,94,0.06)',
              border: '1px solid rgba(34,197,94,0.1)',
            }}>
              <span style={{ fontSize: 24 }}>{remedy.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#e2e8f0' }}>
                  {remedy.practice}
                </div>
                <div style={{ fontSize: 12, color: '#86efac', marginTop: 2 }}>
                  {remedy.benefit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}