'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, Users, DollarSign, Share2, ArrowUpRight } from 'lucide-react'

export default function AdminDashboard() {
  const chartData = [
    { mes: 'Ene', gasto: 12000, comision: 1400, referidos: 8 },
    { mes: 'Feb', gasto: 15000, comision: 1800, referidos: 12 },
    { mes: 'Mar', gasto: 18000, comision: 2160, referidos: 15 },
    { mes: 'Abr', gasto: 14000, comision: 1680, referidos: 10 },
    { mes: 'May', gasto: 22000, comision: 2640, referidos: 18 },
    { mes: 'Jun', gasto: 25000, comision: 3000, referidos: 22 },
  ]

  const referidoData = [
    { nombre: 'JUAN2024', usuarios: 45, color: '#3b82f6' },
    { nombre: 'MARIA2024', usuarios: 38, color: '#a855f7' },
    { nombre: 'PROMO2024', usuarios: 28, color: '#06b6d4' },
    { nombre: 'OTROS', usuarios: 34, color: '#14b8a6' },
  ]

  const stats = [
    {
      label: 'Usuarios Referidos',
      value: '247',
      change: '+12%',
      icon: Users,
      color: 'text-blue-400',
    },
    {
      label: 'Comisiones Este Mes',
      value: '$3,000',
      change: '+25%',
      icon: DollarSign,
      color: 'text-green-400',
    },
    {
      label: 'Total Generado',
      value: '$18,450',
      change: '+8%',
      icon: TrendingUp,
      color: 'text-purple-400',
    },
    {
      label: 'Códigos Activos',
      value: '4',
      change: '+1',
      icon: Share2,
      color: 'text-cyan-400',
    },
  ]

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Panel de Administración
          </h1>
          <p className="text-muted-foreground mt-2">
            Bienvenido, Juan Diaz. Aquí está tu resumen de comisiones y referidos.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div
                key={idx}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">
                      {stat.label}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-green-400 mt-2 flex items-center gap-1">
                      <ArrowUpRight className="w-3 h-3" />
                      {stat.change}
                    </p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color} opacity-50`} />
                </div>
              </div>
            )
          })}
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Gráfico Principal */}
          <div className="md:col-span-2 bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Gastos & Comisiones Mensuales
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="mes" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid #333',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="gasto" fill="#3b82f6" name="Gasto Publicidad" />
                <Bar dataKey="comision" fill="#10b981" name="Comisión" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Distribución de Referidos */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Referidos por Código
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={referidoData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="usuarios"
                  paddingAngle={2}
                >
                  {referidoData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1a1a2e',
                    border: '1px solid #333',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {referidoData.map((ref) => (
                <div
                  key={ref.nombre}
                  className="flex items-center justify-between text-sm"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: ref.color }}
                    />
                    <span className="text-foreground">{ref.nombre}</span>
                  </div>
                  <span className="text-muted-foreground">{ref.usuarios}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Actividad Reciente
          </h2>
          <div className="space-y-3">
            {[
              {
                texto: 'Nuevo referido generado',
                detalles: 'PROMO2024 - 15% comisión',
                hora: 'Hace 2 horas',
              },
              {
                texto: 'Comisión pagada',
                detalles: 'Carlos Mendez - $600',
                hora: 'Ayer',
              },
              {
                texto: 'Nuevo usuario registrado',
                detalles: 'Vía JUAN2024',
                hora: 'Hace 3 días',
              },
              {
                texto: 'Pago procesado',
                detalles: '$3,000 en comisiones',
                hora: 'Hace 1 semana',
              },
            ].map((activity, idx) => (
              <div
                key={idx}
                className="flex items-start justify-between py-3 border-b border-border last:border-b-0"
              >
                <div>
                  <p className="font-medium text-foreground">{activity.texto}</p>
                  <p className="text-sm text-muted-foreground">
                    {activity.detalles}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {activity.hora}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
