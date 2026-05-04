import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PlanetTable from '../components/PlanetTable';

describe('PlanetTable', () => {
  it('renders the table heading', () => {
    render(<PlanetTable />);
    expect(screen.getByText(/Planetary Positions/)).toBeInTheDocument();
  });

  it('renders all column headers', () => {
    render(<PlanetTable />);
    expect(screen.getByText('Planet')).toBeInTheDocument();
    expect(screen.getByText('Sign')).toBeInTheDocument();
    expect(screen.getByText('House')).toBeInTheDocument();
    expect(screen.getByText('Degree')).toBeInTheDocument();
    expect(screen.getByText('Nakshatra')).toBeInTheDocument();
    expect(screen.getByText('Status')).toBeInTheDocument();
  });

  it('renders all 9 planets', () => {
    render(<PlanetTable />);
    expect(screen.getByText('Sun')).toBeInTheDocument();
    expect(screen.getByText('Moon')).toBeInTheDocument();
    expect(screen.getByText('Mars')).toBeInTheDocument();
    expect(screen.getByText('Mercury')).toBeInTheDocument();
    expect(screen.getByText('Jupiter')).toBeInTheDocument();
    expect(screen.getByText('Venus')).toBeInTheDocument();
    expect(screen.getByText('Saturn')).toBeInTheDocument();
    expect(screen.getByText('Rahu')).toBeInTheDocument();
    expect(screen.getByText('Ketu')).toBeInTheDocument();
  });

  it('renders planet status badges', () => {
    render(<PlanetTable />);
    expect(screen.getByText('Exalted')).toBeInTheDocument();
    expect(screen.getAllByText('Own Sign').length).toBeGreaterThan(0);
  });
});