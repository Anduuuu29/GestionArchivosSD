import { IonIcon } from '@ionic/react';
import { eyeOutline, eyeOffOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
const LoginAdmin: React.FC = () => {
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      <h2 style={{
        color: '#0a132d',
        fontSize: 26,
        fontWeight: 900,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        margin: '0 0 6px',
        fontFamily: "'Inter', sans-serif",
      }}>
        Inicio de sesión
      </h2>
      <p style={{
        color: '#64748b',
        fontSize: 12,
        margin: '0 0 28px',
        fontFamily: "'Inter', sans-serif",
      }}>
        Acceso exclusivo para funcionarios municipales
      </p>

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
            placeholder="nombre@munisantodomingo.cl"
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
          onClick={() => history.push('/dashboard')}
        >
          Ingresar
        </button>
      </div>
    </>
  );
};

export default LoginAdmin;
