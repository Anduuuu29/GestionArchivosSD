import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import {
  eyeOutline,
  closeOutline,
  chevronBackOutline,
  chevronForwardOutline,
  documentTextOutline,
  downloadOutline,
  createOutline,
  folderOpenOutline,
  homeOutline,
  printOutline,
  copyOutline,
  warningOutline,
  checkmarkCircleOutline
} from 'ionicons/icons';
import { useHistory, useLocation } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';

/* ─────────── Types ─────────── */
type EstadoDoc = 'En Revisión' | 'Urgente' | 'Terminado' | 'Ingresado' | 'Pendiente de Firma';

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
}

/* ─────────── Mock data ─────────── */
const DOCS: Documento[] = [
  {
    id: 'EXP-2024-0892',
    solicitante: 'María José Urzúa',
    rut: '15.432.110-K',
    tipo: 'Permiso Edificación',
    fecha: '12 Oct 2023',
    hora: '09:45',
    estado: 'En Revisión',
    descripcion: 'Solicitud de permiso de edificación para construcción de vivienda unifamiliar.',
    archivos: ['Planos_Arquitectura_V1.pdf', 'Foto_Terreno_Frontal.jpg'],
  },
  {
    id: 'EXP-2024-0893',
    solicitante: 'Constructora Alerce SpA',
    rut: '76.012.333-2',
    tipo: 'Recepción Final',
    fecha: '12 Oct 2023',
    hora: '10:20',
    estado: 'Urgente',
    descripcion: 'Solicitud de recepción final de obra edificio comercial.',
    archivos: ['informe_final.pdf'],
  },
  {
    id: 'EXP-2024-0885',
    solicitante: 'Ricardo Lagos Soto',
    rut: 'Patente Comercial',
    tipo: 'Patente Comercial',
    fecha: '11 Oct 2023',
    hora: '16:15',
    estado: 'Terminado',
    descripcion: 'Otorgamiento de patente.',
    archivos: ['resolucion.pdf'],
  },
  {
    id: 'EXP-2023-0452',
    solicitante: 'Andrés Villalobos R.',
    rut: 'Dir. Obras Municipales',
    tipo: 'Memorándum Interno',
    fecha: '24 Oct 2023',
    hora: '09:45 AM',
    estado: 'Pendiente de Firma',
    descripcion: 'Solicitud de revisión técnica - Proyecto Costanera',
    archivos: ['Memorándum_2023_0452_MuniSD.pdf'],
  },
  {
    id: 'EXP-2024-0894',
    solicitante: 'Inmobiliaria Mar Azul',
    rut: 'Modificación Planos',
    tipo: 'Modificación Planos',
    fecha: '12 Oct 2023',
    hora: '11:05',
    estado: 'Ingresado',
    descripcion: 'Modificación de planos aprobados para redistribución interior.',
    archivos: ['planos_modificacion.pdf'],
  },
];

/* ─────────── Status badge config ─────────── */
const STATUS_CONFIG: Record<EstadoDoc, { bg: string; dot: string; text: string; label: string }> = {
  'En Revisión': { bg: '#dbeafe', dot: '#1d4ed8', text: '#1d4ed8', label: 'En Revisión' },
  'Urgente':     { bg: '#ffdad8', dot: '#9a1b24', text: '#8e101d', label: 'Urgente' },
  'Terminado':   { bg: '#dcfce7', dot: '#166534', text: '#166534', label: 'Terminado' },
  'Ingresado':   { bg: '#e0e7ff', dot: '#4f46e5', text: '#3730a3', label: 'Ingresado' },
  'Pendiente de Firma': { bg: '#e0f2fe', dot: '#0369a1', text: '#0369a1', label: 'Pendiente de Firma' },
};

const adminNavItems = [
  { label: 'Dashboard', icon: homeOutline, path: '/admin/dashboard' },
  { label: 'Documentos', icon: documentTextOutline, path: '/admin/documentos' },
  { label: 'Administración de archivos', icon: folderOpenOutline, path: '/admin/archivos' },
];

