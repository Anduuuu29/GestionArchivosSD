import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { ticketOutline, checkmarkDoneOutline, timeOutline, closeCircleOutline } from 'ionicons/icons';
import UserLayout from '../../layouts/UserLayout';
import { ticketsService } from '../../services/tickets.service';

interface Ticket {
  id: number;
  asunto: string;
  descripcion: string;
  estado: string;
  createdAt: string;
  Usuario?: { nombre: string; apellido: string; correo: string };
}

const ESTADOS = ['Abierto', 'En Proceso', 'Cerrado'];

const ESTADO_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  'Abierto':    { bg: '#dbeafe', text: '#1d4ed8', dot: '#3b82f6' },
  'En Proceso': { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  'Cerrado':    { bg: '#d1fae5', text: '#065f46', dot: '#10b981' },
};

const defaultStyle = { bg: '#f3f4f6', text: '#374151', dot: '#6b7280' };

const AdminTickets: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState<string>('');

  const fetchTickets = async () => {
    try {
      const params: any = {};
      if (filtro) params.estado = filtro;
      const res = await ticketsService.getAllAdmin(params);
      setTickets(res.data.data || []);
    } catch {
      window.dispatchEvent(new CustomEvent('api-error', { detail: { message: 'Error al cargar tickets' } }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTickets(); }, [filtro]);

  const handleCambiarEstado = async (id: string, estado: string) => {
    try {
      await ticketsService.updateStatus(id, estado);
      fetchTickets();
    } catch {
      window.dispatchEvent(new CustomEvent('api-error', { detail: { message: 'Error al cambiar estado del ticket' } }));
    }
  };

  const getStyle = (estado: string) => ESTADO_STYLE[estado] || defaultStyle;

  const SkeletonCard = () => (
    <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
        <div className="sk-cell sk-cell-lg" style={{ height: '16px' }} />
        <div className="sk-cell sk-cell-sm" style={{ height: '16px', borderRadius: '12px' }} />
      </div>
      <div className="sk-cell sk-cell-md" style={{ height: '12px', marginBottom: '6px' }} />
      <div className="sk-cell sk-cell-lg" style={{ height: '12px' }} />
    </div>
  );

  return (
    <UserLayout>
      <style>{`
        @keyframes sk-shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        .sk-cell { height: 14px; border-radius: 4px; background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%); background-size: 800px 100%; animation: sk-shimmer 1.5s ease-in-out infinite; }
        .sk-cell-sm { width: 40px; }
        .sk-cell-md { width: 120px; }
        .sk-cell-lg { width: 180px; }
      `}</style>
      <div className="flex flex-col p-8 w-full max-w-[1200px] mx-auto overflow-y-auto" style={{ minHeight: 'calc(100vh - 60px)' }}>
        <div className="flex items-center gap-2 mb-8">
          <span className="text-[#fe6565] font-['Inter',sans-serif] font-black text-[12px] tracking-widest uppercase">i</span>
          <h1 className="text-[#111] font-['Inter',sans-serif] font-extrabold text-4xl tracking-tight m-0">Gestión de Tickets</h1>
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {['', 'Abierto', 'En Proceso', 'Cerrado'].map((estado) => (
            <button key={estado} onClick={() => setFiltro(estado)}
              style={{
                padding: '6px 16px', borderRadius: '20px', border: '1px solid #d1d5db',
                background: filtro === estado ? '#050d2c' : 'white',
                color: filtro === estado ? 'white' : '#374151',
                fontSize: '13px', fontWeight: 600, cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >{estado || 'Todos'}</button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : tickets.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#9ca3af' }}>
            <IonIcon icon={ticketOutline} style={{ fontSize: '40px', marginBottom: '12px' }} />
            <p>No hay tickets{filtro ? ` en estado "${filtro}"` : ''}</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tickets.map((ticket) => {
              const s = getStyle(ticket.estado);
              const usuario = ticket.Usuario;
              return (
                <div key={ticket.id} style={{
                  background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px',
                  padding: '16px 20px',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 600, fontSize: '15px', color: '#111', marginBottom: '2px' }}>{ticket.asunto}</div>
                      {usuario && (
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          {usuario.nombre} {usuario.apellido} — {usuario.correo}
                        </div>
                      )}
                    </div>
                    <div style={{
                      background: s.bg, color: s.text, padding: '4px 12px', borderRadius: '12px',
                      fontSize: '12px', fontWeight: 600, whiteSpace: 'nowrap', marginLeft: '12px',
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}>
                      <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: s.dot }} />
                      {ticket.estado}
                    </div>
                  </div>
                  <div style={{ fontSize: '13px', color: '#6b7280', marginBottom: '12px' }}>{ticket.descripcion}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '11px', color: '#9ca3af' }}>{new Date(ticket.createdAt).toLocaleString('es-CL')}</span>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      {ESTADOS.map((estado) => {
                        if (estado === ticket.estado) return null;
                        const iconos: Record<string, any> = {
                          'Abierto': timeOutline,
                          'En Proceso': checkmarkDoneOutline,
                          'Cerrado': closeCircleOutline,
                        };
                        return (
                          <button key={estado} onClick={() => handleCambiarEstado(String(ticket.id), estado)}
                            style={{
                              background: 'none', border: '1px solid #d1d5db', borderRadius: '4px',
                              padding: '4px 10px', fontSize: '11px', fontWeight: 600, cursor: 'pointer',
                              display: 'flex', alignItems: 'center', gap: '4px', color: '#374151',
                              transition: 'background 0.1s',
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                          >
                            <IonIcon icon={iconos[estado]} style={{ fontSize: '12px' }} />
                            {estado}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default AdminTickets;
