import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import App from './routers/App.tsx'

const apiUrl = import.meta.env.VITE_API_URL;
if (!apiUrl) {
  console.warn('VITE_API_URL no está definida. Usando http://localhost:3000/api como fallback.');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
