import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { IonIcon } from '@ionic/react';
import {
  homeOutline,
  documentTextOutline,
  folderOpenOutline,
  chevronDownOutline,
  alertCircleOutline,
  searchOutline,
  timeOutline,
  eyeOutline,
  chevronForwardOutline,
  ticketOutline,
} from 'ionicons/icons';
import UserLayout from '../../layouts/UserLayout';
import { documentosService } from '../../services/documentos.service';

const imgBg0 = 'http://localhost:3845/assets/d56d7828d32addefc132baafde9f76dc228a03f9.svg';
const imgBg1 = 'http://localhost:3845/assets/319a969af9ea6edef1640ad7de331f8203f95175.svg';
const imgBg2 = 'http://localhost:3845/assets/1aa65a63929c971f4b41f83d0c2e24abcf7fe0e4.svg';
const imgBg3 = 'http://localhost:3845/assets/6a950900caa85754a409c8c02a0601f812e7b39d.svg';
const imgDoc = 'http://localhost:3845/assets/00c2d6037e3f6ceb17136b790fbd64116f583e61.png';
const imgTeam = 'http://localhost:3845/assets/386ee34e5f3b8a6961e13533fa79b02c35d2035f.png';

const BARS = [
  { label:'LUN', pct:50,  color:'rgba(15,105,180,0.2)', active:false },
  { label:'MAR', pct:75,  color:'rgba(15,105,180,0.2)', active:false },
  { label:'MIE', pct:63,  color:'rgba(15,105,180,0.2)', active:false },
  { label:'JUE', pct:94,  color:'#00518e',              active:true  },
  { label:'VIE', pct:56,  color:'rgba(15,105,180,0.2)', active:false },
  { label:'SAB', pct:19,  color:'#c6c6c7',              active:false },
  { label:'DOM', pct:13,  color:'#c6c6c7',              active:false },
];

const adminNavItems = [
  { label: 'Dashboard', icon: homeOutline, path: '/admin/dashboard' },
  { label: 'Documentos', icon: documentTextOutline, path: '/admin/documentos' },
  { label: 'Administración de archivos', icon: folderOpenOutline, path: '/admin/archivos' },
  { label: 'Tickets', icon: ticketOutline, path: '/admin/tickets' },
];

