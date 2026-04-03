import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

function PrivateRoute({ children }) {
  const user = localStorage.getItem('user')
  return user ? children : <Navigate to="/" replace />
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      {/* Keep old route working too */}
      <Route
        path="/hello"
        element={<Navigate to="/dashboard" replace />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
