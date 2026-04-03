import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line,
} from 'recharts'
import {
  revenueData, kpiCards, pipelineData, recentDeals,
  activities, topClients, salesByCategory, salesReps,
} from '../data/mockData'
import './Dashboard.css'

/* ── Tiny Sparkline ─────────────────────────────────────────── */
function Sparkline({ data, color = '#6366f1' }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 120
  const h = 32
  const step = w / (data.length - 1)
  const points = data.map((v, i) => `${i * step},${h - ((v - min) / range) * h}`).join(' ')
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} className="kpi-sparkline">
      <defs>
        <linearGradient id={`sp-${color.replace('#','')}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.3} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${h} ${points} ${w},${h}`}
        fill={`url(#sp-${color.replace('#','')})`}
      />
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/* ── Custom Tooltip ─────────────────────────────────────────── */
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: '#1e1e38',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: 10,
      padding: '12px 16px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
    }}>
      <p style={{ color: '#8b8ba3', fontSize: 11, marginBottom: 6 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontSize: 13, fontWeight: 600 }}>
          {p.name}: {typeof p.value === 'number' && p.name.toLowerCase().includes('revenue')
            ? `$${p.value.toLocaleString()}`
            : p.value.toLocaleString()}
        </p>
      ))}
    </div>
  )
}

/* ── Donut Center Label ─────────────────────────────────────── */
function DonutLabel({ viewBox }) {
  const { cx, cy } = viewBox
  return (
    <g>
      <text x={cx} y={cy - 6} textAnchor="middle" style={{ fill: '#f0f0f5', fontSize: 22, fontWeight: 800 }}>
        5
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" style={{ fill: '#5a5a72', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>
        Categorías
      </text>
    </g>
  )
}

/* ── Stage CSS class ────────────────────────────────────────── */
function stageClass(stage) {
  const map = {
    'Cierre': 'stage-cierre',
    'Negociación': 'stage-negociacion',
    'Propuesta': 'stage-propuesta',
    'Calificación': 'stage-calificacion',
    'Prospección': 'stage-prospeccion',
  }
  return map[stage] || ''
}

function probColor(p) {
  if (p >= 80) return '#10b981'
  if (p >= 50) return '#f59e0b'
  return '#ef4444'
}

