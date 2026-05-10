import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import {
  addOutline,
  eyeOutline,
  closeOutline,
  chevronBackOutline,
  chevronForwardOutline,
  documentTextOutline,
  checkmarkCircleOutline,
  closeCircleOutline,
  hourglassOutline,
  downloadOutline,
  createOutline,
  copyOutline,
  printOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';

/* ─────────── Types ─────────── */
type EstadoDoc = 'En Revisión' | 'Rechazado' | 'Aprobado' | 'Ingresado';

interface Documento {
  id: string;
  solicitante: string;
  rut: string;
  tipo: string;
  fecha: string;
  hora: string;
  estado: EstadoDoc;
  descripcion: string;
  archivos: string[];
  motivoRechazo?: string;
}

/* ─────────── Mock data ─────────── */
const DOCS: Documento[] = [
  {
    id: 'EXP-2024-0892',
    solicitante: 'USER',
    rut: '12.345.678-9',
    tipo: 'Permiso Edificación',
    fecha: '12 Oct 2023',
    hora: '09:45',
    estado: 'En Revisión',
    descripcion: 'Solicitud de permiso de edificación para construcción de vivienda unifamiliar en Av. Principal 123.',
    archivos: ['planos_arquitectura.pdf', 'memoria_calculo.pdf', 'certificado_titulo.pdf'],
  },
  {
    id: 'EXP-2024-0893',
    solicitante: 'USER',
    rut: '12.345.678-9',
    tipo: 'Recepción Final',
    fecha: '12 Oct 2023',
    hora: '10:20',
    estado: 'Rechazado',
    descripcion: 'Solicitud de recepción final de obra edificio comercial en Calle Los Aromos 45.',
    archivos: ['informe_final.pdf', 'fotografias_obra.pdf'],
    motivoRechazo: 'Documentación incompleta: falta certificado de instalaciones eléctricas y acta de bomberos.',
  },
  {
    id: 'EXP-2024-0894',
    solicitante: 'USER',
    rut: '12.345.678-9',
    tipo: 'Modificación Planos',
    fecha: '12 Oct 2023',
    hora: '11:05',
    estado: 'Aprobado',
    descripcion: 'Modificación de planos aprobados para redistribución interior de local comercial.',
    archivos: ['planos_modificacion.pdf', 'informe_estructural.pdf'],
  },
  {
    id: 'EXP-2024-0895',
    solicitante: 'USER',
    rut: '12.345.678-9',
    tipo: 'Obra Menor',
    fecha: '13 Oct 2023',
    hora: '08:30',
    estado: 'Ingresado',
    descripcion: 'Ampliación de vivienda existente: construcción de dormitorio adicional.',
    archivos: ['croquis_ampliacion.pdf'],
  },
  {
    id: 'EXP-2024-0896',
    solicitante: 'USER',
    rut: '12.345.678-9',
    tipo: 'Permiso Edificación',
    fecha: '13 Oct 2023',
    hora: '14:15',
    estado: 'En Revisión',
    descripcion: 'Construcción de bodega industrial en zona norte del parque industrial.',
    archivos: ['planos_bodega.pdf', 'informe_suelo.pdf', 'permiso_ambiental.pdf'],
  },
];

/* ─────────── Status badge config ─────────── */
const STATUS_CONFIG: Record<EstadoDoc, { bg: string; dot: string; text: string; label: string }> = {
  'En Revisión': { bg: '#dbeafe', dot: '#1d4ed8', text: '#1d4ed8', label: 'En Revisión' },
  'Rechazado':   { bg: '#ffdad8', dot: '#9a1b24', text: '#8e101d', label: 'Rechazado' },
  'Aprobado':    { bg: '#dcfce7', dot: '#166534', text: '#166534', label: 'Aprobado' },
  'Ingresado':   { bg: '#e0e7ff', dot: '#4f46e5', text: '#3730a3', label: 'Ingresado' },
};

const STATUS_ICON: Record<EstadoDoc, string> = {
  'En Revisión': hourglassOutline,
  'Rechazado':   closeCircleOutline,
  'Aprobado':    checkmarkCircleOutline,
  'Ingresado':   documentTextOutline,
};

/* ─────────── Component ─────────── */
const DocumentosUser: React.FC = () => {
  const history = useHistory();
  const [selected, setSelected] = useState<Documento | null>(null);
  const [viewing, setViewing] = useState(false);

  useEffect(() => {
    const handleReset = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail === '/usuario/documentos') {
        setViewing(false);
        setSelected(null);
      }
    };
    window.addEventListener('reset-page', handleReset);
    return () => window.removeEventListener('reset-page', handleReset);
  }, []);

  return (
    <UserLayout>
      <style>{`
        /* ── Page wrapper ── */
        .du-page { padding: 24px 28px 32px; display: flex; flex-direction: column; gap: 20px; font-family: 'Inter', sans-serif; height: 100%; }

        /* ── Header ── */
        .du-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .du-title-wrap { display: flex; align-items: flex-start; gap: 6px; }
        .du-title-dot { color: #fe6565; font-weight: 900; font-size: 10px; letter-spacing: 2px; margin-top: 6px; }
        .du-title { font-size: 28px; font-weight: 900; color: #111; letter-spacing: -0.5px; margin: 0; line-height: 1.15; }
        .du-btn-add {
          display: flex; align-items: center; gap: 6px;
          background: #050d2c; color: #eee; border: none; border-radius: 6px;
          padding: 9px 16px; font-size: 11px; font-weight: 700; letter-spacing: 1.2px;
          text-transform: uppercase; cursor: pointer; transition: background .13s;
        }
        .du-btn-add:hover { background: #0a1a3e; }
        .du-btn-add ion-icon { font-size: 14px; }

        /* ── Table card ── */
        .du-table-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 1px 6px rgba(0,0,0,0.06); overflow: hidden; display: flex; flex-direction: column; }
        .du-table-wrap { overflow-x: auto; }
        table.du-table { width: 100%; border-collapse: collapse; min-width: 720px; }
        .du-table thead { background: #ebedff; border-bottom: 1px solid rgba(193,199,211,0.3); }
        .du-table th { padding: 14px 20px; font-size: 12px; font-weight: 600; color: #414751; text-align: left; white-space: nowrap; }
        .du-table th:last-child { text-align: center; }
        .du-table tbody tr { border-bottom: 1px solid #f3f4f6; transition: background .13s; }
        .du-table tbody tr:last-child { border-bottom: none; }
        .du-table tbody tr:hover { background: #f8faff; }
        .du-table td { padding: 14px 20px; font-size: 13px; color: #414751; vertical-align: middle; }
        .du-table td:last-child { text-align: center; }

        /* id cell */
        .du-id-cell { display: flex; align-items: center; gap: 10px; }
        .du-id-bar { width: 3px; height: 28px; border-radius: 2px; flex-shrink: 0; }
        .du-id-text { font-size: 12px; color: #00518e; font-weight: 500; line-height: 1.4; }

        /* tipo pill */
        .du-tipo { display: inline-block; background: #e5e7eb; color: #5f6161; font-size: 10px; font-weight: 600; padding: 3px 8px; border-radius: 4px; white-space: nowrap; }

        /* status badge */
        .du-badge { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 9999px; }
        .du-badge-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .du-badge-label { font-size: 10px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; }

        /* eye btn */
        .du-eye-btn { background: none; border: none; color: #00518e; cursor: pointer; padding: 6px; border-radius: 6px; display: inline-flex; align-items: center; transition: background .13s; }
        .du-eye-btn:hover { background: #f0f4ff; }
        .du-eye-btn ion-icon { font-size: 18px; }

        /* ── Pagination ── */
        .du-pagination { background: #f2f3ff; border-top: 1px solid #e5e7eb; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #414751; }
        .du-pag-btns { display: flex; align-items: center; gap: 4px; }
        .du-pag-btn { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border: none; border-radius: 6px; cursor: pointer; font-size: 12px; font-weight: 600; background: none; color: #414751; transition: background .13s; }
        .du-pag-btn:hover:not(:disabled) { background: #e0e4f0; }
        .du-pag-btn:disabled { color: #c0c6d0; cursor: default; }
        .du-pag-btn.active { background: #00518e; color: #fff; }
        .du-pag-icon ion-icon { font-size: 16px; }

        /* ── MODAL OVERLAY ── */
        .du-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.45);
          display: flex; align-items: center; justify-content: flex-end;
          z-index: 9999; animation: du-fade-in 0.2s ease;
        }
        @keyframes du-fade-in { from { opacity: 0; } to { opacity: 1; } }

        .du-modal {
          width: 440px; max-width: 95vw; height: 100vh;
          background: #fff; display: flex; flex-direction: column;
          box-shadow: -8px 0 40px rgba(0,0,0,0.18);
          animation: du-slide-in 0.25s ease;
          border-left: 1px solid rgba(193,199,211,0.3);
        }
        @keyframes du-slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }

        /* modal header (match 220-704) */
        .du-modal-header {
          background: #f2f3ff; padding: 24px;
          display: flex; align-items: flex-start; justify-content: space-between;
          border-bottom: 1px solid rgba(193,199,211,0.2);
          flex-shrink: 0;
        }
        .du-modal-header-left { display: flex; flex-direction: column; gap: 4px; }
        .du-modal-exp-title { font-size: 10px; font-weight: 700; color: #00518e; letter-spacing: 1px; text-transform: uppercase; font-family: 'Public Sans', sans-serif; }
        .du-modal-exp-val { font-size: 24px; font-weight: 600; color: #121a34; font-family: 'Public Sans', sans-serif; }
        .du-modal-close { background: none; border: none; color: #414751; cursor: pointer; padding: 8px; border-radius: 50%; display: flex; align-items: center; transition: background .13s; margin-top: -4px; margin-right: -8px; }
        .du-modal-close:hover { background: rgba(0,0,0,0.05); color: #111; }
        .du-modal-close ion-icon { font-size: 24px; }

        /* modal body */
        .du-modal-body { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 32px; }

        /* info card */
        .du-modal-info-card { display: flex; flex-direction: column; gap: 16px; }
        .du-modal-info-header { display: flex; justify-content: space-between; align-items: center; }
        .du-modal-info-title { font-size: 14px; font-weight: 600; color: #414751; font-family: 'Public Sans', sans-serif; }
        .du-modal-status-badge { display: inline-flex; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; font-family: 'Public Sans', sans-serif; }
        .du-modal-info-box { background: #fff; border: 1px solid rgba(193,199,211,0.3); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; }
        .du-modal-info-row { display: flex; justify-content: space-between; align-items: flex-start; }
        .du-modal-info-lbl { font-size: 12px; font-weight: 500; color: #414751; font-family: 'Public Sans', sans-serif; }
        .du-modal-info-val { font-size: 16px; color: #121a34; font-family: 'Public Sans', sans-serif; text-align: right; }

        /* section title */
        .du-modal-section-title { font-size: 16px; font-weight: 400; color: #121a34; letter-spacing: 0.8px; text-transform: uppercase; font-family: 'Public Sans', sans-serif; }

        /* timeline */
        .du-modal-tl { display: flex; flex-direction: column; gap: 24px; position: relative; padding-left: 24px; }
        .du-modal-tl::before { content: ''; position: absolute; left: 13px; top: 8px; bottom: 8px; width: 2px; background: rgba(193,199,211,0.3); }
        .du-modal-tl-item { position: relative; display: flex; flex-direction: column; }
        .du-modal-tl-dot { position: absolute; left: -24px; top: 4px; width: 12px; height: 12px; border-radius: 50%; background: #c1c7d3; }
        .du-modal-tl-dot.active { background: #00518e; box-shadow: 0 0 0 4px rgba(15,105,180,0.2); }
        .du-modal-tl-lbl { font-size: 16px; color: #121a34; font-family: 'Public Sans', sans-serif; }
        .du-modal-tl-sub { font-size: 12px; font-weight: 500; color: #414751; font-family: 'Public Sans', sans-serif; margin-top: 2px; }

        /* files */
        .du-modal-files-head { display: flex; justify-content: space-between; align-items: center; }
        .du-modal-files-list { display: flex; flex-direction: column; gap: 8px; }
        .du-modal-file { background: #fff; border: 1px solid rgba(193,199,211,0.2); border-radius: 8px; padding: 12px; display: flex; gap: 16px; align-items: center; }
        .du-modal-file-icon { width: 40px; height: 40px; background: #fef2f2; border-radius: 4px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .du-modal-file-icon ion-icon { font-size: 20px; color: #ef4444; }
        .du-modal-file-icon.img { background: #eff6ff; }
        .du-modal-file-icon.img ion-icon { color: #3b82f6; }
        .du-modal-file-info { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .du-modal-file-name { font-size: 16px; color: #121a34; font-family: 'Public Sans', sans-serif; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .du-modal-file-meta { font-size: 10px; color: #414751; font-family: 'Public Sans', sans-serif; }
        .du-modal-dl-btn { background: none; border: none; color: #414751; cursor: pointer; padding: 4px; border-radius: 4px; transition: color .13s; }
        .du-modal-dl-btn:hover { color: #111; }
        .du-modal-dl-btn ion-icon { font-size: 20px; }

        /* footer */
        .du-modal-footer { padding: 24px; border-top: 1px solid rgba(193,199,211,0.3); display: grid; grid-template-columns: 1fr; gap: 16px; flex-shrink: 0; }
        .du-modal-btn-observar { background: #fff; border: 1px solid #717782; border-radius: 12px; padding: 12px 24px; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 16px; color: #121a34; font-family: 'Public Sans', sans-serif; cursor: pointer; transition: background .13s; }
        .du-modal-btn-observar:hover { background: #f5f5f5; }

        /* ── DOCUMENT VIEWER ── */
        .du-viewer-container { height: 100%; display: flex; flex-direction: column; background: #fff; animation: du-fade-in 0.2s ease; overflow: hidden; }
        .du-viewer-toolbar { background: #fff; border-bottom: 1px solid rgba(193,199,211,0.3); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; }
        .du-viewer-toolbar-left { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #121a34; font-family: 'Public Sans', sans-serif; }
        .du-viewer-toolbar-right { display: flex; align-items: center; gap: 4px; }
        .du-viewer-tbtn { display: flex; align-items: center; gap: 6px; padding: 8px 12px; border: none; background: none; cursor: pointer; border-radius: 8px; font-size: 12px; color: #414751; font-family: 'Public Sans', sans-serif; transition: background .13s; }
        .du-viewer-tbtn:hover { background: #f0f4ff; }
        .du-viewer-tbtn ion-icon { font-size: 16px; }
        .du-viewer-divider { width: 1px; height: 24px; background: #c1c7d3; margin: 0 4px; }
        .du-viewer-body { flex: 1; display: flex; min-height: 0; overflow: hidden; }
        .du-viewer-preview { flex: 1; overflow-y: auto; display: flex; align-items: flex-start; justify-content: center; padding: 48px; background-image: linear-gradient(90deg, rgba(168,183,199,0) 0%, rgba(168,183,199,0) 100%), linear-gradient(90deg, rgb(255,255,255) 0%, rgb(255,255,255) 100%); }
        .du-viewer-paper { background: #fff; border: 1px solid rgba(193,199,211,0.2); border-radius: 2px; box-shadow: 0 4px 20px rgba(10,19,45,0.08); width: 100%; max-width: 896px; min-height: 1100px; padding: 97px; position: relative; display: flex; flex-direction: column; gap: 64px; }
        .du-viewer-paper-stripe { position: absolute; left: 0; top: 0; bottom: 0; width: 8px; background: rgba(0,81,142,0.8); border-radius: 2px 0 0 2px; }
        .du-viewer-aside { width: 330px; flex-shrink: 0; border-left: 1px solid rgba(193,199,211,0.3); background: #fff; overflow-y: auto; display: flex; flex-direction: column; }
        .du-viewer-aside-head { padding: 24px; border-bottom: 1px solid rgba(193,199,211,0.3); }
        .du-aside-title { font-size: 14px; font-weight: 700; color: #00518e; letter-spacing: 0.7px; text-transform: uppercase; font-family: 'Public Sans', sans-serif; }
        .du-aside-subtitle { font-size: 12px; font-weight: 500; color: #414751; margin-top: 4px; font-family: 'Public Sans', sans-serif; }
        .du-viewer-aside-body { padding: 24px; display: flex; flex-direction: column; gap: 24px; flex: 1; }
        .du-aside-id-box { background: #f2f3ff; border: 1px solid rgba(193,199,211,0.2); border-radius: 8px; padding: 13px; display: flex; align-items: center; justify-content: space-between; }
        .du-aside-id-val { font-size: 16px; font-weight: 700; color: #00518e; font-family: 'Liberation Mono', monospace; }
        .du-aside-field { display: flex; flex-direction: column; gap: 4px; }
        .du-aside-field-lbl { font-size: 12px; font-weight: 700; color: #414751; text-transform: uppercase; font-family: 'Public Sans', sans-serif; }
        .du-aside-field-val { font-size: 16px; color: #121a34; font-family: 'Public Sans', sans-serif; }
        .du-aside-field-sub { font-size: 12px; font-weight: 500; color: #414751; font-family: 'Public Sans', sans-serif; }
        .du-aside-badge { display: inline-flex; padding: 4px 10px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; font-family: 'Public Sans', sans-serif; }
        .du-aside-sep { border: none; border-top: 1px solid rgba(193,199,211,0.3); }
        .du-aside-hist-title { font-size: 14px; font-weight: 700; color: #121a34; letter-spacing: 0.14px; margin-bottom: 16px; font-family: 'Public Sans', sans-serif; }
        .du-aside-tl { display: flex; flex-direction: column; gap: 16px; position: relative; padding-left: 24px; }
        .du-aside-tl::before { content: ''; position: absolute; left: 11px; top: 12px; bottom: 12px; width: 1px; background: rgba(193,199,211,0.3); }
        .du-aside-tl-item { position: relative; display: flex; flex-direction: column; gap: 2px; }
        .du-aside-tl-dot-wrap { position: absolute; left: -24px; top: 2px; width: 16px; height: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
        .du-aside-tl-dot-inner { width: 6px; height: 6px; background: #fff; border-radius: 50%; }
        .du-aside-tl-dot-wrap.active { background: #00518e; box-shadow: 0 0 0 4px #fff; }
        .du-aside-tl-dot-wrap.inactive { background: #c1c7d3; box-shadow: 0 0 0 4px #fff; }
        .du-aside-tl-label { font-size: 12px; font-weight: 700; color: #121a34; font-family: 'Public Sans', sans-serif; }
        .du-aside-tl-date { font-size: 11px; color: #414751; font-family: 'Public Sans', sans-serif; }
        
        .du-aside-btn-trace { margin-top: 16px; border: 2px solid #00518e; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 8px; height: 44px; color: #00518e; font-size: 16px; font-weight: 700; font-family: 'Public Sans', sans-serif; cursor: pointer; background: transparent; transition: background .13s; }
        .du-aside-btn-trace:hover { background: #f2f3ff; }
      `}</style>

      {!viewing ? (
        <div className="du-page">
          {/* ── Header ── */}
          <div className="du-header">
            <div className="du-title-wrap">
              <span className="du-title-dot">i</span>
              <h1 className="du-title">Documentos</h1>
            </div>
            <button className="du-btn-add" onClick={() => history.push('/usuario/documentos/agregar')}>
              <IonIcon icon={addOutline} />
              Agregar
            </button>
          </div>

          {/* ── Table ── */}
          <div className="du-table-card">
            <div className="du-table-wrap">
              <table className="du-table">
                <thead>
                  <tr>
                    <th>ID Expediente</th>
                    <th>Solicitante</th>
                    <th>Tipo de Trámite</th>
                    <th>Fecha Ingreso</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {DOCS.map((doc) => {
                    const sc = STATUS_CONFIG[doc.estado];
                    const barColor = doc.estado === 'En Revisión' ? '#00518e'
                      : doc.estado === 'Aprobado' ? '#166534'
                      : doc.estado === 'Rechazado' ? '#9a1b24'
                      : '#9ca3af';
                    return (
                      <tr key={doc.id}>
                        {/* ID */}
                        <td>
                          <div className="du-id-cell">
                            <div className="du-id-bar" style={{ background: barColor }} />
                            <div className="du-id-text">
                              <div>#{doc.id.split('-').slice(0,2).join('-')}-</div>
                              <div>{doc.id.split('-')[2]}</div>
                            </div>
                          </div>
                        </td>
                        {/* Solicitante */}
                        <td>
                          <div style={{ fontWeight: 600, color: '#121a34', fontSize: 13 }}>{doc.solicitante}</div>
                          {doc.rut && <div style={{ fontSize: 11, color: '#6b7280' }}>{doc.rut}</div>}
                        </td>
                        {/* Tipo */}
                        <td><span className="du-tipo">{doc.tipo}</span></td>
                        {/* Fecha */}
                        <td>
                          <div style={{ fontSize: 12 }}>{doc.fecha}</div>
                          <div style={{ fontSize: 11, color: '#9ca3af' }}>{doc.hora}</div>
                        </td>
                        {/* Estado */}
                        <td>
                          <span className="du-badge" style={{ background: sc.bg }}>
                            <span className="du-badge-dot" style={{ background: sc.dot }} />
                            <span className="du-badge-label" style={{ color: sc.text }}>{sc.label}</span>
                          </span>
                        </td>
                        {/* Acción */}
                        <td>
                          <button className="du-eye-btn" onClick={() => setSelected(doc)} title="Ver detalle">
                            <IonIcon icon={eyeOutline} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="du-pagination">
              <span>Mostrando 1-5 de {DOCS.length} expedientes</span>
              <div className="du-pag-btns">
                <button className="du-pag-btn du-pag-icon" disabled><IonIcon icon={chevronBackOutline} /></button>
                <button className="du-pag-btn active">1</button>
                <button className="du-pag-btn">2</button>
                <button className="du-pag-btn">3</button>
                <span style={{ padding: '0 6px', color: '#9ca3af' }}>...</span>
                <button className="du-pag-btn">13</button>
                <button className="du-pag-btn du-pag-icon"><IonIcon icon={chevronForwardOutline} /></button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        selected && (
          <div className="du-viewer-container">
            {/* Toolbar */}
            <div className="du-viewer-toolbar">
              <div className="du-viewer-toolbar-left">
                <IonIcon icon={documentTextOutline} style={{ fontSize: 20, color: '#00518e' }} />
                {selected.archivos[0] || 'Memorándum_2023_0452_MuniSD.pdf'}
              </div>
              <div className="du-viewer-toolbar-right">
                <button className="du-viewer-tbtn"><IonIcon icon={downloadOutline} />Descargar</button>
                <button className="du-viewer-tbtn"><IonIcon icon={printOutline} />Imprimir</button>
                <div className="du-viewer-divider" />
                <button className="du-viewer-tbtn" onClick={() => { setViewing(false); setSelected(null); }}>
                  <IonIcon icon={closeOutline} style={{ fontSize: 14 }} />
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="du-viewer-body">

              {/* Preview PDF */}
              <div className="du-viewer-preview">
                <div className="du-viewer-paper">
                  <div className="du-viewer-paper-stripe" />

                  {/* Letterhead */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 64 }}>
                      <div style={{ width: 64, height: 64, background: '#ebedff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IonIcon icon={documentTextOutline} style={{ fontSize: 25, color: '#00518e' }} />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#414751', letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Public Sans', marginTop: 8 }}>MUNICIPALIDAD</span>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#414751', letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Public Sans' }}>SANTO DOMINGO</span>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 4 }}>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#00518e', fontFamily: 'Public Sans' }}>MEMORÁNDUM N° {selected.id.split('-').pop()}</div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: '#414751', fontFamily: 'Public Sans' }}>Santo Domingo, {selected.fecha}</div>
                    </div>
                  </div>

                  {/* Datos */}
                  <div style={{ borderBottom: '1px solid rgba(193,199,211,0.3)', paddingBottom: 17, display: 'grid', gridTemplateColumns: '100px 1fr', rowGap: 0, columnGap: 8 }}>
                    <div style={{ paddingBottom: 24 }}>
                      <span style={{ fontWeight: 700, color: '#414751', fontSize: 16, fontFamily: 'Public Sans' }}>DE:</span>
                    </div>
                    <div>
                      <span style={{ color: '#121a34', fontSize: 16, fontFamily: 'Public Sans' }}>Dirección de Obras Municipales</span>
                    </div>
                    <div style={{ paddingBottom: 24 }}>
                      <span style={{ fontWeight: 700, color: '#414751', fontSize: 16, fontFamily: 'Public Sans' }}>PARA:</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: '#121a34', fontSize: 16, fontFamily: 'Public Sans' }}>Secretaría Comunal de Planificación</span>
                      <span style={{ color: '#121a34', fontSize: 16, fontFamily: 'Public Sans' }}>(SECPLA)</span>
                    </div>
                    <div style={{ paddingBottom: 24 }}>
                      <span style={{ fontWeight: 700, color: '#414751', fontSize: 16, fontFamily: 'Public Sans' }}>MATERIA:</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 700, color: '#121a34', fontSize: 16, fontFamily: 'Public Sans' }}>{selected.tipo}</span>
                      <span style={{ fontWeight: 700, color: '#121a34', fontSize: 16, fontFamily: 'Public Sans' }}>{selected.descripcion.substring(0, 50)}...</span>
                    </div>
                  </div>

                  {/* Cuerpo */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <p style={{ fontSize: 16, color: '#121a34', fontFamily: 'Public Sans', lineHeight: '26px', margin: 0 }}>Estimados junto con saludar,</p>
                    <p style={{ fontSize: 16, color: '#121a34', fontFamily: 'Public Sans', lineHeight: '26px', margin: 0 }}>Por medio del presente, se remite para su revisión y análisis técnico la carpeta correspondiente al proyecto. Se adjuntan los planos de especialidades y el presupuesto estimado para la etapa de licitación pública.</p>
                    <p style={{ fontSize: 16, color: '#121a34', fontFamily: 'Public Sans', lineHeight: '26px', margin: 0 }}>Se requiere una respuesta formal en un plazo no mayor a 5 días hábiles para proceder con los plazos establecidos en el cronograma anual de obras públicas comunales.</p>
                    <p style={{ fontSize: 16, color: '#121a34', fontFamily: 'Public Sans', lineHeight: '26px', margin: 0 }}>Sin otro particular, saluda atentamente,</p>
                  </div>

                  {/* Footer doc */}
                  <div style={{ borderTop: '1px solid rgba(193,199,211,0.3)', paddingTop: 65, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ width: 192, height: 96, background: 'rgba(242,243,255,0.5)', border: '1px dashed #c1c7d3', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: 12, color: '#717782', fontStyle: 'italic', fontWeight: 500, fontFamily: 'Public Sans' }}>Timbre de Recepción</span>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ width: 192, borderBottom: '1px solid #121a34', paddingBottom: 8, fontWeight: 700, color: '#121a34', fontSize: 16, fontFamily: 'Public Sans', paddingTop: 8 }}>DIRECCIÓN DE OBRAS</div>
                      <div style={{ fontSize: 12, fontWeight: 500, color: '#414751', fontFamily: 'Public Sans', marginTop: 4 }}>I. Municipalidad de Santo Domingo</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'center', position: 'absolute', bottom: 32, left: 0, right: 0, fontSize: 12, fontWeight: 500, color: '#717782', fontFamily: 'Public Sans' }}>Página 1 de 1</div>
                </div>
              </div>

              {/* Aside metadata */}
              <div className="du-viewer-aside">
                <div className="du-viewer-aside-head">
                  <div className="du-aside-title">Detalles del Documento</div>
                  <div className="du-aside-subtitle">Información de trazabilidad administrativa</div>
                </div>
                <div className="du-viewer-aside-body">

                  {/* ID */}
                  <div>
                    <div className="du-aside-field-lbl" style={{ marginBottom: 8 }}>ID SISTEMA</div>
                    <div className="du-aside-id-box">
                      <span className="du-aside-id-val">SGD-{selected.id.split('-')[1]}-{selected.id.split('-')[2]}-DOM</span>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#00518e' }}>
                        <IonIcon icon={copyOutline} style={{ fontSize: 15 }} />
                      </button>
                    </div>
                  </div>

                  {/* Grid fields */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16 }}>
                    <div className="du-aside-field">
                      <div className="du-aside-field-lbl">Tipo de Documento</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#00518e', flexShrink: 0 }} />
                        <span className="du-aside-field-val">Memorándum Interno</span>
                      </div>
                    </div>

                    <div className="du-aside-field">
                      <div className="du-aside-field-lbl">Fecha de Ingreso</div>
                      <span className="du-aside-field-val">{selected.fecha}, {selected.hora}</span>
                    </div>

                    <div className="du-aside-field">
                      <div className="du-aside-field-lbl">Autor / Emisor</div>
                      <span className="du-aside-field-val">{selected.solicitante}</span>
                      <span className="du-aside-field-sub">Dir. Obras Municipales</span>
                    </div>

                    <div className="du-aside-field">
                      <div className="du-aside-field-lbl">Estado Actual</div>
                      {(() => { const sc = STATUS_CONFIG[selected.estado]; return (
                        <span className="du-aside-badge" style={{ background: sc.bg, color: sc.text }}>{sc.label}</span>
                      ); })()}
                    </div>
                  </div>

                  <hr className="du-aside-sep" />

                  {/* Historial */}
                  <div>
                    <div className="du-aside-hist-title">Historial de Acciones</div>
                    <div className="du-aside-tl">
                      <div className="du-aside-tl-item">
                        <div className="du-aside-tl-dot-wrap active">
                          <div className="du-aside-tl-dot-inner" />
                        </div>
                        <div className="du-aside-tl-label">Creado por {selected.solicitante}</div>
                        <div className="du-aside-tl-date">Hoy, {selected.hora}</div>
                      </div>
                      <div className="du-aside-tl-item">
                        <div className="du-aside-tl-dot-wrap inactive">
                          <div className="du-aside-tl-dot-inner" />
                        </div>
                        <div className="du-aside-tl-label" style={{ color: '#414751' }}>Enviado a revisión técnica</div>
                        <div className="du-aside-tl-date">Próximo paso</div>
                      </div>
                    </div>
                    
                    <button className="du-aside-btn-trace">
                      <IonIcon icon={eyeOutline} />
                      Ver Trazabilidad Completa
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </div>
        )
      )}

      {/* ══════════════════ MODAL LATERAL ══════════════════ */}
      {selected && !viewing && (
        <div className="du-overlay" onClick={() => setSelected(null)}>
          <div className="du-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header del modal */}
            <div className="du-modal-header">
              <div className="du-modal-header-left">
                <span className="du-modal-exp-title">DETALLES DE EXPEDIENTE</span>
                <span className="du-modal-exp-val">#{selected.id}</span>
              </div>
              <button className="du-modal-close" onClick={() => setSelected(null)}>
                <IonIcon icon={closeOutline} />
              </button>
            </div>

            {/* Body */}
            <div className="du-modal-body">

              {/* Status & Info Card */}
              <div className="du-modal-info-card">
                <div className="du-modal-info-header">
                  <span className="du-modal-info-title">Estado Actual</span>
                  {(() => { const sc = STATUS_CONFIG[selected.estado]; return (
                    <span className="du-modal-status-badge" style={{ background: sc.bg, color: sc.text }}>{sc.label}</span>
                  ); })()}
                </div>
                <div className="du-modal-info-box">
                  <div className="du-modal-info-row">
                    <span className="du-modal-info-lbl">Solicitante:</span>
                    <span className="du-modal-info-val">{selected.solicitante}</span>
                  </div>
                  <div className="du-modal-info-row">
                    <span className="du-modal-info-lbl">Dirección:</span>
                    <span className="du-modal-info-val">Av. Costanera 1420, Santo Domingo</span>
                  </div>
                  <div className="du-modal-info-row">
                    <span className="du-modal-info-lbl">Asignado a:</span>
                    <span className="du-modal-info-val">Dpto. Obras Municipales</span>
                  </div>
                </div>
              </div>

              {/* Archivos adjuntos */}
              <div>
                <div className="du-modal-files-head" style={{ marginBottom: 16 }}>
                  <span className="du-modal-section-title">DOCUMENTOS ADJUNTOS ({selected.archivos.length})</span>
                  <button style={{ background: 'none', border: 'none', color: '#00518e', fontSize: 12, fontWeight: 700, fontFamily: 'Public Sans', cursor: 'pointer' }}>Ver todos</button>
                </div>
                <div className="du-modal-files-list">
                  {selected.archivos.map((f, i) => (
                    <div key={f} className="du-modal-file">
                      <div className={`du-modal-file-icon ${i === 1 ? 'img' : ''}`}>
                        <IonIcon icon={documentTextOutline} />
                      </div>
                      <div className="du-modal-file-info">
                        <span className="du-modal-file-name">{f}</span>
                        <span className="du-modal-file-meta">{i === 1 ? '4.2 MB' : '2.4 MB'} • {selected.fecha}</span>
                      </div>
                      <button className="du-modal-dl-btn" title="Descargar">
                        <IonIcon icon={downloadOutline} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Historial */}
              <div>
                <span className="du-modal-section-title" style={{ display: 'block', marginBottom: 24 }}>HISTORIAL DE TRÁMITE</span>
                <div className="du-modal-tl">
                  <div className="du-modal-tl-item">
                    <div className="du-modal-tl-dot active" />
                    <span className="du-modal-tl-lbl">Ingreso a Revisión Técnica</span>
                    <span className="du-modal-tl-sub">Hace 2 horas • por Carlos Rodriguez</span>
                  </div>
                  <div className="du-modal-tl-item">
                    <div className="du-modal-tl-dot" />
                    <span className="du-modal-tl-lbl">Validación de Antecedentes</span>
                    <span className="du-modal-tl-sub">Hoy, 09:15 • Sistema Automático</span>
                  </div>
                  <div className="du-modal-tl-item">
                    <div className="du-modal-tl-dot" />
                    <span className="du-modal-tl-lbl">Recepción de Solicitud Online</span>
                    <span className="du-modal-tl-sub">Ayer, 18:30 • Portal Ciudadano</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="du-modal-footer">
              <button className="du-modal-btn-observar" onClick={() => setViewing(true)}>
                <IonIcon icon={createOutline} style={{ fontSize: 18 }} />
                Observar
              </button>
            </div>

          </div>
        </div>
      )}

    </UserLayout>
  );
};

export default DocumentosUser;
