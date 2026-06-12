import { IonApp, IonRouterOutlet, IonToast, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { Suspense, useState, useEffect } from 'react';

const AuthRoot = React.lazy(() => import('../pages/auth/AuthRoot'));
const Dashboard = React.lazy(() => import('../pages/admin/Dashboard'));
const DashboardUser = React.lazy(() => import('../pages/user/DashboardUser'));
const DocumentosAdmin = React.lazy(() => import('../pages/admin/DocumentosAdmin'));
const DocumentosAdminDetails = React.lazy(() => import('../pages/admin/DocumentosAdminDetails'));
const DocumentosUser = React.lazy(() => import('../pages/user/DocumentosUser'));
const DocumentosUserDetails = React.lazy(() => import('../pages/user/DocumentosUserDetails'));
const AbrirTicket = React.lazy(() => import('../pages/user/AbrirTicket'));
const MisTickets = React.lazy(() => import('../pages/user/MisTickets'));
const AdminTickets = React.lazy(() => import('../pages/admin/AdminTickets'));
const DocumentoExpandidoAdmin = React.lazy(() => import('../pages/admin/DocumentoExpandidoAdmin'));
const AgregarDocumentosAdmin = React.lazy(() => import('../pages/admin/AgregarDocumentosAdmin'));
const DocumentoExpandidoUser = React.lazy(() => import('../pages/user/DocumentoExpandidoUser'));
const AgregarDocumentosUser = React.lazy(() => import('../pages/user/AgregarDocumentosUser'));
const AdminArchivos = React.lazy(() => import('../pages/admin/AdminArchivos'));
const RechazarDocumentoAdmin = React.lazy(() => import('../pages/admin/RechazarDocumentoAdmin'));

import { AuthProvider } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';

setupIonicReact();

function SuspenseFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f6fa]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-4 border-[#00518e] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-[#414751] text-sm font-['Inter',sans-serif]">Cargando...</p>
      </div>
    </div>
  );
}

function App() {
  const [toast, setToast] = useState<{ isOpen: boolean; message: string; color: string }>({
    isOpen: false,
    message: '',
    color: 'danger',
  });

  useEffect(() => {
    const handleApiError = (e: Event) => {
      const customEvent = e as CustomEvent<{ message: string; color?: string }>;
      setToast({
        isOpen: true,
        message: customEvent.detail.message || 'Ocurrió un error inesperado.',
        color: customEvent.detail.color || 'danger',
      });
    };

    window.addEventListener('api-error', handleApiError);
    return () => window.removeEventListener('api-error', handleApiError);
  }, []);

  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <Suspense fallback={<SuspenseFallback />}>
            <IonRouterOutlet>
              <PublicRoute exact path="/" component={AuthRoot} />
              <PublicRoute exact path="/admin/login" component={AuthRoot} />
              <PublicRoute exact path="/register" component={AuthRoot} />

              <ProtectedRoute exact path="/admin/dashboard" component={Dashboard} requiredRole="admin" />
              <ProtectedRoute exact path="/admin/documentos" component={DocumentosAdmin} requiredRole="admin" />
              <ProtectedRoute exact path="/admin/documentos/detalles" component={DocumentosAdminDetails} requiredRole="admin" />
              <ProtectedRoute exact path="/admin/documentos/expandido" component={DocumentoExpandidoAdmin} requiredRole="admin" />
              <ProtectedRoute exact path="/admin/documentos/rechazar" component={RechazarDocumentoAdmin} requiredRole="admin" />
              <ProtectedRoute exact path="/admin/documentos/agregar" component={AgregarDocumentosAdmin} requiredRole="admin" />
              <ProtectedRoute exact path="/admin/archivos" component={AdminArchivos} requiredRole="admin" />
              <ProtectedRoute exact path="/admin/tickets" component={AdminTickets} requiredRole="admin" />

              <ProtectedRoute exact path="/usuario/dashboard" component={DashboardUser} requiredRole="user" />
              <ProtectedRoute exact path="/usuario/documentos" component={DocumentosUser} requiredRole="user" />
              <ProtectedRoute exact path="/usuario/documentos/detalles" component={DocumentosUserDetails} requiredRole="user" />
              <ProtectedRoute exact path="/usuario/documentos/expandido" component={DocumentoExpandidoUser} requiredRole="user" />
              <ProtectedRoute exact path="/usuario/documentos/agregar" component={AgregarDocumentosUser} requiredRole="user" />
              <ProtectedRoute exact path="/abrir-ticket" component={AbrirTicket} requiredRole="user" />
              <ProtectedRoute exact path="/usuario/tickets" component={MisTickets} requiredRole="user" />
            </IonRouterOutlet>
          </Suspense>
        </IonReactRouter>
      </AuthProvider>

      <IonToast
        isOpen={toast.isOpen}
        message={toast.message}
        color={toast.color as any}
        duration={4000}
        position="bottom"
        onDidDismiss={() => setToast(prev => ({ ...prev, isOpen: false }))}
      />
    </IonApp>
  );
}

export default App;
