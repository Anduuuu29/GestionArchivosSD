import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { eyeOutline, chevronDownOutline } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Register: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="relative w-full min-h-screen flex flex-col font-['Inter',sans-serif] bg-[#f8f9fa]">
          {/* Header */}
          <div className="bg-[#050d2c] border-t-2 border-b-2 border-transparent flex items-center justify-between px-8 py-4 w-full z-10 relative shadow-md">
            <div className="flex items-center gap-4">
              {/* Placeholder for Logo */}
              <div className="w-12 h-12 bg-white/10 rounded-md flex items-center justify-center border border-white/20">
                <span className="text-white font-bold text-xs">LOGO</span>
              </div>
              <h1 className="text-white text-xl md:text-2xl font-black tracking-tighter m-0">
                Municipalidad Santo Domingo
              </h1>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col relative overflow-hidden items-center justify-center p-6 bg-[#eee]">
            
            {/* Ambient Background */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none flex items-center justify-center">
                <div className="absolute w-[800px] h-[800px] bg-[rgba(0,111,179,0.08)] blur-[80px] rounded-full -left-40 top-20"></div>
                <div className="absolute w-[600px] h-[600px] bg-[rgba(0,111,179,0.06)] blur-[60px] rounded-full -right-20 bottom-0"></div>
            </div>

            {/* Register Card */}
            <div className="bg-white border border-[rgba(168,183,199,0.25)] rounded-lg shadow-xl w-full max-w-[678px] p-10 relative z-10 my-8">
              {/* Top light bar accent */}
              <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#60eca880] to-transparent"></div>
              
              <h2 className="text-[#0a132d] text-3xl font-black uppercase tracking-tight mb-8 text-center mt-2">
                Crea una cuenta
              </h2>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Nombre Field */}
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-[#0a132d] text-[10px] font-bold uppercase tracking-[1px]">
                      Nombre
                    </label>
                    <input 
                      type="text" 
                      placeholder="Juan" 
                      className="bg-[rgba(74,74,74,0.1)] border-none rounded p-4 text-[#3f3f46] text-base w-full focus:ring-2 focus:ring-[#006fb3] outline-none transition-all"
                    />
                  </div>
                  {/* Apellido Field */}
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-[#0a132d] text-[10px] font-bold uppercase tracking-[1px]">
                      Apellido
                    </label>
                    <input 
                      type="text" 
                      placeholder="Pérez" 
                      className="bg-[rgba(74,74,74,0.1)] border-none rounded p-4 text-[#3f3f46] text-base w-full focus:ring-2 focus:ring-[#006fb3] outline-none transition-all"
                    />
                  </div>
                </div>

                {/* RUT Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#0a132d] text-[10px] font-bold uppercase tracking-[1px]">
                    RUT
                  </label>
                  <input 
                    type="text" 
                    placeholder="12.345.678-9" 
                    className="bg-[rgba(74,74,74,0.1)] border-none rounded p-4 text-[#3f3f46] text-base w-full md:w-1/2 focus:ring-2 focus:ring-[#006fb3] outline-none transition-all"
                  />
                </div>

                {/* Correo Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#0a132d] text-[10px] font-bold uppercase tracking-[1px]">
                    Correo
                  </label>
                  <input 
                    type="email" 
                    placeholder="name@company.com" 
                    className="bg-[rgba(74,74,74,0.1)] border-none rounded p-4 text-[#3f3f46] text-base w-full md:w-2/3 focus:ring-2 focus:ring-[#006fb3] outline-none transition-all"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-6">
                  {/* Region Select */}
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-[#111928] text-[16px] font-normal">
                      Región
                    </label>
                    <div className="relative">
                      <select className="bg-[rgba(74,74,74,0.1)] border border-[#dfe4ea] rounded-md p-3 text-[#637381] text-base w-full focus:ring-2 focus:ring-[#006fb3] outline-none transition-all appearance-none">
                        <option>Valparaíso</option>
                      </select>
                      <IonIcon icon={chevronDownOutline} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                  {/* Comuna Select */}
                  <div className="flex flex-col gap-2 flex-1">
                    <label className="text-[#111928] text-[16px] font-normal">
                      Comuna
                    </label>
                    <div className="relative">
                      <select className="bg-[rgba(74,74,74,0.1)] border border-[#dfe4ea] rounded-md p-3 text-[#637381] text-base w-full focus:ring-2 focus:ring-[#006fb3] outline-none transition-all appearance-none">
                        <option>Valparaíso</option>
                      </select>
                      <IonIcon icon={chevronDownOutline} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-2 mt-4">
                  <label className="text-[#0a132d] text-[10px] font-bold uppercase tracking-[1px]">
                    Contraseña
                  </label>
                  <div className="relative">
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-[rgba(74,74,74,0.1)] border-none rounded p-4 text-[#3f3f46] text-base w-full focus:ring-2 focus:ring-[#006fb3] outline-none transition-all pr-12"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                      <IonIcon icon={eyeOutline} className="text-xl" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-1 mt-1">
                     <div className="flex gap-1 h-1.5 w-full max-w-[300px]">
                        <div className="flex-1 bg-[#ba1a1a] rounded-full"></div>
                        <div className="flex-1 bg-[#c0c7d2] rounded-full"></div>
                        <div className="flex-1 bg-[#c0c7d2] rounded-full"></div>
                        <div className="flex-1 bg-[#c0c7d2] rounded-full"></div>
                     </div>
                     <span className="text-[#ba1a1a] text-xs font-['Public_Sans',sans-serif]">Seguridad: Débil</span>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#0a132d] text-[10px] font-bold uppercase tracking-[1px]">
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-[rgba(74,74,74,0.1)] border-none rounded p-4 text-[#3f3f46] text-base w-full focus:ring-2 focus:ring-[#006fb3] outline-none transition-all pr-12"
                    />
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                      <IonIcon icon={eyeOutline} className="text-xl" />
                    </button>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="flex items-center gap-2 mt-4">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#006fb3] focus:ring-[#006fb3]" />
                  <span className="text-sm text-[#11181c]">
                    Acepto los <a href="#" className="text-[#006fb3] hover:underline">términos y condiciones</a> y la <a href="#" className="text-[#006fb3] hover:underline">política de privacidad de datos</a>
                  </span>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-4">
                  <button onClick={() => history.push('/dashboard-user')} className="bg-[#050d2c] hover:bg-[#0a184a] text-white rounded py-4 px-16 text-base font-black uppercase tracking-[1.6px] w-full md:w-auto transition-colors shadow-[0px_8px_10px_-6px_rgba(96,236,168,0.1)]">
                    Crear
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom Link */}
            <div className="mt-2 mb-8 text-center text-[16px] text-[#404750] z-10">
              ¿Ya tienes una cuenta? <span onClick={() => history.push('/')} className="text-[#00568c] font-bold hover:underline cursor-pointer">Inicia sesión</span>
            </div>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Register;
