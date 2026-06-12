import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { ticketOutline, chevronBackOutline, addOutline } from 'ionicons/icons';
import UserLayout from '../../layouts/UserLayout';
import { ticketsService } from '../../services/tickets.service';

interface Ticket {
  id: number;
  asunto: string;
  descripcion: string;
  estado: string;
  createdAt: string;
}

const ESTADO_STYLE: Record<string, { bg: string; text: string; dot: string }> = {
  'Abierto':    { bg: '#dbeafe', text: '#1d4ed8', dot: '#3b82f6' },
  'En Proceso': { bg: '#fef3c7', text: '#92400e', dot: '#f59e0b' },
  'Cerrado':    { bg: '#d1fae5', text: '#065f46', dot: '#10b981' },
};

const defaultStyle = { bg: '#f3f4f6', text: '#374151', dot: '#6b7280' };

const MisTickets: React.FC = () => {
  const history = useHistory();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await ticketsService.getAll();
        setTickets(res.data.data || []);
      } catch {
        window.dispatchEvent(new CustomEvent('api-error', { detail: { message: 'Error al cargar tickets' } }));
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const SkeletonCard = () => (
    <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        <div className="sk-cell sk-cell-lg" style={{ height: '15px', marginBottom: '8px' }} />
        <div className="sk-cell sk-cell-md" style={{ height: '12px' }} />
      </div>
      <div className="sk-cell sk-cell-sm" style={{ height: '22px', borderRadius: '12px', marginLeft: '12px' }} />
    </div>
  );

  const getStyle = (estado: string) => ESTADO_STYLE[estado] || defaultStyle;

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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="text-[#fe6565] font-['Inter',sans-serif] font-black text-[12px] tracking-widest uppercase">i</span>
            <h1 className="text-[#111] font-['Inter',sans-serif] font-extrabold text-4xl tracking-tight m-0">Mis Tickets</h1>
          </div>
          <button
            onClick={() => history.push('/abrir-ticket')}
            style={{
              background: '#050d2c', color: 'white', padding: '10px 20px',
              borderRadius: '4px', fontSize: '12px', fontWeight: 'bold',
              letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer',
              border: 'none', display: 'flex', alignItems: 'center', gap: '6px',
            }}
          >
            <IonIcon icon={addOutline} />
            Nuevo Ticket
          </button>
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
            <p>No tienes tickets abiertos</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tickets.map((ticket) => {
              const s = getStyle(ticket.estado);
              return (
                <div key={ticket.id} style={{
                  background: 'white', border: '1px solid #e5e7eb', borderRadius: '8px',
                  padding: '16px 20px', display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', cursor: 'pointer', transition: 'box-shadow 0.15s',
                }}
                  onClick={() => history.push(`/tickets/${ticket.id}`)}
                  onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'}
                  onMouseOut={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '15px', color: '#111', marginBottom: '4px' }}>{ticket.asunto}</div>
                    <div style={{ fontSize: '13px', color: '#6b7280', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ticket.descripcion}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '4px' }}>{new Date(ticket.createdAt).toLocaleDateString('es-CL')}</div>
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
              );
            })}
          </div>
        )}
      </div>
    </UserLayout>
  );
};

export default MisTickets;
