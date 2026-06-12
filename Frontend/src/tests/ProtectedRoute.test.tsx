import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '../contexts/AuthContext';

const DummyComponent = () => <div data-testid="dummy">Dashboard</div>;

const renderAtPath = (path: string, ui: React.ReactElement) =>
  render(<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>);

beforeEach(() => {
  vi.clearAllMocks();
});

describe('ProtectedRoute', () => {
  it('debería redirigir a / si no está autenticado', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: false, role: null } as any);
    renderAtPath('/admin',
      <ProtectedRoute path="/admin" component={DummyComponent} />
    );
    expect(screen.queryByTestId('dummy')).not.toBeInTheDocument();
  });

  it('debería renderizar el componente si está autenticado como admin', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: true, role: 'admin' } as any);
    renderAtPath('/admin',
      <ProtectedRoute path="/admin" component={DummyComponent} />
    );
    expect(screen.getByTestId('dummy')).toBeInTheDocument();
  });

  it('debería renderizar el componente si está autenticado como user (sin requiredRole)', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: true, role: 'user' } as any);
    renderAtPath('/user',
      <ProtectedRoute path="/user" component={DummyComponent} />
    );
    expect(screen.getByTestId('dummy')).toBeInTheDocument();
  });

  it('debería redirigir si el rol no coincide con requiredRole', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: true, role: 'user' } as any);
    renderAtPath('/admin',
      <ProtectedRoute path="/admin" requiredRole="admin" component={DummyComponent} />
    );
    expect(screen.queryByTestId('dummy')).not.toBeInTheDocument();
  });

  it('debería renderizar si el rol coincide con requiredRole', () => {
    vi.mocked(useAuth).mockReturnValue({ isAuthenticated: true, role: 'admin' } as any);
    renderAtPath('/admin',
      <ProtectedRoute path="/admin" requiredRole="admin" component={DummyComponent} />
    );
    expect(screen.getByTestId('dummy')).toBeInTheDocument();
  });
});
