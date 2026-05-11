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
  eyeOutline,
  downloadOutline,
  createOutline,
  copyOutline,
  clipboardOutline,
  checkmarkCircleOutline,
  filterOutline,
  chevronBackOutline,
  chevronForwardOutline,
  closeOutline,
  documentOutline,
  imageOutline,
  pencilOutline
} from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const DocumentosAdminDetails: React.FC = () => {
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
                  <li onClick={() => history.push('/admin/dashboard')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">
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
                      Administración<br />de archivos
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

            {/* Content Container */}
            <div className="p-8 flex flex-col gap-6 overflow-y-auto flex-1 pr-[460px]"> {/* Added padding for drawer */}

              {/* Header Section */}
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[#fe6565] font-['Inter',sans-serif] font-black text-[10px] tracking-widest uppercase">i</span>
                    <h1 className="text-[#111] font-['Inter',sans-serif] font-extrabold text-4xl tracking-tight m-0">Documentos</h1>
                  </div>
                  <p className="text-[#414751] text-base m-0 max-w-md">Gestione y revise la documentación municipal pendiente de resolución.</p>
                </div>

                {/* Filter Chips */}
                <div className="flex items-center bg-[#f2f3ff] rounded-xl p-1.5 shadow-sm border border-gray-200">
                  <button className="flex items-center gap-2 bg-[#00518e] text-white px-4 py-2 rounded-lg text-sm transition-colors">
                    <IonIcon icon={copyOutline} />
                    Todos
                  </button>
                  <button className="flex items-center gap-2 text-[#414751] hover:bg-white px-4 py-2 rounded-lg text-sm transition-colors">
                    <IonIcon icon={clipboardOutline} />
                    Pendientes
                  </button>
                  <button className="flex items-center gap-2 text-[#414751] hover:bg-white px-4 py-2 rounded-lg text-sm transition-colors">
                    <IonIcon icon={checkmarkCircleOutline} />
                    Terminados
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-2"></div>
                  <button className="text-[#414751] hover:bg-white p-2 rounded-lg transition-colors flex items-center justify-center">
                    <IonIcon icon={filterOutline} />
                  </button>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col flex-1 min-h-0 relative">
                {/* Dark overlay specifically over the table area to indicate the drawer is open */}
                <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-20 rounded-xl pointer-events-none border border-gray-200"></div>

                <div className="overflow-x-auto overflow-y-auto flex-1">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead className="sticky top-0 bg-[#ebedff] z-10 border-b border-gray-200">
                      <tr className="text-[#414751] text-base font-semibold">
                        <th className="p-6">ID Expediente</th>
                        <th className="p-6">Solicitante</th>
                        <th className="p-6">Tipo de Trámite</th>
                        <th className="p-6">Fecha Ingreso</th>
                        <th className="p-6">Estado</th>
                        <th className="p-6 text-right">Acciones</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {/* Row 1 */}
                      <tr className="hover:bg-blue-50/50 transition-colors bg-blue-50/30">
                        <td className="p-0">
                          <div className="flex items-center pl-6 h-full py-6">
                            <div className="w-1 h-8 bg-[#00518e] rounded-full mr-4"></div>
                            <div className="text-[#00518e] text-base font-normal">
                              <div>#EXP-2024-</div>
                              <div>0892</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-[#121a34] text-base">María José Urzúa</div>
                          <div className="text-[#414751] text-xs font-medium">15.432.110-K</div>
                        </td>
                        <td className="p-6">
                          <div className="inline-block bg-[#ddd] text-[#5f6161] text-xs font-medium px-2 py-1 rounded whitespace-nowrap">
                            Permiso<br />Edificación
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-[#414751] text-base">
                            <div>12 Oct 2023,</div>
                            <div>09:45</div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="inline-flex items-center gap-1.5 bg-[#dbeafe] px-3 py-1 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#1d4ed8]"></div>
                            <span className="text-[#1d4ed8] text-xs font-bold">En Revisión</span>
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex items-center justify-end gap-2 text-gray-500">
                            <button onClick={() => history.push('/admin/documentos/expandido')} className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={eyeOutline} className="text-lg" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={downloadOutline} className="text-lg" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={createOutline} className="text-lg" /></button>
                          </div>
                        </td>
                      </tr>
                      {/* Additional rows truncated for brevity in this view */}
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-0">
                          <div className="flex items-center pl-6 h-full py-6">
                            <div className="w-1 h-8 bg-gray-300 rounded-full mr-4"></div>
                            <div className="text-[#121a34] text-base font-normal">
                              <div>#EXP-2024-</div>
                              <div>0893</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-[#121a34] text-base">Constructora Alerce SpA</div>
                          <div className="text-[#414751] text-xs font-medium">76.012.333-2</div>
                        </td>
                        <td className="p-6">
                          <div className="inline-block bg-[#ddd] text-[#5f6161] text-xs font-medium px-2 py-1 rounded">
                            Recepción Final
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-[#414751] text-base">
                            <div>12 Oct 2023,</div>
                            <div>10:20</div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="inline-flex items-center gap-1.5 bg-[#ffdad8] px-3 py-1 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#9a1b24]"></div>
                            <span className="text-[#8e101d] text-xs font-bold">Urgente</span>
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex items-center justify-end gap-2 text-gray-500">
                            <button onClick={() => history.push('/admin/documentos/expandido')} className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={eyeOutline} className="text-lg" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={downloadOutline} className="text-lg" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={createOutline} className="text-lg" /></button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-[#f2f3ff] border-t border-gray-200 p-4 flex justify-between items-center text-sm text-[#414751]">
                  <div>Mostrando 1-5 de 61 expedientes</div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors" disabled>
                      <IonIcon icon={chevronBackOutline} className="text-lg" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center bg-[#00518e] text-white rounded-md font-medium">1</button>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-md font-medium transition-colors">2</button>
                    <button className="p-1.5 text-[#414751] hover:bg-gray-200 rounded transition-colors">
                      <IonIcon icon={chevronForwardOutline} className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Side Drawer Overlay */}
          <div className="absolute top-[60px] right-0 w-[448px] h-[calc(100vh-60px)] bg-white shadow-[-8px_0_24px_-4px_rgba(0,0,0,0.1)] z-30 flex flex-col border-l border-gray-200 animate-in slide-in-from-right duration-300">
            {/* Drawer Header */}
            <div className="p-6 border-b border-gray-200 bg-[#f2f3ff] flex justify-between items-center shrink-0">
              <div>
                <p className="text-[#00518e] font-['Public_Sans',sans-serif] font-bold text-[10px] tracking-widest uppercase m-0">
                  Detalles de expediente
                </p>
                <h2 className="text-[#121a34] font-['Public_Sans',sans-serif] font-semibold text-2xl m-0 mt-1">
                  #EXP-2024-0892
                </h2>
              </div>
              <button onClick={() => history.push('/admin/documentos')} className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors text-gray-500">
                <IonIcon icon={closeOutline} className="text-xl" />
              </button>
            </div>

            {/* Drawer Scrollable Content */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-8">

              {/* Status Section */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#414751] font-semibold text-sm">Estado Actual</span>
                  <div className="inline-flex items-center gap-1.5 bg-[#dbeafe] px-3 py-1 rounded-full">
                    <span className="text-[#1d4ed8] text-xs font-bold">En Revisión</span>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-[#414751] font-medium text-xs">Solicitante:</span>
                    <span className="text-[#121a34] text-sm">María José Urzúa</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#414751] font-medium text-xs">Dirección:</span>
                    <span className="text-[#121a34] text-sm text-right">Av. Costanera 1420, Santo Domingo</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[#414751] font-medium text-xs">Asignado a:</span>
                    <span className="text-[#121a34] text-sm">Dpto. Obras Municipales</span>
                  </div>
                </div>
              </div>

              {/* Attached Documents */}
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <span className="text-[#121a34] text-sm font-normal tracking-wide uppercase">Documentos Adjuntos (4)</span>
                  <button className="text-[#00518e] text-xs font-bold hover:underline">Ver todos</button>
                </div>

                <div className="flex flex-col gap-2">
                  {/* Doc 1 */}
                  <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                      <IonIcon icon={documentOutline} className="text-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#121a34] text-sm truncate m-0 font-medium">Planos_Arquitectura_V1.pdf</p>
                      <p className="text-[#414751] text-[10px] m-0 mt-0.5">2.4 MB • 12 Oct 2023</p>
                    </div>
                    <button className="text-gray-400 group-hover:text-gray-700 p-1 rounded hover:bg-gray-200 transition-colors">
                      <IonIcon icon={downloadOutline} className="text-lg" />
                    </button>
                  </div>

                  {/* Doc 2 */}
                  <div className="border border-gray-200 rounded-lg p-3 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer group">
                    <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                      <IonIcon icon={imageOutline} className="text-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[#121a34] text-sm truncate m-0 font-medium">Foto_Terreno_Frontal.jpg</p>
                      <p className="text-[#414751] text-[10px] m-0 mt-0.5">4.2 MB • 12 Oct 2023</p>
                    </div>
                    <button className="text-gray-400 group-hover:text-gray-700 p-1 rounded hover:bg-gray-200 transition-colors">
                      <IonIcon icon={downloadOutline} className="text-lg" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="flex flex-col gap-4">
                <span className="text-[#121a34] text-sm font-normal tracking-wide uppercase">Historial de Trámite</span>

                <div className="relative pl-6 flex flex-col gap-6">
                  {/* Vertical Line */}
                  <div className="absolute top-2 bottom-2 left-2 w-0.5 bg-gray-200"></div>

                  {/* Step 1 */}
                  <div className="relative flex flex-col gap-1">
                    <div className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full bg-[#00518e] ring-4 ring-blue-100"></div>
                    <p className="text-[#121a34] text-sm m-0 font-medium">Ingreso a Revisión Técnica</p>
                    <p className="text-[#414751] text-xs m-0">Hace 2 horas • por Carlos Rodriguez</p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex flex-col gap-1">
                    <div className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full bg-gray-300 ring-4 ring-white"></div>
                    <p className="text-[#121a34] text-sm m-0 font-medium">Validación de Antecedentes</p>
                    <p className="text-[#414751] text-xs m-0">Hoy, 09:15 • Sistema Automático</p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex flex-col gap-1">
                    <div className="absolute -left-[26px] top-1.5 w-3 h-3 rounded-full bg-gray-300 ring-4 ring-white"></div>
                    <p className="text-[#121a34] text-sm m-0 font-medium">Recepción de Solicitud Online</p>
                    <p className="text-[#414751] text-xs m-0">Ayer, 18:30 • Portal Ciudadano</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Drawer Footer */}
            <div className="p-6 border-t border-gray-200 bg-white grid grid-cols-2 gap-4 shrink-0">
              <button onClick={() => history.push('/admin/documentos/expandido')} className="flex items-center justify-center gap-2 border border-[#717782] text-[#121a34] rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition-colors">
                <IonIcon icon={pencilOutline} className="text-lg" />
                Observar
              </button>
              <button className="flex items-center justify-center gap-2 bg-[#00518e] text-white rounded-xl py-3 text-sm font-medium hover:bg-[#003d6b] transition-colors shadow-md shadow-blue-900/20">
                <IonIcon icon={documentTextOutline} className="text-lg" />
                Firma Electrónica
              </button>
            </div>
          </div>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default DocumentosAdminDetails;