/* ─────────── Component ─────────── */
const DocumentosAdmin: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [selected, setSelected] = useState<Documento | null>(null);
  const [viewing, setViewing] = useState(false);
  const [showRechazarModal, setShowRechazarModal] = useState(false);

  // Parse ID from URL parameter to auto-open document (for when coming from Dashboard)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const docId = params.get('id');
    if (docId) {
      // Find the document, matching the string exactly or ignoring the '#' if needed
      const found = DOCS.find(d => d.id === docId || d.id === `#${docId}` || `#${d.id}` === docId);
      if (found) {
        setSelected(found);
      }
    }
  }, [location.search]);

  // Make sure to clean up specific modals when un-selecting
  useEffect(() => {
    if (!selected) {
      setViewing(false);
      setShowRechazarModal(false);
    }
  }, [selected]);

  return (
    <UserLayout
      customNavItems={adminNavItems}
      userRole="Administrador"
      userName="ADMIN USER"
      userInitials="A"
      onNewTramite={() => history.push('/admin/documentos/agregar')}
      showLogs={true}
    >
      <style>{`
        /* ── Page wrapper ── */
        .du-page { padding: 24px 28px 32px; display: flex; flex-direction: column; gap: 20px; font-family: 'Inter', sans-serif; height: 100%; }

        /* ── Header ── */
        .du-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .du-title-wrap { display: flex; align-items: flex-start; gap: 6px; }
        .du-title-dot { color: #fe6565; font-weight: 900; font-size: 10px; letter-spacing: 2px; margin-top: 6px; }
        .du-title { font-size: 28px; font-weight: 900; color: #111; letter-spacing: -0.5px; margin: 0; line-height: 1.15; }
        
        .du-desc { color: #414751; font-size: 14px; margin-top: 8px; margin-bottom: 0; max-width: 400px; line-height: 1.4; }

        /* Admin Filter Toggles */
        .admin-filters { display: flex; align-items: center; background: #fff; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden; }
        .admin-filter-btn { padding: 8px 16px; font-size: 13px; font-weight: 600; color: #414751; background: #fff; border: none; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 6px; border-right: 1px solid #e5e7eb; }
        .admin-filter-btn:last-child { border-right: none; }
        .admin-filter-btn:hover { background: #f8faff; }
        .admin-filter-btn.active { background: #00518e; color: #fff; }

        /* ── Table card ── */
        .du-table-card { background: #fff; border: 1px solid #e5e7eb; border-radius: 12px; box-shadow: 0 1px 6px rgba(0,0,0,0.06); overflow: hidden; display: flex; flex-direction: column; flex: 1; }
        .du-table-wrap { overflow-x: auto; flex: 1; }
        table.du-table { width: 100%; border-collapse: collapse; min-width: 800px; }
        .du-table thead { background: #ebedff; border-bottom: 1px solid rgba(193,199,211,0.3); }
        .du-table th { padding: 14px 20px; font-size: 12px; font-weight: 600; color: #414751; text-align: left; white-space: nowrap; }
        .du-table th:last-child { text-align: right; }
        .du-table tbody tr { border-bottom: 1px solid #f3f4f6; transition: background .13s; }
        .du-table tbody tr:last-child { border-bottom: none; }
        .du-table tbody tr:hover { background: #f8faff; }
        .du-table td { padding: 14px 20px; font-size: 13px; color: #414751; vertical-align: middle; }
        .du-table td:last-child { text-align: right; }

        /* id cell */
        .du-id-cell { display: flex; align-items: center; gap: 10px; }
        .du-id-bar { width: 3px; height: 28px; border-radius: 2px; flex-shrink: 0; }
        .du-id-text { font-size: 12px; color: #00518e; font-weight: 700; line-height: 1.4; font-family: 'Liberation Mono', monospace; }

        /* tipo pill */
        .du-tipo { display: inline-block; background: #f0f2f5; color: #414751; border: 1px solid #e5e7eb; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 4px; white-space: nowrap; }

        /* status badge */
        .du-badge { display: inline-flex; align-items: center; gap: 5px; padding: 4px 12px; border-radius: 9999px; }
        .du-badge-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
        .du-badge-label { font-size: 11px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase; }

        /* Actions */
        .du-actions { display: inline-flex; align-items: center; gap: 4px; }
        .du-action-btn { background: none; border: none; color: #6b7280; cursor: pointer; padding: 6px; border-radius: 6px; display: inline-flex; align-items: center; transition: all .13s; }
        .du-action-btn:hover { background: #f0f4ff; color: #00518e; }
        .du-action-btn.active { background: #00518e; color: #fff; }
        .du-action-btn ion-icon { font-size: 18px; }

        /* ── Pagination ── */
        .du-pagination { background: #f2f3ff; border-top: 1px solid #e5e7eb; padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: #414751; font-weight: 500; }
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
          border-left: 4px solid #00a1ff;
        }
        @keyframes du-slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }

        /* modal header */
        .du-modal-header {
          background: #fff; padding: 20px 24px;
          display: flex; align-items: flex-start; justify-content: space-between;
          border-bottom: 1px dashed rgba(193,199,211,0.6);
          flex-shrink: 0;
        }
        .du-modal-header-left { display: flex; flex-direction: column; gap: 4px; }
        .du-modal-exp-title { font-size: 10px; font-weight: 700; color: #00518e; letter-spacing: 1px; text-transform: uppercase; font-family: 'Public Sans', sans-serif; }
        .du-modal-exp-val { font-size: 22px; font-weight: 700; color: #121a34; font-family: 'Liberation Mono', monospace; }
        .du-modal-close { background: none; border: none; color: #6b7280; cursor: pointer; padding: 8px; border-radius: 50%; display: flex; align-items: center; transition: background .13s; margin-top: -4px; margin-right: -8px; }
        .du-modal-close:hover { background: #f3f4f6; color: #111; }
        .du-modal-close ion-icon { font-size: 24px; }

        /* modal body */
        .du-modal-body { flex: 1; overflow-y: auto; padding: 24px; display: flex; flex-direction: column; gap: 32px; }

        /* info card */
        .du-modal-info-card { display: flex; flex-direction: column; gap: 16px; }
        .du-modal-info-header { display: flex; justify-content: space-between; align-items: center; }
        .du-modal-info-title { font-size: 14px; font-weight: 700; color: #414751; font-family: 'Public Sans', sans-serif; }
        .du-modal-status-badge { display: inline-flex; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: 700; font-family: 'Public Sans', sans-serif; text-transform: uppercase; }
        
        .du-modal-info-box { background: #fff; border: 1px solid rgba(193,199,211,0.3); border-radius: 12px; padding: 16px; display: flex; flex-direction: column; gap: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.02); }
        .du-modal-info-row { display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f3f4f6; padding-bottom: 8px; }
        .du-modal-info-row:last-child { border-bottom: none; padding-bottom: 0; }
        .du-modal-info-lbl { font-size: 13px; font-weight: 500; color: #6b7280; font-family: 'Public Sans', sans-serif; }
        .du-modal-info-val { font-size: 14px; font-weight: 500; color: #121a34; font-family: 'Public Sans', sans-serif; text-align: right; }

        /* section title */
        .du-modal-section-title { font-size: 14px; font-weight: 600; color: #414751; letter-spacing: 0.8px; text-transform: uppercase; font-family: 'Public Sans', sans-serif; }

        /* timeline */
        .du-modal-tl { display: flex; flex-direction: column; gap: 24px; position: relative; padding-left: 24px; }
        .du-modal-tl::before { content: ''; position: absolute; left: 13px; top: 8px; bottom: 8px; width: 1px; background: rgba(193,199,211,0.4); }
        .du-modal-tl-item { position: relative; display: flex; flex-direction: column; }
        .du-modal-tl-dot { position: absolute; left: -24px; top: 4px; width: 14px; height: 14px; border-radius: 50%; background: #c1c7d3; border: 3px solid #fff; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .du-modal-tl-dot.active { background: #00518e; }
        .du-modal-tl-lbl { font-size: 14px; font-weight: 500; color: #121a34; font-family: 'Public Sans', sans-serif; }
        .du-modal-tl-sub { font-size: 12px; font-weight: 500; color: #6b7280; font-family: 'Public Sans', sans-serif; margin-top: 4px; }

        /* files */
        .du-modal-files-head { display: flex; justify-content: space-between; align-items: center; }
        .du-modal-files-list { display: flex; flex-direction: column; gap: 12px; }
        .du-modal-file { background: #fff; border: 1px solid rgba(193,199,211,0.3); border-radius: 12px; padding: 12px; display: flex; gap: 16px; align-items: center; box-shadow: 0 1px 3px rgba(0,0,0,0.02); transition: border-color .13s; }
        .du-modal-file:hover { border-color: #cbd5e1; }
        .du-modal-file-icon { width: 44px; height: 44px; background: #fff1f0; border-radius: 8px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .du-modal-file-icon ion-icon { font-size: 22px; color: #ff4d4f; }
        .du-modal-file-icon.img { background: #e6f7ff; }
        .du-modal-file-icon.img ion-icon { color: #1890ff; }
        .du-modal-file-info { flex: 1; min-width: 0; display: flex; flex-direction: column; }
        .du-modal-file-name { font-size: 14px; font-weight: 500; color: #121a34; font-family: 'Public Sans', sans-serif; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; margin-bottom: 2px; }
        .du-modal-file-meta { font-size: 11px; color: #6b7280; font-family: 'Public Sans', sans-serif; }
        .du-modal-dl-btn { background: none; border: none; color: #9ca3af; cursor: pointer; padding: 6px; border-radius: 6px; transition: color .13s; }
        .du-modal-dl-btn:hover { color: #00518e; background: #f3f4f6; }
        .du-modal-dl-btn ion-icon { font-size: 20px; }

        /* footer */
        .du-modal-footer { padding: 20px 24px; border-top: 1px dashed rgba(193,199,211,0.6); display: grid; grid-template-columns: 1fr 1fr; gap: 12px; flex-shrink: 0; background: #fff; }
        .du-modal-btn-observar { background: #fff; border: 1px solid #d1d5db; border-radius: 8px; padding: 12px 16px; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 14px; font-weight: 500; color: #121a34; font-family: 'Public Sans', sans-serif; cursor: pointer; transition: background .13s; }
        .du-modal-btn-observar:hover { background: #f9fafb; }
        .du-modal-btn-firma { background: #00518e; border: none; border-radius: 8px; padding: 12px 16px; display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 14px; font-weight: 500; color: #fff; font-family: 'Public Sans', sans-serif; cursor: pointer; transition: background .13s; box-shadow: 0 2px 4px rgba(0,81,142,0.2); }
        .du-modal-btn-firma:hover { background: #003d6b; }

        /* ── DOCUMENT VIEWER (ADMIN) ── */
        .du-viewer-container { height: 100%; display: flex; flex-direction: column; background: #fff; animation: du-fade-in 0.2s ease; overflow: hidden; }
        .du-viewer-toolbar { background: #fff; border-bottom: 1px solid rgba(193,199,211,0.3); padding: 12px 24px; display: flex; align-items: center; justify-content: space-between; flex-shrink: 0; box-shadow: 0 2px 4px rgba(0,0,0,0.02); }
        .du-viewer-toolbar-left { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 600; color: #121a34; font-family: 'Public Sans', sans-serif; }
        .du-viewer-toolbar-right { display: flex; align-items: center; gap: 8px; }
        
        .du-viewer-tbtn { display: flex; align-items: center; gap: 6px; padding: 8px 12px; border: none; background: none; cursor: pointer; border-radius: 6px; font-size: 13px; font-weight: 500; color: #414751; font-family: 'Public Sans', sans-serif; transition: background .13s; }
        .du-viewer-tbtn:hover { background: #f0f4ff; color: #00518e; }
        .du-viewer-tbtn ion-icon { font-size: 18px; }
        
        .du-viewer-tbtn-solid { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border: none; background: #00518e; color: #fff; cursor: pointer; border-radius: 6px; font-size: 13px; font-weight: 600; font-family: 'Public Sans', sans-serif; transition: background .13s; box-shadow: 0 2px 4px rgba(0,81,142,0.2); }
        .du-viewer-tbtn-solid:hover { background: #003d6b; }

        .du-viewer-divider { width: 1px; height: 24px; background: #e5e7eb; margin: 0 8px; }
        .du-viewer-body { flex: 1; display: flex; min-height: 0; overflow: hidden; background: #f9fafb; }
        .du-viewer-preview { flex: 1; overflow-y: auto; display: flex; align-items: flex-start; justify-content: center; padding: 48px; }
        
        .du-viewer-paper { background: #fff; border: 1px solid rgba(193,199,211,0.2); border-radius: 2px; box-shadow: 0 8px 30px rgba(10,19,45,0.08); width: 100%; max-width: 800px; min-height: 1050px; padding: 80px; position: relative; display: flex; flex-direction: column; gap: 48px; }
        .du-viewer-paper-stripe { position: absolute; left: 0; top: 0; bottom: 0; width: 8px; background: rgba(0,81,142,0.9); border-radius: 2px 0 0 2px; }
        
        .du-viewer-aside { width: 340px; flex-shrink: 0; border-left: 1px solid rgba(193,199,211,0.3); background: #fff; overflow-y: auto; display: flex; flex-direction: column; box-shadow: -4px 0 24px rgba(0,0,0,0.02); }
        .du-viewer-aside-head { padding: 24px; border-bottom: 1px dashed rgba(193,199,211,0.6); }
        .du-aside-title { font-size: 13px; font-weight: 700; color: #00518e; letter-spacing: 0.7px; text-transform: uppercase; font-family: 'Public Sans', sans-serif; }
        .du-aside-subtitle { font-size: 12px; font-weight: 500; color: #6b7280; margin-top: 4px; font-family: 'Public Sans', sans-serif; }
        .du-viewer-aside-body { padding: 24px; display: flex; flex-direction: column; gap: 28px; flex: 1; }
        
        .du-aside-id-box { background: #f2f3ff; border: 1px solid rgba(0,81,142,0.1); border-radius: 8px; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; margin-top: 8px; }
        .du-aside-id-val { font-size: 15px; font-weight: 700; color: #00518e; font-family: 'Liberation Mono', monospace; }
        
        .du-aside-field { display: flex; flex-direction: column; gap: 6px; }
        .du-aside-field-lbl { font-size: 11px; font-weight: 700; color: #414751; text-transform: uppercase; font-family: 'Public Sans', sans-serif; letter-spacing: 0.5px; }
        .du-aside-field-val { font-size: 14px; font-weight: 600; color: #121a34; font-family: 'Public Sans', sans-serif; }
        .du-aside-field-sub { font-size: 12px; font-weight: 500; color: #6b7280; font-family: 'Public Sans', sans-serif; }
        
        .du-aside-badge { display: inline-flex; padding: 4px 12px; border-radius: 9999px; font-size: 11px; font-weight: 700; text-transform: uppercase; font-family: 'Public Sans', sans-serif; width: fit-content; }
        .du-aside-sep { border: none; border-top: 1px dashed rgba(193,199,211,0.6); margin: 0; }
        
        .du-aside-hist-title { font-size: 14px; font-weight: 700; color: #121a34; margin-bottom: 20px; font-family: 'Public Sans', sans-serif; }
        
        .du-aside-btn-trace { width: 100%; margin-top: 8px; border: 2px solid #00518e; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; color: #00518e; font-size: 14px; font-weight: 600; font-family: 'Public Sans', sans-serif; cursor: pointer; background: transparent; transition: background .13s; }
        .du-aside-btn-trace:hover { background: #f2f3ff; }

        .du-aside-btn-rechazar { width: 100%; border: 2px solid #ef4444; border-radius: 8px; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 12px; color: #ef4444; font-size: 14px; font-weight: 600; font-family: 'Public Sans', sans-serif; cursor: pointer; background: transparent; transition: background .13s; }
        .du-aside-btn-rechazar:hover { background: #fef2f2; }

        /* ── RECHAZAR MODAL ── */
        .rej-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.5);
          display: flex; align-items: center; justify-content: center;
          z-index: 10000; animation: du-fade-in 0.2s ease;
        }
        .rej-modal {
          width: 500px; max-width: 95vw; background: #fff; border-radius: 16px;
          box-shadow: 0 10px 40px rgba(0,0,0,0.2); overflow: hidden;
          animation: rej-pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex; flex-direction: column;
        }
        @keyframes rej-pop {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .rej-header {
          padding: 24px; display: flex; justify-content: space-between; align-items: center;
        }
        .rej-title { font-size: 20px; font-weight: 600; color: #121a34; font-family: 'Inter', sans-serif; }
        .rej-close { background: none; border: none; color: #6b7280; font-size: 24px; cursor: pointer; display: flex; padding: 4px; border-radius: 50%; transition: background 0.2s; }
        .rej-close:hover { background: #f3f4f6; color: #111; }
        
        .rej-body { padding: 0 24px 24px 24px; display: flex; flex-direction: column; gap: 20px; }
        
        .rej-alert {
          background: #fef2f2; border: 1px solid #fecaca; border-radius: 12px; padding: 16px;
          display: flex; gap: 12px; align-items: flex-start;
        }
        .rej-alert-icon { color: #dc2626; font-size: 20px; flex-shrink: 0; margin-top: 2px; }
        .rej-alert-content { display: flex; flex-direction: column; gap: 4px; }
        .rej-alert-title { font-size: 14px; font-weight: 600; color: #991b1b; }
        .rej-alert-desc { font-size: 13px; color: #991b1b; line-height: 1.4; }
        
        .rej-form-group { display: flex; flex-direction: column; gap: 8px; }
        .rej-label { font-size: 14px; font-weight: 500; color: #121a34; display: flex; align-items: center; gap: 4px; }
        .rej-label-req { color: #dc2626; }
        .rej-textarea {
          width: 100%; min-height: 120px; padding: 16px; border: 1px solid #d1d5db; border-radius: 12px;
          font-family: 'Inter', sans-serif; font-size: 14px; color: #111; resize: none; outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .rej-textarea:focus { border-color: #00518e; box-shadow: 0 0 0 3px rgba(0,81,142,0.1); }
        .rej-textarea::placeholder { color: #9ca3af; }
        .rej-counter { font-size: 12px; color: #6b7280; text-align: right; }
        
        .rej-footer {
          padding: 20px 24px; display: flex; justify-content: space-between; gap: 16px; border-top: 1px solid #f3f4f6;
        }
        .rej-btn-cancel {
          flex: 1; padding: 12px; background: #fff; border: 1px solid #d1d5db; border-radius: 10px;
          font-size: 14px; font-weight: 500; color: #414751; cursor: pointer; transition: background 0.2s;
        }
        .rej-btn-cancel:hover { background: #f9fafb; }
        .rej-btn-confirm {
          flex: 1; padding: 12px; background: #991b1b; border: none; border-radius: 10px;
          font-size: 14px; font-weight: 500; color: #fff; cursor: pointer; transition: background 0.2s;
          display: flex; align-items: center; justify-content: center; gap: 8px;
        }
        .rej-btn-confirm:hover { background: #7f1d1d; }

      `}</style>

      {/* ── LIST VIEW ── */}
      {!viewing ? (
        <div className="du-page">
          {/* ── Header ── */}
          <div className="du-header">
            <div>
              <div className="du-title-wrap">
                <span className="du-title-dot">i</span>
                <h1 className="du-title">Documentos</h1>
              </div>
              <p className="du-desc">Gestione y revise la documentación municipal pendiente de resolución.</p>
            </div>
            
            <div className="admin-filters">
              <button className="admin-filter-btn active">Todos</button>
              <button className="admin-filter-btn">Pendientes</button>
              <button className="admin-filter-btn">Terminados</button>
            </div>
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
                    const sc = STATUS_CONFIG[doc.estado] || { bg: '#e5e7eb', dot: '#9ca3af', text: '#374151', label: doc.estado };
                    const barColor = sc.dot;
                    const isSelected = selected?.id === doc.id;
                    
                    return (
                      <tr key={doc.id} style={{ backgroundColor: isSelected ? '#f8faff' : '' }}>
                        {/* ID */}
                        <td>
                          <div className="du-id-cell">
                            <div className="du-id-bar" style={{ background: barColor }} />
                            <div className="du-id-text">
                              {doc.id}
                            </div>
                          </div>
                        </td>
                        {/* Solicitante */}
                        <td>
                          <div style={{ fontWeight: 600, color: '#121a34', fontSize: 14 }}>{doc.solicitante}</div>
                          <div style={{ fontSize: 11, color: '#6b7280', marginTop: 2 }}>{doc.rut}</div>
                        </td>
                        {/* Tipo */}
                        <td><span className="du-tipo">{doc.tipo}</span></td>
                        {/* Fecha */}
                        <td>
                          <div style={{ fontSize: 13, fontWeight: 500, color: '#414751' }}>{doc.fecha},</div>
                          <div style={{ fontSize: 13, color: '#414751' }}>{doc.hora}</div>
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
                          <div className="du-actions">
                            <button className={`du-action-btn ${isSelected ? 'active' : ''}`} onClick={() => setSelected(doc)} title="Ver detalles">
                              <IonIcon icon={eyeOutline} />
                            </button>
                            <button className="du-action-btn" title="Descargar">
                              <IonIcon icon={downloadOutline} />
                            </button>
                            <button className="du-action-btn" title="Editar">
                              <IonIcon icon={createOutline} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="du-pagination">
              <span>Mostrando 1-5 de 61 expedientes</span>
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
        /* ── VIEWING DOC (DOCUMENT VIEWER ADMIN) ── */
        selected && (
          <div className="du-viewer-container">
            {/* Toolbar */}
            <div className="du-viewer-toolbar">
              <div className="du-viewer-toolbar-left">
                <IonIcon icon={documentTextOutline} style={{ fontSize: 20, color: '#00518e' }} />
                {selected.archivos[0] || 'Documento.pdf'}
              </div>
              <div className="du-viewer-toolbar-right">
                <button className="du-viewer-tbtn"><IonIcon icon={downloadOutline} />Descargar</button>
                <button className="du-viewer-tbtn"><IonIcon icon={printOutline} />Imprimir</button>
                <div className="du-viewer-divider" />
                <button className="du-viewer-tbtn-solid">
                  <IonIcon icon={createOutline} />
                  Firma Digital
                </button>
                <div className="du-viewer-divider" style={{ background: 'transparent' }} />
                <button className="du-viewer-tbtn" onClick={() => setViewing(false)} style={{ padding: 8 }}>
                  <IonIcon icon={closeOutline} style={{ fontSize: 20 }} />
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
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, width: 80 }}>
                      <div style={{ width: 64, height: 64, background: '#eef2ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IonIcon icon={homeOutline} style={{ fontSize: 28, color: '#00518e' }} />
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, color: '#414751', letterSpacing: 1, textTransform: 'uppercase', fontFamily: 'Public Sans', marginTop: 8, textAlign: 'center' }}>MUNICIPALIDAD<br/>SANTO DOMINGO</span>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 6 }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: '#00518e', fontFamily: 'Public Sans' }}>MEMORÁNDUM N° {selected.id.split('-').pop()}</div>
                      <div style={{ fontSize: 13, fontWeight: 500, color: '#6b7280', fontFamily: 'Public Sans' }}>Santo Domingo, {selected.fecha}</div>
                    </div>
                  </div>

                  {/* Datos */}
                  <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', rowGap: 24, columnGap: 16, marginTop: 16 }}>
                    <div>
                      <span style={{ fontWeight: 700, color: '#414751', fontSize: 15, fontFamily: 'Public Sans' }}>DE:</span>
                    </div>
                    <div>
                      <span style={{ color: '#121a34', fontSize: 15, fontFamily: 'Public Sans', fontWeight: 500 }}>Dirección de Obras Municipales</span>
                    </div>
                    
                    <div>
                      <span style={{ fontWeight: 700, color: '#414751', fontSize: 15, fontFamily: 'Public Sans' }}>PARA:</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ color: '#121a34', fontSize: 15, fontFamily: 'Public Sans', fontWeight: 500 }}>Secretaría Comunal de Planificación (SECPLA)</span>
                    </div>
                    
                    <div>
                      <span style={{ fontWeight: 700, color: '#414751', fontSize: 15, fontFamily: 'Public Sans' }}>MATERIA:</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: 700, color: '#121a34', fontSize: 15, fontFamily: 'Public Sans' }}>{selected.descripcion}</span>
                    </div>
                  </div>

                  {/* Cuerpo */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 16 }}>
                    <p style={{ fontSize: 15, color: '#121a34', fontFamily: 'Public Sans', lineHeight: '28px', margin: 0 }}>Estimados junto con saludar,</p>
                    <p style={{ fontSize: 15, color: '#121a34', fontFamily: 'Public Sans', lineHeight: '28px', margin: 0 }}>Por medio del presente, se remite para su revisión y análisis técnico la carpeta correspondiente al proyecto de mejoramiento del sector Costanera Norte. Se adjuntan los planos de especialidades y el presupuesto estimado para la etapa de licitación pública.</p>
                  </div>
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
                    <div className="du-aside-field-lbl" style={{ marginBottom: 4 }}>ID SISTEMA</div>
                    <div className="du-aside-id-box">
                      <span className="du-aside-id-val">SGD-2023-{selected.id.split('-').pop()}-DOM</span>
                      <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#00518e'} onMouseLeave={e => e.currentTarget.style.color = '#6b7280'}>
                        <IonIcon icon={copyOutline} style={{ fontSize: 16 }} />
                      </button>
                    </div>
                  </div>

                  {/* Grid fields */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    <div className="du-aside-field">
                      <div className="du-aside-field-lbl">Tipo de Documento</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00518e', flexShrink: 0 }} />
                        <span className="du-aside-field-val">{selected.tipo}</span>
                      </div>
                    </div>

                    <div className="du-aside-field">
                      <div className="du-aside-field-lbl">Fecha de Ingreso</div>
                      <span className="du-aside-field-val" style={{ marginTop: 4 }}>{selected.fecha}, {selected.hora}</span>
                    </div>

                    <div className="du-aside-field">
                      <div className="du-aside-field-lbl">Autor / Emisor</div>
                      <span className="du-aside-field-val" style={{ marginTop: 4 }}>{selected.solicitante}</span>
                      <span className="du-aside-field-sub">{selected.rut}</span>
                    </div>

                    <div className="du-aside-field">
                      <div className="du-aside-field-lbl">Estado Actual</div>
                      <div style={{ marginTop: 4 }}>
                        {(() => { const sc = STATUS_CONFIG[selected.estado] || { bg: '#e5e7eb', text: '#374151', label: selected.estado }; return (
                          <span className="du-aside-badge" style={{ background: sc.bg, color: sc.text }}>{sc.label}</span>
                        ); })()}
                      </div>
                    </div>
                  </div>

                  <hr className="du-aside-sep" />

                  {/* Historial */}
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div className="du-aside-hist-title">Historial de Acciones</div>
                    <div className="du-aside-tl">
                      <div className="du-aside-tl-item">
                        <div className="du-modal-tl-dot active" style={{ left: -25, top: 2 }} />
                        <span className="du-modal-tl-lbl" style={{ fontSize: 13, fontWeight: 700 }}>Creado por A. Villalobos</span>
                        <span className="du-modal-tl-sub" style={{ fontSize: 11 }}>Hoy, 09:45 AM</span>
                      </div>
                      <div className="du-aside-tl-item">
                        <div className="du-modal-tl-dot" style={{ left: -25, top: 2 }} />
                        <span className="du-modal-tl-lbl" style={{ fontSize: 13, color: '#6b7280' }}>Enviado a revisión técnica</span>
                        <span className="du-modal-tl-sub" style={{ fontSize: 11 }}>Próximo paso</span>
                      </div>
                    </div>
                    
                    <div style={{ marginTop: 'auto', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 12 }}>
                      <button className="du-aside-btn-trace">
                        <IonIcon icon={eyeOutline} />
                        Ver Trazabilidad Completa
                      </button>
                      <button className="du-aside-btn-rechazar" onClick={() => setShowRechazarModal(true)}>
                        <IonIcon icon={closeOutline} />
                        Rechazar
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )
      )}

      {/* ══════════════════ MODAL LATERAL (DETALLES EN LIST VIEW) ══════════════════ */}
      {selected && !viewing && (
        <div className="du-overlay" onClick={() => setSelected(null)}>
          <div className="du-modal" onClick={(e) => e.stopPropagation()}>
            {/* Header del modal */}
            <div className="du-modal-header">
              <div className="du-modal-header-left">
                <span className="du-modal-exp-title">DETALLES DE EXPEDIENTE</span>
                <span className="du-modal-exp-val">{selected.id}</span>
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
                  {(() => { const sc = STATUS_CONFIG[selected.estado] || { bg: '#e5e7eb', text: '#374151', label: selected.estado }; return (
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
              <button className="du-modal-btn-firma">
                <IonIcon icon={documentTextOutline} style={{ fontSize: 18 }} />
                Firma Electrónica
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ══════════════════ MODAL RECHAZAR (POPUP CENTRADO) ══════════════════ */}
      {showRechazarModal && (
        <div className="rej-overlay" onClick={() => setShowRechazarModal(false)}>
          <div className="rej-modal" onClick={e => e.stopPropagation()}>
            <div className="rej-header">
              <h2 className="rej-title">Rechazar Documento</h2>
              <button className="rej-close" onClick={() => setShowRechazarModal(false)}>
                <IonIcon icon={closeOutline} />
              </button>
            </div>
            
            <div className="rej-body">
              <div className="rej-alert">
                <IonIcon icon={warningOutline} className="rej-alert-icon" />
                <div className="rej-alert-content">
                  <span className="rej-alert-title">Acción Irreversible</span>
                  <span className="rej-alert-desc">
                    Al rechazar este documento, el trámite será notificado al remitente y no podrá ser revertido en el sistema actual.
                  </span>
                </div>
              </div>
              
              <div className="rej-form-group">
                <label className="rej-label">Motivo del Rechazo <span className="rej-label-req">*</span></label>
                <textarea 
                  className="rej-textarea" 
                  placeholder="Describa brevemente la razón por la cual se rechaza este documento..."
                  maxLength={500}
                ></textarea>
                <span className="rej-counter">0 / 500 caracteres</span>
              </div>
            </div>
            
            <div className="rej-footer">
              <button className="rej-btn-cancel" onClick={() => setShowRechazarModal(false)}>
                Cancelar
              </button>
              <button className="rej-btn-confirm" onClick={() => {
                // Here we would handle the rejection logic, for now just close the modal
                setShowRechazarModal(false);
              }}>
                <IonIcon icon={checkmarkCircleOutline} style={{ fontSize: 18 }} />
                Confirmar Rechazo
              </button>
            </div>
          </div>
        </div>
      )}

    </UserLayout>
  );
};

export default DocumentosAdmin;
