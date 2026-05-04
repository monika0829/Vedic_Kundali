import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionTitle from '../components/SectionTitle';

describe('SectionTitle', () => {
  it('renders title text', () => {
    render(<SectionTitle title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders subtitle when provided', () => {
    render(<SectionTitle title="Title" subtitle="A subtitle" />);
    expect(screen.getByText('A subtitle')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<SectionTitle title="Title" icon="🔮" />);
    expect(screen.getByText('🔮')).toBeInTheDocument();
  });
});