/* ── MAIN DASHBOARD ─────────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) { navigate('/'); return }
    setUser(JSON.parse(stored))
  }, [navigate])

  function handleLogout() {
    localStorage.removeItem('user')
    navigate('/')
  }

  if (!user) return null

  const today = new Date()
  const dateStr = today.toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <div className="dashboard-layout">
      {/* ── Sidebar ──────────────────────────────────────────── */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <div className="sidebar-logo">AI</div>
            <span className="sidebar-brand-name">CRM Pro</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Principal</div>
          <button className="nav-item active">
            <span className="nav-icon">📊</span> Dashboard
          </button>
          <button className="nav-item">
            <span className="nav-icon">👥</span> Clientes
            <span className="nav-badge">1.2k</span>
          </button>
          <button className="nav-item">
            <span className="nav-icon">🤝</span> Deals
            <span className="nav-badge">47</span>
          </button>
          <button className="nav-item">
            <span className="nav-icon">📋</span> Tareas
          </button>

          <div className="nav-section-label">Comunicación</div>
          <button className="nav-item">
            <span className="nav-icon">✉️</span> Emails
          </button>
          <button className="nav-item">
            <span className="nav-icon">📞</span> Llamadas
          </button>
          <button className="nav-item">
            <span className="nav-icon">📅</span> Calendario
          </button>

          <div className="nav-section-label">Reportes</div>
          <button className="nav-item">
            <span className="nav-icon">📈</span> Analíticas
          </button>
          <button className="nav-item">
            <span className="nav-icon">📄</span> Reportes
          </button>
          <button className="nav-item">
            <span className="nav-icon">⚙️</span> Configuración
          </button>
        </nav>

        <div className="sidebar-user">
          <img src={user.picture} alt={user.name} className="sidebar-user-avatar" />
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">{user.name}</div>
            <div className="sidebar-user-email">{user.email}</div>
          </div>
          <button className="sidebar-logout" onClick={handleLogout} title="Cerrar sesión">
            ⏻
          </button>
        </div>
      </aside>

      {/* ── Main Content ─────────────────────────────────────── */}
      <main className="main-content">
        {/* Header */}
        <header className="dashboard-header">
          <div className="header-left">
            <h1>¡Buen día, {user.name.split(' ')[0]}!</h1>
            <p>{dateStr.charAt(0).toUpperCase() + dateStr.slice(1)}</p>
          </div>
          <div className="header-actions">
            <button className="header-btn">🔍 Buscar</button>
            <button className="header-btn">🔔 Notificaciones</button>
            <button className="header-btn header-btn-primary">+ Nuevo Deal</button>
          </div>
        </header>

        <div className="dashboard-body">
          {/* ── KPI Cards ──────────────────────────────────── */}
          <div className="kpi-grid">
            {kpiCards.map((kpi, i) => (
              <div key={kpi.id} className={`kpi-card animate-in delay-${i + 1}`}>
                <div className="kpi-top">
                  <div className="kpi-icon">{kpi.icon}</div>
                  <span className={`kpi-change ${kpi.changeType}`}>
                    {kpi.changeType === 'positive' ? '↑' : '↓'} {kpi.change}
                  </span>
                </div>
                <div className="kpi-value">{kpi.value}</div>
                <div className="kpi-label">{kpi.title}</div>
                <Sparkline data={kpi.sparkline} color={kpi.changeType === 'positive' ? '#6366f1' : '#ef4444'} />
              </div>
            ))}
          </div>

          {/* ── Revenue Chart + Sales by Category ──────────── */}
          <div className="charts-grid">
            <div className="card animate-in delay-5">
              <div className="card-header">
                <div>
                  <div className="card-title">Ingresos vs Objetivo</div>
                  <div className="card-subtitle">Rendimiento mensual 2026</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={revenueData} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#6366f1" stopOpacity={0.25} />
                      <stop offset="100%" stopColor="#6366f1" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.1} />
                      <stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" tick={{ fill: '#5a5a72', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#5a5a72', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="target" name="Objetivo" stroke="#8b5cf6" strokeWidth={2} strokeDasharray="6 4" fill="url(#targetGrad)" />
                  <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#6366f1" strokeWidth={2.5} fill="url(#revGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="card animate-in delay-6">
              <div className="card-header">
                <div>
                  <div className="card-title">Ventas por Categoría</div>
                  <div className="card-subtitle">Distribución actual</div>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <ResponsiveContainer width={180} height={180}>
                  <PieChart>
                    <Pie
                      data={salesByCategory}
                      cx="50%"
                      cy="50%"
                      innerRadius={52}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {salesByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="category-legend">
                {salesByCategory.map((cat) => (
                  <div key={cat.name} className="category-item">
                    <div className="category-dot" style={{ background: cat.color }} />
                    <span className="category-name">{cat.name}</span>
                    <span className="category-value">{cat.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Deals Table + Activity Feed ─────────────────── */}
          <div className="bottom-grid">
            <div className="card animate-in delay-5">
              <div className="card-header">
                <div>
                  <div className="card-title">Deals Recientes</div>
                  <div className="card-subtitle">Últimos deals activos</div>
                </div>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table className="deals-table">
                  <thead>
                    <tr>
                      <th>Empresa</th>
                      <th>Valor</th>
                      <th>Etapa</th>
                      <th>Probabilidad</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentDeals.map((deal) => (
                      <tr key={deal.id}>
                        <td>
                          <div className="deal-company-cell">
                            <div className="deal-avatar" style={{ background: deal.avatarColor }}>
                              {deal.avatar}
                            </div>
                            <div>
                              <div className="deal-company-name">{deal.company}</div>
                              <div className="deal-contact">{deal.contact}</div>
                            </div>
                          </div>
                        </td>
                        <td className="deal-value">${deal.value.toLocaleString()}</td>
                        <td>
                          <span className={`deal-stage ${stageClass(deal.stage)}`}>
                            {deal.stage}
                          </span>
                        </td>
                        <td>
                          <div className="probability-bar">
                            <div
                              className="probability-fill"
                              style={{ width: `${deal.probability}%`, background: probColor(deal.probability) }}
                            />
                          </div>
                          <span className="probability-text">{deal.probability}%</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="card animate-in delay-6">
              <div className="card-header">
                <div>
                  <div className="card-title">Actividad Reciente</div>
                  <div className="card-subtitle">Últimas acciones</div>
                </div>
              </div>
              {activities.map((act) => (
                <div key={act.id} className="activity-item">
                  <div className="activity-icon">{act.icon}</div>
                  <div className="activity-content">
                    <div className="activity-text">{act.text}</div>
                    <div className="activity-detail">{act.detail}</div>
                  </div>
                  <span className="activity-time">{act.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Pipeline + Top Clients ──────────────────────── */}
          <div className="charts-grid">
            <div className="card animate-in delay-7">
              <div className="card-header">
                <div>
                  <div className="card-title">Pipeline de Ventas</div>
                  <div className="card-subtitle">Valor por etapa</div>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={pipelineData} layout="vertical" margin={{ top: 0, right: 10, left: 10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                  <XAxis type="number" tick={{ fill: '#5a5a72', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v/1000}k`} />
                  <YAxis type="category" dataKey="stage" tick={{ fill: '#8b8ba3', fontSize: 12 }} axisLine={false} tickLine={false} width={90} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" name="Valor" radius={[0, 6, 6, 0]} barSize={18}>
                    {pipelineData.map((entry, index) => (
                      <Cell key={`bar-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="card animate-in delay-8">
              <div className="card-header">
                <div>
                  <div className="card-title">Top Clientes</div>
                  <div className="card-subtitle">Por ingresos generados</div>
                </div>
              </div>
              {topClients.map((client, i) => (
                <div key={client.name} className="client-row">
                  <div className={`client-rank ${i < 3 ? 'top' : ''}`}>{i + 1}</div>
                  <div className="client-info">
                    <div className="client-name">{client.name}</div>
                    <div className="client-deals">{client.deals} deals</div>
                  </div>
                  <div className="client-revenue">${(client.revenue / 1000).toFixed(0)}k</div>
                  <div className="client-satisfaction">
                    <div className="satisfaction-dot" style={{
                      background: client.satisfaction >= 95 ? '#10b981' :
                        client.satisfaction >= 90 ? '#f59e0b' : '#ef4444'
                    }} />
                    {client.satisfaction}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Sales Reps ──────────────────────────────────── */}
          <div className="card animate-in delay-7" style={{ marginBottom: 28 }}>
            <div className="card-header">
              <div>
                <div className="card-title">Equipo de Ventas</div>
                <div className="card-subtitle">Rendimiento del equipo</div>
              </div>
            </div>
            <div className="reps-grid">
              {salesReps.map((rep) => (
                <div key={rep.name} className="rep-card">
                  <div className="rep-avatar" style={{ background: rep.color }}>{rep.avatar}</div>
                  <div className="rep-info">
                    <div className="rep-name">{rep.name}</div>
                    <div className="rep-stats">{rep.deals} deals · ${(rep.revenue / 1000).toFixed(0)}k revenue</div>
                  </div>
                  <div className="rep-quota">
                    <div className="rep-quota-value" style={{
                      color: rep.quota >= 85 ? '#10b981' : rep.quota >= 70 ? '#f59e0b' : '#ef4444'
                    }}>{rep.quota}%</div>
                    <div className="rep-quota-label">Cuota</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
