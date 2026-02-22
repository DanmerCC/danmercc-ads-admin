'use client'

import { useState } from 'react'
import { Search, Filter, MoreVertical, Copy, Check } from 'lucide-react'

export default function ReferidosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('todos')
  const [copied, setCopied] = useState<number | null>(null)

  const referidos = [
    {
      id: 1,
      nombre: 'Carlos Mendez',
      email: 'carlos@email.com',
      codigo: 'JUAN2024',
      estado: 'activo',
      fecha_registro: '2024-01-15',
      publicidades_compradas: 12,
      gasto_total: 5000,
      comision_generada: 600,
      telefono: '+34 666 123 456',
    },
    {
      id: 2,
      nombre: 'Sofia Rodriguez',
      email: 'sofia@email.com',
      codigo: 'MARIA2024',
      estado: 'activo',
      fecha_registro: '2024-01-20',
      publicidades_compradas: 8,
      gasto_total: 3200,
      comision_generada: 480,
      telefono: '+34 666 234 567',
    },
    {
      id: 3,
      nombre: 'Miguel Torres',
      email: 'miguel@email.com',
      codigo: 'JUAN2024',
      estado: 'activo',
      fecha_registro: '2024-02-01',
      publicidades_compradas: 15,
      gasto_total: 8500,
      comision_generada: 850,
      telefono: '+34 666 345 678',
    },
    {
      id: 4,
      nombre: 'Laura Gonzalez',
      email: 'laura@email.com',
      codigo: 'PROMO2024',
      estado: 'inactivo',
      fecha_registro: '2024-01-25',
      publicidades_compradas: 3,
      gasto_total: 800,
      comision_generada: 160,
      telefono: '+34 666 456 789',
    },
    {
      id: 5,
      nombre: 'Diego Sanchez',
      email: 'diego@email.com',
      codigo: 'JUAN2024',
      estado: 'activo',
      fecha_registro: '2024-02-05',
      publicidades_compradas: 6,
      gasto_total: 2500,
      comision_generada: 300,
      telefono: '+34 666 567 890',
    },
  ]

  const filteredReferidos = referidos.filter((ref) => {
    const matchesSearch =
      ref.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ref.codigo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      filterStatus === 'todos' || ref.estado === filterStatus

    return matchesSearch && matchesStatus
  })

  const totales = {
    usuarios: filteredReferidos.length,
    gasto: filteredReferidos.reduce((sum, r) => sum + r.gasto_total, 0),
    comisiones: filteredReferidos.reduce((sum, r) => sum + r.comision_generada, 0),
  }

  const copyToClipboard = (id: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Mis Referidos
        </h1>
        <p className="text-muted-foreground mb-8">
          Gestiona y monitorea el desempeño de todos tus usuarios referidos
        </p>

        {/* Stats Rápidas */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Usuarios</p>
            <p className="text-2xl font-bold text-foreground">
              {totales.usuarios}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Usuarios registrados por referidos
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">Gasto Total</p>
            <p className="text-2xl font-bold text-primary">
              ${totales.gasto.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              En publicidades adquiridas
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">
              Comisiones Generadas
            </p>
            <p className="text-2xl font-bold text-green-400">
              ${totales.comisiones.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Por compras de usuarios
            </p>
          </div>
        </div>

        {/* Búsqueda y Filtros */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar por nombre, email o código..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex gap-2 items-center">
              <Filter className="w-4 h-4 text-muted-foreground" />
              {['todos', 'activo', 'inactivo'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
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
        </div>

        {/* Tabla de Referidos */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Usuario
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Código
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Registro
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Publicidades
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Gasto
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Comisión
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Estado
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredReferidos.map((ref) => (
                  <tr
                    key={ref.id}
                    className="border-b border-border hover:bg-secondary/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {ref.nombre}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {ref.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <code className="bg-secondary px-2 py-1 rounded text-xs font-mono text-primary">
                          {ref.codigo}
                        </code>
                        <button
                          onClick={() => copyToClipboard(ref.id, ref.codigo)}
                          className="p-1 hover:bg-secondary rounded transition-colors"
                        >
                          {copied === ref.id ? (
                            <Check className="w-3 h-3 text-green-500" />
                          ) : (
                            <Copy className="w-3 h-3 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground text-center">
                      {ref.fecha_registro}
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-foreground">
                      {ref.publicidades_compradas}
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-foreground">
                      ${ref.gasto_total.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-primary">
                      ${ref.comision_generada}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ref.estado === 'activo'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {ref.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button className="p-1 hover:bg-secondary rounded transition-colors inline-flex">
                        <MoreVertical className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredReferidos.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No se encontraron referidos que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
