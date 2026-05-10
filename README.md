# GestionArchivosSD

## Justificación del Problema (1.2)
En la municipalidad de Santo Domingo se afronta el gran problema de la mala administración de archivos y documentos, hoy en dia se encuentran documentos en físico, los cuales se pueden perder, manchar, mojar, lo cual puede causar que se pierdan para siempre, también hay archivos en digital pero distribuidos por todos los computadores, no hay una aplicación que administre todo y simplifique la tarea del municipio. Por otro lado los vecinos tampoco cuentan con una pagina pertinente para ver el estado de sus tramites o mandar nuevos. Nosotros abarcamos todas estas problematicas y creamos una pagina de administración de archivos, a esta podrán acceder tanto trabajadores de la municipalidad como los vecinos, cada uno tendrá un perfil independiente y podra ver el estado de sus tramites sin la necesidad de ir a preguntar presencialmente, agilizando y ahorrando tiempo. En cambio la municipalidad tendra una base común donde vera todos los archivos subidos, estos podrán filtrarse para encontrar lo que se busca con mayor rapidez y eficacia, también se podrá configurar el borrado automatica de duplicados (En caso de existir) y eliminación por antiguedad. Con esto se logra subsanar tanto las falencias que existen por dentro del municipio en cuanto la Gestión de archivos y la falta de transparecia frente a los vecinos.



## Requerimientos(1.1)
### Funcionales
* Capacidad de subir archivos e identificarlos. (Admin / User)
* Clasificar archivos según parametros dados. (Admin)
* Eliminación de archivos repetidos. (Admin)
* Busqueda de archivos mediante filtrado. (Admin / User)
* Clasificación de procesos (Terminado / No terminado). (Admin)
* Limpieza de archivos con más de cierta cantidad de tiempo de antigüedad. (Admin)
* Abrir ticket de soporte(User)

### No funcionales
* Fácil de utilizar.
* Cumplimiento del FrameWork del Gobierno.
* Controles de seguridad en los documentos.
* Accesible para todo público (Vecinos y Personas de la Municipalidad)

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
* Dashboard (Admin y User)
* Register (Admin y User)
* Login (Admin y User)
#### Nivel 2
* Documentos (Admin y User)
* Abrir-ticket (User)
* Archivos (Admin)
* Agregar (Admin y User)
#### Nivel 3
* Documentos/detalles (Admin y User)
* Documentos/expandido (Admin y User)
### (c) Flujo de navegación entre funcionalidades 
#### El flujo de navegación se ve en el Figma
### (d) Diferenciación de acceso según roles
Usuario solo ve su perfil, sus documentos y puede abrir un ticket que estara vinculado a su perfil
Admin puede ver su perfil, los documentos subidos (todos), agregar archivos al sistema, rechazarlos y administrarlos. Teniendo acceso a rutas protegidas como /admin/documentos/rechazar o /admin/documentos/expandido, las cuales son inaccesibles por el Rol Usuario.
### (e) Flujo principal de tareas
#### Ingresar como Admin
El flujo sería: Login -> Dar click a "¿Eres parte de la municipalidad? -> Ingresar
#### Ingresar como Usuario
El flujo sería: Login -> Ingresar
#### Registrarse
El flujo sería: Login -> Dar click a "Registrate" -> Crear
#### Ver un documento especifico resumido
El flujo sería: Dashboard -> Documentos -> Dar click a el ojo.
#### Ver un documento especifico Completo
El flujo sería: Dashboard -> Documentos -> Dar click a el ojo -> Observar.
#### Rechazar un Documentos
El flujo sería: Dashboard -> Documentos -> Dar click a el ojo -> Observar -> Rechazar-> Confirmar Rechazo.
#### Nuevo Tramite
El flujo sería: Dashboard -> Dar click a "Nuevo Trámite" -> Rellenar formulario -> Aceptar.
#### Abrir Ticket de soporte
El flujo sería: Dashboard -> Abrir Ticket -> Rellenar formulario -> Enviar Ticket.
### (f) Puntos criticos de interacción
Register: El usuario/admin no podrá avanzar sin rellenar todos los campos obligatorios
Login: El usuario/admin no podrá avanzar sin rellenar todos los campos obligatorios. En caso de no tener cuenta deberá crearse una
Rechazar Documento: Si el admin decide rechazar un documento es irreversible, es decir no tiene vuelta atras, por lo que se pide confirmación
### (g) Coherencia de experiencia entre dispositivos 
Esto se logrará mediante la utilización de un diseño responsive el cual se adaptará en diferentes tamaños de pantallas
### (h) Justificación de las Decisiones 
#### Escalabilidad
Se utilizarán rutas dinamicas, lo cual garantiza escalabilidad en el sistema, dado que si el dia de mañana hay una gran cantidad de documentos no tengamos que crear una ruta para cada uno.
#### Usabilidad
La página será totalmente usable, cada función cumplirá su rol.
#### Eficiencia de interacción
Para funciones primordiales se crearon botones que hacen que se pueda llegar con un solo click o maximo 2
#### Claridad estructural 
El sistema sigue una estructura la cual hace que para el usuario sea totalmente intuitivo
## Creación del Proyecto en IonicReact
### (a) Uso de ReactRouter
Esto se cumple y evidencia en el archivo "package.json" donde se ve la presencia de "@ionic/react-router" y "react-router-dom". Además, todas las rutas principales se pueden observar en "src/App.tsx", utilizando componentes como <IonReactRouter> e <IonRouterOutlet>, además del componente <Route> usado para cada endpoint.
### (b) Rutas públicas y Rutas protegidas
(Falta implementar rutas protegidas creo)
### (c) Redirecciones
En el proyecto se utilizan redirecciones utilizando el Hook "useHistory()" nativo de React Router Dom. Esto se visualiza en el archivo de inicio de sesión (src/pages/Login.tsx) así como en la barra lateral del DashBoard (src/pages/Dashboard.tsx). Cuando un usuario realiza una acción, las funciones lo redireccionan para enviarlos de forma fluida a la ruta de destino
### (d) Estructura modular de vistar
Todo el FrontEnd hace uso de separación de responsabilidades por medio de módulos. En el directorio "src/pages" exiten archivos ".tsx" para cada vista de la aplicación (Login.tsx, DashBoard.tsx, etc...). Luego, estos módulos se importan en el enrutamiento central de "src/App.tsx", lo que mejora el mantenimiento y escalabilidad de cada vista por separado.




### Links
* Link a figma: https://www.figma.com/design/x2w1YetlibQSoyQsiT1NZu/Sin-t%C3%ADtulo?node-id=0-1&p=f&t=SEeCUrZCTZi6Zr9p-0(1.3)
* https://firma.digital.gob.cl/
* https://framework.digital.gob.cl/colors.html
* https://framework.digital.gob.cl/
* https://claveunica.gob.cl/instituciones