interface DocItem {
  id: number;
  idExpediente: string;
  solicitante: string;
  asunto: string;
  descripcion: string;
  estado: string;
  tipo: string;
  createdAt: string;
  Usuario?: { nombre: string; correo: string };
}

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [documentos, setDocumentos] = useState<DocItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    documentosService.getAll({ limit: 50 })
      .then(res => setDocumentos(res.data.data || []))
      .catch(() => window.dispatchEvent(new CustomEvent('api-error', { detail: { message: 'Error al cargar dashboard' } })))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Total Documentos', val: String(documentos.length), accent: '#00518e', badge: null as string | null, badgeBg: '', badgeColor: '' },
    { label: 'Pendientes / Ingresados', val: String(documentos.filter(d => d.estado === 'Pendiente' || d.estado === 'Ingresado' || d.estado === 'En Revisión').length), accent: '#bc3539', badge: 'Pendientes', badgeBg: 'rgba(154,27,36,0.1)', badgeColor: '#9a1b24' },
    { label: 'Terminados', val: String(documentos.filter(d => d.estado === 'Terminado').length), accent: '#d1d9fc', badge: null, badgeBg: '', badgeColor: '' },
    { label: 'Rechazados', val: String(documentos.filter(d => d.estado === 'Rechazado').length), accent: '#ba1a1a', badge: 'Revisar', badgeBg: 'rgba(186,26,26,0.1)', badgeColor: '#ba1a1a' },
  ];

  const recentDocs = [...documentos].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 5);

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
        @keyframes sk-shimmer { 0%{background-position:-400px 0} 100%{background-position:400px 0} }
        .sk-stat { height: 80px; border-radius: 12px; background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%); background-size: 800px 100%; animation: sk-shimmer 1.5s ease-in-out infinite; }
        .sk-row { height: 52px; }
        .sk-cell { height: 14px; border-radius: 4px; background: linear-gradient(90deg,#f0f0f0 25%,#e0e0e0 50%,#f0f0f0 75%); background-size: 800px 100%; animation: sk-shimmer 1.5s ease-in-out infinite; }
        .sk-cell-sm { width: 60px; }
        .sk-cell-lg { width: 200px; }
      `}</style>
      <div className="px-4 md:px-6 lg:px-8 pt-5 pb-6 flex flex-col gap-6 min-h-full">
        {/* Page heading */}
        <div>
          <h2 className="font-['Inter',sans-serif] font-extrabold text-[#111] text-3xl md:text-[36px] leading-tight tracking-tight">Dashboard</h2>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 w-full">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <div key={i} className="sk-stat" />)
          ) : (
            stats.map((s, i) => (
              <div key={i} className="bg-white border border-[#c1c7d3] rounded-xl lg:rounded-2xl shadow-sm overflow-hidden relative flex flex-col gap-1 p-4 lg:p-5">
                <div className="absolute left-0 top-0 bottom-0 w-[5px] rounded-l-xl" style={{ backgroundColor: s.accent }} aria-hidden="true" />
                <div className="flex items-start justify-between">
                  <div className="h-8 w-8 rounded-lg" style={{ background: `${s.accent}20` }} aria-hidden="true" />
                  {s.badge && (
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded" style={{ backgroundColor: s.badgeBg, color: s.badgeColor }}>
                      {s.badge}
                    </span>
                  )}
                </div>
                <div className="pt-2">
                  <p className="text-[#414751] text-[12px] lg:text-[13px] font-semibold leading-tight">{s.label}</p>
                  <p className="text-[#121a34] text-[28px] lg:text-[32px] font-semibold leading-none mt-1">{s.val}</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Chart + Alert row */}
        <div className="flex gap-4 lg:gap-6 items-start flex-col xl:flex-row w-full">
          
          {/* Bar chart */}
          <div className="flex-1 w-full bg-white border border-[#c1c7d3] rounded-xl lg:rounded-2xl shadow-sm px-5 lg:px-6 pt-5 pb-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#121a34] text-lg lg:text-2xl font-semibold">Flujo de Documentos</h3>
              <button className="flex items-center gap-1.5 text-[#414751] text-[12px] font-medium hover:bg-gray-100 px-2 py-1 rounded" aria-label="Cambiar período">
                Última Semana <IonIcon icon={chevronDownOutline} aria-hidden="true" />
              </button>
            </div>
            <div className="h-[140px] md:h-[180px] flex items-end justify-between gap-1 relative pt-4" role="img" aria-label="Gráfico de flujo de documentos semanal">
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none opacity-10" aria-hidden="true">
                {[0,1,2,3].map(i => <div key={i} className="border-t border-[#121a34] w-full" />)}
              </div>
              {BARS.map(b => (
                <div key={b.label} className="flex flex-col items-center gap-1 flex-1 relative" style={{ height: `${b.pct}%` }}>
                  {b.active && (
                    <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#272f4b] text-white text-[9px] px-2 py-0.5 rounded whitespace-nowrap z-10" role="tooltip">
                      Hoy: {documentos.length} docs
                    </div>
                  )}
                  <div className="w-full rounded-t-md h-full transition-all duration-300 hover:opacity-80" style={{ backgroundColor: b.color }} />
                  <span className="text-[9px] lg:text-[10px] font-bold uppercase" style={{ color: b.active ? '#00518e' : '#414751' }}>
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Alert panel */}
          <div className="w-full xl:w-[280px] shrink-0 bg-[rgba(15,105,180,0.1)] border border-[rgba(15,105,180,0.2)] rounded-xl lg:rounded-2xl p-4 lg:p-5 flex flex-col gap-4 h-full xl:min-h-[268px]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0f69b4] flex items-center justify-center shrink-0" aria-hidden="true">
                <IonIcon icon={alertCircleOutline} className="text-white text-base" />
              </div>
              <span className="font-bold text-[#00518e] text-[12px] tracking-wider uppercase">Estado de Alerta</span>
            </div>
            <div className="flex flex-col gap-3 flex-1 justify-center">
              {[
                { img: imgDoc,  tipo:'Próximo Vencimiento', nombre:'Decreto Alcaldicio #452-24', meta:'En 2 horas', metaColor:'#ba1a1a' },
                { img: imgTeam, tipo:'Nueva Asignación',    nombre:'Revisión de Contrato Aseo', meta:'Hace 15 min', metaColor:'#00518e' },
              ].map((a, i) => (
                <div key={i} className="bg-white/60 border border-white rounded-xl p-3 flex gap-3 items-start">
                  <img src={a.img} alt="" aria-hidden="true" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                  <div>
                    <p className="font-bold text-[#414751] text-[10px] uppercase">{a.tipo}</p>
                    <p className="font-semibold text-[#121a34] text-[13px] leading-tight">{a.nombre}</p>
                    <p className="text-[11px] font-medium mt-0.5" style={{ color: a.metaColor }}>{a.meta}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="text-[#00518e] font-semibold text-[13px] hover:underline focus:underline text-center py-1 mt-auto">
              Ver todas las notificaciones
            </button>
          </div>
        </div>

        {/* Recent documents table */}
        <section className="bg-white border border-[#c1c7d3] rounded-xl lg:rounded-2xl shadow-sm overflow-hidden flex flex-col" aria-labelledby="tasks-heading">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 lg:px-6 py-4 border-b border-[#c1c7d3] sticky top-0 bg-white z-10">
            <h3 id="tasks-heading" className="text-[#121a34] text-xl lg:text-2xl font-semibold">Documentos Recientes</h3>
            <div className="relative w-full sm:w-64">
              <IonIcon icon={searchOutline} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7280] text-[13px] pointer-events-none" aria-hidden="true" />
              <input
                type="search"
                placeholder="Buscar expediente..."
                aria-label="Buscar en tareas prioritarias"
                className="w-full bg-[#f2f3ff] rounded-lg pl-9 pr-4 py-2 text-[#6b7280] text-[13px] outline-none focus:ring-2 focus:ring-[#00518e]/30"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left border-collapse table-fixed" role="table">
              <thead>
                <tr className="bg-[#f2f3ff]">
                  <th scope="col" className="w-[18%] px-4 lg:px-6 py-3 text-[#414751] text-[11px] font-bold tracking-wider uppercase">Expediente</th>
                  <th scope="col" className="w-[42%] px-4 lg:px-6 py-3 text-[#414751] text-[11px] font-bold tracking-wider uppercase">Asunto</th>
                  <th scope="col" className="w-[15%] px-4 lg:px-6 py-3 text-[#414751] text-[11px] font-bold tracking-wider uppercase">Estado</th>
                  <th scope="col" className="w-[15%] px-4 lg:px-6 py-3 text-[#414751] text-[11px] font-bold tracking-wider uppercase">Fecha</th>
                  <th scope="col" className="w-[10%] px-4 lg:px-6 py-3 text-[#414751] text-[11px] font-bold tracking-wider uppercase text-right">Acción</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="sk-row"><td colSpan={5} style={{ padding: '14px 20px' }}><div className="sk-cell sk-cell-lg" /></td></tr>
                  ))
                ) : recentDocs.length === 0 ? (
                  <tr><td colSpan={5} style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>No hay documentos disponibles</td></tr>
                ) : (
                  recentDocs.map((doc, idx) => (
                    <tr key={doc.id} className={`border-t border-[#e8eaed] hover:bg-[#f8f9ff] transition-colors ${idx === 0 ? 'border-t-0':''}`}>
                      <td className="px-4 lg:px-6 py-4 font-['Liberation_Mono',monospace] font-bold text-[#00518e] text-[13px] whitespace-nowrap">
                        {doc.idExpediente || `EXP-${doc.id}`}
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <p className="text-[#121a34] font-semibold text-[14px] lg:text-[15px] leading-tight">{doc.asunto}</p>
                        <p className="text-[#414751] text-[11px] mt-0.5">{doc.solicitante}</p>
                      </td>
                      <td className="px-4 lg:px-6 py-4">
                        <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase border" style={{
                          color: doc.estado === 'Rechazado' ? '#9a1b24' : doc.estado === 'Terminado' ? '#065f46' : '#00518e',
                          backgroundColor: doc.estado === 'Rechazado' ? '#ffdad8' : doc.estado === 'Terminado' ? '#d1fae5' : '#dbeafe',
                          borderColor: doc.estado === 'Rechazado' ? '#f87171' : doc.estado === 'Terminado' ? '#34d399' : '#60a5fa',
                        }}>{doc.estado}</span>
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-[13px] text-[#414751]">
                        {new Date(doc.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-4 lg:px-6 py-4 text-right">
                        <button
                          onClick={() => history.push('/admin/documentos')}
                          className="p-2 hover:bg-[#f2f3ff] focus:ring-2 focus:ring-[#00518e]/30 rounded-lg text-[#414751] transition-colors"
                          aria-label={`Ver detalles de ${doc.idExpediente}`}
                        >
                          <IonIcon icon={eyeOutline} className="text-lg" aria-hidden="true" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="bg-[#f2f3ff] px-6 py-3 flex justify-center border-t border-[#c1c7d3]">
            <button
              onClick={() => history.push('/admin/documentos')}
              className="flex items-center gap-2 text-[#00518e] font-semibold text-[13px] hover:underline focus:underline"
              aria-label="Ver todos los expedientes"
            >
              Ver todos los expedientes
              <IonIcon icon={chevronForwardOutline} aria-hidden="true" />
            </button>
          </div>
        </section>

      </div>
    </UserLayout>
  );
};

export default Dashboard;
