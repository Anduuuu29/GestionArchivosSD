import { IonIcon } from '@ionic/react';
import { 
  arrowBackOutline,
  chevronDownOutline,
  cloudUploadOutline,
  documentOutline,
  imageOutline,
  trashOutline,
  informationCircleOutline
} from 'ionicons/icons';
import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';

const AgregarDocumentosUser: React.FC = () => {
  const history = useHistory();
  
  // Estados del formulario
  const [categoria, setCategoria] = useState('');
  const [asunto, setAsunto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [archivos, setArchivos] = useState<File[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Manejadores de arrastrar y soltar
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setArchivos(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setArchivos(prev => [...prev, ...newFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setArchivos(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <UserLayout>
      <div className="flex flex-col p-6 w-full max-w-[1200px] mx-auto overflow-y-auto" style={{ minHeight: 'calc(100vh - 60px)' }}>
        
        <div className="mb-6">
          <button 
            onClick={() => history.push('/usuario/documentos')} 
            style={{ backgroundColor: '#050d2c', color: 'white', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer', border: 'none' }}
          >
            <IonIcon icon={arrowBackOutline} style={{ fontSize: '18px' }} />
            Volver Atrás
          </button>
        </div>

        <div className="flex items-center gap-2 mb-8">
          <span className="text-[#fe6565] font-['Inter',sans-serif] font-black text-[10px] tracking-widest uppercase">i</span>
          <h1 className="text-[#111] font-['Inter',sans-serif] font-extrabold text-4xl tracking-tight m-0">Agregar documentos</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 w-full">
          
          {/* Form Left Side */}
          <div className="flex-1 bg-white border border-gray-100 rounded-2xl p-8 flex flex-col gap-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            
            {/* Tipo de Trámite */}
            <div className="flex flex-col gap-2">
              <label className="text-[#121a34] font-bold text-sm">
                Tipo de Trámite <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select 
                  value={categoria}
                  onChange={(e) => setCategoria(e.target.value)}
                  className="w-full bg-[#f2f3ff] border-none rounded-lg p-3.5 pr-10 text-sm text-[#121a34] appearance-none focus:ring-2 focus:ring-[#00518e]/30 outline-none cursor-pointer"
                >
                  <option value="" disabled>Seleccione una categoría</option>
                  <option value="1">Categoría 1</option>
                  <option value="2">Categoría 2</option>
                  <option value="3">Categoría 3</option>
                  <option value="4">Categoría 4</option>
                </select>
                <IonIcon icon={chevronDownOutline} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
              </div>
            </div>

            {/* Asunto */}
            <div className="flex flex-col gap-2">
              <label className="text-[#121a34] font-bold text-sm">
                Asunto <span className="text-red-500">*</span>
              </label>
              <input 
                type="text" 
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                placeholder="Ej: Solicitud de renovación de patente 2024"
                className="bg-[#f2f3ff] border-none rounded-lg p-3.5 text-sm text-[#121a34] focus:ring-2 focus:ring-[#00518e]/30 outline-none w-full"
              />
            </div>

            {/* Descripción Detallada */}
            <div className="flex flex-col gap-2">
              <label className="text-[#121a34] font-bold text-sm">Descripción Detallada</label>
              <textarea 
                rows={6}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Indique los detalles relevantes para la gestión de este documento..."
                className="bg-[#f2f3ff] border-none rounded-lg p-3.5 text-sm text-[#121a34] focus:ring-2 focus:ring-[#00518e]/30 outline-none w-full resize-none placeholder:text-gray-400"
              ></textarea>
              <span className="text-right text-gray-500 text-[11px] mt-1">{descripcion.length} / 1000 caracteres</span>
            </div>

          </div>

          {/* Upload Right Side */}
          <div className="w-full lg:w-[320px] shrink-0 border border-[#a8b7c7]/40 rounded-2xl p-6 bg-[#fcfcfc] flex flex-col gap-4">
            
            {/* Upload Area */}
            <div 
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="bg-[#f2f3ff] border border-dashed border-[#a8b7c7] rounded-xl p-6 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-blue-50/50 transition-colors h-[180px]"
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#00518e] shadow-sm">
                <IonIcon icon={cloudUploadOutline} className="text-xl" />
              </div>
              <div>
                <p className="text-[#00518e] font-bold text-sm m-0">Haz clic o arrastra archivos</p>
                <p className="text-[#4a4a4a] text-xs mt-1 m-0">PDF, JPG o PNG (Máx 10MB)</p>
              </div>
              <input 
                type="file" 
                multiple 
                className="hidden" 
                ref={fileInputRef} 
                onChange={handleFileInput} 
                accept=".pdf,.jpg,.jpeg,.png"
              />
            </div>

            {/* Uploaded Files */}
            <div className="flex flex-col gap-3 mt-2 overflow-y-auto max-h-[200px] pr-2">
              {archivos.map((archivo, idx) => (
                <div key={idx} className="bg-[#f2f3ff] border border-gray-200/60 rounded-lg p-3 flex items-center gap-3 shrink-0">
                  <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 ${archivo.type.includes('pdf') ? 'bg-red-50 text-red-500' : 'bg-gray-200 text-gray-500'}`}>
                    <IonIcon icon={archivo.type.includes('pdf') ? documentOutline : imageOutline} className="text-lg" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#121a34] font-bold text-[11px] truncate m-0 leading-tight" title={archivo.name}>{archivo.name}</p>
                    <p className="text-gray-500 text-[9px] m-0 mt-0.5">{formatFileSize(archivo.size)} • Cargado</p>
                  </div>
                  <button onClick={() => handleRemoveFile(idx)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                    <IonIcon icon={trashOutline} className="text-lg" />
                  </button>
                </div>
              ))}
              
              {archivos.length === 0 && (
                <p className="text-center text-gray-400 text-xs py-4">No hay archivos adjuntos.</p>
              )}
            </div>

            {/* Info Box */}
            <div className="bg-[#f2f3ff] border border-blue-100 rounded-lg p-4 flex gap-3 items-start mt-auto">
              <IonIcon icon={informationCircleOutline} className="text-[#00518e] text-lg shrink-0" />
              <p className="text-[#121a34] text-xs m-0 leading-relaxed">
                Asegúrese de adjuntar todos los documentos requeridos por la ley para evitar retrasos.
              </p>
            </div>

          </div>
        </div>

        <div className="flex justify-center mt-12 mb-8">
          <button 
            onClick={() => {
              if (categoria && asunto) {
                history.push('/usuario/documentos');
              } else {
                alert('Por favor complete los campos obligatorios (Tipo de Trámite y Asunto).');
              }
            }} 
            style={{ backgroundColor: '#050d2c', color: 'white', padding: '14px 48px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer', border: 'none', boxShadow: '0 4px 14px rgba(5,13,44,0.15)' }}
          >
            Aceptar
          </button>
        </div>

      </div>
    </UserLayout>
  );
};

export default AgregarDocumentosUser;
