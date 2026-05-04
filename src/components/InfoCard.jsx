export default function InfoCard({ title, value, icon, accent = '#8b5cf6', subtitle, children }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(26,26,62,0.8), rgba(17,17,40,0.9))',
      borderRadius: 16,
      padding: 20,
      border: `1px solid ${accent}25`,
      transition: 'all 0.3s ease',
      cursor: 'default',
      position: 'relative',
      overflow: 'hidden',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = `${accent}60`;
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = `0 8px 32px ${accent}20`;
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = `${accent}25`;
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
    }}
    >
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: 80,
        height: 80,
        background: `radial-gradient(circle at top right, ${accent}15, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      
      {icon && (
        <div style={{
          fontSize: 28,
          marginBottom: 12,
          filter: 'drop-shadow(0 0 8px rgba(212,168,67,0.3))',
        }}>
          {icon}
        </div>
      )}
      
      {title && (
        <div style={{
          fontSize: 12,
          color: '#94a3b8',
          textTransform: 'uppercase',
          letterSpacing: 1.5,
          marginBottom: 6,
          fontWeight: 600,
        }}>
          {title}
        </div>
      )}
      
      {value && (
        <div style={{
          fontSize: 20,
          fontWeight: 700,
          color: '#f1f5f9',
          lineHeight: 1.3,
        }}>
          {value}
        </div>
      )}
      
      {subtitle && (
        <div style={{
          fontSize: 13,
          color: '#64748b',
          marginTop: 6,
          lineHeight: 1.4,
        }}>
          {subtitle}
        </div>
      )}
      
      {children && (
        <div style={{ marginTop: 12 }}>
          {children}
        </div>
      )}
    </div>
  );
}