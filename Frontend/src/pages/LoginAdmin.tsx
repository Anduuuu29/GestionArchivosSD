import { IonPage, IonContent, IonIcon } from '@ionic/react';
import { eyeOutline } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const LoginAdmin: React.FC = () => {
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

            {/* Top Right Button */}
            <div className="absolute top-8 right-8 z-10 hidden md:block">
              <button onClick={() => history.push('/')} className="bg-[#050d2c] text-white px-6 py-4 rounded font-black text-sm tracking-[1.6px] uppercase hover:bg-[#0a184a] transition-colors shadow-lg">
                ¿Eres usuario?
              </button>
            </div>

            {/* Login Card */}
            <div className="bg-white border border-[rgba(168,183,199,0.25)] rounded-lg shadow-xl w-full max-w-[448px] p-10 relative z-10">
              {/* Top light bar accent */}
              <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-[#60eca880] to-transparent"></div>
              
              <h2 className="text-[#0a132d] text-3xl font-black uppercase tracking-tight mb-8 text-center md:text-left mt-2">
                Inicio de sesión
              </h2>

              <div className="flex flex-col gap-6">
                {/* Email Field */}
                <div className="flex flex-col gap-2">
                  <label className="text-[#0a132d] text-[10px] font-bold uppercase tracking-[1px]">
                    Dirección de correo electrónico o RUT
                  </label>
                  <input 
                    type="text" 
                    placeholder="name@company.com" 
                    className="bg-[rgba(74,74,74,0.1)] border-none rounded p-4 text-[#3f3f46] text-base w-full focus:ring-2 focus:ring-[#006fb3] outline-none transition-all"
                  />
                </div>

                {/* Password Field */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center">
                    <label className="text-[#0a132d] text-[10px] font-bold uppercase tracking-[1px]">
                      Contraseña
                    </label>
                    <a href="#" className="text-[#006fb3] text-[10px] font-bold uppercase tracking-[1px] hover:underline">
                      ¿Se te olvidó la contraseña?
                    </a>
                  </div>
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

                {/* Login Button */}
                <button onClick={() => history.push('/dashboard')} className="bg-[#050d2c] hover:bg-[#0a184a] text-white rounded py-4 text-base font-black uppercase tracking-[1.6px] w-full mt-2 transition-colors shadow-[0px_8px_10px_-6px_rgba(96,236,168,0.1)]">
                  Ingresar
                </button>
              </div>

              {/* Bottom Link */}
              <div className="mt-8 text-center text-[14px] text-[#0a132d]">
                No tienes una cuenta? <a href="#" className="text-[#006fb3] font-bold hover:underline">Registrate</a>
              </div>
            </div>
            
            {/* Mobile "Eres usuario" link */}
             <div className="mt-8 z-10 md:hidden w-full max-w-[448px]">
              <button onClick={() => history.push('/')} className="bg-[#050d2c] text-white px-6 py-4 w-full rounded font-black text-sm tracking-[1.6px] uppercase hover:bg-[#0a184a] transition-colors shadow-lg">
                ¿Eres usuario?
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginAdmin;
