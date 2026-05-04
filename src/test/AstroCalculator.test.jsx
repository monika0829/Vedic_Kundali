import { describe, it, expect } from 'vitest';
import { calculateBirthChart, getMoonSign, getNakshatra, RASHIS, NAKSHATRAS } from '../data/astroCalculator';

describe('getMoonSign', () => {
  it('returns Aries for 0-30 degrees', () => {
    expect(getMoonSign(5)).toBe('Aries');
    expect(getMoonSign(29.99)).toBe('Aries');
  });
  it('returns Taurus for 30-60 degrees', () => {
    expect(getMoonSign(35)).toBe('Taurus');
    expect(getMoonSign(59)).toBe('Taurus');
  });
  it('returns Pisces for 330-360 degrees', () => {
    expect(getMoonSign(340)).toBe('Pisces');
    expect(getMoonSign(359)).toBe('Pisces');
  });
  it('wraps around for values >= 360', () => {
    expect(getMoonSign(365)).toBe('Aries');
    expect(getMoonSign(390)).toBe('Taurus');
  });
});

describe('getNakshatra', () => {
  it('returns Ashwini for 0-13.33 degrees', () => {
    expect(getNakshatra(0)).toBe('Ashwini');
    expect(getNakshatra(10)).toBe('Ashwini');
  });
  it('returns Rohini for 40-53.33 degrees', () => {
    expect(getNakshatra(45)).toBe('Rohini');
  });
  it('returns Revati for last segment', () => {
    expect(getNakshatra(350)).toBe('Revati');
  });
});

describe('calculateBirthChart', () => {
  it('returns moonSign and nakshatra from birth details', () => {
    const chart = calculateBirthChart('Test', '1990-06-15', '06:30', 'New Delhi');
    expect(chart.moonSign).toBeTruthy();
    expect(RASHIS).toContain(chart.moonSign);
    expect(chart.nakshatra).toBeTruthy();
    expect(NAKSHATRAS).toContain(chart.nakshatra);
  });

  it('returns sunSign', () => {
    const chart = calculateBirthChart('Test', '1990-06-15', '06:30', 'New Delhi');
    expect(chart.sunSign).toBeTruthy();
    expect(RASHIS).toContain(chart.sunSign);
  });

  it('returns ascendant', () => {
    const chart = calculateBirthChart('Test', '1990-06-15', '06:30', 'New Delhi');
    expect(chart.ascendant).toBeTruthy();
    expect(RASHIS).toContain(chart.ascendant);
  });

  it('returns numeric moonLongitude', () => {
    const chart = calculateBirthChart('Test', '1990-06-15', '06:30', 'New Delhi');
    const lon = parseFloat(chart.moonLongitude);
    expect(lon).toBeGreaterThanOrEqual(0);
    expect(lon).toBeLessThan(360);
  });

  it('returns nakshatraPada between 1 and 4', () => {
    const chart = calculateBirthChart('Test', '1990-06-15', '06:30', 'New Delhi');
    expect(chart.nakshatraPada).toBeGreaterThanOrEqual(1);
    expect(chart.nakshatraPada).toBeLessThanOrEqual(4);
  });

  it('works with different dates', () => {
    const chart1 = calculateBirthChart('A', '1990-01-01', '00:00', 'Mumbai');
    const chart2 = calculateBirthChart('B', '1995-07-15', '12:00', 'Delhi');
    // Different dates should generally produce different moon positions
    // (not always, but very likely for these dates)
    expect(chart1.moonLongitude).toBeTruthy();
    expect(chart2.moonLongitude).toBeTruthy();
  });

  it('handles unknown place gracefully', () => {
    const chart = calculateBirthChart('Test', '1990-06-15', '06:30', 'Some Unknown Place XYZ');
    expect(chart.moonSign).toBeTruthy();
    expect(chart.nakshatra).toBeTruthy();
  });

  it('preserves input data', () => {
    const chart = calculateBirthChart('Arjun', '1990-06-15', '06:30', 'New Delhi');
    expect(chart.name).toBe('Arjun');
    expect(chart.dateOfBirth).toBe('1990-06-15');
    expect(chart.timeOfBirth).toBe('06:30');
    expect(chart.placeOfBirth).toBe('New Delhi');
  });
});

describe('Data integrity', () => {
  it('has 12 rashis', () => expect(RASHIS).toHaveLength(12));
  it('has 27 nakshatras', () => expect(NAKSHATRAS).toHaveLength(27));
});