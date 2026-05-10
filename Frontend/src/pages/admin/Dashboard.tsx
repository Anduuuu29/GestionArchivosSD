import { IonPage, IonContent, IonIcon } from '@ionic/react';
import {
  searchOutline, notificationsOutline, settingsOutline,
  homeOutline, documentTextOutline, folderOpenOutline,
  addOutline, timeOutline, eyeOutline, chevronForwardOutline,
  chevronDownOutline, alertCircleOutline, personOutline,
  menuOutline, closeOutline,
} from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '@gobdigital-cl/gob.cl/dist/css/gob.cl.css';

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

const STATS = [
  { img:imgBg0, label:'Trámites Pendientes', val:'24', accent:'#00518e', badge:'+12%', badgeBg:'rgba(0,81,142,0.1)', badgeColor:'#00518e' },
  { img:imgBg3, label:'Por Firmar',          val:'08', accent:'#bc3539', badge:'Urgente', badgeBg:'rgba(154,27,36,0.1)', badgeColor:'#9a1b24' },
  { img:imgBg1, label:'En Revisión',         val:'42', accent:'#d1d9fc', badge:null,     badgeBg:'', badgeColor:'' },
  { img:imgBg2, label:'Plazos Vencidos',     val:'03', accent:'#ba1a1a', badge:'Crítico', badgeBg:'rgba(186,26,26,0.1)', badgeColor:'#ba1a1a' },
];

const TASKS = [
  { id:'EXP-2024-0089', asunto:'Solicitud Permiso Edificación', depto:'Dirección de Obras Municipales', pri:'ALTA',   pc:'#bc3539', pb:'rgba(188,53,57,0.1)',  pbd:'rgba(188,53,57,0.2)',  tiempo:'4 horas',  tc:'#121a34', vencido:false },
  { id:'EXP-2024-0102', asunto:'Convenio Marco Educación',      depto:'DAEM Santo Domingo',             pri:'MEDIA',  pc:'#00518e', pb:'rgba(0,81,142,0.1)',   pbd:'rgba(0,81,142,0.2)',   tiempo:'2 días',   tc:'#121a34', vencido:false },
  { id:'EXP-2023-1562', asunto:'Informe Trimestral de Gestión', depto:'Control Interno',                pri:'CRÍTICA',pc:'#ba1a1a', pb:'rgba(186,26,26,0.1)',  pbd:'rgba(186,26,26,0.2)',  tiempo:'Vencido',  tc:'#ba1a1a', vencido:true  },
  { id:'EXP-2024-0201', asunto:'Resolución Exenta Municipal',   depto:'Secretaría Municipal',           pri:'ALTA',   pc:'#bc3539', pb:'rgba(188,53,57,0.1)',  pbd:'rgba(188,53,57,0.2)',  tiempo:'1 día',    tc:'#121a34', vencido:false },
  { id:'EXP-2024-0215', asunto:'Contrato Mantención Alumbrado', depto:'Obras Públicas',                 pri:'MEDIA',  pc:'#00518e', pb:'rgba(0,81,142,0.1)',   pbd:'rgba(0,81,142,0.2)',   tiempo:'3 días',   tc:'#121a34', vencido:false },
];

