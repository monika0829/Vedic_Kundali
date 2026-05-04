import { useState } from 'react';
import { calculateBirthChart } from '../data/astroCalculator';

const SAMPLE_PROFILES = {
  p1: { name: '', dateOfBirth: '', timeOfBirth: '', placeOfBirth: '' },
  p2: { name: '', dateOfBirth: '', timeOfBirth: '', placeOfBirth: '' },
};

function PersonForm({ label, icon, data, onChange, accentColor }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(17,17,40,0.9))',
      borderRadius: 16,
      padding: 24,
      border: `1px solid ${accentColor}25`,
      flex: 1,
      minWidth: 280,
    }}>
      <div style={{
        fontSize: 16,
        fontWeight: 700,
        color: '#d4a843',
        marginBottom: 20,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
      }}>
        <span style={{ fontSize: 28 }}>{icon}</span>
        {label}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* Name */}
        <div>
          <label style={{
            display: 'block', fontSize: 11, color: '#94a3b8', marginBottom: 6,
            textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600,
          }}>
            Full Name
          </label>
          <input type="text" value={data.name}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            placeholder="Enter full name"
            style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>

        {/* Date of Birth */}
        <div>
          <label style={{
            display: 'block', fontSize: 11, color: '#94a3b8', marginBottom: 6,
            textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600,
          }}>
            Date of Birth
          </label>
          <input type="date" value={data.dateOfBirth}
            onChange={(e) => onChange({ ...data, dateOfBirth: e.target.value })}
            style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>

        {/* Time of Birth */}
        <div>
          <label style={{
            display: 'block', fontSize: 11, color: '#94a3b8', marginBottom: 6,
            textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600,
          }}>
            Time of Birth
          </label>
          <input type="time" value={data.timeOfBirth}
            onChange={(e) => onChange({ ...data, timeOfBirth: e.target.value })}
            style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
        </div>

        {/* Place of Birth */}
        <div>
          <label style={{
            display: 'block', fontSize: 11, color: '#94a3b8', marginBottom: 6,
            textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600,
          }}>
            Place of Birth
          </label>
          <input type="text" value={data.placeOfBirth}
            onChange={(e) => onChange({ ...data, placeOfBirth: e.target.value })}
            placeholder="City name (e.g. Mumbai, Delhi)"
            style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
          <div style={{ fontSize: 10, color: '#475569', marginTop: 4 }}>
            Enter city name — we'll look up coordinates automatically
          </div>
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  width: '100%', padding: '10px 14px', borderRadius: 10,
  border: '1px solid rgba(139,92,246,0.2)', background: 'rgba(10,10,26,0.8)',
  color: '#e2e8f0', fontSize: 14, outline: 'none',
  transition: 'border-color 0.3s', boxSizing: 'border-box',
};

function onFocus(e) { e.target.style.borderColor = 'rgba(139,92,246,0.5)'; }
function onBlur(e) { e.target.style.borderColor = 'rgba(139,92,246,0.2)'; }

export default function MatchingForm({ onMatch }) {
  const [person1, setPerson1] = useState({ ...SAMPLE_PROFILES.p1 });
  const [person2, setPerson2] = useState({ ...SAMPLE_PROFILES.p2 });
  const [error, setError] = useState('');

  const handleMatch = () => {
    setError('');
    // Validate
    if (!person1.name || !person1.dateOfBirth || !person1.timeOfBirth || !person1.placeOfBirth) {
      setError('Please fill in all fields for Partner 1');
      return;
    }
    if (!person2.name || !person2.dateOfBirth || !person2.timeOfBirth || !person2.placeOfBirth) {
      setError('Please fill in all fields for Partner 2');
      return;
    }

    // Calculate birth charts
    const chart1 = calculateBirthChart(person1.name, person1.dateOfBirth, person1.timeOfBirth, person1.placeOfBirth);
    const chart2 = calculateBirthChart(person2.name, person2.dateOfBirth, person2.timeOfBirth, person2.placeOfBirth);

    // Pass charts to matching algorithm
    onMatch(chart1, chart2);
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 20,
        marginBottom: 24,
      }}>
        <PersonForm label="Partner 1" icon="♂️" data={person1} onChange={setPerson1} accentColor="#6366f1" />
        <PersonForm label="Partner 2" icon="♀️" data={person2} onChange={setPerson2} accentColor="#ec4899" />
      </div>

      {/* Error */}
      {error && (
        <div style={{
          textAlign: 'center', marginBottom: 16,
          padding: '10px 20px', borderRadius: 10,
          background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)',
          color: '#ef4444', fontSize: 13, fontWeight: 600,
        }}>
          ⚠️ {error}
        </div>
      )}

      {/* Match Button */}
      <div style={{ textAlign: 'center' }}>
        <button onClick={handleMatch}
          style={{
            padding: '16px 48px', borderRadius: 14, border: 'none',
            background: 'linear-gradient(135deg, #8b5cf6, #d4a843)',
            color: '#fff', fontSize: 16, fontWeight: 700, cursor: 'pointer',
            letterSpacing: 0.5, transition: 'all 0.3s',
            boxShadow: '0 4px 24px rgba(139,92,246,0.3)',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 32px rgba(139,92,246,0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 24px rgba(139,92,46,0.3)';
          }}
        >
          💫 Calculate Compatibility
        </button>
      </div>
    </div>
  );
}