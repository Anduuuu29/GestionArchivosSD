import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Route } from 'react-router-dom';

import Login from './pages/Login';
import LoginAdmin from './pages/LoginAdmin';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import DashboardUser from './pages/DashboardUser';
import DocumentosAdmin from './pages/DocumentosAdmin';
import DocumentosAdminDetails from './pages/DocumentosAdminDetails';
import DocumentosUser from './pages/DocumentosUser';
import DocumentosUserDetails from './pages/DocumentosUserDetails';
import AbrirTicket from './pages/AbrirTicket';
import DocumentoExpandidoAdmin from './pages/DocumentoExpandidoAdmin';
import AgregarDocumentosAdmin from './pages/AgregarDocumentosAdmin';
import DocumentoExpandidoUser from './pages/DocumentoExpandidoUser';
import AgregarDocumentosUser from './pages/AgregarDocumentosUser';
import AdminArchivos from './pages/AdminArchivos';
import RechazarDocumentoAdmin from './pages/RechazarDocumentoAdmin';

// Inicializar Ionic React
setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/" component={Login} />
          <Route exact path="/admin/login" component={LoginAdmin} />
          <Route exact path="/register" component={Register} />
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
