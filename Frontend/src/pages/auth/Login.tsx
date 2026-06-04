import { IonIcon } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Login: React.FC = () => {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [identifier, setIdentifier] = useState('');
  const [pwd, setpwd] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  return (
    <>
      <h2 style={{
        color: '#0a132d',
        fontSize: 26,
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        margin: '0 0 30px',
        fontFamily: "'Inter', sans-serif",
      }}>
        Inicio de sesión
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Email / RUT */}
        <div>
          <label style={{
            display: 'block',
            color: '#0a132d',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            marginBottom: 7,
            fontFamily: "'Inter', sans-serif",
          }}>
            Correo electrónico o RUT
          </label>
          <input
            className="auth-field"
            type="text"
            placeholder="nombre@correo.com"
            value={identifier}
            onChange={(e) => setIdentifier(e.target.value)}
          />
        </div>

        {/* Contraseña */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 7 }}>
            <label style={{
              color: '#0a132d',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              fontFamily: "'Inter', sans-serif",
            }}>
              Contraseña
            </label>
            <a
              href="#"
              style={{
                color: '#006fb3',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: 1,
                textDecoration: 'none',
                fontFamily: "'Inter', sans-serif",
              }}
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          <div style={{ position: 'relative' }}>
            <input
              className="auth-field"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              style={{ paddingRight: 48 }}
              value={pwd}
              onChange={(e) => setpwd(e.target.value)}
            />
            <button
              onClick={() => setShowPassword(p => !p)}
              style={{
                position: 'absolute', right: 14, top: '50%',
                transform: 'translateY(-50%)',
                background: 'none', border: 'none',
                cursor: 'pointer', color: '#64748b',
                display: 'flex', alignItems: 'center',
                padding: 0,
              }}
              aria-label="Mostrar/ocultar contraseña"
            >
              <IonIcon
                icon={showPassword ? eyeOffOutline : eyeOutline}
                style={{ fontSize: 20 }}
              />
            </button>
          </div>
        </div>

        {/* Botón ingresar */}
        <button
          className="btn-primary"
          style={{ marginTop: 4, backgroundColor: 'rgba(5,13,44,0.95)' }}
          onClick={async () => {
            setError('');
            if (!identifier.trim()) {
              setError('Ingrese su correo electrónico o RUT.');
              return;
            }
            if (!pwd.trim()) {
              setError('Ingrese su contraseña.');
              return;
            }
            // Validación básica: correo debe contener @ o RUT debe tener al menos 7 caracteres
            const esCorreo = identifier.includes('@');
            const esRutValido = !esCorreo && identifier.replace(/\D/g, '').length >= 7;
            if (!esCorreo && !esRutValido) {
              setError('Ingrese un correo válido o un RUT con al menos 7 dígitos.');
              return;
            }
            try {
              setLoading(true);
              await login(identifier, pwd);
              history.push('/usuario/dashboard');
            } catch (err: any) {
              setError(err.response?.data?.message || 'Error al iniciar sesión');
            } finally {
              setLoading(false);
            }
          }}
          disabled={loading}
        >
          {loading ? 'ingresando...' : 'ingresar'}
        </button>
      </div>
      {error && <p className="text-red-600 text-sm text-center">{error}</p>}

      {/* Registro */}
      <p style={{
        textAlign: 'center',
        marginTop: 28,
        fontSize: 13,
        color: '#555',
        fontFamily: "'Inter', sans-serif",
      }}>
        ¿No tienes una cuenta?{' '}
        <span
          onClick={() => history.push('/register')}
          style={{ color: '#006fb3', fontWeight: 700, cursor: 'pointer' }}
        >
          Regístrate
        </span>
      </p>
    </>
  );
};

export default Login;
