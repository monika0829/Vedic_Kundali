import { OVERVIEW_DATA } from '../data/sampleData';
import { useBirthDetails } from '../context/BirthContext';
import SectionTitle from './SectionTitle';
import InfoCard from './InfoCard';

function formatDate(dateStr) {
  if (!dateStr) return 'Not set';
  try {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return dateStr;
  }
}

function formatTime(timeStr) {
  if (!timeStr) return 'Not set';
  try {
    const [h, m] = timeStr.split(':');
    const hour = parseInt(h, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const h12 = hour % 12 || 12;
    return `${h12}:${m} ${ampm}`;
  } catch {
    return timeStr;
  }
}

export default function OverviewTab() {
  const { birthDetails } = useBirthDetails();
  return (
    <div>
      <SectionTitle title="Birth Overview" subtitle="Key astrological details at a glance" icon="🔮" />

      {/* Birth Details */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 12,
        marginBottom: 24,
      }}>
        <InfoCard title="Name" value={birthDetails.name || '—'} icon="👤" accent="#8b5cf6" />
        <InfoCard title="Date of Birth" value={birthDetails.dateOfBirth ? formatDate(birthDetails.dateOfBirth) : '—'} icon="📅" accent="#8b5cf6" />
        <InfoCard title="Time of Birth" value={birthDetails.timeOfBirth ? formatTime(birthDetails.timeOfBirth) : '—'} icon="🕐" accent="#8b5cf6" />
        <InfoCard title="Place of Birth" value={birthDetails.placeOfBirth || '—'} icon="📍" accent="#8b5cf6" />
      </div>

      {/* Key Signs */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: 12,
        marginBottom: 24,
      }}>
        <InfoCard title="Lagna (Ascendant)" value={OVERVIEW_DATA.lagna} icon="♌" accent="#d4a843"
          subtitle={`Lagna Lord: ${OVERVIEW_DATA.lagnaLord}`} />
        <InfoCard title="Moon Sign (Rashi)" value={OVERVIEW_DATA.moonSign} icon="♉" accent="#e2e8f0"
          subtitle={`Nakshatra: ${OVERVIEW_DATA.nakshatra}`} />
        <InfoCard title="Sun Sign" value={OVERVIEW_DATA.sunSign} icon="♊" accent="#f59e0b"
          subtitle="Gemini — Communicator and versatile thinker" />
        <InfoCard title="Nakshatra" value={OVERVIEW_DATA.nakshatra} icon="⭐" accent="#a78bfa"
          subtitle="Ruled by Moon — Creative and nurturing energy" />
      </div>

      {/* Panchang Details */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(17,17,40,0.9))',
        borderRadius: 16,
        padding: 20,
        border: '1px solid rgba(139,92,246,0.15)',
        marginBottom: 24,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#d4a843', marginBottom: 16, letterSpacing: 1 }}>
          📜 Panchang Details
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 16,
        }}>
          {[
            { label: 'Tithi', value: OVERVIEW_DATA.tithi },
            { label: 'Karana', value: OVERVIEW_DATA.karana },
            { label: 'Yoga', value: OVERVIEW_DATA.yoga },
            { label: 'Nakshatra', value: OVERVIEW_DATA.nakshatra },
          ].map((item) => (
            <div key={item.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>
                {item.label}
              </div>
              <div style={{ fontSize: 15, color: '#c4b5fd', fontWeight: 600 }}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personality Summary */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(212,168,67,0.05))',
        borderRadius: 16,
        padding: 24,
        border: '1px solid rgba(139,92,246,0.15)',
        marginBottom: 24,
      }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#d4a843', marginBottom: 12 }}>
          ✨ Personality Summary
        </div>
        <p style={{
          color: '#cbd5e1',
          lineHeight: 1.8,
          fontSize: 14,
        }}>
          {OVERVIEW_DATA.personalitySummary}
        </p>
      </div>

      {/* Strengths & Challenges */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(26,26,62,0.5))',
          borderRadius: 16,
          padding: 20,
          border: '1px solid rgba(34,197,94,0.15)',
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#22c55e', marginBottom: 12, letterSpacing: 1 }}>
            💪 Strengths
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {OVERVIEW_DATA.strengths.map((s) => (
              <div key={s} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 12px',
                borderRadius: 8,
                background: 'rgba(34,197,94,0.08)',
                fontSize: 13,
                color: '#86efac',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} />
                {s}
              </div>
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
            ⚠️ Challenges
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {OVERVIEW_DATA.challenges.map((c) => (
              <div key={c} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 12px',
                borderRadius: 8,
                background: 'rgba(245,158,11,0.08)',
                fontSize: 13,
                color: '#fcd34d',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#f59e0b' }} />
                {c}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}