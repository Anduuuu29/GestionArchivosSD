# GestionArchivosSD
## Integrantes
* Benjamín Sepúlveda
* Andrés Pérez
* David Henríquez
## Pasos para ejecutar el programa
### Requisitos previos
1. Node.js: Asegurese de tener instalado Node.js
2. Terminal: Debe tener abierto una terminal
### Paso 1
Navegar a la carpeta FrontEnd, para esto hay que ingresar el siguiente comando:
"cd Frontend"
### Paso 2
Si es la primera vez que lo ejecutas, necesitas las librerías necesarias, para esto hay que colocar el siguiente comando:
"npm install"
### Paso 3
Iniciar el servidor local
"npm run dev"

## Justificación del Problema (1.2)
En la municipalidad de Santo Domingo se afronta el gran problema de la mala administración de archivos y documentos. Hoy en día se encuentran documentos en físico, los cuales se pueden perder, manchar y/o mojar, y que puede causar que se pierdan para siempre. También hay archivos en digital que están distribuidos por todos los computadores, no existiendo así una aplicación o programa que administre todo y simplifique la tarea del municipio. Los vecinos tampoco cuentan con una página pertinente para ver el estado de sus trámites o mandar nuevos. 

Es por ello que nosotros abarcamos todas estas problematicas y creamos una página de administración de archivos, a la que podrán acceder tanto trabajadores de la municipalidad como vecinos. Cada uno tendrá un perfil independiente y podrá ver el estado de sus trámites sin la necesidad de ir a preguntar presencialmente, agilizando y ahorrando tiempo. La municipalidad tendrá una base común donde verá todos los archivos subidos, que podrán filtrarse para encontrar lo que se busca con mayor rapidez y eficacia. También se podrá configurar el borrado automático de duplicados (en caso de existir) y la eliminación por antigüedad. Con esto se logra subsanar tanto las falencias que existen por dentro del municipio en cuanto la gestión de archivos como la falta de transparecia frente a los vecinos.



## Requerimientos (1.1)
### Funcionales
* Capacidad de subir archivos e identificarlos. (Admin / Usuario)
* Clasificar archivos según parámetros dados. (Admin)
* Eliminación de archivos repetidos. (Admin)
* Búsqueda de archivos mediante filtrado. (Admin / Usuario)
* Clasificación de procesos (Terminado / No terminado). (Admin)
* Limpieza de archivos con más de cierta cantidad de tiempo de antigüedad. (Admin)
* Posibilidad de abrir ticket de soporte. (Usuario)

### No funcionales
* Fácil de utilizar.
* Cumplimiento del FrameWork del Gobierno.
* Controles de seguridad en los documentos.
* Accesible para todo público (vecinos y personas de la municipalidad).

## Navegación

