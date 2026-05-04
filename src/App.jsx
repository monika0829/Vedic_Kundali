import { useState, useCallback } from 'react';
import Starfield from './components/Starfield';
import Navbar from './components/Navbar';
import KundaliChart from './components/KundaliChart';
import PlanetTable from './components/PlanetTable';
import DashaTimeline from './components/DashaTimeline';
import OverviewTab from './components/OverviewTab';
import CareerTab from './components/CareerTab';
import LoveTab from './components/LoveTab';
import HealthTab from './components/HealthTab';
import WealthTab from './components/WealthTab';
import BirthForm from './components/BirthForm';
import KundaliMatching from './components/KundaliMatching';
import { BirthContext, DEFAULT_BIRTH_DETAILS } from './context/BirthContext';
import './index.css';

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [darkMode, setDarkMode] = useState(true);
  const [showBirthForm, setShowBirthForm] = useState(false);
  const [birthDetails, setBirthDetails] = useState(DEFAULT_BIRTH_DETAILS);
  const [justUpdated, setJustUpdated] = useState(false);

  const handleBirthUpdate = useCallback((details) => {
    setBirthDetails(details);
    setJustUpdated(true);
    setTimeout(() => setJustUpdated(false), 3000);
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'career': return <CareerTab />;
      case 'love': return <LoveTab />;
      case 'health': return <HealthTab />;
      case 'wealth': return <WealthTab />;
      case 'match': return <KundaliMatching />;
      default: return <OverviewTab />;
    }
  };

  return (
    <BirthContext.Provider value={{ birthDetails, setBirthDetails: handleBirthUpdate }}>
    <div style={{
      minHeight: '100vh',
      background: darkMode
        ? 'linear-gradient(135deg, #0a0a1a 0%, #111128 50%, #0a0a1a 100%)'
        : 'linear-gradient(135deg, #1a1a3e 0%, #2a2a5e 50%, #1a1a3e 100%)',
      position: 'relative',
    }}>
      {darkMode && <Starfield />}

      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <main style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: '24px 24px 60px',
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Hero Section */}
        <div style={{
          textAlign: 'center',
          padding: '40px 0 32px',
          position: 'relative',
        }}>
          {/* Mandala decoration */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 300,
            height: 300,
            opacity: 0.04,
            pointerEvents: 'none',
          }}>
            <svg viewBox="0 0 200 200" width="300" height="300" className="animate-spin-slow">
              <circle cx="100" cy="100" r="90" fill="none" stroke="#d4a843" strokeWidth="0.5" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="#d4a843" strokeWidth="0.3" />
              <circle cx="100" cy="100" r="50" fill="none" stroke="#8b5cf6" strokeWidth="0.3" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
                <line
                  key={angle}
                  x1="100" y1="10"
                  x2="100" y2="190"
                  stroke="#d4a843"
                  strokeWidth="0.2"
                  transform={`rotate(${angle} 100 100)`}
                />
              ))}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <polygon
                  key={angle}
                  points="100,20 115,100 100,180 85,100"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="0.2"
                  transform={`rotate(${angle} 100 100)`}
                />
              ))}
            </svg>
          </div>

          <div style={{
            fontSize: 36,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #f0d878, #d4a843, #8b5cf6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 8,
            letterSpacing: 1,
            position: 'relative',
          }}>
            {birthDetails.name ? `${birthDetails.name}'s Kundali` : 'Your Vedic Kundali'}
          </div>
          <p style={{
            color: '#94a3b8',
            fontSize: 15,
            maxWidth: 500,
            margin: '0 auto',
            lineHeight: 1.6,
          }}>
            Explore your cosmic blueprint through the ancient wisdom of Vedic astrology
          </p>

          {/* Success notification */}
          {justUpdated && (
            <div style={{
              marginTop: 16,
              padding: '10px 20px',
              borderRadius: 10,
              background: 'rgba(34,197,94,0.12)',
              border: '1px solid rgba(34,197,94,0.3)',
              color: '#22c55e',
              fontSize: 13,
              fontWeight: 600,
              display: 'inline-block',
              animation: 'fadeInUp 0.3s ease',
            }}>
              ✅ Kundali updated with new birth details
            </div>
          )}
          <button
            onClick={() => setShowBirthForm(true)}
            style={{
              marginTop: 20,
              padding: '10px 24px',
              borderRadius: 10,
              border: '1px solid rgba(212,168,67,0.3)',
              background: 'rgba(212,168,67,0.08)',
              color: '#d4a843',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.3s',
              letterSpacing: 0.5,
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(212,168,67,0.15)';
              e.target.style.borderColor = 'rgba(212,168,67,0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(212,168,67,0.08)';
              e.target.style.borderColor = 'rgba(212,168,67,0.3)';
            }}
          >
            ✏️ Update Birth Details
          </button>
        </div>

        {/* Chart + Dasha Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: 20,
          marginBottom: 32,
        }}>
          <KundaliChart />
          <DashaTimeline />
        </div>

        {/* Planet Table */}
        <div style={{ marginBottom: 32 }}>
          <PlanetTable />
        </div>

        {/* Tab Content */}
        <div className="tab-content-active" style={{
          background: 'linear-gradient(135deg, rgba(26,26,62,0.6), rgba(17,17,40,0.7))',
          borderRadius: 24,
          padding: 28,
          border: '1px solid rgba(139,92,246,0.1)',
        }}>
          {renderTabContent()}
        </div>

        {/* Footer */}
        <footer style={{
          textAlign: 'center',
          padding: '40px 0 20px',
          borderTop: '1px solid rgba(100,116,139,0.1)',
          marginTop: 40,
        }}>
          <div style={{
            fontSize: 20,
            marginBottom: 8,
          }}>
            🪐
          </div>
          <div style={{
            fontSize: 13,
            color: '#64748b',
            letterSpacing: 1,
          }}>
            Vedic Kundali Dashboard • Jyotish Insights
          </div>
          <div style={{
            fontSize: 11,
            color: '#475569',
            marginTop: 6,
          }}>
            Sample data for demonstration purposes
          </div>
        </footer>
      </main>

      {showBirthForm && (
        <BirthForm onClose={() => setShowBirthForm(false)} />
      )}
    </div>
    </BirthContext.Provider>
  );
}

export default App;