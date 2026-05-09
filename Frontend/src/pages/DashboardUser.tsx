import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { 
  searchOutline, 
  notificationsOutline, 
  settingsOutline, 
  homeOutline, 
  documentTextOutline, 
  addOutline,
  chevronDownOutline,
  timeOutline,
  ticketOutline
} from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const DashboardUser: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="flex w-full min-h-screen font-['Public_Sans',sans-serif] bg-[#f8f9fa]">
          
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
                  <li onClick={() => history.push('/usuario/documentos')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">
                    <IonIcon icon={documentTextOutline} className="text-[#4a4a4a] text-lg" />
                    <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">
                      Documentos
                    </span>
                  </li>
                  <li onClick={() => history.push('/abrir-ticket')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">
                    <IonIcon icon={ticketOutline} className="text-[#4a4a4a] text-lg" />
                    <span className="font-['Inter',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase leading-tight">
                      Abrir Ticket
                    </span>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Sidebar Bottom */}
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
          <main className="flex-1 flex flex-col min-w-0">
            
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
            <div className="p-8 flex flex-col gap-10 overflow-y-auto">
              
              {/* Hero Section */}
              <div className="flex flex-col gap-2">
                <div className="flex items-start gap-1">
                  <span className="text-[#006fb3] font-['Inter',sans-serif] font-black text-[10px] tracking-widest uppercase mt-1">i</span>
                  <div className="flex flex-col">
                    <h1 className="text-black font-['Inter',sans-serif] font-extrabold text-4xl tracking-tight m-0">
                      ¡Bienvenido, <span className="text-[#006fb3]">Vecino!</span>
                    </h1>
                    <p className="text-[#111] font-['Inter',sans-serif] font-bold text-[10px] tracking-widest uppercase mt-2">
                      ¿Qué consulta tienes hoy?
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Section */}
              <div className="flex flex-col gap-6 mt-4">
                <div className="flex justify-between items-center w-full max-w-[950px]">
                  <h2 className="text-[#006fb3] font-['Inter',sans-serif] font-bold text-[10px] tracking-widest uppercase">
                    Estado de mis trámites
                  </h2>
                  <span onClick={() => history.push('/usuario/documentos')} className="text-[#006fb3] font-['Inter',sans-serif] font-bold text-[11px] tracking-wide hover:underline cursor-pointer">
                    Ver todos
                  </span>
                </div>

                <div className="flex flex-wrap gap-6">
                  {/* Card 1: Aprobado */}
                  <div className="bg-white border-l-4 border-[#00ff2f]/40 rounded-lg w-[293px] h-[167px] shadow-sm flex flex-col relative p-5">
                    <div className="flex justify-between items-start w-full">
                      <div className="bg-[#60eca8]/20 text-[#00964d] px-2 py-1 rounded text-[10px] font-bold tracking-tight uppercase">
                        Aprobado
                      </div>
                      <span className="text-gray-400 text-[8px] font-bold tracking-widest uppercase mt-1">Exp. #2024-001</span>
                    </div>
                    
                    <div className="mt-4 flex-1">
                      <h3 className="text-[#111] font-['Inter',sans-serif] font-bold text-sm tracking-wide leading-tight">
                        Permiso de Construcción
                      </h3>
                    </div>

                    <div className="border-t border-gray-200/60 pt-3 flex flex-col gap-2 mt-auto">
                      <div className="text-gray-500 text-xs font-medium tracking-wide">
                        Inicio: 20-12-2026
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium tracking-wide">
                        <IonIcon icon={timeOutline} />
                        <span>Ultima actualizacion: Ayer</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 2: Pendiente */}
                  <div className="bg-white border-l-4 border-[#a8b7c7]/40 rounded-lg w-[293px] h-[167px] shadow-sm flex flex-col relative p-5">
                    <div className="flex justify-between items-start w-full">
                      <div className="bg-[#a8b7c7]/20 text-[#5273bc] px-2 py-1 rounded text-[10px] font-bold tracking-tight uppercase">
                        Pendiente
                      </div>
                      <span className="text-gray-400 text-[8px] font-bold tracking-widest uppercase mt-1">Exp. #2024-001</span>
                    </div>
                    
                    <div className="mt-4 flex-1">
                      <h3 className="text-[#111] font-['Inter',sans-serif] font-bold text-sm tracking-wide leading-tight">
                        Permiso de Construcción
                      </h3>
                    </div>

                    <div className="border-t border-gray-200/60 pt-3 flex flex-col gap-2 mt-auto">
                      <div className="text-gray-500 text-xs font-medium tracking-wide">
                        Inicio: 20-12-2026
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium tracking-wide">
                        <IonIcon icon={timeOutline} />
                        <span>Ultima actualizacion</span>
                      </div>
                    </div>
                  </div>

                  {/* Card 3: Rechazado */}
                  <div className="bg-white border-l-4 border-[#fe6565]/40 rounded-lg w-[293px] h-[167px] shadow-sm flex flex-col relative p-5">
                    <div className="flex justify-between items-start w-full">
                      <div className="bg-[#fe6565]/10 text-[#fe6565] px-2 py-1 rounded text-[10px] font-bold tracking-tight uppercase">
                        Rechazado
                      </div>
                      <span className="text-gray-400 text-[8px] font-bold tracking-widest uppercase mt-1">Exp. #2024-001</span>
                    </div>
                    
                    <div className="mt-4 flex-1">
                      <h3 className="text-[#111] font-['Inter',sans-serif] font-bold text-sm tracking-wide leading-tight">
                        Permiso de Construcción
                      </h3>
                    </div>

                    <div className="border-t border-gray-200/60 pt-3 flex flex-col gap-2 mt-auto">
                      <div className="text-gray-500 text-xs font-medium tracking-wide">
                        Inicio: 20-12-2026
                      </div>
                      <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium tracking-wide">
                        <IonIcon icon={timeOutline} />
                        <span>Ultima actualizacion</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="bg-[#a8b7c7]/10 border border-gray-200 rounded-xl p-8 max-w-[600px] mt-4">
                <h2 className="text-[#00518e] font-['Public_Sans',sans-serif] font-semibold text-2xl mb-6">
                  Preguntas Frecuentes
                </h2>
                
                <div className="flex flex-col gap-4">
                  <div className="bg-white rounded-lg p-4 flex justify-between items-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="text-[#121a34] font-['Public_Sans',sans-serif]">¿Cómo subo mi declaración de impuestos?</span>
                    <IonIcon icon={chevronDownOutline} className="text-gray-500" />
                  </div>
                  <div className="bg-white rounded-lg p-4 flex justify-between items-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="text-[#121a34] font-['Public_Sans',sans-serif]">¿Cuánto demora el trámite de obra menor?</span>
                    <IonIcon icon={chevronDownOutline} className="text-gray-500" />
                  </div>
                  <div className="bg-white rounded-lg p-4 flex justify-between items-center shadow-sm cursor-pointer hover:bg-gray-50 transition-colors">
                    <span className="text-[#121a34] font-['Public_Sans',sans-serif]">¿Dónde retiro mi certificado aprobado?</span>
                    <IonIcon icon={chevronDownOutline} className="text-gray-500" />
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

export default DashboardUser;
