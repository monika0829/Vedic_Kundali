import { useBirthDetails } from '../context/BirthContext';

export default function Navbar({ activeTab, setActiveTab, darkMode, setDarkMode }) {
  const { birthDetails } = useBirthDetails();
  const tabs = [
    { id: 'overview', label: '✦ Overview', icon: '🔮' },
    { id: 'career', label: '⚡ Career', icon: '💼' },
    { id: 'love', label: '♀ Love', icon: '💕' },
    { id: 'health', label: '🌿 Health', icon: '🌿' },
    { id: 'wealth', label: '💰 Wealth', icon: '💰' },
    { id: 'match', label: '💑 Match', icon: '💑' },
  ];

  return (
    <nav style={{
      background: 'linear-gradient(180deg, rgba(10,10,26,0.98) 0%, rgba(10,10,26,0.9) 100%)',
      borderBottom: '1px solid rgba(212,168,67,0.2)',
      backdropFilter: 'blur(20px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: '0 24px',
      }}>
        {/* Top bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '12px 0',
          borderBottom: '1px solid rgba(139,92,246,0.15)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #d4a843 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              boxShadow: '0 0 20px rgba(212,168,67,0.3)',
            }}>
              🪐
            </div>
            <div>
              <div style={{
                fontSize: 18,
                fontWeight: 700,
                background: 'linear-gradient(135deg, #d4a843, #e8c65a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: 1,
              }}>
                VEDIC KUNDALI
              </div>
              <div style={{ fontSize: 11, color: '#8b5cf6', letterSpacing: 2, textTransform: 'uppercase' }}>
                Jyotish Dashboard
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ textAlign: 'right', fontSize: 12, color: '#94a3b8' }}>
              <div style={{ color: birthDetails.name ? '#d4a843' : '#475569', fontWeight: 600 }}>
                {birthDetails.name || 'Enter birth details'}
              </div>
              <div style={{ color: birthDetails.placeOfBirth ? '#94a3b8' : '#475569' }}>
                {birthDetails.placeOfBirth || '—'}
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '1px solid rgba(139,92,246,0.3)',
                background: 'rgba(26,26,62,0.8)',
                cursor: 'pointer',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}
              title="Toggle theme"
            >
              {darkMode ? '🌙' : '☀️'}
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: 4,
          padding: '8px 0',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '8px 20px',
                borderRadius: 8,
                border: 'none',
                background: activeTab === tab.id
                  ? 'linear-gradient(135deg, rgba(139,92,246,0.3), rgba(212,168,67,0.2))'
                  : 'transparent',
                color: activeTab === tab.id ? '#e8c65a' : '#94a3b8',
                fontSize: 14,
                fontWeight: activeTab === tab.id ? 600 : 400,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.3s ease',
                borderBottom: activeTab === tab.id ? '2px solid #d4a843' : '2px solid transparent',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}