import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import KundaliChart from '../components/KundaliChart';

describe('KundaliChart', () => {
  it('renders the chart title', () => {
    render(<KundaliChart />);
    expect(screen.getByText(/North Indian Kundali/)).toBeInTheDocument();
  });

  it('renders SVG element', () => {
    const { container } = render(<KundaliChart />);
    const svg = container.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('contains ASC marker text', () => {
    render(<KundaliChart />);
    expect(screen.getByText('ASC')).toBeInTheDocument();
  });

  it('renders planet abbreviations in the chart', () => {
    const { container } = render(<KundaliChart />);
    // Should have planet text elements like Su, Mo, Ma, etc.
    const textElements = container.querySelectorAll('text');
    const textContent = Array.from(textElements).map(el => el.textContent);
    expect(textContent.some(t => ['Su', 'Mo', 'Ma', 'Me', 'Ju', 'Ve', 'Sa', 'Ra', 'Ke'].includes(t))).toBe(true);
  });
});