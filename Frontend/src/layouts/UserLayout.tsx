import React, { type ReactNode } from 'react';
import { IonPage, IonContent, IonIcon } from '@ionic/react';
import {
  homeOutline,
  documentTextOutline,
  ticketOutline,
  addOutline,
  searchOutline,
  notificationsOutline,
  settingsOutline,
  logOutOutline,
} from 'ionicons/icons';
import { useLocation, useHistory } from 'react-router-dom';
import logoImg from '../assets/logo.png';
import { useAuth } from '../contexts/AuthContext';

interface UserLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: 'Dashboard',    icon: homeOutline,         path: '/usuario/dashboard' },
  { label: 'Documentos',   icon: documentTextOutline,  path: '/usuario/documentos' },
  { label: 'Abrir Ticket', icon: ticketOutline,        path: '/abrir-ticket' },
];

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const history = useHistory();
  const location = useLocation();
  const { logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
  };

  return (
    <IonPage>
      <IonContent fullscreen scrollY={false}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

          /* ─────────────────────────── ROOT ─────────────────────────── */
          .ul-root {
            display: flex;
            width: 100%;
            height: 100vh;
            overflow: hidden;
            font-family: 'Inter', sans-serif;
            background: #f4f6f9;
          }

          /* ─────────────────────────── SIDEBAR ─────────────────────────── */
          .ul-sidebar {
            width: 208px;
            min-width: 208px;
            background: #eeeeee;
            border-right: 1px solid #a8b7c7;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100vh;
            overflow: hidden;
          }

          /* Header */
          .ul-sb-header {
            padding: 24px 16px 12px;
          }
          .ul-sb-title {
            font-weight: 900;
            font-size: 15px;
            color: #111111;
            line-height: 1.3;
            letter-spacing: -0.3px;
            margin: 0;
          }
          .ul-sb-subtitle {
            font-weight: 500;
            font-size: 9px;
            color: #4a4a4a;
            letter-spacing: 1.4px;
            text-transform: uppercase;
            margin-top: 5px;
          }

          /* Nav */
          .ul-sb-nav {
            display: flex;
            flex-direction: column;
            gap: 2px;
            padding: 4px 12px;
            margin-top: 8px;
          }
          .ul-sb-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 10px 18px 10px 16px;
            cursor: pointer;
            transition: background 0.13s;
            border-right: 2px solid transparent;
            user-select: none;
          }
          .ul-sb-item:hover { background: #dde2e9; }
          .ul-sb-item.active {
            background: #a8b7c7;
            border-right-color: #fe6565;
          }
          .ul-sb-item ion-icon {
            font-size: 15px;
            color: #4a4a4a;
            flex-shrink: 0;
          }
          .ul-sb-label {
            font-weight: 500;
            font-size: 11px;
            color: #4a4a4a;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            white-space: nowrap;
          }

          /* Bottom section */
          .ul-sb-bottom {
            padding: 16px;
            display: flex;
            flex-direction: column;
            gap: 14px;
          }
          .ul-sb-btn-nuevo {
            background: #050d2c;
            color: #eeeeee;
            border: none;
            border-radius: 4px;
            padding: 10px 0;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 7px;
            width: 100%;
            font-weight: 700;
            font-size: 11px;
            letter-spacing: 1.2px;
            text-transform: uppercase;
            cursor: pointer;
            transition: background 0.13s;
          }
          .ul-sb-btn-nuevo:hover { background: #0a1a3e; }
          .ul-sb-btn-nuevo ion-icon { font-size: 13px; }

          .ul-sb-divider {
            border-top: 1px solid #353535;
            padding-top: 14px;
          }

          /* User row */
          .ul-sb-user-row {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 6px 8px;
          }
          .ul-sb-avatar {
            width: 32px;
            height: 32px;
            background: #353535;
            border-radius: 12px;
            flex-shrink: 0;
          }
          .ul-sb-user-info { flex: 1; min-width: 0; }
          .ul-sb-user-name {
            font-weight: 700;
            font-size: 10px;
            color: #111111;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .ul-sb-user-role {
            font-weight: 400;
            font-size: 9px;
            color: #4a4a4a;
          }
          .ul-sb-logout-btn {
            background: none;
            border: none;
            cursor: pointer;
            padding: 6px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            color: #4a4a4a;
            transition: background 0.13s, color 0.13s;
            flex-shrink: 0;
          }
          .ul-sb-logout-btn:hover {
            background: rgba(254,101,101,0.12);
            color: #ba1a1a;
          }
          .ul-sb-logout-btn ion-icon { font-size: 16px; }

          /* ─────────────────────────── MAIN AREA ─────────────────────────── */
          .ul-main {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-width: 0;
            height: 100vh;
            overflow: hidden;
          }

          /* ─────────────────────────── NAVBAR ─────────────────────────── */
          .ul-navbar {
            background: #050d2c;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 10px 24px;
            flex-shrink: 0;
            height: 56px;
          }

          /* Search */
          .ul-search-wrap {
            position: relative;
            flex: 1;
            max-width: 448px;
          }
          .ul-search-icon {
            position: absolute;
            left: 12px;
            top: 50%;
            transform: translateY(-50%);
            color: #4a4a4a;
            font-size: 13px;
            pointer-events: none;
          }
          .ul-search-input {
            width: 100%;
            background: #eeeeee;
            border: 1px solid rgba(168,183,199,0.37);
            border-radius: 4px;
            padding: 8px 14px 8px 34px;
            font-family: 'Inter', sans-serif;
            font-size: 14px;
            color: #4a4a4a;
            outline: none;
            box-sizing: border-box;
            transition: border-color 0.2s;
          }
          .ul-search-input::placeholder { color: #4a4a4a; }
          .ul-search-input:focus { border-color: rgba(255,255,255,0.4); }

          /* Right actions */
          .ul-nav-actions {
            display: flex;
            align-items: center;
            gap: 2px;
          }
          .ul-nav-icon-btn {
            background: none;
            border: none;
            color: #eeeeee;
            cursor: pointer;
            padding: 7px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.13s;
          }
          .ul-nav-icon-btn:hover { background: rgba(255,255,255,0.1); }
          .ul-nav-icon-btn ion-icon { font-size: 18px; }

          /* Logo divider */
          .ul-nav-logo-wrap {
            display: flex;
            align-items: center;
            padding-left: 16px;
            margin-left: 10px;
            border-left: 1px solid #353535;
          }
          .ul-nav-logo {
            height: 36px;
            width: auto;
            object-fit: contain;
          }

          /* ─────────────────────────── CONTENT ─────────────────────────── */
          .ul-content {
            flex: 1;
            overflow-y: auto;
            overflow-x: hidden;
          }
        `}</style>

        <div className="ul-root">

          {/* ═══ SIDEBAR ═══ */}
          <aside className="ul-sidebar">
            <div>
              {/* Header */}
              <div className="ul-sb-header">
                <h1 className="ul-sb-title">Municipalidad Santo Domingo</h1>
                <p className="ul-sb-subtitle">Administrador de archivos</p>
              </div>

              {/* Navigation */}
              <nav className="ul-sb-nav">
                {navItems.map((item) => (
                  <div
                    key={item.path}
                    className={`ul-sb-item${isActive(item.path) ? ' active' : ''}`}
                    onClick={() => {
                      if (isActive(item.path)) {
                        window.dispatchEvent(new CustomEvent('reset-page', { detail: item.path }));
                      }
                      history.push(item.path);
                    }}
                  >
                    <IonIcon icon={item.icon} />
                    <span className="ul-sb-label">{item.label}</span>
                  </div>
                ))}
              </nav>
            </div>

            {/* Bottom */}
            <div className="ul-sb-bottom">
              <button
                className="ul-sb-btn-nuevo"
                onClick={() => history.push('/usuario/documentos/agregar')}
              >
                <IonIcon icon={addOutline} />
                Nuevo Trámite
              </button>

              <div className="ul-sb-divider">
                <div className="ul-sb-user-row">
                  <div className="ul-sb-avatar" />
                  <div className="ul-sb-user-info">
                    <div className="ul-sb-user-name">USER</div>
                    <div className="ul-sb-user-role">Vecino</div>
                  </div>
                  <button
                    className="ul-sb-logout-btn"
                    title="Cerrar sesión"
                    onClick={handleLogout}
                  >
                    <IonIcon icon={logOutOutline} />
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* ═══ MAIN ═══ */}
          <main className="ul-main">
            {/* Navbar */}
            <header className="ul-navbar">
              <div className="ul-search-wrap">
                <IonIcon icon={searchOutline} className="ul-search-icon" />
                <input
                  type="text"
                  placeholder="Buscar archivos"
                  className="ul-search-input"
                />
              </div>

              <div className="ul-nav-actions">
                <button className="ul-nav-icon-btn" title="Notificaciones">
                  <IonIcon icon={notificationsOutline} />
                </button>
                <button className="ul-nav-icon-btn" title="Configuración">
                  <IonIcon icon={settingsOutline} />
                </button>
                <div className="ul-nav-logo-wrap">
                  <img
                    src={logoImg}
                    alt="Logo Municipalidad Santo Domingo"
                    className="ul-nav-logo"
                  />
                </div>
              </div>
            </header>

            {/* Page Content */}
            <div className="ul-content">
              {children}
            </div>
          </main>

        </div>
      </IonContent>
    </IonPage>
  );
};

export default UserLayout;
