import { describe, it, expect } from 'vitest';
import { calculateMatch, RASHIS, NAKSHATRAS } from '../data/matchingData';

describe('calculateMatch', () => {
  const person1 = { name: 'Arjun', moonSign: 'Taurus', nakshatra: 'Rohini' };
  const person2 = { name: 'Priya', moonSign: 'Cancer', nakshatra: 'Pushya' };

  it('returns a result with total score out of 36', () => {
    const result = calculateMatch(person1, person2);
    expect(result.totalScore).toBeGreaterThanOrEqual(0);
    expect(result.totalScore).toBeLessThanOrEqual(36);
    expect(result.maxScore).toBe(36);
  });

  it('returns 8 kootas', () => {
    const result = calculateMatch(person1, person2);
    expect(result.kootas).toHaveLength(8);
  });

  it('includes koota names in correct order', () => {
    const result = calculateMatch(person1, person2);
    const names = result.kootas.map(k => k.name);
    expect(names).toEqual([
      'Varna', 'Vashya', 'Tara', 'Yoni',
      'Graha Maitri', 'Gana', 'Bhakoot', 'Nadi',
    ]);
  });

  it('each koota has score and max', () => {
    const result = calculateMatch(person1, person2);
    result.kootas.forEach((k) => {
      expect(k.score).toBeGreaterThanOrEqual(0);
      expect(k.score).toBeLessThanOrEqual(k.max);
      expect(k.max).toBe(k.weight);
    });
  });

  it('returns a verdict string', () => {
    const result = calculateMatch(person1, person2);
    expect(result.verdict).toBeTruthy();
    expect(typeof result.verdict).toBe('string');
  });

  it('returns a verdict color', () => {
    const result = calculateMatch(person1, person2);
    expect(result.verdictColor).toBeTruthy();
  });

  it('returns a percentage', () => {
    const result = calculateMatch(person1, person2);
    expect(result.percentage).toBeGreaterThanOrEqual(0);
    expect(result.percentage).toBeLessThanOrEqual(100);
  });

  it('returns person data', () => {
    const result = calculateMatch(person1, person2);
    expect(result.person1.name).toBe('Arjun');
    expect(result.person2.name).toBe('Priya');
  });

  it('includes recommendations array', () => {
    const result = calculateMatch(person1, person2);
    expect(Array.isArray(result.recommendations)).toBe(true);
    expect(result.recommendations.length).toBeGreaterThan(0);
  });

  it('same person matching returns valid result', () => {
    const result = calculateMatch(person1, person1);
    expect(result.totalScore).toBeGreaterThanOrEqual(0);
    expect(result.totalScore).toBeLessThanOrEqual(36);
  });

  it('calculates Nadi dosha when same Nadi', () => {
    const p1 = { name: 'A', moonSign: 'Aries', nakshatra: 'Ashwini' };
    const p2 = { name: 'B', moonSign: 'Leo', nakshatra: 'Magha' };
    const result = calculateMatch(p1, p2);
    // Both Ashwini and Magha are Aadi Nadi → Nadi Dosha
    expect(result.nadiDosha).toBe(true);
    expect(result.kootas[7].score).toBe(0); // Nadi score should be 0
  });
});

describe('Matching data integrity', () => {
  it('RASHIS has 12 signs', () => {
    expect(RASHIS).toHaveLength(12);
  });

  it('NAKSHATRAS has 27 nakshatras', () => {
    expect(NAKSHATRAS).toHaveLength(27);
  });
});