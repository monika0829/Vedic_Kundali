import { PLANETS } from '../data/sampleData';

const statusColors = {
  benefic: { bg: 'rgba(34,197,94,0.15)', text: '#22c55e', border: 'rgba(34,197,94,0.3)' },
  malefic: { bg: 'rgba(239,68,68,0.15)', text: '#ef4444', border: 'rgba(239,68,68,0.3)' },
  shadow: { bg: 'rgba(139,92,246,0.15)', text: '#a78bfa', border: 'rgba(139,92,246,0.3)' },
};

export default function PlanetTable() {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(17,17,40,0.9))',
      borderRadius: 20,
      padding: 24,
      border: '1px solid rgba(212,168,67,0.2)',
      overflow: 'hidden',
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
        <span>📊</span> Planetary Positions
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'separate',
          borderSpacing: '0 6px',
          minWidth: 600,
        }}>
          <thead>
            <tr>
              {['Planet', 'Sign', 'House', 'Degree', 'Nakshatra', 'Status'].map((h) => (
                <th key={h} style={{
                  padding: '10px 14px',
                  textAlign: 'left',
                  fontSize: 11,
                  color: '#64748b',
                  textTransform: 'uppercase',
                  letterSpacing: 1.5,
                  fontWeight: 600,
                  borderBottom: '1px solid rgba(100,116,139,0.2)',
                }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PLANETS.map((planet) => {
              const statusStyle = statusColors[planet.statusType] || statusColors.benefic;
              return (
                <tr
                  key={planet.name}
                  style={{
                    background: 'rgba(26,26,62,0.5)',
                    borderRadius: 8,
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139,92,246,0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(26,26,62,0.5)';
                  }}
                >
                  <td style={{ padding: '12px 14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        background: `${planet.color}20`,
                        border: `1.5px solid ${planet.color}40`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 12,
                        fontWeight: 700,
                        color: planet.color,
                        fontFamily: 'monospace',
                      }}>
                        {planet.abbr}
                      </div>
                      <span style={{ fontWeight: 600, color: '#e2e8f0', fontSize: 14 }}>
                        {planet.name}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#c4b5fd', fontSize: 13 }}>
                    {planet.sign}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 28,
                      height: 28,
                      borderRadius: 8,
                      background: 'rgba(139,92,246,0.15)',
                      color: '#a78bfa',
                      fontSize: 13,
                      fontWeight: 600,
                    }}>
                      {planet.house}
                    </span>
                  </td>
                  <td style={{ padding: '12px 14px', color: '#94a3b8', fontSize: 13, fontFamily: 'monospace' }}>
                    {planet.degree.toFixed(2)}°
                  </td>
                  <td style={{ padding: '12px 14px', color: '#e2e8f0', fontSize: 13 }}>
                    {planet.nakshatra}
                  </td>
                  <td style={{ padding: '12px 14px' }}>
                    <span style={{
                      padding: '4px 12px',
                      borderRadius: 20,
                      fontSize: 11,
                      fontWeight: 600,
                      background: statusStyle.bg,
                      color: statusStyle.text,
                      border: `1px solid ${statusStyle.border}`,
                    }}>
                      {planet.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}