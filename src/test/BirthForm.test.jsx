import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BirthForm from '../components/BirthForm';
import { BirthContext, DEFAULT_BIRTH_DETAILS } from '../context/BirthContext';

const renderWithBirthContext = (ui) => {
  return render(
    <BirthContext.Provider value={{ birthDetails: DEFAULT_BIRTH_DETAILS, setBirthDetails: vi.fn() }}>
      {ui}
    </BirthContext.Provider>
  );
};

describe('BirthForm', () => {
  it('renders modal with form fields', () => {
    renderWithBirthContext(<BirthForm onClose={() => {}} />);
    expect(screen.getByText('Birth Details')).toBeInTheDocument();
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Date of Birth')).toBeInTheDocument();
    expect(screen.getByText('Time of Birth')).toBeInTheDocument();
    expect(screen.getByText('Place of Birth')).toBeInTheDocument();
  });

  it('renders generate button', () => {
    renderWithBirthContext(<BirthForm onClose={() => {}} />);
    expect(screen.getByText(/Generate Kundali/)).toBeInTheDocument();
  });

  it('calls onClose when close button clicked', () => {
    let called = false;
    renderWithBirthContext(<BirthForm onClose={() => { called = true; }} />);
    const closeBtn = screen.getByText('✕');
    fireEvent.click(closeBtn);
    expect(called).toBe(true);
  });

  it('calls onClose when backdrop clicked', () => {
    let called = false;
    const { container } = renderWithBirthContext(<BirthForm onClose={() => { called = true; }} />);
    const backdrop = container.firstChild;
    fireEvent.click(backdrop);
    expect(called).toBe(true);
  });
});