### (a) Rutas principales y secundarias
#### Principales 
* /register
* /admin
* /dashboard
* /dashboard-user
* /abrir-ticket
#### Secundarias
* /admin/login
* /admin/documentos
* /admin/documentos/agregar
* /admin/documentos/expandido
* /admin/documentos/rechazar
* /admin/archivos
* /admin/documentos/detalles
* /usuario/documentos
* /usuario/documentos/agregar
* /usuario/documentos/detalles
* /usuario/documentos/expandido
### (b) Relaciones jerárquicas
#### Nivel 1
* Dashboard (Admin y Usuario)
* Register (Admin y Usuario)
* Login (Admin y Usuario)
#### Nivel 2
* Documentos (Admin y Usuario)
* Abrir-ticket (Usuario)
* Archivos (Admin)
* Agregar (Admin y Usuario)
#### Nivel 3
* Documentos/detalles (Admin y Usuario)
* Documentos/expandido (Admin y Usuario)
### (c) Flujo de navegación entre funcionalidades 
#### El flujo de navegación se puede visualizar entrando a Figma.
### (d) Diferenciación de acceso según roles
Usuario solo ve su perfil, sus documentos y puede abrir un ticket que estará vinculado a su perfil.
Admin puede ver su perfil, todos los documentos subidos, agregar archivos al sistema, rechazarlos y administrarlos. Tiene acceso a rutas protegidas como /admin/documentos/rechazar o /admin/documentos/expandido, las cuales son inaccesibles por el Rol Usuario.
### (e) Flujo principal de tareas
#### Ingresar como Admin
El flujo sería: Login -> Dar click a "¿Eres parte de la municipalidad?" -> Ingresar.
#### Ingresar como Usuario
El flujo sería: Login -> Ingresar.
#### Registrarse
El flujo sería: Login -> Dar click a "Regístrate" -> Crear.
#### Ver un documento específico resumido
El flujo sería: Dashboard -> Documentos -> Dar click al ojo.
#### Ver un documento específico completo
El flujo sería: Dashboard -> Documentos -> Dar click al ojo -> Observar.
#### Rechazar un documento
El flujo sería: Dashboard -> Documentos -> Dar click al ojo -> Observar -> Rechazar -> Confirmar Rechazo.
#### Nuevo Trámite
El flujo sería: Dashboard -> Dar click a "Nuevo Trámite" -> Rellenar formulario -> Aceptar.
#### Abrir Ticket de soporte
El flujo sería: Dashboard -> Abrir Ticket -> Rellenar formulario -> Enviar Ticket.
### (f) Puntos críticos de interacción
Register: El Usuario/Admin no podrá avanzar sin rellenar todos los campos obligatorios.
Login: El Usuario/Admin no podrá avanzar sin rellenar todos los campos obligatorios. En caso de no tener cuenta deberá crear una.
Rechazar Documento: Rechazar un documento es irreversible, es decir, no se podría recuperar luego. Es por ello que se pide confirmación de parte del Admin antes de que la acción se lleve a cabo.
### (g) Coherencia de experiencia entre dispositivos 
Esto se logrará mediante la utilización de un diseño "responsive", el cuál se adaptará en diferentes tamaños de pantallas.
### (h) Justificación de las Decisiones 
#### Escalabilidad
Se utilizarán rutas dinámicas, lo cuál garantiza escalabilidad en el sistema. Si el día de mañana hay una gran cantidad de documentos, no es necesario crear una ruta para cada uno.
#### Usabilidad
La página será totalmente usable, cada función cumplirá su rol.
#### Eficiencia de interacción
Para funciones primordiales se crearon botones que hacen que se pueda llegar con 1 o 2 clicks.
#### Claridad estructural 
El sistema sigue una estructura intuitiva para el usuario.
## Creación del Proyecto en IonicReact
### (a) Uso de ReactRouter
Esto se cumple y evidencia en el archivo "package.json", donde se ve la presencia de "@ionic/react-router" y "react-router-dom". Además, todas las rutas principales se pueden observar en "src/App.tsx", utilizando componentes como <IonReactRouter> e <IonRouterOutlet>, además del componente <Route> usado para cada endpoint.
### (b) Rutas públicas y protegidas
Se implementaron rutas públicas y protegidas utilizando PublicRoute y ProtectedRoute respectivamente. Esto hace que aquellos con el rol Usuario no puedan ingresar en pestañas de los Admin y viceversa.
### (c) Redirecciones
Se utilizan redirecciones utilizando el Hook "useHistory()" nativo de React Router Dom. Esto se visualiza en el archivo de inicio de sesión (src/pages/Login.tsx), así como en la barra lateral del Dashboard (src/pages/Dashboard.tsx). Cuando un usuario realiza una acción, las funciones lo redireccionan para enviarlos de forma fluida a la ruta de destino.
### (d) Estructura modular de vistas
Todo el FrontEnd hace uso de separación de responsabilidades por medio de módulos. En el directorio "src/pages" existen archivos ".tsx" para cada vista de la aplicación (Login.tsx, DashBoard.tsx, etc...). Luego, estos módulos se importan en el enrutamiento central de "src/App.tsx", lo que mejora el mantenimiento y escalabilidad de cada vista por separado.

## Diseño y estructura (1.6)
### Diseño de pantallas principales
Se han desarrollado más de 4 pantallas principales, tanto para Admin como para Usuario.
Admin: Dashboard, DocumentosAdmin, AdminArchivos, DocumentosAdminDetails, AgregarDocumentosAdmin, RechazarDocumentoAdmin, DocumentoExpandidoAdmin.
Usuario: DashboardUser, DocumentosUser, AbrirTicket, DocumentosUserDetail, DocumentoExpandidoUser, AgregarDocumentoUser.
Auth: Login, Register.
### Estructura de navegación funcional
La nevegación es coherente y funcional, implementada en "App.tsx" utilizando "IonReactRouter" y "IonRouterOutlet". Se utiliza una lógica de rutas protegidas y públicas basada en roles (Admin/Usuario).
### Uso de componentes propios de Ionic
Se utilizan componentes base de Ionic como:
* IonApp
* IonPage
* IonContent
* IontIcon
* IontRouterOutlet
### Separación estructural del código
La estructura cumple con la organización de carpetas:
* pages contiene todas las pantallas y se encuentra en "src/pages".
* components contiene las rutas protegidas y publicas y se encuentra en "src/components".
* routes contiene a "App.tsx", la cual tiene todas las rutas y se encuentra en "src/routes".
* services esta actualmente vacía dado que es dedicada a servicios de API o lógica de negocio, lo cual aún no se debe implementar. Está en "src/services".

### Links
* Link a figma(1.3): https://www.figma.com/design/x2w1YetlibQSoyQsiT1NZu/Sin-t%C3%ADtulo?node-id=0-1&p=f&t=SEeCUrZCTZi6Zr9p-0
* https://firma.digital.gob.cl/
* https://framework.digital.gob.cl/colors.html
* https://framework.digital.gob.cl/
* https://claveunica.gob.cl/instituciones
