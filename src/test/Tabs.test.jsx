import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BirthContext } from '../context/BirthContext';
import OverviewTab from '../components/OverviewTab';
import CareerTab from '../components/CareerTab';
import LoveTab from '../components/LoveTab';
import HealthTab from '../components/HealthTab';
import WealthTab from '../components/WealthTab';

const emptyBirthContext = { birthDetails: { name: '', dateOfBirth: '', timeOfBirth: '', placeOfBirth: '' }, setBirthDetails: () => {} };
const filledBirthContext = { birthDetails: { name: 'Arjun Sharma', dateOfBirth: '1990-06-15', timeOfBirth: '06:30', placeOfBirth: 'New Delhi' }, setBirthDetails: () => {} };

const renderWithBirthContext = (ui, ctxValue = emptyBirthContext) => {
  return render(
    <BirthContext.Provider value={ctxValue}>
      {ui}
    </BirthContext.Provider>
  );
};

describe('OverviewTab', () => {
  it('renders birth overview section', () => {
    renderWithBirthContext(<OverviewTab />);
    expect(screen.getByText('Birth Overview')).toBeInTheDocument();
  });

  it('shows dashes when no birth details entered', () => {
    renderWithBirthContext(<OverviewTab />);
    // Should show "—" for empty fields
    expect(screen.getAllByText('—').length).toBeGreaterThan(0);
  });

  it('shows formatted date when birth details are provided', () => {
    renderWithBirthContext(<OverviewTab />, filledBirthContext);
    expect(screen.getByText(/June 15, 1990/)).toBeInTheDocument();
  });

  it('renders personality summary', () => {
    renderWithBirthContext(<OverviewTab />);
    expect(screen.getByText(/Personality Summary/)).toBeInTheDocument();
  });

  it('renders strengths and challenges', () => {
    renderWithBirthContext(<OverviewTab />);
    expect(screen.getByText(/Strengths/)).toBeInTheDocument();
    expect(screen.getByText(/Challenges/)).toBeInTheDocument();
  });
});

describe('CareerTab', () => {
  it('renders career section title', () => {
    render(<CareerTab />);
    expect(screen.getByText('Career & Karma')).toBeInTheDocument();
  });

  it('renders 10th house info', () => {
    render(<CareerTab />);
    expect(screen.getByText(/Taurus/)).toBeInTheDocument();
  });

  it('renders career path matches', () => {
    render(<CareerTab />);
    expect(screen.getByText('Business Leadership')).toBeInTheDocument();
  });
});

describe('LoveTab', () => {
  it('renders love section title', () => {
    render(<LoveTab />);
    expect(screen.getByText('Love & Union')).toBeInTheDocument();
  });

  it('renders best match signs', () => {
    render(<LoveTab />);
    expect(screen.getByText('Gemini')).toBeInTheDocument();
  });
});

describe('HealthTab', () => {
  it('renders health section title', () => {
    render(<HealthTab />);
    expect(screen.getByText('Health & Vitality')).toBeInTheDocument();
  });

  it('renders body areas', () => {
    render(<HealthTab />);
    expect(screen.getByText('Heart & Spine')).toBeInTheDocument();
  });

  it('renders lifestyle practices', () => {
    render(<HealthTab />);
    expect(screen.getByText(/Surya Namaskar/)).toBeInTheDocument();
  });
});

describe('WealthTab', () => {
  it('renders wealth section title', () => {
    render(<WealthTab />);
    expect(screen.getByText('Wealth & Artha')).toBeInTheDocument();
  });

  it('renders wealth yogas', () => {
    render(<WealthTab />);
    expect(screen.getByText('Dhana Yoga')).toBeInTheDocument();
    expect(screen.getByText('Gajakesari Yoga')).toBeInTheDocument();
  });

  it('renders investment guidance', () => {
    render(<WealthTab />);
    expect(screen.getByText(/Investment Guidance/)).toBeInTheDocument();
  });
});