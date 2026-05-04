import { WEALTH_DATA } from '../data/sampleData';
import SectionTitle from './SectionTitle';
import InfoCard from './InfoCard';

const trendColors = {
  growing: { bg: 'rgba(34,197,94,0.12)', text: '#22c55e', border: 'rgba(34,197,94,0.2)', icon: '📈' },
  peak: { bg: 'rgba(212,168,67,0.12)', text: '#d4a843', border: 'rgba(212,168,67,0.2)', icon: '🏔️' },
  stable: { bg: 'rgba(59,130,246,0.12)', text: '#3b82f6', border: 'rgba(59,130,246,0.2)', icon: '📊' },
};

export default function WealthTab() {
  return (
    <div>
      <SectionTitle title="Wealth & Artha" subtitle="Financial prospects and wealth yogas" icon="💰" />

      {/* House Analysis */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 12,
        marginBottom: 24,
      }}>
        <InfoCard
          title="2nd House (Wealth)"
          value={WEALTH_DATA.secondHouse.sign}
          icon="💎"
          accent="#d4a843"
          subtitle={`Lord: ${WEALTH_DATA.secondHouse.lord}`}
        />
        <InfoCard
          title="11th House (Gains)"
          value={WEALTH_DATA.eleventhHouse.sign}
          icon="🏆"
          accent="#22c55e"
          subtitle={`Lord: ${WEALTH_DATA.eleventhHouse.lord} | ${WEALTH_DATA.eleventhHouse.planetsInHouse.join(', ')}`}
        />
      </div>

      {/* Wealth Yogas */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(212,168,67,0.08), rgba(26,26,62,0.5))',
        borderRadius: 16,
        padding: 20,
        border: '1px solid rgba(212,168,67,0.15)',
        marginBottom: 24,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#d4a843', marginBottom: 16, letterSpacing: 1 }}>
          ✨ Wealth Yogas
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {WEALTH_DATA.wealthYogas.map((yoga) => (
            <div key={yoga.name} style={{
              padding: '16px 18px',
              borderRadius: 12,
              background: 'rgba(26,26,62,0.6)',
              border: '1px solid rgba(212,168,67,0.1)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 14,
            }}>
              <span style={{ fontSize: 28 }}>{yoga.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 6,
                }}>
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#f0d878' }}>
                    {yoga.name}
                  </span>
                  <span style={{
                    padding: '3px 10px',
                    borderRadius: 6,
                    fontSize: 11,
                    fontWeight: 600,
                    background: yoga.strength === 'Very Strong'
                      ? 'rgba(34,197,94,0.15)'
                      : yoga.strength === 'Strong'
                        ? 'rgba(212,168,67,0.15)'
                        : 'rgba(139,92,246,0.15)',
                    color: yoga.strength === 'Very Strong'
                      ? '#22c55e'
                      : yoga.strength === 'Strong'
                        ? '#d4a843'
                        : '#a78bfa',
                  }}>
                    {yoga.strength}
                  </span>
                </div>
                <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                  {yoga.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Financial Timeline */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(17,17,40,0.9))',
        borderRadius: 16,
        padding: 20,
        border: '1px solid rgba(100,116,139,0.1)',
        marginBottom: 24,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#d4a843', marginBottom: 16, letterSpacing: 1 }}>
          📊 Financial Timeline
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {WEALTH_DATA.financialTimeline.map((period) => {
            const style = trendColors[period.trend];
            return (
              <div key={period.period} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '14px 16px',
                borderRadius: 10,
                background: style.bg,
                border: `1px solid ${style.border}`,
              }}>
                <span style={{ fontSize: 20 }}>{style.icon}</span>
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
                <div style={{ flex: 1, fontSize: 13, color: '#cbd5e1' }}>
                  {period.description}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Investment Tips */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(26,26,62,0.5))',
        borderRadius: 16,
        padding: 20,
        border: '1px solid rgba(139,92,246,0.12)',
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#a78bfa', marginBottom: 16, letterSpacing: 1 }}>
          💡 Investment Guidance
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 10,
        }}>
          {WEALTH_DATA.investmentTips.map((tip, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 16px',
              borderRadius: 10,
              background: 'rgba(139,92,246,0.06)',
              border: '1px solid rgba(139,92,246,0.1)',
              fontSize: 13,
              color: '#c4b5fd',
            }}>
              <span style={{ color: '#a78bfa', fontSize: 14 }}>◆</span>
              {tip}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}