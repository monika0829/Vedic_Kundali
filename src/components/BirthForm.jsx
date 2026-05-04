import { useState, useEffect } from 'react';
import { useBirthDetails } from '../context/BirthContext';

export default function BirthForm({ onClose }) {
  const { birthDetails, setBirthDetails } = useBirthDetails();

  const [form, setForm] = useState({
    name: birthDetails.name,
    dateOfBirth: birthDetails.dateOfBirth,
    timeOfBirth: birthDetails.timeOfBirth,
    placeOfBirth: birthDetails.placeOfBirth,
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setBirthDetails(form);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0,0,0,0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: 20,
    }}
    onClick={onClose}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #1a1a3e, #111128)',
          borderRadius: 24,
          padding: 32,
          maxWidth: 500,
          width: '100%',
          border: '1px solid rgba(212,168,67,0.2)',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
          maxHeight: '90vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success flash */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}>
          <div>
            <h2 style={{
              fontSize: 20,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #e8c65a, #d4a843)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Birth Details
            </h2>
            <p style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>
              Enter details for kundali generation
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              width: 36,
              height: 36,
              borderRadius: '50%',
              border: '1px solid rgba(100,116,139,0.2)',
              background: 'rgba(26,26,62,0.8)',
              color: '#94a3b8',
              fontSize: 18,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Enter your full name' },
            { label: 'Date of Birth', key: 'dateOfBirth', type: 'date' },
            { label: 'Time of Birth', key: 'timeOfBirth', type: 'time' },
            { label: 'Place of Birth', key: 'placeOfBirth', type: 'text', placeholder: 'City, Country' },
          ].map((field) => (
            <div key={field.key}>
              <label style={{
                display: 'block',
                fontSize: 12,
                color: '#94a3b8',
                marginBottom: 6,
                textTransform: 'uppercase',
                letterSpacing: 1,
                fontWeight: 600,
              }}>
                {field.label}
              </label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                value={form[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  borderRadius: 10,
                  border: '1px solid rgba(139,92,246,0.2)',
                  background: 'rgba(10,10,26,0.8)',
                  color: '#e2e8f0',
                  fontSize: 14,
                  outline: 'none',
                  transition: 'border-color 0.3s',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => e.target.style.borderColor = 'rgba(139,92,246,0.5)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(139,92,246,0.2)'}
              />
            </div>
          ))}

          <button
            type="submit"
            style={{
              marginTop: 8,
              padding: '14px 24px',
              borderRadius: 12,
              border: 'none',
              background: 'linear-gradient(135deg, #8b5cf6, #d4a843)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              letterSpacing: 0.5,
              transition: 'all 0.3s',
              boxShadow: '0 4px 20px rgba(139,92,246,0.3)',
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 6px 28px rgba(139,92,246,0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 20px rgba(139,92,246,0.3)';
            }}
          >
            🔮 Generate Kundali
          </button>
        </form>
      </div>
    </div>
  );
}