import { IonApp, IonRouterOutlet, IonToast, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useState, useEffect } from 'react';


import AuthRoot from '../pages/auth/AuthRoot';
import Dashboard from '../pages/admin/Dashboard';
import DashboardUser from '../pages/user/DashboardUser';
import DocumentosAdmin from '../pages/admin/DocumentosAdmin';
import DocumentosAdminDetails from '../pages/admin/DocumentosAdminDetails';
import DocumentosUser from '../pages/user/DocumentosUser';
import DocumentosUserDetails from '../pages/user/DocumentosUserDetails';
import AbrirTicket from '../pages/user/AbrirTicket';
import DocumentoExpandidoAdmin from '../pages/admin/DocumentoExpandidoAdmin';
import AgregarDocumentosAdmin from '../pages/admin/AgregarDocumentosAdmin';
import DocumentoExpandidoUser from '../pages/user/DocumentoExpandidoUser';
import AgregarDocumentosUser from '../pages/user/AgregarDocumentosUser';
import AdminArchivos from '../pages/admin/AdminArchivos';
import RechazarDocumentoAdmin from '../pages/admin/RechazarDocumentoAdmin';

import { AuthProvider } from '../contexts/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import PublicRoute from '../components/PublicRoute';

// Inicializar Ionic React
setupIonicReact();

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
          <IonRouterOutlet>
            {/* Rutas Públicas */}
            <PublicRoute exact path="/" component={AuthRoot} />
            <PublicRoute exact path="/admin/login" component={AuthRoot} />
            <PublicRoute exact path="/register" component={AuthRoot} />

            {/* Rutas Protegidas de Administrador */}
            <ProtectedRoute exact path="/admin/dashboard" component={Dashboard} requiredRole="admin" />
            <ProtectedRoute exact path="/admin/documentos" component={DocumentosAdmin} requiredRole="admin" />
            <ProtectedRoute exact path="/admin/documentos/detalles" component={DocumentosAdminDetails} requiredRole="admin" />
            <ProtectedRoute exact path="/admin/documentos/expandido" component={DocumentoExpandidoAdmin} requiredRole="admin" />
            <ProtectedRoute exact path="/admin/documentos/rechazar" component={RechazarDocumentoAdmin} requiredRole="admin" />
            <ProtectedRoute exact path="/admin/documentos/agregar" component={AgregarDocumentosAdmin} requiredRole="admin" />
            <ProtectedRoute exact path="/admin/archivos" component={AdminArchivos} requiredRole="admin" />

            {/* Rutas Protegidas de Usuario */}
            <ProtectedRoute exact path="/usuario/dashboard" component={DashboardUser} requiredRole="user" />
            <ProtectedRoute exact path="/usuario/documentos" component={DocumentosUser} requiredRole="user" />
            <ProtectedRoute exact path="/usuario/documentos/detalles" component={DocumentosUserDetails} requiredRole="user" />
            <ProtectedRoute exact path="/usuario/documentos/expandido" component={DocumentoExpandidoUser} requiredRole="user" />
            <ProtectedRoute exact path="/usuario/documentos/agregar" component={AgregarDocumentosUser} requiredRole="user" />
            <ProtectedRoute exact path="/abrir-ticket" component={AbrirTicket} requiredRole="user" />
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthProvider>

      {/* Toast de notificaciones globales — debe estar dentro de IonApp */}
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
