const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');

const filesToPatch = [
  {
    name: 'Login.tsx',
    replacements: [
      { find: /<button className="bg-\[\#050d2c\]([^>]*?)>[\s\n]*Ingresar[\s\n]*<\/button>/g, replace: '<button className="bg-[#050d2c]$1 onClick={() => history.push(\'/dashboard-user\')}>Ingresar</button>' },
      { find: /<a href="\#" className="text-\[\#00518e\] font-bold hover:underline">Regístrate aquí<\/a>/g, replace: '<span onClick={() => history.push(\'/register\')} className="text-[#00518e] font-bold hover:underline cursor-pointer">Regístrate aquí</span>' },
      { find: /<button className="mt-8 text-gray-500([^>]*?)>[\s\n]*<IonIcon icon=\{shieldCheckmarkOutline\}[^>]*\/>[\s\n]*Ingreso para Administradores[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/admin/login\')} className="mt-8 text-gray-500$1>\n<IonIcon icon={shieldCheckmarkOutline} className="text-lg" />\nIngreso para Administradores\n</button>' }
    ]
  },
  {
    name: 'LoginAdmin.tsx',
    replacements: [
      { find: /<button className="w-full bg-\[\#00518e\]([^>]*?)>[\s\n]*Ingresar al Panel de Control[\s\n]*<\/button>/g, replace: '<button className="w-full bg-[#00518e]$1 onClick={() => history.push(\'/dashboard\')}>Ingresar al Panel de Control</button>' },
      { find: /<button className="w-full bg-white([^>]*?)>[\s\n]*Volver a Inicio de Sesión[\s\n]*<\/button>/g, replace: '<button className="w-full bg-white$1 onClick={() => history.push(\'/\')}>Volver a Inicio de Sesión</button>' }
    ]
  },
  {
    name: 'Register.tsx',
    replacements: [
      { find: /<button className="bg-\[\#050d2c\]([^>]*?)>[\s\n]*Registrar Cuenta[\s\n]*<\/button>/g, replace: '<button className="bg-[#050d2c]$1 onClick={() => history.push(\'/\')}>Registrar Cuenta</button>' },
      { find: /<button className="mt-6 text-gray-500([^>]*?)>[\s\n]*Volver a Inicio de Sesión[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/\')} className="mt-6 text-gray-500$1>\nVolver a Inicio de Sesión\n</button>' }
    ]
  },
  {
    name: 'Dashboard.tsx',
    replacements: [
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{documentTextOutline\}[^>]*\/>\s*<span[^>]*>Documentos<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/admin/documentos\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={documentTextOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">Documentos</span>\n</li>' },
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{folderOpenOutline\}[^>]*\/>\s*<span[^>]*>Administración<br\/>de archivos<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/admin/archivos\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={folderOpenOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase leading-tight">Administración<br/>de archivos</span>\n</li>' },
      { find: /<button className="bg-\[\#050d2c\]([^>]*?)>[\s\n]*<IonIcon icon=\{addOutline\}[^>]*\/>[\s\n]*Nuevo Trámite[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/admin/documentos/agregar\')} className="bg-[#050d2c]$1>\n<IonIcon icon={addOutline} className="text-lg" />\nNuevo Trámite\n</button>' }
    ]
  },
  {
    name: 'DashboardUser.tsx',
    replacements: [
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{documentTextOutline\}[^>]*\/>\s*<span[^>]*>Documentos<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/usuario/documentos\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={documentTextOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">Documentos</span>\n</li>' },
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{ticketOutline\}[^>]*\/>\s*<span[^>]*>Abrir Ticket<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/abrir-ticket\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={ticketOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase leading-tight">Abrir Ticket</span>\n</li>' },
      { find: /<button className="bg-\[\#050d2c\]([^>]*?)>[\s\n]*<IonIcon icon=\{addOutline\}[^>]*\/>[\s\n]*Nuevo Trámite[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/usuario/documentos/agregar\')} className="bg-[#050d2c]$1>\n<IonIcon icon={addOutline} className="text-lg" />\nNuevo Trámite\n</button>' }
    ]
  },
  {
    name: 'DocumentosAdmin.tsx',
    replacements: [
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{homeOutline\}[^>]*\/>\s*<span[^>]*>Dashboard<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/dashboard\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={homeOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">Dashboard</span>\n</li>' },
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{folderOpenOutline\}[^>]*\/>\s*<span[^>]*>Administración<br\/>de archivos<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/admin/archivos\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={folderOpenOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase leading-tight">Administración<br/>de archivos</span>\n</li>' },
      { find: /<button className="bg-\[\#050d2c\]([^>]*?)>[\s\n]*<IonIcon icon=\{addOutline\}[^>]*\/>[\s\n]*Nuevo Trámite[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/admin/documentos/agregar\')} className="bg-[#050d2c]$1>\n<IonIcon icon={addOutline} className="text-lg" />\nNuevo Trámite\n</button>' },
      { find: /<tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">/g, replace: '<tr onClick={() => history.push(\'/admin/documentos/detalles\')} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group cursor-pointer">' }
    ]
  },
  {
    name: 'DocumentosUser.tsx',
    replacements: [
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{homeOutline\}[^>]*\/>\s*<span[^>]*>Dashboard<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/dashboard-user\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={homeOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">Dashboard</span>\n</li>' },
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{ticketOutline\}[^>]*\/>\s*<span[^>]*>Abrir Ticket<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/abrir-ticket\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={ticketOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase leading-tight">Abrir Ticket</span>\n</li>' },
      { find: /<button className="bg-\[\#050d2c\]([^>]*?)>[\s\n]*<IonIcon icon=\{addOutline\}[^>]*\/>[\s\n]*Nuevo Trámite[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/usuario/documentos/agregar\')} className="bg-[#050d2c]$1>\n<IonIcon icon={addOutline} className="text-lg" />\nNuevo Trámite\n</button>' },
      { find: /<tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors group">/g, replace: '<tr onClick={() => history.push(\'/usuario/documentos/detalles\')} className="border-b border-gray-100 hover:bg-gray-50 transition-colors group cursor-pointer">' }
    ]
  },
  {
    name: 'DocumentosAdminDetails.tsx',
    replacements: [
      { find: /<button className="text-gray-400 hover:text-\[\#111\] p-1 rounded-md transition-colors([^>]*?)>[\s\n]*<IonIcon icon=\{closeOutline\}[^>]*\/>[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/admin/documentos\')} className="text-gray-400 hover:text-[#111] p-1 rounded-md transition-colors$1>\n<IonIcon icon={closeOutline} className="text-2xl" />\n</button>' },
      { find: /<div className="bg-\[\#f2f3ff\] rounded-xl p-4 flex flex-col items-center justify-center gap-2 border border-\[\#a8b7c7\]\/40 hover:bg-\[\#e5e7ff\] transition-colors group cursor-pointer">/g, replace: '<div onClick={() => history.push(\'/admin/documentos/expandido\')} className="bg-[#f2f3ff] rounded-xl p-4 flex flex-col items-center justify-center gap-2 border border-[#a8b7c7]/40 hover:bg-[#e5e7ff] transition-colors group cursor-pointer">' }
    ]
  },
  {
    name: 'DocumentosUserDetails.tsx',
    replacements: [
      { find: /<button className="text-gray-400 hover:text-\[\#111\] p-1 rounded-md transition-colors([^>]*?)>[\s\n]*<IonIcon icon=\{closeOutline\}[^>]*\/>[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/usuario/documentos\')} className="text-gray-400 hover:text-[#111] p-1 rounded-md transition-colors$1>\n<IonIcon icon={closeOutline} className="text-2xl" />\n</button>' },
      { find: /<div className="bg-\[\#f2f3ff\] rounded-xl p-4 flex flex-col items-center justify-center gap-2 border border-\[\#a8b7c7\]\/40 hover:bg-\[\#e5e7ff\] transition-colors group cursor-pointer">/g, replace: '<div onClick={() => history.push(\'/usuario/documentos/expandido\')} className="bg-[#f2f3ff] rounded-xl p-4 flex flex-col items-center justify-center gap-2 border border-[#a8b7c7]/40 hover:bg-[#e5e7ff] transition-colors group cursor-pointer">' }
    ]
  },
  {
    name: 'DocumentoExpandidoAdmin.tsx',
    replacements: [
      { find: /<button className="text-gray-500 hover:bg-gray-100 p-1.5 rounded transition-colors([^>]*?)>[\s\n]*<IonIcon icon=\{closeOutline\}[^>]*\/>[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/admin/documentos/detalles\')} className="text-gray-500 hover:bg-gray-100 p-1.5 rounded transition-colors$1>\n<IonIcon icon={closeOutline} className="text-2xl" />\n</button>' },
      { find: /onClick=\{.*?\}\s*className="flex items-center justify-center gap-2 border border-red-500 text-red-500 font-bold rounded-lg py-2.5 text-sm hover:bg-red-50 transition-colors"/g, replace: 'onClick={() => history.push(\'/admin/documentos/rechazar\')} className="flex items-center justify-center gap-2 border border-red-500 text-red-500 font-bold rounded-lg py-2.5 text-sm hover:bg-red-50 transition-colors"' },
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{homeOutline\}[^>]*\/>\s*<span[^>]*>Dashboard<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/dashboard\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={homeOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">Dashboard</span>\n</li>' }
    ]
  },
  {
    name: 'DocumentoExpandidoUser.tsx',
    replacements: [
      { find: /<button className="text-gray-500 hover:bg-gray-100 p-1.5 rounded transition-colors([^>]*?)>[\s\n]*<IonIcon icon=\{closeOutline\}[^>]*\/>[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/usuario/documentos/detalles\')} className="text-gray-500 hover:bg-gray-100 p-1.5 rounded transition-colors$1>\n<IonIcon icon={closeOutline} className="text-2xl" />\n</button>' },
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{homeOutline\}[^>]*\/>\s*<span[^>]*>Dashboard<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/dashboard-user\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={homeOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">Dashboard</span>\n</li>' }
    ]
  },
  {
    name: 'RechazarDocumentoAdmin.tsx',
    replacements: [
      { find: /<button className="flex-1 bg-white border border-\[\#a8b7c7\] text-\[\#121a34\] font-medium py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">[\s\n]*Cancelar[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/admin/documentos/expandido\')} className="flex-1 bg-white border border-[#a8b7c7] text-[#121a34] font-medium py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors">\nCancelar\n</button>' },
      { find: /<button className="flex-1 flex items-center justify-center gap-2 bg-\[\#9a1b24\] text-white font-medium py-2.5 rounded-lg text-sm hover:bg-red-800 transition-colors">[\s\n]*<IonIcon icon=\{checkmarkCircleOutline\} \/>[\s\n]*Confirmar Rechazo[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/admin/documentos\')} className="flex-1 flex items-center justify-center gap-2 bg-[#9a1b24] text-white font-medium py-2.5 rounded-lg text-sm hover:bg-red-800 transition-colors">\n<IonIcon icon={checkmarkCircleOutline} />\nConfirmar Rechazo\n</button>' },
      { find: /<button className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors">[\s\n]*<IonIcon icon=\{closeOutline\} className="text-xl" \/>[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/admin/documentos/expandido\')} className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors">\n<IonIcon icon={closeOutline} className="text-xl" />\n</button>' }
    ]
  },
  {
    name: 'AgregarDocumentosAdmin.tsx',
    replacements: [
      { find: /<button className="bg-\[\#050d2c\] text-white flex items-center gap-2 px-6 py-2.5 rounded text-xs font-bold tracking-widest uppercase transition-colors hover:bg-\[\#0a184a\]">[\s\n]*<IonIcon icon=\{arrowBackOutline\} className="text-lg" \/>[\s\n]*Volver Atrás[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/admin/documentos\')} className="bg-[#050d2c] text-white flex items-center gap-2 px-6 py-2.5 rounded text-xs font-bold tracking-widest uppercase transition-colors hover:bg-[#0a184a]">\n<IonIcon icon={arrowBackOutline} className="text-lg" />\nVolver Atrás\n</button>' },
      { find: /<button className="bg-\[\#050d2c\] text-white px-12 py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-colors hover:bg-\[\#0a184a\] shadow-lg shadow-blue-900\/10">[\s\n]*Aceptar[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/admin/documentos\')} className="bg-[#050d2c] text-white px-12 py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-colors hover:bg-[#0a184a] shadow-lg shadow-blue-900/10">\nAceptar\n</button>' },
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{homeOutline\}[^>]*\/>\s*<span[^>]*>Dashboard<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/dashboard\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={homeOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">Dashboard</span>\n</li>' }
    ]
  },
  {
    name: 'AgregarDocumentosUser.tsx',
    replacements: [
      { find: /<button className="bg-\[\#050d2c\] text-white flex items-center gap-2 px-6 py-2.5 rounded text-xs font-bold tracking-widest uppercase transition-colors hover:bg-\[\#0a184a\]">[\s\n]*<IonIcon icon=\{arrowBackOutline\} className="text-lg" \/>[\s\n]*Volver Atrás[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/usuario/documentos\')} className="bg-[#050d2c] text-white flex items-center gap-2 px-6 py-2.5 rounded text-xs font-bold tracking-widest uppercase transition-colors hover:bg-[#0a184a]">\n<IonIcon icon={arrowBackOutline} className="text-lg" />\nVolver Atrás\n</button>' },
      { find: /<button className="bg-\[\#050d2c\] text-white px-12 py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-colors hover:bg-\[\#0a184a\] shadow-lg shadow-blue-900\/10">[\s\n]*Aceptar[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/usuario/documentos\')} className="bg-[#050d2c] text-white px-12 py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-colors hover:bg-[#0a184a] shadow-lg shadow-blue-900/10">\nAceptar\n</button>' },
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{homeOutline\}[^>]*\/>\s*<span[^>]*>Dashboard<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/dashboard-user\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={homeOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">Dashboard</span>\n</li>' }
    ]
  },
  {
    name: 'AdminArchivos.tsx',
    replacements: [
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{homeOutline\}[^>]*\/>\s*<span[^>]*>Dashboard<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/dashboard\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={homeOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">Dashboard</span>\n</li>' },
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{documentTextOutline\}[^>]*\/>\s*<span[^>]*>Documentos<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/admin/documentos\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={documentTextOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">Documentos</span>\n</li>' },
      { find: /<button className="bg-\[\#050d2c\]([^>]*?)>[\s\n]*<IonIcon icon=\{addOutline\}[^>]*\/>[\s\n]*Nuevo Trámite[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/admin/documentos/agregar\')} className="bg-[#050d2c]$1>\n<IonIcon icon={addOutline} className="text-lg" />\nNuevo Trámite\n</button>' }
    ]
  },
  {
    name: 'AbrirTicket.tsx',
    replacements: [
      { find: /<button className="bg-\[\#050d2c\] text-white flex items-center gap-2 px-6 py-2.5 rounded text-xs font-bold tracking-widest uppercase transition-colors hover:bg-\[\#0a184a\]">[\s\n]*<IonIcon icon=\{arrowBackOutline\} className="text-lg" \/>[\s\n]*Volver Atrás[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/dashboard-user\')} className="bg-[#050d2c] text-white flex items-center gap-2 px-6 py-2.5 rounded text-xs font-bold tracking-widest uppercase transition-colors hover:bg-[#0a184a]">\n<IonIcon icon={arrowBackOutline} className="text-lg" />\nVolver Atrás\n</button>' },
      { find: /<button className="bg-\[\#050d2c\] text-white px-12 py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-colors hover:bg-\[\#0a184a\] shadow-lg shadow-blue-900\/10">[\s\n]*Enviar Ticket[\s\n]*<\/button>/g, replace: '<button onClick={() => history.push(\'/dashboard-user\')} className="bg-[#050d2c] text-white px-12 py-3.5 rounded text-xs font-bold tracking-widest uppercase transition-colors hover:bg-[#0a184a] shadow-lg shadow-blue-900/10">\nEnviar Ticket\n</button>' },
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{homeOutline\}[^>]*\/>\s*<span[^>]*>Dashboard<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/dashboard-user\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={homeOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">Dashboard</span>\n</li>' },
      { find: /<li className="flex items-center px-4 py-3 gap-3 hover:bg-\[\#e0e0e0\] cursor-pointer transition-colors">\s*<IonIcon icon=\{documentTextOutline\}[^>]*\/>\s*<span[^>]*>Documentos<\/span>\s*<\/li>/g, replace: '<li onClick={() => history.push(\'/usuario/documentos\')} className="flex items-center px-4 py-3 gap-3 hover:bg-[#e0e0e0] cursor-pointer transition-colors">\n<IonIcon icon={documentTextOutline} className="text-[#4a4a4a] text-lg" />\n<span className="font-[\'Inter\',sans-serif] font-medium text-[#4a4a4a] text-xs tracking-widest uppercase">Documentos</span>\n</li>' }
    ]
  }
];

filesToPatch.forEach(fileDef => {
  const filePath = path.join(pagesDir, fileDef.name);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    // Add import if not exists
    if (!content.includes('useHistory')) {
      content = content.replace(/import React(.*?)\s*from 'react';/, "import React$1 from 'react';\nimport { useHistory } from 'react-router-dom';");
    }

    // Add hook
    const componentMatch = content.match(/const\s+([A-Za-z0-9_]+)\s*:\s*React\.FC\s*=\s*\(\)\s*=>\s*\{/);
    if (componentMatch && !content.includes('const history = useHistory()')) {
      content = content.replace(componentMatch[0], componentMatch[0] + '\n  const history = useHistory();\n');
    }

    // Apply replacements
    fileDef.replacements.forEach(rep => {
      content = content.replace(rep.find, rep.replace);
    });

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Patched ${fileDef.name}`);
  }
});
