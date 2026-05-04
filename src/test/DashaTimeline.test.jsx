import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import DashaTimeline from '../components/DashaTimeline';

describe('DashaTimeline', () => {
  it('renders the dasha timeline title', () => {
    render(<DashaTimeline />);
    expect(screen.getByText(/Dasha Timeline/)).toBeInTheDocument();
  });

  it('renders current mahadasha', () => {
    render(<DashaTimeline />);
    expect(screen.getAllByText(/Moon Mahadasha/).length).toBeGreaterThan(0);
  });

  it('renders mahadasha period cards', () => {
    render(<DashaTimeline />);
    expect(screen.getAllByText(/Antardasha/).length).toBeGreaterThan(0);
  });

  it('renders ACTIVE badge for current antardasha', () => {
    render(<DashaTimeline />);
    expect(screen.getByText('ACTIVE')).toBeInTheDocument();
  });
});