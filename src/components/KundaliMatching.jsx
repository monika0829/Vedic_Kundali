import { useState } from 'react';
import { calculateMatch } from '../data/matchingData';
import SectionTitle from './SectionTitle';
import MatchingForm from './MatchingForm';
import MatchingResults from './MatchingResults';

export default function KundaliMatching() {
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  const handleMatch = (person1, person2) => {
    const result = calculateMatch(person1, person2);
    setResults(result);
    setShowResults(true);
  };

  const handleReset = () => {
    setResults(null);
    setShowResults(false);
  };

  return (
    <div>
      <SectionTitle
        title="Kundali Matching"
        subtitle="Ashtakoota Milan — 36-point compatibility analysis for marriage"
        icon="💑"
      />

      {/* Introduction */}
      {!showResults && (
        <div style={{
          background: 'linear-gradient(135deg, rgba(139,92,246,0.08), rgba(212,168,67,0.05))',
          borderRadius: 16,
          padding: 20,
          border: '1px solid rgba(139,92,246,0.12)',
          marginBottom: 24,
        }}>
          <p style={{
            color: '#cbd5e1',
            lineHeight: 1.8,
            fontSize: 14,
            marginBottom: 12,
          }}>
            <strong style={{ color: '#d4a843' }}>Ashtakoota Milan</strong> is the traditional Vedic method
            for evaluating marriage compatibility based on the Moon's position (Janma Nakshatra) of both partners.
            The system evaluates <strong style={{ color: '#a78bfa' }}>8 key factors</strong> (Kootas) for a
            total of <strong style={{ color: '#e8c65a' }}>36 points</strong>.
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
          }}>
            {[
              { range: '28-36', label: 'Excellent', color: '#22c55e' },
              { range: '24-27', label: 'Very Good', color: '#4ade80' },
              { range: '18-23', label: 'Good', color: '#d4a843' },
              { range: '12-17', label: 'Average', color: '#f59e0b' },
              { range: '0-11', label: 'Poor', color: '#ef4444' },
            ].map((tier) => (
              <span key={tier.range} style={{
                padding: '4px 12px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 600,
                background: `${tier.color}15`,
                border: `1px solid ${tier.color}25`,
                color: tier.color,
              }}>
                {tier.range}: {tier.label}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Form or Results */}
      {showResults && results ? (
        <div>
          <MatchingResults results={results} />
          <div style={{ textAlign: 'center', marginTop: 24 }}>
            <button
              onClick={handleReset}
              style={{
                padding: '12px 32px',
                borderRadius: 12,
                border: '1px solid rgba(139,92,246,0.3)',
                background: 'rgba(139,92,246,0.08)',
                color: '#a78bfa',
                fontSize: 14,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(139,92,246,0.15)';
                e.target.style.borderColor = 'rgba(139,92,246,0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(139,92,246,0.08)';
                e.target.style.borderColor = 'rgba(139,92,246,0.3)';
              }}
            >
              🔄 Match Different Profiles
            </button>
          </div>
        </div>
      ) : (
        <MatchingForm onMatch={handleMatch} />
      )}
    </div>
  );
}