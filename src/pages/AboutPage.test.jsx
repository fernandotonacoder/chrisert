import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import AboutPage from './AboutPage';

describe('AboutPage', () => {
  it('renders the page title', () => {
    render(<AboutPage />);
    
    expect(screen.getByRole('heading', { level: 1, name: /saber mais/i })).toBeInTheDocument();
  });

  it('renders the About section', () => {
    render(<AboutPage />);
    
    expect(screen.getByText(/sobre nós/i)).toBeInTheDocument();
    expect(screen.getByText(/portugal continental/i)).toBeInTheDocument();
  });

  it('renders the Mission section', () => {
    render(<AboutPage />);
    
    expect(screen.getByRole('heading', { level: 2, name: /a nossa missão/i })).toBeInTheDocument();
  });

  it('renders the Values section with all values', () => {
    render(<AboutPage />);
    
    expect(screen.getByText(/valores/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /qualidade/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /inovação/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3, name: /confiança/i })).toBeInTheDocument();
  });
});
