import React, { useState, useRef, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { cloudUploadOutline, trashOutline, documentOutline, chevronBackOutline, chevronForwardOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import UserLayout from '../../layouts/UserLayout';

// Image assets for the carousel
import image1 from '../../assets/54434537_1683112835167519_5745946731946704896_n-1024x768.jpg.webp';
import image2 from '../../assets/santo_domingo_chile[1].webp';
import image3 from '../../assets/Vista-panorámica-de-la-rica-playa-resort-ciudad-de-Santo-Domingo.jpg';

const AbrirTicket: React.FC = () => {
  const history = useHistory();
  
  // Form State
  const [asunto, setAsunto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  
  // File Handling State
  const [archivos, setArchivos] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Carousel State
  const images = [image1, image2, image3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const newFiles = Array.from(e.dataTransfer.files);
      setArchivos(prev => [...prev, ...newFiles]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setArchivos(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (indexToRemove: number) => {
    setArchivos(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = () => {
    if (!asunto.trim()) {
      alert('Por favor ingrese el Asunto.');
      return;
    }
    // API logic goes here
    history.push('/usuario/dashboard');
  };

  return (
    <UserLayout>
      <div className="flex flex-col p-8 w-full max-w-[1200px] mx-auto overflow-y-auto" style={{ minHeight: 'calc(100vh - 60px)' }}>
        
        {/* Header Section */}
        <div className="flex items-center gap-2 mb-8">
          <span className="text-[#fe6565] font-['Inter',sans-serif] font-black text-[12px] tracking-widest uppercase">i</span>
          <h1 className="text-[#111] font-['Inter',sans-serif] font-extrabold text-4xl tracking-tight m-0">Nuevo Ticket de soporte</h1>
        </div>

        <div className="flex gap-8 flex-col lg:flex-row items-start w-full">
          
          {/* Left Side: Carousel */}
          <div className="flex-1 w-full lg:w-1/2 relative rounded-xl overflow-hidden shadow-[0_4px_24px_rgba(0,0,0,0.1)] aspect-video lg:aspect-auto lg:h-[600px] bg-[#050d2c] group">
            
            {/* Background blurred image */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-in-out opacity-40" 
              style={{ backgroundImage: `url('${images[currentImageIndex]}')`, filter: 'blur(12px)', transform: 'scale(1.1)' }}
            ></div>

            {/* Foreground image (contained) */}
            <div 
              className="absolute inset-0 bg-contain bg-no-repeat bg-center transition-all duration-700 ease-in-out drop-shadow-2xl" 
              style={{ backgroundImage: `url('${images[currentImageIndex]}')` }}
            ></div>
            
            {/* Carousel Controls */}
            <button 
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={() => setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            >
              <IonIcon icon={chevronBackOutline} className="text-xl" />
            </button>
            <button 
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
            >
              <IonIcon icon={chevronForwardOutline} className="text-xl" />
            </button>
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
              {images.map((_, idx) => (
                <button 
                  key={idx}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${idx === currentImageIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'}`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>
          </div>

          {/* Right Side: Form Card */}
          <div className="w-full lg:w-[450px] shrink-0 bg-white border border-[#c1c7d3] rounded-[12px] shadow-[0_1px_1px_rgba(0,0,0,0.05)] p-8 flex flex-col gap-6">
            
            {/* Asunto */}
            <div className="flex flex-col gap-2">
              <label className="text-[#121a34] font-normal font-['Public_Sans',sans-serif] text-[16px]">Asunto</label>
              <input 
                type="text" 
                value={asunto}
                onChange={(e) => setAsunto(e.target.value)}
                placeholder="Ej: Error al adjuntar firma digital en decreto 402"
                className="bg-[#f2f3ff] border border-transparent rounded-[8px] p-3 text-[16px] text-[#6b7280] font-['Public_Sans',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#00518e]/30 transition-shadow w-full"
              />
            </div>

            {/* Descripción Detallada */}
            <div className="flex flex-col gap-2">
              <label className="text-[#121a34] font-normal font-['Public_Sans',sans-serif] text-[16px]">Descripción Detallada</label>
              <textarea 
                rows={5}
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Describa el problema, los pasos para reproducirlo y cualquier mensaje de error que haya visualizado..."
                className="bg-[#f2f3ff] border border-transparent rounded-[8px] p-3 text-[16px] text-[#6b7280] font-['Public_Sans',sans-serif] focus:outline-none focus:ring-2 focus:ring-[#00518e]/30 transition-shadow w-full resize-none"
              ></textarea>
            </div>

            {/* Archivos Adjuntos */}
            <div className="flex flex-col gap-2">
              <label className="text-[#121a34] font-normal font-['Public_Sans',sans-serif] text-[16px]">Archivos Adjuntos (Capturas o Logs)</label>
              <div 
                className={`border-2 border-dashed ${isDragging ? 'border-[#00518e] bg-[#f2f3ff]' : 'border-[#c1c7d3] bg-white'} rounded-[12px] p-8 flex flex-col items-center justify-center text-center gap-3 cursor-pointer hover:bg-[#f8f9fa] transition-colors`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="text-[#00518e]">
                  <IonIcon icon={cloudUploadOutline} className="text-3xl" />
                </div>
                <div>
                  <p className="text-[#121a34] font-normal font-['Public_Sans',sans-serif] text-[16px] m-0">Haga clic para subir o arrastre sus archivos aquí</p>
                  <p className="text-[#717782] font-medium font-['Public_Sans',sans-serif] text-[12px] mt-1 m-0">PNG, JPG o PDF (Máx. 10MB por archivo)</p>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileSelect} 
                  className="hidden" 
                  multiple 
                />
              </div>

              {/* Lista de Archivos */}
              {archivos.length > 0 && (
                <div className="mt-4 flex flex-col gap-2 max-h-[150px] overflow-y-auto pr-2">
                  {archivos.map((archivo, index) => (
                    <div key={index} className="flex justify-between items-center bg-[#f8f9fa] border border-[#e0e0e0] p-3 rounded-lg">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <IonIcon icon={documentOutline} className="text-[#050d2c] text-xl shrink-0" />
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-[#111] text-xs font-semibold truncate">{archivo.name}</span>
                          <span className="text-gray-500 text-[10px]">{(archivo.size / 1024 / 1024).toFixed(2)} MB</span>
                        </div>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                        className="text-[#ba1a1a] hover:bg-red-50 p-2 rounded-full transition-colors shrink-0"
                        title="Eliminar archivo"
                      >
                        <IonIcon icon={trashOutline} className="text-lg" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 mt-6">
              <button 
                onClick={() => history.push('/usuario/dashboard')} 
                style={{ backgroundColor: 'transparent', color: '#050d2c', padding: '12px 24px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer', border: '1px solid #050d2c', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f4f6f9'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                Cancelar
              </button>
              <button 
                onClick={handleSubmit} 
                style={{ backgroundColor: '#050d2c', color: 'white', padding: '12px 32px', borderRadius: '4px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '1.2px', textTransform: 'uppercase', cursor: 'pointer', border: 'none', boxShadow: '0 4px 14px rgba(5,13,44,0.15)', transition: 'background-color 0.2s' }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0a184a'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#050d2c'}
              >
                Enviar Ticket
              </button>
            </div>

          </div>
        </div>

      </div>
    </UserLayout>
  );
};

export default AbrirTicket;
