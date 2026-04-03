import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const GOOGLE_ICON = (
  <svg width="20" height="20" viewBox="0 0 48 48" style={{ marginRight: 10, flexShrink: 0 }}>
    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    <path fill="none" d="M0 0h48v48H0z"/>
  </svg>
)

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleGoogleLogin() {
    setLoading(true)
    setError('')
    try {
      // --- MOCK LOGIN FOR DEMO ---
      // Instead of fetching from localhost, we simulate a successful response
      // This allows the demo to work on GitHub Pages without a real backend.
      
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
      
      const mockUser = {
        email: 'usuario@gmail.com',
        name: 'Usuario Demo',
        picture: 'https://ui-avatars.com/api/?name=Usuario+Demo&background=4285F4&color=fff&size=128'
      };

      localStorage.setItem('user', JSON.stringify(mockUser));
      navigate('/dashboard');
      
      /* Original code for real backend:
      const response = await fetch('http://localhost:8000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: 'mock-token-usuario@gmail.com' }),
      })
      const data = await response.json()
      if (data.success && data.user) {
        localStorage.setItem('user', JSON.stringify(data.user))
        navigate('/dashboard')
      } else {
        setError('No se pudo autenticar. Intenta de nuevo.')
      }
      */
    } catch (err) {
      setError('Error al conectar con el servidor. Verifica que el backend esté corriendo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>
          <span style={styles.logoText}>Mi Proyecto IA</span>
        </div>
        <h1 style={styles.title}>Bienvenido</h1>
        <p style={styles.subtitle}>Inicia sesión para continuar</p>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          style={{ ...styles.googleBtn, opacity: loading ? 0.7 : 1 }}
        >
          {GOOGLE_ICON}
          {loading ? 'Iniciando sesión...' : 'Iniciar sesión con Google'}
        </button>

        {error && <p style={styles.error}>{error}</p>}

        <p style={styles.hint}>
          Cuenta de demostración: <strong>usuario@gmail.com</strong>
        </p>
      </div>
    </div>
  )
}

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    fontFamily: "'Segoe UI', Roboto, Arial, sans-serif",
  },
  card: {
    background: '#ffffff',
    borderRadius: 16,
    padding: '48px 40px',
    boxShadow: '0 10px 40px rgba(0,0,0,0.12)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    boxSizing: 'border-box',
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #4285F4, #34A853)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  logoText: {
    display: 'none',
  },
  title: {
    margin: '0 0 8px',
    fontSize: 26,
    fontWeight: 700,
    color: '#202124',
    textAlign: 'center',
  },
  subtitle: {
    margin: '0 0 32px',
    fontSize: 15,
    color: '#5f6368',
    textAlign: 'center',
  },
  googleBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '12px 20px',
    background: '#ffffff',
    color: '#3c4043',
    border: '1.5px solid #dadce0',
    borderRadius: 8,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
    transition: 'box-shadow 0.2s, border-color 0.2s',
    letterSpacing: 0.2,
  },
  error: {
    marginTop: 16,
    color: '#d93025',
    fontSize: 13,
    textAlign: 'center',
  },
  hint: {
    marginTop: 24,
    fontSize: 12,
    color: '#9aa0a6',
    textAlign: 'center',
  },
}
