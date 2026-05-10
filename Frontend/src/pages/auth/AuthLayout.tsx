import React, { type ReactNode } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { useHistory, useLocation } from 'react-router-dom';
import logoImg from '../../assets/logo.png';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const history = useHistory();
  const location = useLocation();

  // Determinar qué botón de la esquina superior derecha mostrar
  const renderTopRightButton = () => {
    if (location.pathname === '/') {
      return (
        <button
          className="btn-ghost"
          onClick={() => history.push('/admin/login')}
          style={{
            position: 'absolute',
            top: 24,
            right: 28,
            zIndex: 10,
            backgroundColor: 'rgba(5,13,44,0.95)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          ¿Eres parte de la municipalidad?
        </button>
      );
    }
    
    if (location.pathname === '/admin/login') {
      return (
        <button
          className="btn-ghost"
          onClick={() => history.push('/')}
          style={{
            position: 'absolute',
            top: 24,
            right: 28,
            zIndex: 10,
            backgroundColor: 'rgba(5,13,44,0.95)',
            color: 'white',
            padding: '12px 24px',
            borderRadius: '8px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          ¿Eres usuario?
        </button>
      );
    }

    return null;
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={location.pathname === '/register'}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

          @keyframes blobFloat1 { 0% {transform: translate(0,0) scale(1)} 33% {transform: translate(70px,-90px) scale(1.1)} 66% {transform: translate(-50px,60px) scale(0.94)} 100% {transform: translate(0,0) scale(1)} }
          @keyframes blobFloat2 { 0% {transform: translate(0,0) scale(1)} 33% {transform: translate(-80px,70px) scale(1.07)} 66% {transform: translate(55px,-45px) scale(0.96)} 100% {transform: translate(0,0) scale(1)} }
          @keyframes blobFloat3 { 0% {transform: translate(0,0) scale(1)} 50% {transform: translate(40px,80px) scale(1.05)} 100% {transform: translate(0,0) scale(1)} }
          @keyframes blobFloat4 { 0% {transform: translate(0,0) scale(1)} 40% {transform: translate(-60px,-50px) scale(1.08)} 80% {transform: translate(40px,30px) scale(0.96)} 100% {transform: translate(0,0) scale(1)} }

          .auth-blob1 { animation: blobFloat1 16s ease-in-out infinite; }
          .auth-blob2 { animation: blobFloat2 20s ease-in-out infinite; }
          .auth-blob3 { animation: blobFloat3 24s ease-in-out infinite; }
          .auth-blob4 { animation: blobFloat4 19s ease-in-out infinite; }

          .auth-field {
            width: 100%;
            padding: 12px 16px;
            background: rgba(10,19,45,0.05);
            border: 1.5px solid rgba(10,19,45,0.13);
            border-radius: 6px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            color: #1a1a2e;
            box-sizing: border-box;
            transition: border-color .2s, box-shadow .2s;
          }
          .auth-field:focus {
            outline: none;
            border-color: #006fb3;
            box-shadow: 0 0 0 3px rgba(0,111,179,0.15);
          }
          .auth-field::placeholder { color: #9ca3af; }
          .auth-field.error {
            border-color: #ba1a1a;
            box-shadow: 0 0 0 3px rgba(186,26,26,0.1);
          }

          .btn-primary {
            background: rgba(5,13,44,0.95);
            color: #fff;
            border: none;
            border-radius: 6px;
            padding: 14px 0;
            font-family: 'Inter', sans-serif;
            font-weight: 800;
            font-size: 13px;
            letter-spacing: 2px;
            text-transform: uppercase;
            cursor: pointer;
            width: 100%;
            transition: background .2s, box-shadow .2s;
            box-shadow: 0 4px 18px rgba(0,81,142,0.28);
          }
          .btn-primary:hover { background: #0a184a; }
          .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }

          .btn-ghost {
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(0,81,142,0.22);
            color: #00518e;
            border-radius: 6px;
            padding: 10px 20px;
            font-family: 'Inter', sans-serif;
            font-weight: 700;
            font-size: 11px;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            cursor: pointer;
            transition: background .2s, border-color .2s;
            backdrop-filter: blur(8px);
          }
          .btn-ghost:hover {
            background: rgba(0,81,142,0.1);
            border-color: rgba(0,81,142,0.45);
          }
        `}</style>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          minHeight: '100vh',
          fontFamily: "'Inter', sans-serif",
          overflowX: 'hidden',
          backgroundColor: '#e8edf4',
          position: 'relative'
        }}>

          {/* Header */}
          <header style={{
            background: 'rgba(5,13,44,0.95)',
            borderBottom: '1px solid rgba(168,183,199,0.25)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 32px',
            height: 70,
            flexShrink: 0,
            position: 'sticky',
            top: 0,
            zIndex: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <img
                src={logoImg}
                alt="Logo Municipalidad Santo Domingo"
                style={{ height: 52, width: 'auto', objectFit: 'contain' }}
              />
              <span style={{
                color: '#eeeeee',
                fontSize: 22,
                fontWeight: 900,
                fontFamily: "'Inter', sans-serif",
                letterSpacing: -0.8,
                whiteSpace: 'nowrap',
              }}>
                Municipalidad Santo Domingo
              </span>
            </div>
          </header>

          {/* Blobs Compartidos */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
            {location.pathname === '/register' ? (
              <>
                <div className="auth-blob1 absolute top-[10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,111,179,0.2)_0%,transparent_70%)] blur-[60px]" />
                <div className="auth-blob2 absolute bottom-[10%] right-[-5%] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(96,236,168,0.15)_0%,transparent_70%)] blur-[50px]" />
              </>
            ) : (
              <>
                <div className="auth-blob1 absolute -top-[12%] -left-[6%] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(0,111,179,0.30)_0%,rgba(0,81,142,0.10)_60%,transparent_100%)] blur-[55px]" />
                <div className="auth-blob2 absolute -bottom-[18%] -right-[8%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(0,81,142,0.25)_0%,rgba(0,111,179,0.08)_65%,transparent_100%)] blur-[60px]" />
                <div className="auth-blob3 absolute top-[35%] left-[55%] w-[320px] h-[320px] rounded-full bg-[radial-gradient(circle,rgba(96,236,168,0.14)_0%,transparent_70%)] blur-[42px]" />
                <div className="auth-blob4 absolute top-[10%] right-[15%] w-[260px] h-[260px] rounded-full bg-[radial-gradient(circle,rgba(0,150,220,0.18)_0%,transparent_70%)] blur-[38px]" />
              </>
            )}
          </div>

          <main style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 24px',
            zIndex: 10,
          }}>
            {renderTopRightButton()}
            
            <div className="bg-[rgba(255,255,255,0.86)] backdrop-blur-[24px] border border-[rgba(0,81,142,0.13)] rounded-xl shadow-[0_24px_64px_rgba(0,81,142,0.14)] w-full mx-auto relative p-10" style={{ maxWidth: location.pathname === '/register' ? 660 : 440 }}>
              {/* accent line top */}
              <div style={{
                position: 'absolute', top: 0, left: 36, right: 36, height: 3,
                background: 'linear-gradient(90deg, transparent, #006fb3, transparent)',
                borderRadius: '0 0 4px 4px',
              }} />
              
              {children}
            </div>
          </main>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AuthLayout;
