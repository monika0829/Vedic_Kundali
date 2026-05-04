import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import KundaliMatching from '../components/KundaliMatching';

describe('KundaliMatching', () => {
  it('renders the matching title', () => {
    render(<KundaliMatching />);
    expect(screen.getByText('Kundali Matching')).toBeInTheDocument();
  });

  it('renders the introduction with Ashtakoota Milan', () => {
    render(<KundaliMatching />);
    expect(screen.getAllByText(/Ashtakoota Milan/).length).toBeGreaterThanOrEqual(1);
  });

  it('renders score tier legend', () => {
    render(<KundaliMatching />);
    expect(screen.getByText(/28-36/)).toBeInTheDocument();
  });

  it('renders the calculate button', () => {
    render(<KundaliMatching />);
    expect(screen.getByText(/Calculate Compatibility/)).toBeInTheDocument();
  });

  it('shows form fields for both partners', () => {
    render(<KundaliMatching />);
    expect(screen.getByText('Partner 1')).toBeInTheDocument();
    expect(screen.getByText('Partner 2')).toBeInTheDocument();
  });

  it('has date and time inputs for each partner', () => {
    render(<KundaliMatching />);
    const dobLabels = screen.getAllByText('Date of Birth');
    const tobLabels = screen.getAllByText('Time of Birth');
    expect(dobLabels).toHaveLength(2);
    expect(tobLabels).toHaveLength(2);
  });

  it('has place of birth inputs', () => {
    render(<KundaliMatching />);
    const pobLabels = screen.getAllByText('Place of Birth');
    expect(pobLabels).toHaveLength(2);
  });

  it('shows validation error when clicking calculate with empty fields', () => {
    render(<KundaliMatching />);
    fireEvent.click(screen.getByText(/Calculate Compatibility/));
    expect(screen.getByText(/Please fill in all fields/)).toBeInTheDocument();
  });
});