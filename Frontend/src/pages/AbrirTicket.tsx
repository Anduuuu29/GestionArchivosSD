import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { 
  searchOutline, 
  notificationsOutline, 
  settingsOutline, 
  homeOutline, 
  documentTextOutline, 
  ticketOutline,
  addOutline,
  cloudUploadOutline
} from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const AbrirTicket: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex w-full min-h-screen font-['Public_Sans',sans-serif] bg-[#f8f9fa] relative">
          
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
                  <li onClick={() => history.push('/dashboard-user')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">
                    <IonIcon icon={homeOutline} className="text-[#4a4a4a] text-lg" />
                    <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">
                      Dashboard
                    </span>
                  </li>
                  <li onClick={() => history.push('/usuario/documentos')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">
                    <IonIcon icon={documentTextOutline} className="text-[#4a4a4a] text-lg" />
                    <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">
                      Documentos
                    </span>
                  </li>
                  <li className="bg-[#a8b7c7] border-r-4 border-[#fe6565] flex items-center px-4 py-3 gap-3">
                    <IonIcon icon={ticketOutline} className="text-[#4a4a4a] text-lg" />
                    <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase leading-tight">
                      Abrir Ticket
                    </span>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="p-4 flex flex-col gap-4">
              <button onClick={() => history.push('/usuario/documentos/agregar')} className="bg-[#050d2c] hover:bg-[#0a184a] text-white flex items-center justify-center gap-2 py-3 rounded text-xs font-bold tracking-widest uppercase transition-colors">
                <IonIcon icon={addOutline} className="text-lg" />
                Nuevo Trámite
              </button>
              
              <div className="border-t border-[#353535] pt-4">
                <div className="flex items-center gap-3 mt-4 px-4 py-2 hover:bg-[#e0e0e0] cursor-pointer rounded transition-colors">
                  <div className="w-8 h-8 rounded-full bg-[#353535]"></div>
                  <div className="flex flex-col">
                    <span className="font-['Inter',sans-serif] font-bold text-[#111] text-[10px]">USER</span>
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
            <div className="p-8 flex flex-col gap-8 overflow-y-auto w-full max-w-[1200px] mx-auto">
              
              {/* Header Section */}
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#fe6565] font-['Inter',sans-serif] font-black text-[10px] tracking-widest uppercase">i</span>
                <h1 className="text-[#111] font-['Inter',sans-serif] font-extrabold text-4xl tracking-tight m-0">Nuevo Ticket de soporte</h1>
              </div>

              <div className="flex gap-8 flex-col lg:flex-row items-start w-full">
                {/* Left Side: Map Image Placeholder */}
                <div className="flex-1 w-full lg:w-1/2 relative rounded-xl overflow-hidden shadow-sm aspect-video lg:aspect-auto lg:h-[600px] bg-gray-200">
                  {/* Using a placeholder gradient to represent the aerial map image from Figma */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4a724b] via-[#2f4f4f] to-[#1a3a5a] opacity-80 mix-blend-multiply"></div>
                  <div 
                    className="absolute inset-0 bg-cover bg-center" 
                    style={{ backgroundImage: "url('https://images.unsplash.com/photo-1506744031599-bc2c803874e4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80')" }}
                  ></div>
                  <div className="absolute inset-0 backdrop-blur-[2px] bg-black/10"></div>
                </div>

                {/* Right Side: Form Card */}
                <div className="w-full lg:w-[450px] shrink-0 bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col gap-6">
                  
                  {/* Asunto */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[#121a34] font-medium text-sm">Asunto</label>
                    <input 
                      type="text" 
                      placeholder="Ej: Error al adjuntar firma digital en decreto 402"
                      className="bg-[#f2f3ff] border border-transparent rounded-lg p-3 text-sm text-[#121a34] focus:outline-none focus:ring-2 focus:ring-[#00518e]/30 transition-shadow w-full"
                    />
                  </div>

                  {/* Descripción Detallada */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[#121a34] font-medium text-sm">Descripción Detallada</label>
                    <textarea 
                      rows={5}
                      placeholder="Describa el problema, los pasos para reproducirlo y cualquier mensaje de error que haya visualizado..."
                      className="bg-[#f2f3ff] border border-transparent rounded-lg p-3 text-sm text-[#121a34] focus:outline-none focus:ring-2 focus:ring-[#00518e]/30 transition-shadow w-full resize-none"
                    ></textarea>
                  </div>

                  {/* Archivos Adjuntos */}
                  <div className="flex flex-col gap-2">
                    <label className="text-[#121a34] font-medium text-sm">Archivos Adjuntos (Capturas o Logs)</label>
                    <div className="border-2 border-dashed border-[#a8b7c7] rounded-xl p-8 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-gray-50 transition-colors">
                      <div className="text-[#00518e]">
                        <IonIcon icon={cloudUploadOutline} className="text-3xl" />
                      </div>
                      <div>
                        <p className="text-[#121a34] font-medium text-sm m-0">Haga clic para subir o arrastre sus archivos aquí</p>
                        <p className="text-gray-400 text-xs mt-1 m-0">PNG, JPG o PDF (Máx. 10MB por archivo)</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 mt-2">
                    <button onClick={() => history.push('/dashboard-user')} className="flex-1 bg-white border border-[#a8b7c7] text-[#121a34] font-medium py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                      Cancelar
                    </button>
                    <button onClick={() => history.push('/dashboard-user')} className="flex-1 bg-[#00518e] text-white font-medium py-2.5 rounded-lg text-sm hover:bg-[#003d6b] transition-colors shadow-md shadow-blue-900/20">
                      Enviar Ticket
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

export default AbrirTicket;
