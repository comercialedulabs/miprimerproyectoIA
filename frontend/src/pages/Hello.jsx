import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hello() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [loadingMsg, setLoadingMsg] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) {
      navigate('/')
      return
    }
    const parsedUser = JSON.parse(stored)
    setUser(parsedUser)

    // --- MOCK MESSAGE FOR DEMO ---
    // Simulating the backend response so it works as a static demo.
    setTimeout(() => {
      setMessage(`¡Hola Mundo, ${parsedUser.name}! (Modo Demo)`)
      setLoadingMsg(false)
    }, 500)

    /* Original code for real backend:
    fetch('http://localhost:8000/api/hello', {
      headers: { Authorization: `Bearer ${parsedUser.email}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message || `Hola Mundo, ${parsedUser.name}!`)
      })
      .catch(() => {
        setMessage(`Hola Mundo, ${parsedUser.name}!`)
      })
      .finally(() => setLoadingMsg(false))
    */
  }, [navigate])

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) return null

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <img
          src={user.picture}
          alt={user.name}
          style={styles.avatar}
          onError={(e) => { e.target.style.display = 'none' }}
        />

        <h1 style={styles.greeting}>
          {loadingMsg ? 'Cargando...' : message}
        </h1>

        <p style={styles.email}>{user.email}</p>

        <div style={styles.badge}>Sesion iniciada</div>

        <button onClick={handleLogout} style={styles.logoutBtn}>
          Cerrar sesion
        </button>
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
    maxWidth: 420,
    boxSizing: 'border-box',
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #4285F4',
    marginBottom: 24,
    boxShadow: '0 4px 14px rgba(66,133,244,0.3)',
  },
  greeting: {
    margin: '0 0 8px',
    fontSize: 28,
    fontWeight: 700,
    color: '#202124',
    textAlign: 'center',
  },
  email: {
    margin: '0 0 20px',
    fontSize: 14,
    color: '#5f6368',
    textAlign: 'center',
  },
  badge: {
    background: '#e6f4ea',
    color: '#34A853',
    fontSize: 12,
    fontWeight: 600,
    padding: '4px 14px',
    borderRadius: 20,
    marginBottom: 32,
    letterSpacing: 0.3,
  },
  logoutBtn: {
    padding: '11px 32px',
    background: '#f8f9fa',
    color: '#d93025',
    border: '1.5px solid #dadce0',
    borderRadius: 8,
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
}
