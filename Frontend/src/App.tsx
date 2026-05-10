import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

import AuthRoot from './pages/auth/AuthRoot';
import Dashboard from './pages/admin/Dashboard';
import DashboardUser from './pages/user/DashboardUser';
import DocumentosAdmin from './pages/admin/DocumentosAdmin';
import DocumentosAdminDetails from './pages/admin/DocumentosAdminDetails';
import DocumentosUser from './pages/user/DocumentosUser';
import DocumentosUserDetails from './pages/user/DocumentosUserDetails';
import AbrirTicket from './pages/user/AbrirTicket';
import DocumentoExpandidoAdmin from './pages/admin/DocumentoExpandidoAdmin';
import AgregarDocumentosAdmin from './pages/admin/AgregarDocumentosAdmin';
import DocumentoExpandidoUser from './pages/user/DocumentoExpandidoUser';
import AgregarDocumentosUser from './pages/user/AgregarDocumentosUser';
import AdminArchivos from './pages/admin/AdminArchivos';
import RechazarDocumentoAdmin from './pages/admin/RechazarDocumentoAdmin';

// Inicializar Ionic React
setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={AuthRoot} />
          <Route exact path="/admin/login" component={AuthRoot} />
          <Route exact path="/register" component={AuthRoot} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/dashboard-user" component={DashboardUser} />
          <Route exact path="/admin/documentos" component={DocumentosAdmin} />
          <Route exact path="/admin/documentos/detalles" component={DocumentosAdminDetails} />
          <Route exact path="/admin/documentos/expandido" component={DocumentoExpandidoAdmin} />
          <Route exact path="/admin/documentos/rechazar" component={RechazarDocumentoAdmin} />
          <Route exact path="/admin/documentos/agregar" component={AgregarDocumentosAdmin} />
          <Route exact path="/admin/archivos" component={AdminArchivos} />
          <Route exact path="/usuario/documentos" component={DocumentosUser} />
          <Route exact path="/usuario/documentos/detalles" component={DocumentosUserDetails} />
          <Route exact path="/usuario/documentos/expandido" component={DocumentoExpandidoUser} />
          <Route exact path="/usuario/documentos/agregar" component={AgregarDocumentosUser} />
          <Route exact path="/abrir-ticket" component={AbrirTicket} />
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
