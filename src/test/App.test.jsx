import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  it('renders the main heading (default when no name)', () => {
    render(<App />);
    expect(screen.getByText('Your Vedic Kundali')).toBeInTheDocument();
  });

  it('renders the navigation tabs', () => {
    render(<App />);
    expect(screen.getByText('✦ Overview')).toBeInTheDocument();
    expect(screen.getByText(/Career/)).toBeInTheDocument();
    expect(screen.getByText(/Love/)).toBeInTheDocument();
    expect(screen.getByText(/Health/)).toBeInTheDocument();
    expect(screen.getByText(/Wealth/)).toBeInTheDocument();
  });

  it('renders the update birth details button', () => {
    render(<App />);
    expect(screen.getByText(/Update Birth Details/)).toBeInTheDocument();
  });

  it('renders footer text', () => {
    render(<App />);
    expect(screen.getByText(/Vedic Kundali Dashboard/)).toBeInTheDocument();
  });
});