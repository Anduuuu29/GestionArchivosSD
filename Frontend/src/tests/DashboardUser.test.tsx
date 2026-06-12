import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import DashboardUser from '../pages/user/DashboardUser';

vi.mock('../layouts/UserLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="user-layout">{children}</div>
  ),
}));

vi.mock('../contexts/AuthContext', () => ({
  useAuth: vi.fn(),
}));

import { useAuth } from '../contexts/AuthContext';

const mockDocs = [
  {
    id: 1, idExpediente: 'EXP-001', solicitante: 'Juan Pérez',
    tipo: 'Permiso', asunto: 'Construcción muro', descripcion: 'Muro perimetral',
    estado: 'Ingresado', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
  {
    id: 2, idExpediente: 'EXP-002', solicitante: 'María García',
    tipo: 'Patente', asunto: 'Renovación patente', descripcion: 'Patente comercial',
    estado: 'Aprobado', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
  },
];

vi.mock('../services/mis-documentos.service', () => ({
  misDocumentosService: {
    getAll: vi.fn(),
  },
}));

import { misDocumentosService } from '../services/mis-documentos.service';

const renderDashboard = () =>
  render(
    <MemoryRouter initialEntries={['/usuario/dashboard']}>
      <DashboardUser />
    </MemoryRouter>
  );

beforeEach(() => {
  vi.clearAllMocks();
  vi.mocked(useAuth).mockReturnValue({ userName: 'Vecino' } as any);
});

describe('DashboardUser', () => {
  it('debería mostrar skeleton loading mientras carga', () => {
    vi.mocked(misDocumentosService.getAll).mockReturnValue(new Promise(() => {}));
    renderDashboard();
    expect(document.querySelector('.dash-skeleton')).toBeInTheDocument();
  });

  it('debería mostrar estado vacío cuando no hay documentos', async () => {
    vi.mocked(misDocumentosService.getAll).mockResolvedValue({ data: { data: [] } });
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByText('No tienes trámites aún')).toBeInTheDocument();
    });
  });

  it('debería mostrar tarjetas con documentos', async () => {
    vi.mocked(misDocumentosService.getAll).mockResolvedValue({ data: { data: mockDocs } });
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByText('Construcción muro')).toBeInTheDocument();
      expect(screen.getByText('Renovación patente')).toBeInTheDocument();
    });
  });

  it('debería mostrar el nombre del usuario en el hero', async () => {
    vi.mocked(misDocumentosService.getAll).mockResolvedValue({ data: { data: [] } });
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByText(/Vecino/)).toBeInTheDocument();
    });
  });

  it('debería mostrar contadores de estadísticas', async () => {
    vi.mocked(misDocumentosService.getAll).mockResolvedValue({ data: { data: mockDocs } });
    renderDashboard();
    await waitFor(() => {
      expect(screen.getByText('Total')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
    });
  });

  it('debería alternar FAQ al hacer clic', async () => {
    vi.mocked(misDocumentosService.getAll).mockResolvedValue({ data: { data: [] } });
    renderDashboard();
    const user = userEvent.setup();

    await waitFor(() => {
      expect(screen.getByText('Preguntas Frecuentes')).toBeInTheDocument();
    });

    const firstQuestion = screen.getByText('¿Cómo subo mi declaración de impuestos?');
    await user.click(firstQuestion);

    expect(screen.getByText(/Ingrese a la sección Documentos/)).toBeInTheDocument();
  });
});
