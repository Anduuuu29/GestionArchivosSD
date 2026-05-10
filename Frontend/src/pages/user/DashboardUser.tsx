import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import { timeOutline, chevronDownOutline } from 'ionicons/icons';
import UserLayout from '../../layouts/UserLayout';

const DashboardUser: React.FC = () => {
  const history = useHistory();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (i: number) => setOpenFaq(openFaq === i ? null : i);

  const faqs = [
    {
      q: '¿Cómo subo mi declaración de impuestos?',
      a: 'Bla bla bla, para subir su declaración debe ingresar a la sección Documentos, seleccionar "Nuevo Trámite" y adjuntar los archivos correspondientes. Bla bla bla lorem ipsum dolor sit amet.',
    },
    {
      q: '¿Cuánto demora el trámite de obra menor?',
      a: 'Bla bla bla, el trámite de obra menor tiene un plazo estimado de 15 a 30 días hábiles dependiendo de la documentación presentada. Bla bla bla lorem ipsum consectetur adipiscing elit.',
    },
    {
      q: '¿Dónde retiro mi certificado aprobado?',
      a: 'Bla bla bla, una vez aprobado su certificado recibirá una notificación y podrá descargarlo directamente desde la sección Documentos. Bla bla bla lorem ipsum sed do eiusmod tempor.',
    },
  ];

  return (
    <UserLayout>
      <style>{`
        .dash-content {
          padding: 24px 28px 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
          font-family: 'Inter', 'Public Sans', sans-serif;
        }

        /* ── Hero ── */
        .dash-hero {
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }
        .dash-hero-badge {
          color: #006fb3;
          font-weight: 900;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 6px;
        }
        .dash-hero-title {
          font-size: 28px;
          font-weight: 900;
          color: #111111;
          margin: 0;
          line-height: 1.15;
          letter-spacing: -0.5px;
        }
        .dash-hero-title span { color: #006fb3; }
        .dash-hero-sub {
          font-weight: 700;
          font-size: 9px;
          color: #111111;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-top: 6px;
        }

        /* ── Status Cards ── */
        .dash-section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
        }
        .dash-section-title {
          font-size: 10px;
          font-weight: 700;
          color: #006fb3;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin: 0;
        }
        .dash-ver-todos {
          font-size: 11px;
          font-weight: 700;
          color: #006fb3;
          cursor: pointer;
          text-decoration: none;
          transition: text-decoration 0.15s;
        }
        .dash-ver-todos:hover { text-decoration: underline; }

        .dash-cards {
          display: flex;
          gap: 16px;
          width: 100%;
        }

        .dash-card {
          background: #ffffff;
          border-radius: 8px;
          flex: 1;
          min-width: 0;
          min-height: 150px;
          box-shadow: 0 1px 6px rgba(0,0,0,0.07);
          display: flex;
          flex-direction: column;
          padding: 16px;
          border-left: 4px solid transparent;
        }
        .dash-card.approved { border-left-color: rgba(0,255,47,0.4); }
        .dash-card.pending  { border-left-color: rgba(168,183,199,0.5); }
        .dash-card.rejected { border-left-color: rgba(254,101,101,0.5); }

        .dash-card-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
        }
        .dash-badge {
          padding: 2px 7px;
          border-radius: 4px;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }
        .badge-approved { background: rgba(96,236,168,0.2); color: #00964d; }
        .badge-pending  { background: rgba(168,183,199,0.2); color: #5273bc; }
        .badge-rejected { background: rgba(254,101,101,0.1); color: #fe6565; }

        .dash-card-exp {
          font-size: 8px;
          font-weight: 700;
          color: #9ca3af;
          letter-spacing: 1.5px;
          text-transform: uppercase;
        }
        .dash-card-title {
          font-size: 13px;
          font-weight: 700;
          color: #111111;
          margin: 12px 0 0;
          line-height: 1.4;
          flex: 1;
        }
        .dash-card-footer {
          border-top: 1px solid rgba(0,0,0,0.06);
          padding-top: 10px;
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .dash-card-meta {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 10px;
          color: #6b7280;
          font-weight: 500;
        }

        /* ── FAQ ── */
        .dash-faq {
          background: rgba(168,183,199,0.08);
          border: 1px solid #e0e4ea;
          border-radius: 12px;
          padding: 32px;
          max-width: 620px;
        }
        .dash-faq-title {
          font-family: 'Public Sans', 'Inter', sans-serif;
          font-size: 22px;
          font-weight: 600;
          color: #00518e;
          margin: 0 0 24px;
        }
        .dash-faq-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .dash-faq-item {
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 1px 4px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .dash-faq-trigger {
          width: 100%;
          padding: 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          background: none;
          border: none;
          text-align: left;
          transition: background 0.15s;
        }
        .dash-faq-trigger:hover { background: #f9fafb; }
        .dash-faq-q {
          font-family: 'Public Sans', 'Inter', sans-serif;
          font-size: 14px;
          color: #121a34;
          font-weight: 500;
        }
        .dash-faq-chevron {
          color: #6b7280;
          flex-shrink: 0;
          transition: transform 0.25s ease;
        }
        .dash-faq-chevron.open {
          transform: rotate(180deg);
        }
        .dash-faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
          padding: 0 16px;
          font-family: 'Inter', sans-serif;
          font-size: 13px;
          color: #4b5563;
          line-height: 1.6;
          background: #fafbfc;
          border-top: 0px solid #e0e4ea;
        }
        .dash-faq-answer.open {
          max-height: 200px;
          padding: 14px 16px;
          border-top-width: 1px;
        }
      `}</style>

      <div className="dash-content">

        {/* ── Hero ── */}
        <div className="dash-hero">
          <span className="dash-hero-badge">i</span>
          <div>
            <h1 className="dash-hero-title">
              ¡Bienvenido, <span>Vecino!</span>
            </h1>
            <p className="dash-hero-sub">¿Qué consulta tienes hoy?</p>
          </div>
        </div>

        {/* ── Estado de mis trámites ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="dash-section-header">
            <h2 className="dash-section-title">Estado de mis trámites</h2>
            <span className="dash-ver-todos" onClick={() => history.push('/usuario/documentos')}>
              Ver todos
            </span>
          </div>

          <div className="dash-cards">
            {/* Card Aprobado */}
            <div className="dash-card approved">
              <div className="dash-card-top">
                <span className="dash-badge badge-approved">Aprobado</span>
                <span className="dash-card-exp">Exp. #2024-001</span>
              </div>
              <h3 className="dash-card-title">Permiso de Construcción</h3>
              <div className="dash-card-footer">
                <div className="dash-card-meta">Inicio: 20-12-2026</div>
                <div className="dash-card-meta">
                  <IonIcon icon={timeOutline} />
                  <span>Ultima actualizacion: Ayer</span>
                </div>
              </div>
            </div>

            {/* Card Pendiente */}
            <div className="dash-card pending">
              <div className="dash-card-top">
                <span className="dash-badge badge-pending">Pendiente</span>
                <span className="dash-card-exp">Exp. #2024-001</span>
              </div>
              <h3 className="dash-card-title">Permiso de Construcción</h3>
              <div className="dash-card-footer">
                <div className="dash-card-meta">Inicio: 20-12-2026</div>
                <div className="dash-card-meta">
                  <IonIcon icon={timeOutline} />
                  <span>Ultima actualizacion</span>
                </div>
              </div>
            </div>

            {/* Card Rechazado */}
            <div className="dash-card rejected">
              <div className="dash-card-top">
                <span className="dash-badge badge-rejected">Rechazado</span>
                <span className="dash-card-exp">Exp. #2024-001</span>
              </div>
              <h3 className="dash-card-title">Permiso de Construcción</h3>
              <div className="dash-card-footer">
                <div className="dash-card-meta">Inicio: 20-12-2026</div>
                <div className="dash-card-meta">
                  <IonIcon icon={timeOutline} />
                  <span>Ultima actualizacion</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Preguntas Frecuentes ── */}
        <div className="dash-faq">
          <h2 className="dash-faq-title">Preguntas Frecuentes</h2>
          <div className="dash-faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className="dash-faq-item">
                <button
                  className="dash-faq-trigger"
                  onClick={() => toggleFaq(i)}
                >
                  <span className="dash-faq-q">{faq.q}</span>
                  <IonIcon
                    icon={chevronDownOutline}
                    className={`dash-faq-chevron${openFaq === i ? ' open' : ''}`}
                  />
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
