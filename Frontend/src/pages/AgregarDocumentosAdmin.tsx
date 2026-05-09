import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { 
  homeOutline, 
  documentTextOutline, 
  folderOpenOutline,
  addOutline,
  timeOutline,
  arrowBackOutline,
  chevronDownOutline,
  cloudUploadOutline,
  documentOutline,
  imageOutline,
  trashOutline,
  informationCircleOutline,
  searchOutline,
  notificationsOutline,
  settingsOutline
} from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const AgregarDocumentosAdmin: React.FC = () => {
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
                  <li className="bg-[#a8b7c7] border-r-4 border-[#fe6565] flex items-center px-4 py-3 gap-3">
                    <IonIcon icon={documentTextOutline} className="text-[#4a4a4a] text-lg" />
                    <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">
                      Documentos
                    </span>
                  </li>
                  <li onClick={() => history.push('/admin/archivos')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">
                    <IonIcon icon={folderOpenOutline} className="text-[#4a4a4a] text-lg" />
                    <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase leading-tight">
                      Administración<br/>de archivos
                    </span>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="p-4 flex flex-col gap-4">
              <button className="bg-[#050d2c] hover:bg-[#0a184a] text-white flex items-center justify-center gap-2 py-3 rounded text-xs font-bold tracking-widest uppercase transition-colors">
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
          <main className="flex-1 flex flex-col min-w-0 bg-white">
            
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
            <div className="flex flex-col p-6 w-full max-w-[1200px] mx-auto overflow-y-auto">
              
              <div className="mb-6">
                <button onClick={() => history.push('/admin/documentos')} className="bg-[#050d2c] text-white flex items-center gap-2 px-6 py-2.5 rounded text-xs font-bold tracking-widest uppercase transition-colors hover:bg-[#0a184a]">
                  <IonIcon icon={arrowBackOutline} className="text-lg" />
                  Volver Atrás
                </button>
              </div>

              <div className="flex items-center gap-2 mb-8">
                <span className="text-[#fe6565] font-['Inter',sans-serif] font-black text-[10px] tracking-widest uppercase">i</span>
                <h1 className="text-[#111] font-['Inter',sans-serif] font-extrabold text-4xl tracking-tight m-0">Agregar documentos</h1>
              </div>

              <div className="flex flex-col lg:flex-row gap-8 w-full">
                
                {/* Form Left Side */}
                <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-8 flex flex-col gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
                  
                  {/* Tipo de Trámite */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[#121a34] font-bold text-sm">
                      Tipo de Trámite <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select className="w-full bg-[#f2f3ff] border-none rounded-lg p-3.5 pr-10 text-sm text-[#121a34] appearance-none focus:ring-2 focus:ring-[#00518e]/30 outline-none cursor-pointer">
                        <option value="" disabled selected>Seleccione una categoría</option>
                        <option value="patente">Renovación de Patente</option>
                        <option value="obras">Permiso de Obras</option>
                        <option value="otros">Otros Trámites</option>
                      </select>
                      <IonIcon icon={chevronDownOutline} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>

                  {/* Asunto */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[#121a34] font-bold text-sm">
                      Asunto <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Ej: Solicitud de renovación de patente 2024"
                      className="bg-[#f2f3ff] border-none rounded-lg p-3.5 text-sm text-[#121a34] focus:ring-2 focus:ring-[#00518e]/30 outline-none w-full"
                    />
                  </div>

                  {/* Descripción Detallada */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[#121a34] font-bold text-sm">Descripción Detallada</label>
                    <textarea 
                      rows={6}
                      placeholder="Indique los detalles relevantes para la gestión de este documento..."
                      className="bg-[#f2f3ff] border-none rounded-lg p-3.5 text-sm text-[#121a34] focus:ring-2 focus:ring-[#00518e]/30 outline-none w-full resize-none placeholder:text-gray-400"
                    ></textarea>
                    <span className="text-right text-gray-500 text-[11px] mt-1">0 / 1000 caracteres</span>
                  </div>

                </div>

                {/* Upload Right Side */}
                <div className="w-full lg:w-[320px] shrink-0 border border-[#a8b7c7]/40 rounded-2xl p-6 bg-[#fcfcfc] flex flex-col gap-4">
                  
                  {/* Upload Area */}
                  <div className="bg-[#f2f3ff] border border-dashed border-[#a8b7c7] rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-blue-50/50 transition-colors h-[180px]">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#00518e] shadow-sm">
                      <IonIcon icon={cloudUploadOutline} className="text-xl" />
                    </div>
                    <div>
                      <p className="text-[#00518e] font-bold text-sm m-0">Haz clic o arrastra archivos</p>
                      <p className="text-[#4a4a4a] text-xs mt-1 m-0">PDF, JPG o PNG (Máx 10MB)</p>
                    </div>
                  </div>

                  {/* Uploaded Files */}
                  <div className="flex flex-col gap-3 mt-2">
                    {/* File 1 */}
                    <div className="bg-[#f2f3ff] border border-gray-200/60 rounded-lg p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                        <IonIcon icon={documentOutline} className="text-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#121a34] font-bold text-[11px] truncate m-0 leading-tight">solicitud_patente_firmada.pdf</p>
                        <p className="text-gray-500 text-[9px] m-0 mt-0.5">1.2 MB • Cargado</p>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
                        <IonIcon icon={trashOutline} className="text-lg" />
                      </button>
                    </div>

                    {/* File 2 */}
                    <div className="bg-[#f2f3ff] border border-gray-200/60 rounded-lg p-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center text-gray-500 shrink-0">
                        <IonIcon icon={imageOutline} className="text-lg" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[#121a34] font-bold text-[11px] truncate m-0 leading-tight">cedula_identidad_anverso.jpg</p>
                        <p className="text-gray-500 text-[9px] m-0 mt-0.5">845 KB • Cargado</p>
                      </div>
                      <button className="text-gray-400 hover:text-red-500 transition-colors p-1">
                        <IonIcon icon={trashOutline} className="text-lg" />
                      </button>
                    </div>
                  </div>

                  {/* Info Box */}
                  <div className="bg-[#f2f3ff] border border-blue-100 rounded-lg p-4 flex gap-3 items-start mt-auto">
                    <IonIcon icon={informationCircleOutline} className="text-[#00518e] text-lg shrink-0" />
                    <p className="text-[#121a34] text-xs m-0 leading-relaxed">
                      Asegúrese de adjuntar todos los documentos requeridos por la ley para evitar retrasos.
                    </p>
                  </div>

                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center mt-12 mb-8">
                <button onClick={() => history.push('/admin/documentos')} className="bg-[#050d2c] text-white px-12 py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-colors hover:bg-[#0a184a] shadow-lg shadow-blue-900/10">
                  Aceptar
                </button>
              </div>

            </div>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AgregarDocumentosAdmin;
