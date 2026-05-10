import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { 
  searchOutline, 
  notificationsOutline, 
  settingsOutline, 
  homeOutline, 
  documentTextOutline, 
  folderOpenOutline,
  addOutline,
  timeOutline,
  copyOutline,
  mailOutline,
  refreshOutline,
  shieldCheckmarkOutline,
  addCircleOutline,
  serverOutline,
  ellipse
} from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const AdminArchivos: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex w-full min-h-screen font-['Public_Sans',sans-serif] bg-white relative">
          
          {/* Sidebar */}
          <aside className="w-[208px] bg-[#eee] border-r border-[#a8b7c7] flex flex-col justify-between shrink-0 h-screen sticky top-0">
            <div>
              <div className="p-6">
                <h1 className="font-['Inter',sans-serif] font-black text-[#111] text-lg leading-7 tracking-tighter">
                  Municipalidad Santo Domingo
                </h1>
                <p className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-[10px] tracking-widest uppercase mt-2">
                  Administrador de archivos
                </p>
              </div>

              <nav className="mt-4">
                <ul className="flex flex-col">
                  <li onClick={() => history.push('/dashboard')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">
                    <IonIcon icon={homeOutline} className="text-[#4a4a4a] text-lg" />
                    <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">
                      Dashboard
                    </span>
                  </li>
                  <li onClick={() => history.push('/admin/documentos')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">
                    <IonIcon icon={documentTextOutline} className="text-[#4a4a4a] text-lg" />
                    <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">
                      Documentos
                    </span>
                  </li>
                  <li className="bg-[#a8b7c7] border-r-4 border-[#fe6565] flex items-center px-4 py-3 gap-3">
                    <IonIcon icon={folderOpenOutline} className="text-[#4a4a4a] text-lg" />
                    <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase leading-tight">
                      Administración<br/>de archivos
                    </span>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="p-4 flex flex-col gap-4">
              <button onClick={() => history.push('/admin/documentos/agregar')} className="bg-[#050d2c] hover:bg-[#0a184a] text-white flex items-center justify-center gap-2 py-3 rounded text-xs font-bold tracking-widest uppercase transition-colors">
                <IonIcon icon={addOutline} className="text-lg" />
                Nuevo Trámite
              </button>
              
              <div className="border-t border-[#353535] pt-4">
                <div className="flex items-center gap-3 px-4 py-2 hover:bg-[#e0e0e0] cursor-pointer rounded transition-colors">
                  <IonIcon icon={timeOutline} className="text-[#4a4a4a] text-lg" />
                  <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">
                    Logs
                  </span>
                </div>
                
                <div className="flex items-center gap-3 mt-4 px-4 py-2 hover:bg-[#e0e0e0] cursor-pointer rounded transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#353535]"></div>
                  <div className="flex flex-col">
                    <span className="font-['Inter',sans-serif] font-bold text-[#111] text-[10px]">ADMIN USER</span>
                    <span className="font-['Inter',sans-serif] font-normal text-[#4a4a4a] text-[9px]">A</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 flex flex-col min-w-0 bg-white overflow-y-auto">
            
            {/* Topbar */}
            <header className="h-[60px] bg-[#050d2c] flex items-center justify-between px-6 shrink-0 z-20">
              <div className="flex-1 max-w-[448px]">
                <div className="bg-[#eee] border border-white/20 rounded flex items-center px-4 py-2 gap-3 focus-within:ring-2 ring-white/50 transition-all">
                  <IonIcon icon={searchOutline} className="text-[#4a4a4a]" />
                  <input 
                    type="text" 
                    placeholder="Buscar archivos" 
                    className="bg-transparent border-none outline-none text-[#4a4a4a] text-sm w-full placeholder:text-[#4a4a4a]/70"
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-4 text-white">
                <button className="p-2 hover:bg-white/10 rounded transition-colors">
                  <IonIcon icon={notificationsOutline} className="text-xl" />
                </button>
                <button className="p-2 hover:bg-white/10 rounded transition-colors">
                  <IonIcon icon={settingsOutline} className="text-xl" />
                </button>
                <div className="border-l border-[#353535] pl-4 flex items-center">
                  <span className="font-semibold text-xs tracking-wide uppercase">TITULO</span>
                </div>
              </div>
            </header>

            {/* Content Container */}
            <div className="p-8 flex flex-col gap-8 w-full max-w-[1200px] mx-auto">
              
              {/* Header Section */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#fe6565] font-['Inter',sans-serif] font-black text-[10px] tracking-widest uppercase">i</span>
                <h1 className="text-[#111] font-['Inter',sans-serif] font-extrabold text-4xl tracking-tight m-0">Administración de Archivos</h1>
              </div>

              {/* Maintenance Cards Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Card 1 */}
                <div className="bg-white border-y border-r border-[#a8b7c7]/50 rounded-xl flex flex-col relative overflow-hidden shadow-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#b22222]"></div>
                  <div className="p-6 flex flex-col h-full pl-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center text-[#b22222]">
                        <IonIcon icon={copyOutline} className="text-xl" />
                      </div>
                      <span className="bg-[#b22222] text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        Crítico
                      </span>
                    </div>
                    <h3 className="text-[#121a34] font-bold text-sm mb-2">Documentos Redundantes</h3>
                    <p className="text-[#414751] text-xs leading-relaxed mb-6 flex-1">
                      Se han detectado 124 archivos duplicados en el repositorio central de expedientes.
                    </p>
                    <button className="w-full bg-white border border-[#b22222] text-[#b22222] font-semibold py-2.5 rounded-lg text-sm hover:bg-red-50 transition-colors">
                      Ejecutar Purga
                    </button>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white border-y border-r border-[#a8b7c7]/50 rounded-xl flex flex-col relative overflow-hidden shadow-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#00518e]"></div>
                  <div className="p-6 flex flex-col h-full pl-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#00518e]">
                        <IonIcon icon={mailOutline} className="text-xl" />
                      </div>
                      <span className="bg-[#e0e7ff] text-[#3730a3] text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                        Optimizacion
                      </span>
                    </div>
                    <h3 className="text-[#121a34] font-bold text-sm mb-2">Borradores Inactivos</h3>
                    <p className="text-[#414751] text-xs leading-relaxed mb-6 flex-1">
                      Limpie borradores que no han sido editados en los últimos 30 días laborales.
                    </p>
                    <button className="w-full bg-white border border-[#00518e] text-[#00518e] font-semibold py-2.5 rounded-lg text-sm hover:bg-blue-50 transition-colors">
                      Revisar Archivos
                    </button>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white border-y border-r border-[#a8b7c7]/50 rounded-xl flex flex-col relative overflow-hidden shadow-sm">
                  <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gray-400"></div>
                  <div className="p-6 flex flex-col h-full pl-8">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                        <IonIcon icon={refreshOutline} className="text-xl" />
                      </div>
                    </div>
                    <h3 className="text-[#121a34] font-bold text-sm mb-2">Caché de Previsualización</h3>
                    <p className="text-[#414751] text-xs leading-relaxed mb-6 flex-1">
                      Libere espacio eliminando las imágenes de previsualización de documentos antiguos.
                    </p>
                    <button className="w-full bg-white border border-gray-300 text-[#414751] font-semibold py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      Vaciar Caché
                    </button>
                  </div>
                </div>

              </div>

              {/* Layout Content row */}
              <div className="flex flex-col lg:flex-row gap-6 items-start mt-4">
                
                {/* Políticas de Retención */}
                <div className="flex-1 bg-[#f8f9fa] border border-[#d1d5db] rounded-xl flex flex-col overflow-hidden">
                  <div className="p-5 border-b border-[#d1d5db] bg-[#f2f3ff] flex justify-between items-center">
                    <div className="flex items-center gap-2 text-[#00518e]">
                      <IonIcon icon={shieldCheckmarkOutline} className="text-xl" />
                      <h2 className="text-[#121a34] font-bold text-lg m-0">Políticas de Retención</h2>
                    </div>
                    <button className="flex items-center gap-1.5 text-[#00518e] font-semibold text-sm hover:text-[#003d6b] transition-colors">
                      <IonIcon icon={addCircleOutline} className="text-lg" />
                      Nueva Regla
                    </button>
                  </div>

                  <div className="p-5 flex flex-col gap-4">
                    
                    {/* Item 1 */}
                    <div className="bg-white border border-[#d1d5db] rounded-lg p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#00518e] shrink-0">
                        <IonIcon icon={timeOutline} className="text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[#121a34] font-semibold text-sm m-0">Expedientes Administrativos</h4>
                        <p className="text-[#414751] text-xs m-0 mt-0.5 truncate">Borrado automático después de 5 años de inactividad.</p>
                      </div>
                      <div className="flex flex-col items-end shrink-0">
                        <span className="text-[#121a34] font-bold text-[10px] uppercase">Estado</span>
                        <div className="flex items-center gap-1.5 text-[#00518e] mt-0.5">
                          <IonIcon icon={ellipse} className="text-[6px]" />
                          <span className="text-xs font-semibold">Activo</span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-[#121a34] transition-colors ml-4 shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-white border border-[#d1d5db] rounded-lg p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#00518e] shrink-0">
                        <IonIcon icon={documentTextOutline} className="text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[#121a34] font-semibold text-sm m-0">Registros Legales y Decretos</h4>
                        <p className="text-[#414751] text-xs m-0 mt-0.5 truncate">Purga de registros inactivos tras 10 años.</p>
                      </div>
                      <div className="flex flex-col items-end shrink-0">
                        <span className="text-[#121a34] font-bold text-[10px] uppercase">Estado</span>
                        <div className="flex items-center gap-1.5 text-gray-500 mt-0.5">
                          <IonIcon icon={ellipse} className="text-[6px]" />
                          <span className="text-xs font-semibold">Pausado</span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-[#121a34] transition-colors ml-4 shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                    </div>

                    {/* Item 3 */}
                    <div className="bg-white border border-[#d1d5db] rounded-lg p-4 flex items-center gap-4 hover:shadow-sm transition-shadow">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#00518e] shrink-0">
                        <IonIcon icon={mailOutline} className="text-xl" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-[#121a34] font-semibold text-sm m-0">Correspondencia Interna</h4>
                        <p className="text-[#414751] text-xs m-0 mt-0.5 truncate">Eliminación definitiva cada 2 años.</p>
                      </div>
                      <div className="flex flex-col items-end shrink-0">
                        <span className="text-[#121a34] font-bold text-[10px] uppercase">Estado</span>
                        <div className="flex items-center gap-1.5 text-[#00518e] mt-0.5">
                          <IonIcon icon={ellipse} className="text-[6px]" />
                          <span className="text-xs font-semibold">Activo</span>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-[#121a34] transition-colors ml-4 shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                      </button>
                    </div>

                  </div>
                </div>

                {/* Estado del Almacenamiento */}
                <div className="w-full lg:w-[320px] bg-white border border-[#d1d5db] rounded-xl flex flex-col p-6 shrink-0 shadow-sm">
                  <div className="flex items-center gap-2 text-[#00518e] mb-6">
                    <IonIcon icon={serverOutline} className="text-xl" />
                    <h3 className="text-[#121a34] font-bold text-sm m-0">Estado del Almacenamiento</h3>
                  </div>

                  <div className="flex flex-col gap-2 mb-6">
                    <div className="flex justify-between items-end">
                      <span className="text-[#121a34] font-bold text-xs uppercase">Uso Total</span>
                      <span className="text-[#00518e] font-bold text-sm">78%</span>
                    </div>
                    {/* Progress Bar */}
                    <div className="h-2.5 w-full bg-[#f2f3ff] rounded-full overflow-hidden">
                      <div className="h-full bg-[#00518e] w-[78%] rounded-full"></div>
                    </div>
                    <span className="text-[#414751] text-[10px]">3.1 TB de 4.0 TB utilizados</span>
                  </div>

                  <hr className="border-[#d1d5db] mb-6" />

                  <h4 className="text-[#414751] font-bold text-[10px] tracking-widest uppercase mb-4">Desglose por Categoría</h4>

                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <IonIcon icon={ellipse} className="text-[#00518e] text-[8px]" />
                        <span className="text-[#414751]">Documentos PDF</span>
                      </div>
                      <span className="font-bold text-[#121a34]">1.8 TB</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <IonIcon icon={ellipse} className="text-[#b22222] text-[8px]" />
                        <span className="text-[#414751]">Multimedia/Imágenes</span>
                      </div>
                      <span className="font-bold text-[#121a34]">0.9 TB</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center gap-2">
                        <IonIcon icon={ellipse} className="text-gray-500 text-[8px]" />
                        <span className="text-[#414751]">Base de Datos</span>
                      </div>
                      <span className="font-bold text-[#121a34]">0.4 TB</span>
                    </div>
                  </div>

                </div>

              </div>
              
            </div>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AdminArchivos;
