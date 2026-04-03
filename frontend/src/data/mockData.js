// ── Mock CRM Data ──────────────────────────────────────────────

export const revenueData = [
  { month: 'Ene', revenue: 42000, deals: 14, target: 40000 },
  { month: 'Feb', revenue: 38000, deals: 11, target: 42000 },
  { month: 'Mar', revenue: 55000, deals: 19, target: 45000 },
  { month: 'Abr', revenue: 47000, deals: 16, target: 47000 },
  { month: 'May', revenue: 62000, deals: 22, target: 50000 },
  { month: 'Jun', revenue: 58000, deals: 20, target: 52000 },
  { month: 'Jul', revenue: 71000, deals: 25, target: 55000 },
  { month: 'Ago', revenue: 66000, deals: 23, target: 57000 },
  { month: 'Sep', revenue: 78000, deals: 28, target: 60000 },
  { month: 'Oct', revenue: 73000, deals: 26, target: 62000 },
  { month: 'Nov', revenue: 85000, deals: 31, target: 65000 },
  { month: 'Dic', revenue: 92000, deals: 34, target: 68000 },
]

export const kpiCards = [
  {
    id: 'revenue',
    title: 'Ingresos Totales',
    value: '$767,000',
    change: '+23.5%',
    changeType: 'positive',
    icon: '💰',
    sparkline: [42, 38, 55, 47, 62, 58, 71, 66, 78, 73, 85, 92],
  },
  {
    id: 'clients',
    title: 'Clientes Activos',
    value: '1,284',
    change: '+12.8%',
    changeType: 'positive',
    icon: '👥',
    sparkline: [980, 1020, 1050, 1080, 1100, 1130, 1150, 1180, 1210, 1240, 1260, 1284],
  },
  {
    id: 'deals',
    title: 'Deals Cerrados',
    value: '269',
    change: '+18.2%',
    changeType: 'positive',
    icon: '🤝',
    sparkline: [14, 11, 19, 16, 22, 20, 25, 23, 28, 26, 31, 34],
  },
  {
    id: 'tasks',
    title: 'Tareas Pendientes',
    value: '47',
    change: '-8.3%',
    changeType: 'negative',
    icon: '📋',
    sparkline: [62, 58, 55, 53, 50, 52, 48, 51, 49, 47, 50, 47],
  },
]

export const pipelineData = [
  { stage: 'Prospección', count: 45, value: 180000, color: '#818cf8' },
  { stage: 'Calificación', count: 32, value: 224000, color: '#6366f1' },
  { stage: 'Propuesta', count: 18, value: 270000, color: '#4f46e5' },
  { stage: 'Negociación', count: 12, value: 312000, color: '#4338ca' },
  { stage: 'Cierre', count: 8, value: 248000, color: '#3730a3' },
]

export const recentDeals = [
  {
    id: 1,
    company: 'TechNova Solutions',
    contact: 'María García',
    value: 45000,
    stage: 'Cierre',
    probability: 95,
    date: '2026-04-02',
    avatar: 'MG',
    avatarColor: '#6366f1',
  },
  {
    id: 2,
    company: 'DataStream Corp',
    contact: 'Carlos Mendoza',
    value: 32000,
    stage: 'Negociación',
    probability: 70,
    date: '2026-04-01',
    avatar: 'CM',
    avatarColor: '#f59e0b',
  },
  {
    id: 3,
    company: 'CloudFirst MX',
    contact: 'Ana Torres',
    value: 67000,
    stage: 'Propuesta',
    probability: 50,
    date: '2026-03-31',
    avatar: 'AT',
    avatarColor: '#10b981',
  },
  {
    id: 4,
    company: 'InnovateLab',
    contact: 'Roberto Díaz',
    value: 28000,
    stage: 'Calificación',
    probability: 30,
    date: '2026-03-30',
    avatar: 'RD',
    avatarColor: '#ef4444',
  },
  {
    id: 5,
    company: 'SecureNet Pro',
    contact: 'Laura Herrera',
    value: 54000,
    stage: 'Cierre',
    probability: 90,
    date: '2026-03-29',
    avatar: 'LH',
    avatarColor: '#8b5cf6',
  },
  {
    id: 6,
    company: 'GreenEnergy SA',
    contact: 'Pedro Ruiz',
    value: 41000,
    stage: 'Negociación',
    probability: 65,
    date: '2026-03-28',
    avatar: 'PR',
    avatarColor: '#06b6d4',
  },
]

export const activities = [
  {
    id: 1,
    type: 'deal_won',
    icon: '🎉',
    text: 'Deal cerrado con TechNova Solutions',
    detail: '$45,000 — María García',
    time: 'Hace 2h',
  },
  {
    id: 2,
    type: 'meeting',
    icon: '📅',
    text: 'Reunión programada con DataStream Corp',
    detail: 'Carlos Mendoza — Mañana 10:00 AM',
    time: 'Hace 3h',
  },
  {
    id: 3,
    type: 'email',
    icon: '✉️',
    text: 'Propuesta enviada a CloudFirst MX',
    detail: 'Valor: $67,000 — Esperando respuesta',
    time: 'Hace 5h',
  },
  {
    id: 4,
    type: 'call',
    icon: '📞',
    text: 'Llamada completada con InnovateLab',
    detail: 'Roberto Díaz — Interesado en plan Enterprise',
    time: 'Hace 8h',
  },
  {
    id: 5,
    type: 'task',
    icon: '✅',
    text: 'Tarea completada: Actualizar CRM pipeline',
    detail: 'Asignada por Admin User',
    time: 'Hace 1d',
  },
  {
    id: 6,
    type: 'note',
    icon: '📝',
    text: 'Nota añadida a SecureNet Pro',
    detail: 'Contrato en revisión legal',
    time: 'Hace 1d',
  },
]

export const topClients = [
  { name: 'TechNova Solutions', revenue: 245000, deals: 12, satisfaction: 98, trend: 'up' },
  { name: 'SecureNet Pro', revenue: 198000, deals: 9, satisfaction: 95, trend: 'up' },
  { name: 'CloudFirst MX', revenue: 167000, deals: 7, satisfaction: 92, trend: 'stable' },
  { name: 'DataStream Corp', revenue: 142000, deals: 8, satisfaction: 88, trend: 'up' },
  { name: 'GreenEnergy SA', revenue: 118000, deals: 6, satisfaction: 91, trend: 'down' },
]

export const salesByCategory = [
  { name: 'Software', value: 35, color: '#6366f1' },
  { name: 'Consultoría', value: 25, color: '#8b5cf6' },
  { name: 'Licencias', value: 20, color: '#a78bfa' },
  { name: 'Soporte', value: 12, color: '#c4b5fd' },
  { name: 'Capacitación', value: 8, color: '#ddd6fe' },
]

export const salesReps = [
  { name: 'María García', deals: 42, revenue: 198000, quota: 85, avatar: 'MG', color: '#6366f1' },
  { name: 'Carlos Mendoza', deals: 38, revenue: 176000, quota: 92, avatar: 'CM', color: '#f59e0b' },
  { name: 'Ana Torres', deals: 35, revenue: 165000, quota: 78, avatar: 'AT', color: '#10b981' },
  { name: 'Roberto Díaz', deals: 31, revenue: 148000, quota: 71, avatar: 'RD', color: '#ef4444' },
]
