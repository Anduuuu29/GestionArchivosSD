import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import {
  timeOutline,
  chevronDownOutline,
  chevronForwardOutline,
  documentTextOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  hourglassOutline,
  alertCircleOutline,
  folderOpenOutline,
  arrowForwardOutline,
} from 'ionicons/icons';
import UserLayout from '../../layouts/UserLayout';
import { useAuth } from '../../contexts/AuthContext';
import { misDocumentosService } from '../../services/mis-documentos.service';

/* ─────────── Types ─────────── */
interface DocFromApi {
  id: number;
  idExpediente: string;
  solicitante: string;
  tipo: string;
  asunto: string;
  estado: string;
  descripcion: string;
  createdAt: string;
  updatedAt: string;
}

/* ─────────── Status Config ─────────── */
const STATUS_STYLE: Record<string, { bg: string; text: string; border: string; dot: string; icon: string }> = {
  'Ingresado':          { bg: '#e0e7ff', text: '#3730a3', border: '#818cf8', dot: '#4f46e5', icon: documentTextOutline },
  'En Revisión':        { bg: '#dbeafe', text: '#1d4ed8', border: '#60a5fa', dot: '#1d4ed8', icon: hourglassOutline },
  'Aprobado':           { bg: '#dcfce7', text: '#166534', border: '#4ade80', dot: '#16a34a', icon: checkmarkCircleOutline },
  'Rechazado':          { bg: '#ffdad8', text: '#8e101d', border: '#f87171', dot: '#dc2626', icon: closeCircleOutline },
  'Urgente':            { bg: '#fff3cd', text: '#92400e', border: '#fbbf24', dot: '#d97706', icon: alertCircleOutline },
  'Terminado':          { bg: '#d1fae5', text: '#065f46', border: '#34d399', dot: '#047857', icon: checkmarkCircleOutline },
  'Pendiente de Firma': { bg: '#fef3c7', text: '#78350f', border: '#f59e0b', dot: '#b45309', icon: documentTextOutline },
};

const DEFAULT_STYLE = { bg: '#f3f4f6', text: '#374151', border: '#9ca3af', dot: '#6b7280', icon: documentTextOutline };

const getStyle = (estado: string) => STATUS_STYLE[estado] || DEFAULT_STYLE;

