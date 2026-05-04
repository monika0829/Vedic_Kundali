import { RASHI_SYMBOLS } from '../data/astroCalculator';
import SectionTitle from './SectionTitle';

function ScoreRing({ score, maxScore, color, size = 180 }) {
  const percentage = (score / maxScore) * 100;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(139,92,246,0.1)"
          strokeWidth={strokeWidth}
        />
        {/* Score arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{
            filter: `drop-shadow(0 0 8px ${color}40)`,
            transition: 'stroke-dashoffset 1s ease',
          }}
        />
      </svg>
      {/* Center text */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 38,
          fontWeight: 800,
          color: color,
          lineHeight: 1,
        }}>
          {score}
        </div>
        <div style={{
          fontSize: 14,
          color: '#64748b',
          fontWeight: 600,
          marginTop: 2,
        }}>
          / {maxScore}
        </div>
      </div>
    </div>
  );
}

function KootaBar({ koota }) {
  const pct = (koota.score / koota.max) * 100;
  const color = pct >= 80 ? '#22c55e' : pct >= 50 ? '#d4a843' : '#ef4444';

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      padding: '14px 16px',
      borderRadius: 12,
      background: 'rgba(26,26,62,0.5)',
      border: '1px solid rgba(100,116,139,0.08)',
      transition: 'all 0.2s',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = 'rgba(139,92,246,0.06)';
      e.currentTarget.style.borderColor = 'rgba(139,92,246,0.15)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'rgba(26,26,62,0.5)';
      e.currentTarget.style.borderColor = 'rgba(100,116,139,0.08)';
    }}
    >
      {/* Score badge */}
      <div style={{
        minWidth: 48,
        textAlign: 'center',
        padding: '6px 0',
        borderRadius: 8,
        background: `${color}15`,
        border: `1px solid ${color}30`,
      }}>
        <div style={{ fontSize: 18, fontWeight: 800, color }}>{koota.score}</div>
        <div style={{ fontSize: 10, color: '#64748b' }}>/ {koota.max}</div>
      </div>

      {/* Details */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
          <div>
            <span style={{ fontSize: 14, fontWeight: 600, color: '#e2e8f0' }}>{koota.name}</span>
            <span style={{ fontSize: 11, color: '#64748b', marginLeft: 8, fontWeight: 600 }}>
              ({koota.max} pts)
            </span>
          </div>
        </div>
        <div style={{
          height: 5,
          borderRadius: 3,
          background: 'rgba(100,116,139,0.1)',
          overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${pct}%`,
            borderRadius: 3,
            background: `linear-gradient(90deg, ${color}, ${color}90)`,
            transition: 'width 0.8s ease',
          }} />
        </div>
        <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
          {koota.description}
        </div>
      </div>
    </div>
  );
}

function DoshaBadge({ type, active, icon, label }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 16px',
      borderRadius: 10,
      background: active ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)',
      border: active ? '1px solid rgba(239,68,68,0.2)' : '1px solid rgba(34,197,94,0.2)',
    }}>
      <span style={{ fontSize: 20 }}>{icon}</span>
      <div>
        <div style={{
          fontSize: 13,
          fontWeight: 600,
          color: active ? '#ef4444' : '#22c55e',
        }}>
          {active ? `${label} Present` : `No ${label}`}
        </div>
        <div style={{ fontSize: 11, color: '#64748b' }}>
          {active ? 'Remedies recommended' : 'Favorable for marriage'}
        </div>
      </div>
    </div>
  );
}

export default function MatchingResults({ results }) {
  if (!results) return null;

  const { kootas, totalScore, maxScore, percentage, verdict, verdictColor, verdictDescription, hasDosha, nadiDosha, person1, person2, recommendations } = results;

  return (
    <div>
      {/* Verdict Banner */}
      <div style={{
        background: `linear-gradient(135deg, ${verdictColor}12, rgba(26,26,62,0.8))`,
        borderRadius: 20,
        padding: 28,
        border: `1px solid ${verdictColor}30`,
        marginBottom: 28,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          height: 300,
          background: `radial-gradient(circle, ${verdictColor}08, transparent 70%)`,
          pointerEvents: 'none',
        }} />

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          marginBottom: 4,
          flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 18, color: '#94a3b8' }}>
            {person1.name}
          </span>
          <span style={{ fontSize: 24, color: verdictColor }}>♥</span>
          <span style={{ fontSize: 18, color: '#94a3b8' }}>
            {person2.name}
          </span>
        </div>

        <div style={{ margin: '24px 0' }}>
          <ScoreRing score={totalScore} maxScore={maxScore} color={verdictColor} />
        </div>

        <div style={{
          fontSize: 28,
          fontWeight: 800,
          color: verdictColor,
          marginBottom: 8,
          textShadow: `0 0 20px ${verdictColor}30`,
        }}>
          {verdict}
        </div>
        <div style={{
          fontSize: 14,
          color: '#94a3b8',
          maxWidth: 500,
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          {verdictDescription}
        </div>
      </div>

      {/* Dosha Checks */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 12,
        marginBottom: 28,
      }}>
        <DoshaBadge type="mangal" active={hasDosha} icon="🔥" label="Mangal Dosha" />
        <DoshaBadge type="nadi" active={nadiDosha} icon="⚕️" label="Nadi Dosha" />
      </div>

      {/* Computed Birth Data */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(17,17,40,0.9))',
        borderRadius: 20,
        padding: 24,
        border: '1px solid rgba(139,92,246,0.12)',
        marginBottom: 28,
      }}>
        <SectionTitle title="Computed Astrological Data" subtitle="Moon Sign & Nakshatra calculated from birth details" icon="🪐" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 16,
        }}>
          {/* Partner 1 */}
          <div style={{
            padding: 20,
            borderRadius: 14,
            background: 'rgba(99,102,241,0.06)',
            border: '1px solid rgba(99,102,241,0.15)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 16,
            }}>
              <span style={{ fontSize: 24 }}>♂️</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>{person1.name}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>
                  {person1.dateOfBirth} • {person1.timeOfBirth} • {person1.placeOfBirth}
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Moon Sign', value: `${RASHI_SYMBOLS[person1.moonSign] || ''} ${person1.moonSign}` },
                { label: 'Nakshatra', value: person1.nakshatra },
                { label: 'Pada', value: `${person1.nakshatraPada || '-'}` },
                { label: 'Sun Sign', value: `${RASHI_SYMBOLS[person1.sunSign] || ''} ${person1.sunSign}` },
                { label: 'Ascendant', value: `${RASHI_SYMBOLS[person1.ascendant] || ''} ${person1.ascendant}` },
                { label: 'Moon °', value: `${person1.moonDegree}°` },
              ].map((item) => (
                <div key={item.label} style={{
                  padding: '8px 12px', borderRadius: 8,
                  background: 'rgba(10,10,26,0.5)',
                }}>
                  <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 13, color: '#c4b5fd', fontWeight: 600 }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Partner 2 */}
          <div style={{
            padding: 20,
            borderRadius: 14,
            background: 'rgba(236,72,153,0.06)',
            border: '1px solid rgba(236,72,153,0.15)',
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              marginBottom: 16,
            }}>
              <span style={{ fontSize: 24 }}>♀️</span>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>{person2.name}</div>
                <div style={{ fontSize: 11, color: '#64748b' }}>
                  {person2.dateOfBirth} • {person2.timeOfBirth} • {person2.placeOfBirth}
                </div>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {[
                { label: 'Moon Sign', value: `${RASHI_SYMBOLS[person2.moonSign] || ''} ${person2.moonSign}` },
                { label: 'Nakshatra', value: person2.nakshatra },
                { label: 'Pada', value: `${person2.nakshatraPada || '-'}` },
                { label: 'Sun Sign', value: `${RASHI_SYMBOLS[person2.sunSign] || ''} ${person2.sunSign}` },
                { label: 'Ascendant', value: `${RASHI_SYMBOLS[person2.ascendant] || ''} ${person2.ascendant}` },
                { label: 'Moon °', value: `${person2.moonDegree}°` },
              ].map((item) => (
                <div key={item.label} style={{
                  padding: '8px 12px', borderRadius: 8,
                  background: 'rgba(10,10,26,0.5)',
                }}>
                  <div style={{ fontSize: 10, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 13, color: '#f9a8d4', fontWeight: 600 }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Koota Breakdown */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(17,17,40,0.9))',
        borderRadius: 20,
        padding: 24,
        border: '1px solid rgba(212,168,67,0.15)',
        marginBottom: 28,
      }}>
        <SectionTitle title="Ashtakoota Analysis" subtitle="Detailed 8-fold compatibility breakdown (36 points)" icon="📊" />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {kootas.map((koota) => (
            <KootaBar key={koota.name} koota={koota} />
          ))}
        </div>

        {/* Total */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 16,
          padding: '14px 20px',
          borderRadius: 12,
          background: `${verdictColor}10`,
          border: `1px solid ${verdictColor}25`,
        }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0' }}>
            Total Score
          </span>
          <span style={{
            fontSize: 24,
            fontWeight: 800,
            color: verdictColor,
          }}>
            {totalScore} / {maxScore}
          </span>
        </div>
      </div>

      {/* Recommendations */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139,92,246,0.06), rgba(26,26,62,0.5))',
        borderRadius: 20,
        padding: 24,
        border: '1px solid rgba(139,92,246,0.12)',
      }}>
        <SectionTitle title="Recommendations" subtitle="Guidance for the union" icon="🙏" />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 10,
        }}>
          {recommendations.map((rec, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 16px',
              borderRadius: 10,
              background: rec.type === 'positive'
                ? 'rgba(34,197,94,0.06)'
                : rec.type === 'warning'
                  ? 'rgba(239,68,68,0.06)'
                  : 'rgba(139,92,246,0.06)',
              border: `1px solid ${
                rec.type === 'positive'
                  ? 'rgba(34,197,94,0.1)'
                  : rec.type === 'warning'
                    ? 'rgba(239,68,68,0.1)'
                    : 'rgba(139,92,246,0.1)'
              }`,
              fontSize: 13,
              color: rec.type === 'positive'
                ? '#86efac'
                : rec.type === 'warning'
                  ? '#fca5a5'
                  : '#c4b5fd',
            }}>
              <span style={{ fontSize: 18 }}>{rec.icon}</span>
              {rec.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}