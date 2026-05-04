import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import InfoCard from '../components/InfoCard';

describe('InfoCard', () => {
  it('renders title and value', () => {
    render(<InfoCard title="Test Label" value="Test Value" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByText('Test Value')).toBeInTheDocument();
  });

  it('renders icon', () => {
    render(<InfoCard title="Label" value="Val" icon="🌟" />);
    expect(screen.getByText('🌟')).toBeInTheDocument();
  });

  it('renders subtitle', () => {
    render(<InfoCard title="Label" value="Val" subtitle="Some details" />);
    expect(screen.getByText('Some details')).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <InfoCard title="Label">
        <div data-testid="child">Child content</div>
      </InfoCard>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});