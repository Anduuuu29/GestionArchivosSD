import { IonApp, IonContent, setupIonicReact } from '@ionic/react';

// Inicializar Ionic React
setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonContent className="ion-padding">
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-800">
          <div className="p-8 bg-white shadow-xl rounded-2xl max-w-md text-center border border-slate-100">
            <h1 className="text-3xl font-extrabold text-blue-600 mb-4">GestionArchivosSD</h1>
            <p className="text-slate-600 mb-6 font-medium">
              Tu frontend con <strong className="text-indigo-600">Ionic + React</strong> y <strong className="text-indigo-600">Tailwind CSS v4</strong> está listo para ser desarrollado.
            </p>
            <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
              ¡Estructura de carpetas lista!
            </div>
          </div>
        </div>
      </IonContent>
    </IonApp>
  );
}

export default App;
