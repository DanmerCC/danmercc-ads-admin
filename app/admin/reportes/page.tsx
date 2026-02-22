'use client'

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Download } from 'lucide-react'

export default function ReportesPage() {
  const gananciasPorMes = [
    { mes: 'Enero', comisiones: 1400, gastos_usuarios: 12000 },
    { mes: 'Febrero', comisiones: 1800, gastos_usuarios: 15000 },
    { mes: 'Marzo', comisiones: 2160, gastos_usuarios: 18000 },
    { mes: 'Abril', comisiones: 1680, gastos_usuarios: 14000 },
    { mes: 'Mayo', comisiones: 2640, gastos_usuarios: 22000 },
    { mes: 'Junio', comisiones: 3000, gastos_usuarios: 25000 },
  ]

  const mejoresReferidos = [
    { codigo: 'JUAN2024', usuarios: 45, gasto_generado: 28500, comision: 3420 },
    { codigo: 'MARIA2024', usuarios: 38, gasto_generado: 24000, comision: 3600 },
    { codigo: 'PROMO2024', usuarios: 28, gasto_generado: 18000, comision: 2700 },
  ]

  const usuariosConMayorGasto = [
    { nombre: 'Carlos Mendez', gasto: 5000, publicidades: 12 },
    { nombre: 'Miguel Torres', gasto: 8500, publicidades: 15 },
    { nombre: 'Sofia Rodriguez', gasto: 3200, publicidades: 8 },
  ]

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reportes</h1>
            <p className="text-muted-foreground mt-2">
              Análisis detallado de tu desempeño como agente publicitario
            </p>
          </div>

          <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity">
            <Download className="w-4 h-4" />
            Descargar Reportes
          </button>
        </div>

        {/* Gráfico de Ganancias */}
        <div className="grid gap-8 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Ganancias por Mes
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={gananciasPorMes}>
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
                <Line
                  type="monotone"
                  dataKey="comisiones"
                  stroke="#10b981"
                  name="Comisiones"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="gastos_usuarios"
                  stroke="#3b82f6"
                  name="Gastos de Usuarios"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Mejores Referidos */}
        <div className="grid gap-8 md:grid-cols-2 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Top Códigos de Referido
            </h2>

            <div className="space-y-4">
              {mejoresReferidos.map((ref, idx) => (
                <div
                  key={ref.codigo}
                  className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary">
                          #{idx + 1}
                        </span>
                        <code className="bg-secondary px-2 py-1 rounded text-xs font-mono text-primary">
                          {ref.codigo}
                        </code>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {ref.usuarios} usuarios registrados
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">
                        Gasto Generado
                      </p>
                      <p className="font-bold text-foreground">
                        ${ref.gasto_generado.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">Comisión</p>
                      <p className="font-bold text-green-400">
                        ${ref.comision}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Usuarios con Mayor Gasto
            </h2>

            <div className="space-y-4">
              {usuariosConMayorGasto.map((user, idx) => (
                <div
                  key={user.nombre}
                  className="border border-border rounded-lg p-4 hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-primary">
                          #{idx + 1}
                        </span>
                        <p className="font-medium text-foreground">
                          {user.nombre}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Gasto Total</p>
                      <p className="font-bold text-primary">
                        ${user.gasto.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">
                        Publicidades
                      </p>
                      <p className="font-bold text-foreground">
                        {user.publicidades}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Resumen de Métricas */}
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-foreground mb-6">
            Resumen de Métricas
          </h2>

          <div className="grid gap-4 md:grid-cols-4">
            {[
              {
                label: 'Tasa de Conversión',
                value: '23.5%',
                change: '+2.1%',
              },
              {
                label: 'Promedio por Usuario',
                value: '$4,256',
                change: '+12%',
              },
              {
                label: 'Margen de Comisión',
                value: '12.8%',
                change: '+0.5%',
              },
              {
                label: 'Retención de Usuarios',
                value: '87.2%',
                change: '+3.2%',
              },
            ].map((metric, idx) => (
              <div
                key={idx}
                className="border border-border rounded-lg p-4"
              >
                <p className="text-sm text-muted-foreground mb-2">
                  {metric.label}
                </p>
                <p className="text-xl font-bold text-foreground">
                  {metric.value}
                </p>
                <p className="text-xs text-green-400 mt-2">{metric.change}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
