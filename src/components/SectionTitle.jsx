export default function SectionTitle({ title, subtitle, icon }) {
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
        {icon && (
          <span style={{
            fontSize: 24,
            width: 44,
            height: 44,
            borderRadius: 12,
            background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(212,168,67,0.15))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(212,168,67,0.2)',
          }}>
            {icon}
          </span>
        )}
        <div>
          <h2 style={{
            fontSize: 22,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #e8c65a, #d4a843)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: 0.5,
          }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: 13, color: '#94a3b8', marginTop: 2 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>
      <div style={{
        height: 1,
        background: 'linear-gradient(90deg, rgba(212,168,67,0.4), rgba(139,92,246,0.2), transparent)',
        marginTop: 12,
      }} />
    </div>
  );
}