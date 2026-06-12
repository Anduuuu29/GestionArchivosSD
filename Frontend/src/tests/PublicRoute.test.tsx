import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import PublicRoute from '../components/PublicRoute';

vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '../contexts/AuthContext';

const LoginComponent = () => <div data-testid="login">Login</div>;

const renderWithRouter = (ui: React.ReactElement) =>
  render(<MemoryRouter initialEntries={['/']}>{ui}</MemoryRouter>);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('PublicRoute', () => {
  it('debería renderizar componente público si no está autenticado', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: false, role: null } as any);
    renderWithRouter(<PublicRoute path="/" component={LoginComponent} />);
    expect(screen.getByTestId('login')).toBeInTheDocument();
  });

  it('debería redirigir a /admin/dashboard si es admin autenticado', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: true, role: 'admin' } as any);
    renderWithRouter(<PublicRoute path="/" component={LoginComponent} />);
    expect(screen.queryByTestId('login')).not.toBeInTheDocument();
  });

  it('debería redirigir a /usuario/dashboard si es user autenticado', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: true, role: 'user' } as any);
    renderWithRouter(<PublicRoute path="/" component={LoginComponent} />);
    expect(screen.queryByTestId('login')).not.toBeInTheDocument();
  });
});