const Dashboard: React.FC = () => {
  const history = useHistory();
  const [sideOpen, setSideOpen] = useState(false);

  const Sidebar = ({ mobile = false }) => (
    <aside
      className={
        mobile
          ? `fixed inset-y-0 left-0 z-50 w-64 bg-[#eee] border-r border-[#a8b7c7] flex flex-col justify-between transform transition-transform duration-300 ${sideOpen ? 'translate-x-0' : '-translate-x-full'}`
          : 'hidden lg:flex w-[208px] bg-[#eee] border-r border-[#a8b7c7] flex-col justify-between shrink-0 h-full'
      }
    >
      <div>
        {mobile && (
          <div className="flex justify-end p-3">
            <button onClick={() => setSideOpen(false)} aria-label="Cerrar menú">
              <IonIcon icon={closeOutline} className="text-2xl text-[#4a4a4a]" />
            </button>
          </div>
        )}
        <div className="px-6 pt-4 pb-2">
          <h1 className="font-['Inter',sans-serif] font-black text-[#111] text-[17px] leading-6 tracking-tight">
            Municipalidad<br />Santo Domingo
          </h1>
          <p className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-[10px] tracking-widest uppercase mt-2">
            Administrador de archivos
          </p>
        </div>
        <nav className="mt-3 px-3 flex flex-col gap-1" role="navigation" aria-label="Menú principal">
          <div className="bg-[#a8b7c7] border-r-2 border-[#fe6565] flex items-center px-4 py-3 gap-3 rounded-sm" aria-current="page">
            <IonIcon icon={homeOutline} className="text-[#4a4a4a] text-base shrink-0" aria-hidden="true" />
            <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-[11px] tracking-widest uppercase">Dashboard</span>
          </div>
          <button onClick={() => { history.push('/admin/documentos'); setSideOpen(false); }} className="flex items-center px-4 py-3 gap-3 hover:bg-[#dde2e8] transition-colors rounded-sm w-full text-left">
            <IonIcon icon={documentTextOutline} className="text-[#4a4a4a] text-base shrink-0" aria-hidden="true" />
            <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-[11px] tracking-widest uppercase">Documentos</span>
          </button>
          <button onClick={() => { history.push('/admin/archivos'); setSideOpen(false); }} className="flex items-center px-4 py-3 gap-3 hover:bg-[#dde2e8] transition-colors rounded-sm w-full text-left">
            <IonIcon icon={folderOpenOutline} className="text-[#4a4a4a] text-base shrink-0" aria-hidden="true" />
            <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-[11px] tracking-widest uppercase leading-tight">
              Administración<br />de archivos
            </span>
          </button>
        </nav>
      </div>
      <div className="p-4 flex flex-col gap-3">
        <button
          onClick={() => history.push('/admin/documentos/agregar')}
          className="bg-[#050d2c] hover:bg-[#0a184a] focus:ring-2 focus:ring-offset-2 focus:ring-[#00518e] text-[#eee] flex items-center justify-center gap-2 py-[10px] rounded text-[11px] font-bold tracking-widest uppercase transition-colors"
          aria-label="Crear nuevo trámite"
        >
          <IonIcon icon={addOutline} aria-hidden="true" />
          Nuevo Trámite
        </button>
        <div className="border-t border-[#353535] pt-3">
          <div className="flex items-center gap-3 px-4 py-2 hover:bg-[#dde2e8] cursor-pointer rounded transition-colors">
            <IonIcon icon={timeOutline} className="text-[#4a4a4a] text-base shrink-0" aria-hidden="true" />
            <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-[11px] tracking-widest uppercase">Logs</span>
          </div>
          <div className="flex items-center gap-3 mt-2 px-4 py-2">
            <div className="w-8 h-8 rounded-xl bg-[#353535] shrink-0 flex items-center justify-center" aria-hidden="true">
              <IonIcon icon={personOutline} className="text-white text-sm" />
            </div>
            <div>
              <p className="font-['Inter',sans-serif] font-bold text-[#111] text-[10px]">ADMIN USER</p>
              <p className="font-['Inter',sans-serif] text-[#4a4a4a] text-[9px]">Administrador</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        {/* Full-height shell */}
        <div className="flex h-screen w-full overflow-hidden font-['Public_Sans',sans-serif] bg-[#f0f2f5]">

          {/* Desktop sidebar */}
          <Sidebar />

          {/* Mobile overlay */}
          {sideOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSideOpen(false)} aria-hidden="true" />}
          <Sidebar mobile />

          {/* Right column: topbar + fixed upper + scrollable lower */}
          <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

            {/* ── TOPBAR (fixed) ── */}
            <header className="h-[56px] bg-[#050d2c] flex items-center justify-between px-4 md:px-6 shrink-0 z-20" role="banner">
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <button className="lg:hidden text-white p-1" onClick={() => setSideOpen(true)} aria-label="Abrir menú">
                  <IonIcon icon={menuOutline} className="text-2xl" />
                </button>
                <div className="relative w-full max-w-[360px]">
                  <IonIcon icon={searchOutline} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4a4a4a] text-sm pointer-events-none" aria-hidden="true" />
                  <input
                    type="search"
                    placeholder="Buscar archivos"
                    aria-label="Buscar archivos"
                    className="w-full bg-[#eee] border border-white/10 rounded px-9 py-2 text-[#4a4a4a] text-sm outline-none focus:ring-2 focus:ring-white/40 placeholder:text-[#4a4a4a]/60"
                  />
                </div>
              </div>
              <div className="flex items-center gap-1 text-white ml-3 shrink-0">
                <button className="p-2 hover:bg-white/10 rounded transition-colors" aria-label="Notificaciones">
                  <IonIcon icon={notificationsOutline} className="text-lg" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded transition-colors" aria-label="Configuración">
                  <IonIcon icon={settingsOutline} className="text-lg" />
                </button>
                <div className="hidden sm:block border-l border-[#353535] pl-3 ml-1">
                  <span className="font-semibold text-[#eee] text-[11px] tracking-wide uppercase">Titulo</span>
                </div>
              </div>
            </header>

            {/* ── FIXED UPPER SECTION ── */}
            <div className="shrink-0 bg-[#f0f2f5] px-4 md:px-6 lg:px-8 pt-5 pb-4 flex flex-col gap-5">

              {/* Page heading */}
              <div>
                <p className="font-black text-[#fe6565] text-[10px] tracking-[2px] uppercase">Panel</p>
                <h2 className="font-['Inter',sans-serif] font-extrabold text-[#111] text-3xl md:text-[36px] leading-tight tracking-tight">Dashboard</h2>
              </div>

              {/* Stats + Alert row */}
              <div className="flex gap-4 lg:gap-6 items-start flex-wrap xl:flex-nowrap">

                {/* Stats grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 flex-1 min-w-0">
                  {STATS.map((s, i) => (
                    <div key={i} className="bg-white border border-[#c1c7d3] rounded-xl lg:rounded-2xl shadow-sm overflow-hidden relative flex flex-col gap-1 p-4 lg:p-5">
                      <div className="absolute left-0 top-0 bottom-0 w-[5px] rounded-l-xl" style={{ backgroundColor: s.accent }} aria-hidden="true" />
                      <div className="flex items-start justify-between">
                        <img src={s.img} alt="" aria-hidden="true" className="h-8 w-8 object-contain" />
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
                  ))}
                </div>

                {/* Alert panel */}
                <div className="w-full xl:w-[260px] shrink-0 bg-[rgba(15,105,180,0.1)] border border-[rgba(15,105,180,0.2)] rounded-xl lg:rounded-2xl p-4 lg:p-5 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#0f69b4] flex items-center justify-center shrink-0" aria-hidden="true">
                      <IonIcon icon={alertCircleOutline} className="text-white text-base" />
                    </div>
                    <span className="font-bold text-[#00518e] text-[12px] tracking-wider uppercase">Estado de Alerta</span>
                  </div>
                  <div className="flex xl:flex-col gap-3">
                    {[
                      { img: imgDoc,  tipo:'Próximo Vencimiento', nombre:'Decreto Alcaldicio #452-24', meta:'En 2 horas', metaColor:'#ba1a1a' },
                      { img: imgTeam, tipo:'Nueva Asignación',    nombre:'Revisión de Contrato Aseo', meta:'Hace 15 min', metaColor:'#00518e' },
                    ].map((a, i) => (
                      <div key={i} className="flex-1 xl:flex-none bg-white/60 border border-white rounded-xl p-3 flex gap-3 items-start">
                        <img src={a.img} alt="" aria-hidden="true" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                        <div>
                          <p className="font-bold text-[#414751] text-[10px] uppercase">{a.tipo}</p>
                          <p className="font-semibold text-[#121a34] text-[13px] leading-tight">{a.nombre}</p>
                          <p className="text-[11px] font-medium mt-0.5" style={{ color: a.metaColor }}>{a.meta}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="text-[#00518e] font-semibold text-[13px] hover:underline focus:underline text-center py-1">
                    Ver todas las notificaciones
                  </button>
                </div>
              </div>

              {/* Bar chart */}
              <div className="bg-white border border-[#c1c7d3] rounded-xl lg:rounded-2xl shadow-sm px-5 lg:px-6 pt-5 pb-4">
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
                          Hoy: 84 docs
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
            </div>

            {/* ── SCROLLABLE LOWER: PRIORITY TASKS ── */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8 pb-6">
              <section className="bg-white border border-[#c1c7d3] rounded-xl lg:rounded-2xl shadow-sm overflow-hidden flex flex-col" aria-labelledby="tasks-heading">

                {/* Table header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 lg:px-6 py-4 border-b border-[#c1c7d3] sticky top-0 bg-white z-10">
                  <h3 id="tasks-heading" className="text-[#121a34] text-xl lg:text-2xl font-semibold">Tareas Prioritarias</h3>
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

                {/* Responsive table */}
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] text-left border-collapse" role="table">
                    <thead>
                      <tr className="bg-[#f2f3ff]">
                        <th scope="col" className="px-4 lg:px-6 py-3 text-[#414751] text-[11px] font-bold tracking-wider uppercase">ID Expediente</th>
                        <th scope="col" className="px-4 lg:px-6 py-3 text-[#414751] text-[11px] font-bold tracking-wider uppercase">Asunto</th>
                        <th scope="col" className="px-4 lg:px-6 py-3 text-[#414751] text-[11px] font-bold tracking-wider uppercase">Prioridad</th>
                        <th scope="col" className="px-4 lg:px-6 py-3 text-[#414751] text-[11px] font-bold tracking-wider uppercase">Tiempo Restante</th>
                        <th scope="col" className="px-4 lg:px-6 py-3 text-[#414751] text-[11px] font-bold tracking-wider uppercase text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {TASKS.map((t, idx) => (
                        <tr key={t.id} className={`border-t border-[#e8eaed] hover:bg-[#f8f9ff] transition-colors ${idx === 0 ? 'border-t-0':''}`}>
                          <td className="px-4 lg:px-6 py-4 font-['Liberation_Mono',monospace] font-bold text-[#00518e] text-[13px] whitespace-nowrap">
                            {t.id}
                          </td>
                          <td className="px-4 lg:px-6 py-4">
                            <p className="text-[#121a34] font-semibold text-[14px] lg:text-[15px] leading-tight">{t.asunto}</p>
                            <p className="text-[#414751] text-[11px] mt-0.5">{t.depto}</p>
                          </td>
                          <td className="px-4 lg:px-6 py-4">
                            <span
                              className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase border"
                              style={{ color: t.pc, backgroundColor: t.pb, borderColor: t.pbd }}
                            >
                              {t.pri}
                            </span>
                          </td>
                          <td className="px-4 lg:px-6 py-4">
                            <span className="flex items-center gap-1.5 text-[13px] font-medium" style={{ color: t.tc, fontWeight: t.vencido ? 700 : 500 }}>
                              {t.vencido && <IonIcon icon={timeOutline} aria-hidden="true" />}
                              {t.tiempo}
                            </span>
                          </td>
                          <td className="px-4 lg:px-6 py-4 text-right">
                            <button
                              onClick={() => history.push('/admin/documentos/detalles')}
                              className="p-2 hover:bg-[#f2f3ff] focus:ring-2 focus:ring-[#00518e]/30 rounded-lg text-[#414751] transition-colors"
                              aria-label={`Ver detalles de ${t.id}`}
                            >
                              <IonIcon icon={eyeOutline} className="text-lg" aria-hidden="true" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
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

          </div>{/* end right column */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
