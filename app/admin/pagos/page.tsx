'use client'

import { useState } from 'react'
import { DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function PagosPage() {
  const [filterStatus, setFilterStatus] = useState('todos')

  const comisiones = [
    {
      id: 1,
      usuario: 'Carlos Mendez',
      email: 'carlos@email.com',
      gasto_publicidad: 5000,
      comision_porcentaje: 12,
      comision_monto: 600,
      estado: 'pagado',
      fecha_gasto: '2024-02-05',
      fecha_pago: '2024-02-10',
      referido_codigo: 'JUAN2024',
    },
    {
      id: 2,
      usuario: 'Sofia Rodriguez',
      email: 'sofia@email.com',
      gasto_publicidad: 3200,
      comision_porcentaje: 15,
      comision_monto: 480,
      estado: 'pendiente',
      fecha_gasto: '2024-02-08',
      fecha_pago: null,
      referido_codigo: 'MARIA2024',
    },
    {
      id: 3,
      usuario: 'Miguel Torres',
      email: 'miguel@email.com',
      gasto_publicidad: 8500,
      comision_porcentaje: 10,
      comision_monto: 850,
      estado: 'pagado',
      fecha_gasto: '2024-02-01',
      fecha_pago: '2024-02-05',
      referido_codigo: 'JUAN2024',
    },
    {
      id: 4,
      usuario: 'Laura Gonzalez',
      email: 'laura@email.com',
      gasto_publicidad: 2100,
      comision_porcentaje: 20,
      comision_monto: 420,
      estado: 'procesando',
      fecha_gasto: '2024-02-07',
      fecha_pago: null,
      referido_codigo: 'PROMO2024',
    },
  ]

  const filteredComisiones = comisiones.filter((c) => {
    if (filterStatus === 'todos') return true
    return c.estado === filterStatus
  })

  const totales = {
    total_gastado: comisiones.reduce((sum, c) => sum + c.gasto_publicidad, 0),
    total_comisiones: comisiones.reduce((sum, c) => sum + c.comision_monto, 0),
    pagado: comisiones
      .filter((c) => c.estado === 'pagado')
      .reduce((sum, c) => sum + c.comision_monto, 0),
    pendiente: comisiones
      .filter((c) => c.estado === 'pendiente')
      .reduce((sum, c) => sum + c.comision_monto, 0),
  }

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'pagado':
        return 'bg-green-500/20 text-green-400'
      case 'pendiente':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'procesando':
        return 'bg-blue-500/20 text-blue-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case 'pagado':
        return <CheckCircle className="w-4 h-4" />
      case 'pendiente':
        return <Clock className="w-4 h-4" />
      case 'procesando':
        return <TrendingUp className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Pagos & Comisiones
        </h1>
        <p className="text-muted-foreground mb-8">
          Gestiona los pagos de comisiones de usuarios que gastaron en publicidad
        </p>

        {/* Cards de Resumen */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total Gastado</p>
                <p className="text-2xl font-bold text-foreground">
                  ${totales.total_gastado.toLocaleString()}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-primary opacity-50" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Comisiones Total
                </p>
                <p className="text-2xl font-bold text-primary">
                  ${totales.total_comisiones.toLocaleString()}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-primary opacity-50" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pagado</p>
                <p className="text-2xl font-bold text-green-400">
                  ${totales.pagado.toLocaleString()}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400 opacity-50" />
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Por Pagar</p>
                <p className="text-2xl font-bold text-yellow-400">
                  ${totales.pendiente.toLocaleString()}
                </p>
              </div>
              <Clock className="w-8 h-8 text-yellow-400 opacity-50" />
            </div>
          </div>
        </div>

        {/* Filtros y Tabla */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">
              Historial de Comisiones
            </h2>

            <div className="flex gap-2">
              {['todos', 'pagado', 'pendiente', 'procesando'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Usuario
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Referido
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Gasto Publicidad
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Comisión (%)
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Monto
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Fecha Gasto
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Estado
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredComisiones.map((comision) => (
                  <tr
                    key={comision.id}
                    className="border-b border-border hover:bg-secondary/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {comision.usuario}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {comision.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      <code className="bg-secondary px-2 py-1 rounded text-xs font-mono text-primary">
                        {comision.referido_codigo}
                      </code>
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-foreground">
                      ${comision.gasto_publicidad.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right text-foreground">
                      {comision.comision_porcentaje}%
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-primary">
                      ${comision.comision_monto}
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground">
                      {comision.fecha_gasto}
                    </td>
                    <td className="py-4 px-4">
                      <div
                        className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit text-xs font-medium ${getStatusBadge(
                          comision.estado
                        )}`}
                      >
                        {getStatusIcon(comision.estado)}
                        {comision.estado.charAt(0).toUpperCase() +
                          comision.estado.slice(1)}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <button className="text-primary text-sm hover:underline">
                        {comision.estado === 'pendiente' ? 'Pagar' : 'Ver'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
