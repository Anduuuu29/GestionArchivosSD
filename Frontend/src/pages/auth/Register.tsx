import { IonIcon } from '@ionic/react';
import { eyeOutline, eyeOffOutline, chevronDownOutline } from 'ionicons/icons';
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { regionsAndComunas } from '../../utils/chileData';
import { validateName, validateEmail, validateRut, checkPasswordStrength } from '../../utils/validators';
const Combobox = ({ 
  label, 
  value, 
  onChange, 
  options, 
  placeholder,
  disabled = false
}: { 
  label: string, 
  value: string, 
  onChange: (val: string) => void, 
  options: string[], 
  placeholder: string,
  disabled?: boolean
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(value);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setSearchTerm(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        // Reset search term to selected value if clicked outside
        setSearchTerm(value);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-2 w-full relative" ref={wrapperRef}>
      <label className="text-[#0a132d] text-[10px] font-bold uppercase tracking-[1px] font-['Inter']">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type="text"
          value={isOpen ? searchTerm : value}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            onChange(''); // Clear selection when typing
          }}
          onClick={() => !disabled && setIsOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`register-field w-full pr-10 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        />
        <IonIcon 
          icon={chevronDownOutline} 
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer pointer-events-none"
        />
      </div>

      {isOpen && !disabled && (
        <ul className="absolute top-[100%] left-0 w-full mt-1 max-h-48 overflow-y-auto bg-white border border-gray-200 shadow-xl rounded-md z-50">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt, idx) => (
              <li 
                key={idx}
                className="px-4 py-2 hover:bg-[#006fb3] hover:text-white cursor-pointer text-sm font-['Inter'] text-gray-700 transition-colors"
                onClick={() => {
                  onChange(opt);
                  setSearchTerm(opt);
                  setIsOpen(false);
                }}
              >
                {opt}
              </li>
            ))
          ) : (
            <li className="px-4 py-2 text-sm text-gray-400 font-['Inter']">No se encontraron resultados</li>
          )}
        </ul>
      )}
    </div>
  );
};

const Register: React.FC = () => {
  const history = useHistory();
  
  // States
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    rut: '',
    correo: '',
    region: '',
    comuna: '',
    password: '',
    confirmPassword: '',
    aceptaTerminos: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const comunasOptions = regionsAndComunas.find(r => r.region === form.region)?.comunas || [];

  const handleInputChange = (field: string, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
    
    // Clear specific error on change
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }

    // Dynamic validations for names (no numbers allowed)
    if (field === 'nombre' || field === 'apellido') {
      const valStr = value as string;
      if (valStr && !validateName(valStr)) {
        setErrors(prev => ({ ...prev, [field]: 'No se permiten números ni caracteres especiales' }));
      }
    }
  };

  const handleRegionChange = (region: string) => {
    setForm(prev => ({ ...prev, region, comuna: '' })); // Reset comuna on region change
  };

  const handleSubmit = () => {
    const newErrors: { [key: string]: string } = {};

    if (!form.nombre || !validateName(form.nombre)) newErrors.nombre = 'Nombre inválido';
    if (!form.apellido || !validateName(form.apellido)) newErrors.apellido = 'Apellido inválido';
    if (!form.rut || !validateRut(form.rut)) newErrors.rut = 'RUT inválido (ej: 12345678-9)';
    if (!form.correo || !validateEmail(form.correo)) newErrors.correo = 'Correo inválido';
    if (!form.region) newErrors.region = 'Requerido';
    if (!form.comuna) newErrors.comuna = 'Requerido';
    if (!form.password || checkPasswordStrength(form.password) < 2) newErrors.password = 'Contraseña muy débil';
    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Las contraseñas no coinciden';
    if (!form.aceptaTerminos) newErrors.aceptaTerminos = 'Debes aceptar los términos';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Si todo es válido:
    console.log("Formulario válido", form);
    history.push('/usuario/dashboard'); // Redirigir
  };

  const pwdStrength = checkPasswordStrength(form.password);
  
  // Determinar color de las barras de seguridad
  const getStrengthBarColor = (index: number) => {
    if (pwdStrength === 0) return '#c0c7d2';
    if (pwdStrength === 1 && index === 0) return '#ba1a1a'; // Rojo débil
    if (pwdStrength === 2 && index <= 1) return '#eab308'; // Amarillo medio
    if (pwdStrength >= 3 && index <= pwdStrength - 1) return '#22c55e'; // Verde fuerte
    return '#c0c7d2'; // Gris inactivo
  };

  const getStrengthText = () => {
    if (pwdStrength === 0) return '';
    if (pwdStrength === 1) return <span className="text-[#ba1a1a]">Seguridad: Débil</span>;
    if (pwdStrength === 2) return <span className="text-[#eab308]">Seguridad: Media</span>;
    if (pwdStrength >= 3) return <span className="text-[#22c55e]">Seguridad: Fuerte</span>;
  };

  return (
    <>
      {/* accent line top */}
      <div className="absolute top-0 left-10 right-10 h-[3px] bg-gradient-to-r from-transparent via-[#60eca880] to-transparent rounded-b-md" />

      <h2 className="text-[#0a132d] text-3xl font-black uppercase tracking-[-0.5px] mb-8 text-center">
        Crea una cuenta
      </h2>

      <div className="flex flex-col gap-6">
        
        {/* Nombre y Apellido */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-[#0a132d] text-[10px] font-bold uppercase tracking-[1px]">Nombre</label>
            <input 
              type="text" 
              placeholder="Ej. Juan" 
              className={`auth-field ${errors.nombre ? 'border-[#ba1a1a] shadow-[0_0_0_3px_rgba(186,26,26,0.1)]' : ''}`}
              value={form.nombre}
              onChange={(e) => handleInputChange('nombre', e.target.value)}
            />
            {errors.nombre && <span className="text-[#ba1a1a] text-xs font-medium">{errors.nombre}</span>}
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-[#0a132d] text-[10px] font-bold uppercase tracking-[1px]">Apellido</label>
            <input 
              type="text" 
              placeholder="Ej. Pérez" 
              className={`auth-field ${errors.apellido ? 'border-[#ba1a1a] shadow-[0_0_0_3px_rgba(186,26,26,0.1)]' : ''}`}
              value={form.apellido}
              onChange={(e) => handleInputChange('apellido', e.target.value)}
            />
            {errors.apellido && <span className="text-[#ba1a1a] text-xs font-medium">{errors.apellido}</span>}
          </div>
        </div>

        {/* RUT */}
        <div className="flex flex-col gap-2">
          <label className="text-[#0a132d] text-[10px] font-bold uppercase tracking-[1px]">RUT</label>
          <input 
            type="text" 
            placeholder="12.345.678-9" 
            className={`auth-field ${errors.rut ? 'border-[#ba1a1a] shadow-[0_0_0_3px_rgba(186,26,26,0.1)]' : ''}`}
            value={form.rut}
            onChange={(e) => handleInputChange('rut', e.target.value)}
          />
          {errors.rut && <span className="text-[#ba1a1a] text-xs font-medium">{errors.rut}</span>}
        </div>

        {/* Correo */}
        <div className="flex flex-col gap-2">
          <label className="text-[#0a132d] text-[10px] font-bold uppercase tracking-[1px]">Correo</label>
          <input 
            type="email" 
            placeholder="name@company.com" 
            className={`auth-field ${errors.correo ? 'border-[#ba1a1a] shadow-[0_0_0_3px_rgba(186,26,26,0.1)]' : ''}`}
            value={form.correo}
            onChange={(e) => handleInputChange('correo', e.target.value)}
          />
          {errors.correo && <span className="text-[#ba1a1a] text-xs font-medium">{errors.correo}</span>}
        </div>

        {/* Región y Comuna (Comboboxes) */}
        <div className="flex flex-col md:flex-row gap-6 w-full">
          <div className="flex-1">
            <Combobox
              label="Región"
              placeholder="Selecciona una región..."
              options={regionsAndComunas.map(r => r.region)}
              value={form.region}
              onChange={handleRegionChange}
            />
            {errors.region && <span className="text-[#ba1a1a] text-xs font-medium mt-1 block">{errors.region}</span>}
          </div>
          <div className="flex-1">
            <Combobox
              label="Comuna"
              placeholder="Selecciona una comuna..."
              options={comunasOptions}
              value={form.comuna}
              onChange={(val) => handleInputChange('comuna', val)}
              disabled={!form.region}
            />
            {errors.comuna && <span className="text-[#ba1a1a] text-xs font-medium mt-1 block">{errors.comuna}</span>}
          </div>
        </div>

        {/* Contraseña */}
        <div className="flex flex-col gap-2">
          <label className="text-[#0a132d] text-[10px] font-bold uppercase tracking-[1px]">Contraseña</label>
          <div className="relative">
            <input 
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••" 
              className={`auth-field pr-12 ${errors.password ? 'border-[#ba1a1a] shadow-[0_0_0_3px_rgba(186,26,26,0.1)]' : ''}`}
              value={form.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowPassword(!showPassword)}
            >
              <IonIcon icon={showPassword ? eyeOffOutline : eyeOutline} className="text-xl" />
            </button>
          </div>
          
          {/* Medidor de fuerza */}
          {form.password && (
            <div className="flex flex-col gap-1 mt-1">
              <div className="flex gap-1 h-[6px]">
                {[0, 1, 2, 3].map(index => (
                  <div 
                    key={index} 
                    className="flex-1 rounded-full transition-colors duration-300" 
                    style={{ backgroundColor: getStrengthBarColor(index) }}
                  />
                ))}
              </div>
              <div className="text-xs font-medium">{getStrengthText()}</div>
            </div>
          )}
          {errors.password && <span className="text-[#ba1a1a] text-xs font-medium">{errors.password}</span>}
        </div>

        {/* Confirmar Contraseña */}
        <div className="flex flex-col gap-2">
          <label className="text-[#0a132d] text-[10px] font-bold uppercase tracking-[1px]">Confirmar Contraseña</label>
          <div className="relative">
            <input 
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="••••••••" 
              className={`auth-field pr-12 ${errors.confirmPassword ? 'border-[#ba1a1a] shadow-[0_0_0_3px_rgba(186,26,26,0.1)]' : ''}`}
              value={form.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
            />
            <button
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              <IonIcon icon={showConfirmPassword ? eyeOffOutline : eyeOutline} className="text-xl" />
            </button>
          </div>
          {errors.confirmPassword && <span className="text-[#ba1a1a] text-xs font-medium">{errors.confirmPassword}</span>}
        </div>

        {/* Términos y Condiciones */}
        <div className="flex items-start gap-3 mt-2">
          <input 
            type="checkbox" 
            className={`custom-checkbox mt-0.5 ${errors.aceptaTerminos ? 'border-[#ba1a1a]' : ''}`}
            checked={form.aceptaTerminos}
            onChange={(e) => handleInputChange('aceptaTerminos', e.target.checked)}
          />
          <p className="text-[#11181c] text-sm m-0 leading-tight">
            Acepto los <a href="#" className="text-[#006fb3] hover:underline">términos y condiciones</a> y la <a href="#" className="text-[#006fb3] hover:underline">política de privacidad de datos</a>
          </p>
        </div>
        {errors.aceptaTerminos && <span className="text-[#ba1a1a] text-xs font-medium -mt-1 ml-7">{errors.aceptaTerminos}</span>}

        {/* Submit Button */}
        <button 
          className="btn-primary mt-4"
          onClick={handleSubmit}
        >
          Crear
        </button>

      </div>

      {/* Login Link */}
      <div className="mt-8 text-center text-[15px] text-[#404750]">
        ¿Ya tienes una cuenta?{' '}
        <span 
          onClick={() => history.push('/')} 
          className="text-[#00568c] font-bold hover:underline cursor-pointer"
        >
          Inicia sesión
        </span>
      </div>
    </>
  );
};

export default Register;
