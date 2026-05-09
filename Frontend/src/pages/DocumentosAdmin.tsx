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
  chevronForwardOutline
} from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const DocumentosAdmin: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex w-full min-h-screen font-['Public_Sans',sans-serif] bg-white">
          
          {/* Sidebar */}
          <aside className="w-[208px] bg-[#eee] border-r border-[#a8b7c7] flex flex-col justify-between shrink-0 h-screen sticky top-0">
            <div>
              {/* Sidebar Header */}
              <div className="p-6">
                <h1 className="font-['Inter',sans-serif] font-black text-[#111] text-lg leading-7 tracking-tighter">
                  Municipalidad Santo Domingo
                </h1>
                <p className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-[10px] tracking-widest uppercase mt-2">
                  Administrador de archivos
                </p>
              </div>

              {/* Navigation */}
              <nav className="mt-4">
                <ul className="flex flex-col">
                  <li onClick={() => history.push('/dashboard')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">
                    <IonIcon icon={homeOutline} className="text-[#4a4a4a] text-lg" />
                    <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">
                      Dashboard
                    </span>
                  </li>
                  {/* Active Item */}
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

            {/* Sidebar Bottom */}
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

            {/* Content Container (Scrollable) */}
            <div className="p-8 flex flex-col gap-6 overflow-y-auto flex-1">
              
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
              <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col flex-1 min-h-0">
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
                            Permiso<br/>Edificación
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
                            <button onClick={() => history.push('/admin/documentos/detalles')} className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={eyeOutline} className="text-lg" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={downloadOutline} className="text-lg" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={createOutline} className="text-lg" /></button>
                          </div>
                        </td>
                      </tr>

                      {/* Row 2 */}
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
                            <button onClick={() => history.push('/admin/documentos/detalles')} className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={eyeOutline} className="text-lg" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={downloadOutline} className="text-lg" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={createOutline} className="text-lg" /></button>
                          </div>
                        </td>
                      </tr>

                      {/* Row 3 (Terminado) */}
                      <tr className="hover:bg-gray-50 transition-colors opacity-70">
                        <td className="p-0">
                          <div className="flex items-center pl-6 h-full py-6">
                            <div className="w-1 h-8 bg-green-500/30 rounded-full mr-4"></div>
                            <div className="text-[#121a34] text-base font-normal">
                              <div>#EXP-2024-</div>
                              <div>0885</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-[#121a34] text-base">Ricardo Lagos Soto</div>
                        </td>
                        <td className="p-6">
                          <div className="text-[#121a34] text-xs font-medium">Patente Comercial</div>
                        </td>
                        <td className="p-6">
                          <div className="text-[#414751] text-base">
                            <div>11 Oct 2023,</div>
                            <div>16:15</div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="inline-flex items-center gap-1.5 bg-[#dcfce7] px-3 py-1 rounded-full">
                            <IonIcon icon={checkmarkCircleOutline} className="text-[#15803d]" />
                            <span className="text-[#15803d] text-xs font-bold">Terminado</span>
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex items-center justify-end gap-2 text-gray-500">
                            <button onClick={() => history.push('/admin/documentos/detalles')} className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={eyeOutline} className="text-lg" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={downloadOutline} className="text-lg" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={createOutline} className="text-lg" /></button>
                          </div>
                        </td>
                      </tr>

                      {/* Row 4 */}
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-0">
                          <div className="flex items-center pl-6 h-full py-6">
                            <div className="w-1 h-8 bg-gray-300 rounded-full mr-4"></div>
                            <div className="text-[#121a34] text-base font-normal">
                              <div>#EXP-2024-</div>
                              <div>0894</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-[#121a34] text-base">Inmobiliaria Mar Azul</div>
                        </td>
                        <td className="p-6">
                          <div className="text-[#121a34] text-xs font-medium">Modificación<br/>Planos</div>
                        </td>
                        <td className="p-6">
                          <div className="text-[#414751] text-base">
                            <div>12 Oct 2023,</div>
                            <div>11:05</div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="inline-flex items-center gap-1.5 bg-[#dbe1ff] px-3 py-1 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#717782]"></div>
                            <span className="text-[#414751] text-xs font-bold">Ingresado</span>
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex items-center justify-end gap-2 text-gray-500">
                            <button onClick={() => history.push('/admin/documentos/detalles')} className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={eyeOutline} className="text-lg" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={downloadOutline} className="text-lg" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={createOutline} className="text-lg" /></button>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Row 5 */}
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-0">
                          <div className="flex items-center pl-6 h-full py-6">
                            <div className="w-1 h-8 bg-gray-300 rounded-full mr-4"></div>
                            <div className="text-[#121a34] text-base font-normal">
                              <div>#EXP-2024-</div>
                              <div>0894</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="text-[#121a34] text-base">Inmobiliaria Mar Azul</div>
                        </td>
                        <td className="p-6">
                          <div className="text-[#121a34] text-xs font-medium">Modificación<br/>Planos</div>
                        </td>
                        <td className="p-6">
                          <div className="text-[#414751] text-base">
                            <div>12 Oct 2023,</div>
                            <div>11:05</div>
                          </div>
                        </td>
                        <td className="p-6">
                          <div className="inline-flex items-center gap-1.5 bg-[#dbe1ff] px-3 py-1 rounded-full">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#717782]"></div>
                            <span className="text-[#414751] text-xs font-bold">Ingresado</span>
                          </div>
                        </td>
                        <td className="p-6 text-right">
                          <div className="flex items-center justify-end gap-2 text-gray-500">
                            <button onClick={() => history.push('/admin/documentos/detalles')} className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={eyeOutline} className="text-lg" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={downloadOutline} className="text-lg" /></button>
                            <button className="p-1.5 hover:bg-gray-100 rounded transition-colors"><IonIcon icon={createOutline} className="text-lg" /></button>
                          </div>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                <div className="bg-[#f2f3ff] border-t border-gray-200 p-4 flex justify-between items-center text-sm text-[#414751]">
                  <div>Mostrando 1-5 de 61 expedientes</div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors" disabled>
                      <IonIcon icon={chevronBackOutline} className="text-lg" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center bg-[#00518e] text-white rounded-md font-medium">1</button>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-md font-medium transition-colors">2</button>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-md font-medium transition-colors">3</button>
                    <span className="px-1 text-gray-500">...</span>
                    <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-md font-medium transition-colors">13</button>
                    <button className="p-1.5 text-[#414751] hover:bg-gray-200 rounded transition-colors">
                      <IonIcon icon={chevronForwardOutline} className="text-lg" />
                    </button>
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

export default DocumentosAdmin;