/* ─────────── Helpers ─────────── */
const timeAgo = (dateStr: string): string => {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Justo ahora';
  if (mins < 60) return `Hace ${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `Hace ${hrs}h`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return 'Ayer';
  return `Hace ${days} días`;
};

/* ─────────── Component ─────────── */
const DashboardUser: React.FC = () => {
  const history = useHistory();
  const { userName } = useAuth();
  const [documentos, setDocumentos] = useState<DocFromApi[]>([]);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = useCallback((i: number) => setOpenFaq(prev => prev === i ? null : i), []);

  useEffect(() => {
    misDocumentosService.getAll({ limit: 50 })
      .then(res => {
        const data = res.data.data || res.data || [];
        setDocumentos(data);
      })
      .catch(() => window.dispatchEvent(new CustomEvent('api-error', { detail: { message: 'Error al cargar documentos del dashboard' } })))
      .finally(() => setLoading(false));
  }, []);

  /* ─── Compute stats ─── */
  const statCards = useMemo(() => {
    const totalDocs = documentos.length;
    const countByEstado = documentos.reduce<Record<string, number>>((acc, doc) => {
      acc[doc.estado] = (acc[doc.estado] || 0) + 1;
      return acc;
    }, {});

    return [
      { label: 'Total', count: totalDocs,                          color: '#00518e', bg: '#e0f2fe' },
      { label: 'Ingresados', count: countByEstado['Ingresado'] || 0,   color: '#4f46e5', bg: '#e0e7ff' },
      { label: 'En Revisión', count: countByEstado['En Revisión'] || 0, color: '#1d4ed8', bg: '#dbeafe' },
      { label: 'Aprobados', count: countByEstado['Aprobado'] || 0,     color: '#16a34a', bg: '#dcfce7' },
      { label: 'Rechazados', count: countByEstado['Rechazado'] || 0,   color: '#dc2626', bg: '#ffdad8' },
    ];
  }, [documentos]);

  /* Recent docs (last 6) */
  const recentDocs = useMemo(() => [...documentos]
    .sort((a, b) => new Date(b.updatedAt || b.createdAt).getTime() - new Date(a.updatedAt || a.createdAt).getTime())
    .slice(0, 6), [documentos]);

  const faqs = [
    {
      q: '¿Cómo subo mi declaración de impuestos?',
      a: 'Ingrese a la sección Documentos, seleccione "Nuevo Trámite" y adjunte los archivos correspondientes.',
    },
    {
      q: '¿Cuánto demora el trámite de obra menor?',
      a: 'El trámite de obra menor tiene un plazo estimado de 15 a 30 días hábiles dependiendo de la documentación presentada.',
    },
    {
      q: '¿Dónde retiro mi certificado aprobado?',
      a: 'Una vez aprobado, recibirá una notificación y podrá descargarlo directamente desde la sección Documentos.',
    },
  ];

  const displayName = userName || 'Vecino';

  return (
    <UserLayout>
      <style>{`
        .dash-content {
          padding: 24px 28px 32px;
          display: flex;
          flex-direction: column;
          gap: 28px;
          font-family: 'Inter', 'Public Sans', sans-serif;
        }

        /* ── Hero ── */
        .dash-hero { display: flex; align-items: flex-start; gap: 6px; }
        .dash-hero-badge { color: #006fb3; font-weight: 900; font-size: 10px; letter-spacing: 2px; text-transform: uppercase; margin-top: 6px; }
        .dash-hero-title { font-size: 28px; font-weight: 900; color: #111; margin: 0; line-height: 1.15; letter-spacing: -0.5px; }
        .dash-hero-title span { color: #006fb3; }
        .dash-hero-sub { font-weight: 500; font-size: 13px; color: #6b7280; margin-top: 4px; }

        /* ── Stat counters ── */
        .dash-stats { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
        .dash-stat-card {
          border-radius: 12px; padding: 18px 16px; display: flex; flex-direction: column; gap: 4px;
          border: 1px solid rgba(0,0,0,0.06); transition: transform 0.15s, box-shadow 0.15s; cursor: default;
        }
        .dash-stat-card:hover { transform: translateY(-2px); box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
        .dash-stat-count { font-size: 32px; font-weight: 800; line-height: 1; }
        .dash-stat-label { font-size: 11px; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; opacity: 0.8; }

        /* ── Section header ── */
        .dash-section-header { display: flex; justify-content: space-between; align-items: center; }
        .dash-section-title { font-size: 10px; font-weight: 700; color: #006fb3; letter-spacing: 2px; text-transform: uppercase; margin: 0; }
        .dash-ver-todos {
          font-size: 11px; font-weight: 700; color: #006fb3; cursor: pointer; text-decoration: none;
          display: flex; align-items: center; gap: 4px; transition: gap 0.15s;
        }
        .dash-ver-todos:hover { gap: 8px; text-decoration: underline; }

        /* ── Document cards ── */
        .dash-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
        .dash-card {
          background: #fff; border-radius: 12px; min-height: 160px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.07); display: flex; flex-direction: column;
          padding: 18px; border-left: 4px solid transparent; transition: transform 0.15s, box-shadow 0.15s;
          cursor: pointer; position: relative; overflow: hidden;
        }
        .dash-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
        .dash-card-top { display: flex; justify-content: space-between; align-items: flex-start; width: 100%; }
        .dash-badge {
          padding: 3px 10px; border-radius: 9999px; font-size: 9px; font-weight: 700;
          letter-spacing: 0.5px; text-transform: uppercase; display: flex; align-items: center; gap: 5px;
        }
        .dash-badge ion-icon { font-size: 11px; }
        .dash-card-exp { font-size: 8px; font-weight: 700; color: #9ca3af; letter-spacing: 1.5px; text-transform: uppercase; }
        .dash-card-title { font-size: 14px; font-weight: 700; color: #111; margin: 12px 0 0; line-height: 1.4; flex: 1; }
        .dash-card-desc { font-size: 11px; color: #6b7280; margin-top: 4px; line-height: 1.4; overflow: hidden; text-overflow: ellipsis; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
        .dash-card-footer {
          border-top: 1px solid rgba(0,0,0,0.06); padding-top: 10px; margin-top: auto;
          display: flex; justify-content: space-between; align-items: center;
        }
        .dash-card-meta { display: flex; align-items: center; gap: 5px; font-size: 10px; color: #6b7280; font-weight: 500; }
        .dash-card-arrow { color: #006fb3; font-size: 16px; opacity: 0; transition: opacity 0.15s; }
        .dash-card:hover .dash-card-arrow { opacity: 1; }

        /* Empty state */
        .dash-empty {
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          padding: 48px 24px; background: #fafbfc; border-radius: 12px; border: 2px dashed #e0e4ea;
          gap: 12px; text-align: center;
        }
        .dash-empty-icon { font-size: 48px; color: #c1c7d3; }
        .dash-empty-title { font-size: 16px; font-weight: 700; color: #414751; }
        .dash-empty-text { font-size: 13px; color: #6b7280; max-width: 320px; }
        .dash-empty-btn {
          margin-top: 8px; background: #050d2c; color: #eee; border: none; border-radius: 8px;
          padding: 10px 20px; font-size: 12px; font-weight: 700; letter-spacing: 1px;
          text-transform: uppercase; cursor: pointer; transition: background 0.13s;
          display: flex; align-items: center; gap: 6px;
        }
        .dash-empty-btn:hover { background: #0a1a3e; }

        /* Loading skeleton */
        .dash-skeleton { background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; border-radius: 12px; min-height: 160px; }
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

        /* ── FAQ ── */
        .dash-faq { background: rgba(168,183,199,0.08); border: 1px solid #e0e4ea; border-radius: 12px; padding: 28px; max-width: 620px; }
        .dash-faq-title { font-size: 18px; font-weight: 700; color: #00518e; margin: 0 0 20px; }
        .dash-faq-list { display: flex; flex-direction: column; gap: 8px; }
        .dash-faq-item { background: #fff; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.05); overflow: hidden; }
        .dash-faq-trigger { width: 100%; padding: 14px 16px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; background: none; border: none; text-align: left; transition: background 0.15s; }
        .dash-faq-trigger:hover { background: #f9fafb; }
        .dash-faq-q { font-size: 13px; color: #121a34; font-weight: 500; }
        .dash-faq-chevron { color: #6b7280; flex-shrink: 0; transition: transform 0.25s ease; }
        .dash-faq-chevron.open { transform: rotate(180deg); }
        .dash-faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.3s ease, padding 0.3s ease; padding: 0 16px; font-size: 13px; color: #4b5563; line-height: 1.6; background: #fafbfc; border-top: 0px solid #e0e4ea; }
        .dash-faq-answer.open { max-height: 200px; padding: 14px 16px; border-top-width: 1px; }
      `}</style>

      <div className="dash-content">

        {/* ── Hero ── */}
        <div className="dash-hero">
          <span className="dash-hero-badge">i</span>
          <div>
            <h1 className="dash-hero-title">
              ¡Bienvenido, <span>{displayName}!</span>
            </h1>
            <p className="dash-hero-sub">Aquí puedes ver el resumen de tus trámites y documentos.</p>
          </div>
        </div>

        {/* ── Stat counters ── */}
        <div className="dash-stats">
          {statCards.map((s, i) => (
            <div
              key={i}
              className="dash-stat-card"
              style={{ background: s.bg, borderColor: s.color + '20' }}
            >
              <span className="dash-stat-count" style={{ color: s.color }}>{s.count}</span>
              <span className="dash-stat-label" style={{ color: s.color }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* ── Últimos trámites ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="dash-section-header">
            <h2 className="dash-section-title">Últimos Trámites</h2>
            <span className="dash-ver-todos" onClick={() => history.push('/usuario/documentos')}>
              Ver todos <IonIcon icon={chevronForwardOutline} />
            </span>
          </div>

          {loading ? (
            <div className="dash-cards">
              {[1, 2, 3].map(i => <div key={i} className="dash-skeleton" />)}
            </div>
          ) : recentDocs.length === 0 ? (
            <div className="dash-empty">
              <IonIcon icon={folderOpenOutline} className="dash-empty-icon" />
              <div className="dash-empty-title">No tienes trámites aún</div>
              <div className="dash-empty-text">Comienza ingresando tu primer documento o trámite municipal.</div>
              <button className="dash-empty-btn" onClick={() => history.push('/usuario/documentos/agregar')}>
                <IonIcon icon={documentTextOutline} /> Nuevo Trámite
              </button>
            </div>
          ) : (
            <div className="dash-cards">
              {recentDocs.map((doc) => {
                const st = getStyle(doc.estado);
                return (
                  <div
                    key={doc.id}
                    className="dash-card"
                    style={{ borderLeftColor: st.border }}
                    onClick={() => history.push('/usuario/documentos')}
                  >
                    <div className="dash-card-top">
                      <span className="dash-badge" style={{ background: st.bg, color: st.text }}>
                        <IonIcon icon={st.icon} />
                        {doc.estado}
                      </span>
                      <span className="dash-card-exp">{doc.idExpediente || `Exp. #${doc.id}`}</span>
                    </div>
                    <h3 className="dash-card-title">{doc.asunto || doc.tipo}</h3>
                    {doc.descripcion && (
                      <p className="dash-card-desc">{doc.descripcion}</p>
                    )}
                    <div className="dash-card-footer">
                      <div className="dash-card-meta">
                        <IonIcon icon={timeOutline} />
                        <span>{timeAgo(doc.updatedAt || doc.createdAt)}</span>
                      </div>
                      <IonIcon icon={arrowForwardOutline} className="dash-card-arrow" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* ── Preguntas Frecuentes ── */}
        <div className="dash-faq">
          <h2 className="dash-faq-title">Preguntas Frecuentes</h2>
          <div className="dash-faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className="dash-faq-item">
                <button className="dash-faq-trigger" onClick={() => toggleFaq(i)}>
                  <span className="dash-faq-q">{faq.q}</span>
                  <IonIcon icon={chevronDownOutline} className={`dash-faq-chevron${openFaq === i ? ' open' : ''}`} />
                </button>
                <div className={`dash-faq-answer${openFaq === i ? ' open' : ''}`}>
                  {faq.a}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </UserLayout>
  );
};

export default DashboardUser;
