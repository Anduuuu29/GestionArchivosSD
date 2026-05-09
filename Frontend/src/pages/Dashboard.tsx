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
  chevronForwardOutline,
  chevronDownOutline
} from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Dashboard: React.FC = () => {
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
                  {/* Active Item */}
                  <li className="bg-[#a8b7c7] border-r-4 border-[#fe6565] flex items-center px-4 py-3 gap-3">
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
          <main className="flex-1 flex flex-col min-w-0 bg-[#f8f9fa]">
            
            {/* Topbar */}
            <header className="h-[60px] bg-[#050d2c] flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
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

            {/* Dashboard Content */}
            <div className="p-8 flex flex-col gap-8 overflow-y-auto">
              
              {/* Chart Section */}
              <section className="bg-white border border-[#c1c7d3] rounded-2xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-[#121a34] text-2xl font-semibold">Flujo de Documentos</h2>
                  <div className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded">
                    <span className="text-[#414751] text-xs font-medium">Última Semana</span>
                    <IonIcon icon={chevronDownOutline} className="text-[10px]" />
                  </div>
                </div>
                
                {/* Simulated Bar Chart */}
                <div className="h-[256px] relative flex items-end justify-between border-b border-gray-200 pb-8 pt-4">
                  {/* Grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
                    <div className="border-t border-gray-200 w-full"></div>
                    <div className="border-t border-gray-200 w-full"></div>
                    <div className="border-t border-gray-200 w-full"></div>
                    <div className="border-t border-gray-200 w-full"></div>
                  </div>

                  {/* Bars */}
                  <div className="relative w-full flex justify-between items-end h-full px-4 z-10">
                    <div className="flex flex-col items-center gap-2 w-[12%] h-[50%]">
                      <div className="w-full bg-[#0f69b4]/20 h-full rounded-t-lg"></div>
                      <span className="text-[#414751] text-[10px] font-bold">LUN</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-[12%] h-[75%]">
                      <div className="w-full bg-[#0f69b4]/20 h-full rounded-t-lg"></div>
                      <span className="text-[#414751] text-[10px] font-bold">MAR</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-[12%] h-[60%]">
                      <div className="w-full bg-[#0f69b4]/20 h-full rounded-t-lg"></div>
                      <span className="text-[#414751] text-[10px] font-bold">MIE</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-[12%] h-[95%] relative">
                      {/* Tooltip */}
                      <div className="absolute -top-10 bg-[#272f4b] text-white text-[10px] px-2 py-1 rounded shadow-md whitespace-nowrap">
                        Hoy: 84 docs
                      </div>
                      <div className="w-full bg-[#00518e] h-full rounded-t-lg"></div>
                      <span className="text-[#00518e] text-[10px] font-extrabold">JUE</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-[12%] h-[55%]">
                      <div className="w-full bg-[#0f69b4]/20 h-full rounded-t-lg"></div>
                      <span className="text-[#414751] text-[10px] font-bold">VIE</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-[12%] h-[20%]">
                      <div className="w-full bg-[#c6c6c7] h-full rounded-t-lg"></div>
                      <span className="text-[#414751] text-[10px] font-bold">SAB</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 w-[12%] h-[15%]">
                      <div className="w-full bg-[#c6c6c7] h-full rounded-t-lg"></div>
                      <span className="text-[#414751] text-[10px] font-bold">DOM</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Tasks Table Section */}
              <section className="bg-white border border-[#c1c7d3] rounded-2xl shadow-sm overflow-hidden flex flex-col">
                <div className="flex justify-between items-center p-6 border-b border-[#c1c7d3]">
                  <h2 className="text-[#121a34] text-2xl font-semibold">Tareas Prioritarias</h2>
                  <div className="bg-[#f2f3ff] rounded-lg px-4 py-2 flex items-center gap-3 w-64">
                    <IonIcon icon={searchOutline} className="text-[#6b7280]" />
                    <input 
                      type="text" 
                      placeholder="Buscar expediente..." 
                      className="bg-transparent border-none outline-none text-[#6b7280] text-sm w-full"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-[#f2f3ff] text-[#414751] text-xs uppercase tracking-wider font-bold">
                        <th className="p-4 pl-6">ID Expediente</th>
                        <th className="p-4">Asunto</th>
                        <th className="p-4">Prioridad</th>
                        <th className="p-4">Tiempo Restante</th>
                        <th className="p-4 pr-6 text-right">Acción</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      
                      {/* Row 1 */}
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 pl-6 font-['Liberation_Mono',monospace] font-bold text-[#00518e] text-sm whitespace-nowrap">
                          EXP-2024-0089
                        </td>
                        <td className="p-4">
                          <div className="text-[#121a34] font-semibold text-base">Solicitud Permiso Edificación</div>
                          <div className="text-[#414751] text-xs">Dirección de Obras Municipales</div>
                        </td>
                        <td className="p-4">
                          <span className="inline-block bg-[#bc3539]/10 text-[#bc3539] border border-[#bc3539]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                            Alta
                          </span>
                        </td>
                        <td className="p-4 text-[#121a34] text-sm font-medium">
                          4 horas
                        </td>
                      <td className="p-4 pr-6 text-right">
                          <button onClick={() => history.push('/admin/documentos/detalles')} className="p-2 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                            <IonIcon icon={eyeOutline} className="text-lg" />
                          </button>
                        </td>
                      </tr>

                      {/* Row 2 */}
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 pl-6 font-['Liberation_Mono',monospace] font-bold text-[#00518e] text-sm whitespace-nowrap">
                          EXP-2024-0102
                        </td>
                        <td className="p-4">
                          <div className="text-[#121a34] font-semibold text-base">Convenio Marco Educación</div>
                          <div className="text-[#414751] text-xs">DAEM Santo Domingo</div>
                        </td>
                        <td className="p-4">
                          <span className="inline-block bg-[#00518e]/10 text-[#00518e] border border-[#00518e]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                            Media
                          </span>
                        </td>
                        <td className="p-4 text-[#121a34] text-sm font-medium">
                          2 días
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <button onClick={() => history.push('/admin/documentos/detalles')} className="p-2 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                            <IonIcon icon={eyeOutline} className="text-lg" />
                          </button>
                        </td>
                      </tr>

                      {/* Row 3 */}
                      <tr className="hover:bg-gray-50 transition-colors">
                        <td className="p-4 pl-6 font-['Liberation_Mono',monospace] font-bold text-[#00518e] text-sm whitespace-nowrap">
                          EXP-2023-1562
                        </td>
                        <td className="p-4">
                          <div className="text-[#121a34] font-semibold text-base">Informe Trimestral de Gestión</div>
                          <div className="text-[#414751] text-xs">Control Interno</div>
                        </td>
                        <td className="p-4">
                          <span className="inline-block bg-[#ba1a1a]/10 text-[#ba1a1a] border border-[#ba1a1a]/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase">
                            Crítica
                          </span>
                        </td>
                        <td className="p-4 text-[#ba1a1a] text-sm font-bold flex items-center gap-2">
                          <IonIcon icon={timeOutline} className="text-lg" />
                          Vencido
                        </td>
                        <td className="p-4 pr-6 text-right">
                          <button onClick={() => history.push('/admin/documentos/detalles')} className="p-2 hover:bg-gray-200 rounded text-gray-600 transition-colors">
                            <IonIcon icon={eyeOutline} className="text-lg" />
                          </button>
                        </td>
                      </tr>

                    </tbody>
                  </table>
                </div>

                <div className="bg-[#f2f3ff] p-4 flex justify-center border-t border-[#c1c7d3]">
                  <button onClick={() => history.push('/admin/documentos')} className="flex items-center gap-2 text-[#00518e] font-semibold text-sm hover:underline">
                    Ver todos los expedientes
                    <IonIcon icon={chevronForwardOutline} />
                  </button>
                </div>
              </section>

            </div>
          </main>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
