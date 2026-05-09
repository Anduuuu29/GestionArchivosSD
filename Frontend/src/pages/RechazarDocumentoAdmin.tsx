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
  downloadOutline,
  printOutline,
  createOutline,
  closeOutline,
  copyOutline,
  checkmarkCircleOutline,
  warningOutline,
  closeCircleOutline
} from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const RechazarDocumentoAdmin: React.FC = () => {
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
          <main className="flex-1 flex flex-col min-w-0 bg-[#f8f9fa] h-screen overflow-hidden">
            
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

            {/* Content Split Container */}
            <div className="flex flex-1 overflow-hidden pointer-events-none opacity-80 filter blur-[1px]">
              
              {/* Document Preview Area */}
              <div className="flex-1 flex flex-col bg-[#f8f9fa] min-w-0">
                {/* Header Toolbar */}
                <div className="h-[60px] border-b border-gray-200 bg-white flex items-center px-6 justify-between shrink-0">
                  <div className="flex items-center gap-3 text-[#121a34]">
                    <IonIcon icon={documentTextOutline} className="text-[#00518e] text-xl" />
                    <span className="font-semibold text-sm">Memorándum_2023_0452_MuniSD.pdf</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 text-[#414751] hover:text-[#121a34] text-sm font-medium transition-colors">
                      <IonIcon icon={downloadOutline} className="text-lg" />
                      Descargar
                    </button>
                    <button className="flex items-center gap-2 text-[#414751] hover:text-[#121a34] text-sm font-medium transition-colors">
                      <IonIcon icon={printOutline} className="text-lg" />
                      Imprimir
                    </button>
                    <div className="w-px h-5 bg-gray-300 mx-2"></div>
                    <button className="flex items-center gap-2 bg-[#00518e] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-[#003d6b]">
                      <IonIcon icon={createOutline} className="text-lg" />
                      Firma Digital
                    </button>
                    <button className="text-gray-500 hover:bg-gray-100 p-1.5 rounded transition-colors">
                      <IonIcon icon={closeOutline} className="text-2xl" />
                    </button>
                  </div>
                </div>

                {/* PDF Viewer Mock */}
                <div className="flex-1 overflow-auto p-8 bg-[#f8f9fa] flex justify-center">
                  <div className="w-full max-w-[800px] min-h-[1000px] bg-white shadow-md border border-gray-200 p-12 relative flex flex-col">
                    <div className="absolute top-0 left-0 bottom-0 w-2 bg-[#00518e]"></div>
                    
                    <div className="flex justify-between items-start mb-16 pl-6">
                      <div className="flex flex-col items-center">
                        <div className="w-16 h-16 bg-[#eef2fa] rounded flex items-center justify-center text-[#00518e] mb-2">
                          <IonIcon icon={homeOutline} className="text-3xl" />
                        </div>
                        <span className="text-[#121a34] font-bold text-[10px] tracking-widest text-center">
                          MUNICIPALIDAD<br/>SANTO DOMINGO
                        </span>
                      </div>
                      <div className="text-right">
                        <h2 className="text-[#00518e] font-bold text-lg mb-1">MEMORÁNDUM N° 2023/0452</h2>
                        <p className="text-gray-500 text-xs">Santo Domingo, 24 de Octubre de 2023</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 pl-6 mb-12">
                      <div className="flex">
                        <span className="font-bold text-[#121a34] w-32">DE:</span>
                        <span className="text-[#414751]">Dirección de Obras Municipales</span>
                      </div>
                      <div className="flex">
                        <span className="font-bold text-[#121a34] w-32">PARA:</span>
                        <span className="text-[#414751]">Secretaría Comunal de Planificación<br/>(SECPLA)</span>
                      </div>
                      <div className="flex">
                        <span className="font-bold text-[#121a34] w-32">MATERIA:</span>
                        <span className="font-bold text-[#121a34]">Solicitud de revisión técnica - Proyecto Costanera</span>
                      </div>
                    </div>

                    <div className="pl-6 text-[#414751] leading-relaxed">
                      <p className="mb-6">Estimados junto con saludar,</p>
                      <p className="mb-4">
                        Por medio del presente, se remite para su revisión y
                        análisis técnico la carpeta correspondiente al proyecto
                        de mejoramiento del sector Costanera Norte. Se
                        adjuntan los planos de especialidades y el presupuesto
                        estimado para la etapa de licitación pública.
                      </p>
                    </div>

                  </div>
                </div>
              </div>

              {/* Document Details Sidebar */}
              <div className="w-[320px] lg:w-[400px] shrink-0 bg-white border-l border-gray-200 flex flex-col overflow-y-auto">
                <div className="p-6 border-b border-gray-100">
                  <h2 className="text-[#00518e] font-bold text-sm tracking-wide uppercase mb-1">DETALLES DEL DOCUMENTO</h2>
                  <p className="text-[#414751] text-xs">Información de trazabilidad administrativa</p>
                </div>

                <div className="p-6 flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-[#414751] font-bold text-[10px] tracking-widest uppercase">ID SISTEMA</span>
                    <div className="bg-[#f2f3ff] rounded-lg p-3 flex justify-between items-center text-[#00518e] font-bold text-sm">
                      SGD - 2023 - 452 - DOM
                      <button className="text-[#00518e] hover:text-[#003d6b] transition-colors">
                        <IonIcon icon={copyOutline} />
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-[#414751] font-bold text-[10px] tracking-widest uppercase">TIPO DE DOCUMENTO</span>
                      <div className="flex items-center gap-2 text-[#121a34] text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00518e]"></div>
                        Memorándum Interno
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#414751] font-bold text-[10px] tracking-widest uppercase">FECHA DE INGRESO</span>
                      <span className="text-[#121a34] text-sm">24 Oct 2023, 09:45 AM</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[#414751] font-bold text-[10px] tracking-widest uppercase">AUTOR / EMISOR</span>
                      <span className="text-[#121a34] text-sm">Andrés Villalobos R.</span>
                      <span className="text-gray-400 text-xs">Dir. Obras Municipales</span>
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="text-[#414751] font-bold text-[10px] tracking-widest uppercase">ESTADO ACTUAL</span>
                      <div className="inline-flex items-center bg-[#dbeafe] text-[#1d4ed8] px-3 py-1 rounded-full text-xs font-bold w-max">
                        PENDIENTE DE FIRMA
                      </div>
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  <div className="flex flex-col gap-4">
                    <span className="text-[#121a34] font-semibold text-sm">Historial de Acciones</span>
                    
                    <div className="relative pl-6 flex flex-col gap-6">
                      <div className="absolute top-2 bottom-2 left-2 w-0.5 bg-gray-200"></div>

                      <div className="relative flex flex-col gap-0.5">
                        <div className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full bg-[#00518e] ring-4 ring-white"></div>
                        <p className="text-[#121a34] text-xs font-bold m-0">Creado por A. Villalobos</p>
                        <p className="text-gray-500 text-[10px] m-0">Hoy, 09:45 AM</p>
                      </div>

                      <div className="relative flex flex-col gap-0.5">
                        <div className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full bg-gray-300 ring-4 ring-white"></div>
                        <p className="text-[#414751] text-xs font-bold m-0">Enviado a revisión técnica</p>
                        <p className="text-gray-400 text-[10px] m-0">Próximo paso</p>
                      </div>
                    </div>

                    <button className="mt-2 flex items-center justify-center gap-2 border border-[#00518e] text-[#00518e] font-bold rounded-lg py-2.5 text-sm hover:bg-blue-50 transition-colors">
                      <IonIcon icon={timeOutline} className="text-lg" />
                      Ver Trazabilidad Completa
                    </button>
                  </div>

                  <hr className="border-gray-100" />

                  <button className="flex items-center justify-center gap-2 border border-red-500 text-red-500 font-bold rounded-lg py-2.5 text-sm hover:bg-red-50 transition-colors">
                    <IonIcon icon={closeCircleOutline} className="text-lg" />
                    Rechazar
                  </button>

                </div>
              </div>
            </div>

          </main>

          {/* Rechazar Documento Modal (Always Visible for this Route) */}
          <div className="absolute inset-0 bg-black/40 z-50 flex items-center justify-center backdrop-blur-[2px]">
            <div className="bg-white rounded-xl shadow-xl w-[500px] max-w-[90vw] overflow-hidden flex flex-col">
              <div className="p-6 flex justify-between items-center">
                <h2 className="text-[#121a34] font-semibold text-xl m-0">Rechazar Documento</h2>
                <button onClick={() => history.push('/admin/documentos/expandido')} className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors">
                  <IonIcon icon={closeOutline} className="text-xl" />
                </button>
              </div>

              <div className="px-6 pb-6 flex flex-col gap-6">
                {/* Alert */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                  <IonIcon icon={warningOutline} className="text-red-700 text-xl shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1">
                    <span className="text-red-700 font-semibold text-sm">Acción Irreversible</span>
                    <span className="text-red-600 text-xs">Al rechazar este documento, el trámite será notificado al remitente y no podrá ser revertido en el sistema actual.</span>
                  </div>
                </div>

                {/* Input area */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#121a34] text-sm">
                    Motivo del Rechazo <span className="text-red-500">*</span>
                  </label>
                  <textarea 
                    rows={5}
                    className="border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#00518e]/30 transition-shadow resize-none placeholder:text-gray-400 text-[#121a34]"
                    placeholder="Describa brevemente la razón por la cual se rechaza este documento..."
                  ></textarea>
                  <span className="text-right text-gray-400 text-xs mt-1">0 / 500 caracteres</span>
                </div>

                {/* Modal Actions */}
                <div className="flex gap-4 pt-2">
                  <button onClick={() => history.push('/admin/documentos/expandido')} className="flex-1 bg-white border border-[#a8b7c7] text-[#121a34] font-medium py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                    Cancelar
                  </button>
                  <button onClick={() => history.push('/admin/documentos')} className="flex-1 flex items-center justify-center gap-2 bg-[#9a1b24] text-white font-medium py-2.5 rounded-lg text-sm hover:bg-red-800 transition-colors">
                    <IonIcon icon={checkmarkCircleOutline} />
                    Confirmar Rechazo
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default RechazarDocumentoAdmin;
