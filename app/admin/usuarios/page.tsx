'use client'

import { useState } from 'react'
import { Search, MoreVertical, Shield, AlertCircle } from 'lucide-react'

export default function UsuariosPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterRole, setFilterRole] = useState('todos')

  const usuarios = [
    {
      id: 1,
      nombre: 'Carlos Mendez',
      email: 'carlos@email.com',
      rol: 'usuario',
      estado: 'activo',
      fecha_registro: '2024-01-15',
      publicidades: 12,
      gasto_total: 5000,
      comision_por_referido: 600,
    },
    {
      id: 2,
      nombre: 'Sofia Rodriguez',
      email: 'sofia@email.com',
      rol: 'usuario',
      estado: 'activo',
      fecha_registro: '2024-01-20',
      publicidades: 8,
      gasto_total: 3200,
      comision_por_referido: 480,
    },
    {
      id: 3,
      nombre: 'Miguel Torres',
      email: 'miguel@email.com',
      rol: 'usuario',
      estado: 'activo',
      fecha_registro: '2024-02-01',
      publicidades: 15,
      gasto_total: 8500,
      comision_por_referido: 850,
    },
    {
      id: 4,
      nombre: 'Laura Gonzalez',
      email: 'laura@email.com',
      rol: 'moderador',
      estado: 'activo',
      fecha_registro: '2024-01-25',
      publicidades: 3,
      gasto_total: 800,
      comision_por_referido: 160,
    },
    {
      id: 5,
      nombre: 'Diego Sanchez',
      email: 'diego@email.com',
      rol: 'usuario',
      estado: 'suspendido',
      fecha_registro: '2024-02-05',
      publicidades: 6,
      gasto_total: 2500,
      comision_por_referido: 300,
    },
  ]

  const filteredUsuarios = usuarios.filter((user) => {
    const matchesSearch =
      user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesRole = filterRole === 'todos' || user.rol === filterRole

    return matchesSearch && matchesRole
  })

  const getRoleBadge = (rol: string) => {
    switch (rol) {
      case 'usuario':
        return 'bg-blue-500/20 text-blue-400'
      case 'moderador':
        return 'bg-purple-500/20 text-purple-400'
      case 'admin':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getStatusBadge = (estado: string) => {
    switch (estado) {
      case 'activo':
        return 'bg-green-500/20 text-green-400'
      case 'inactivo':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'suspendido':
        return 'bg-red-500/20 text-red-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Gestión de Usuarios
          </h1>
          <p className="text-muted-foreground mt-2">
            Administra todos los usuarios del sistema y sus permisos
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3 mb-8">
          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Usuarios</p>
            <p className="text-2xl font-bold text-foreground">
              {usuarios.length}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">Usuarios Activos</p>
            <p className="text-2xl font-bold text-green-400">
              {usuarios.filter((u) => u.estado === 'activo').length}
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-6">
            <p className="text-sm text-muted-foreground mb-1">
              Gasto Total de Usuarios
            </p>
            <p className="text-2xl font-bold text-primary">
              ${usuarios.reduce((sum, u) => sum + u.gasto_total, 0).toLocaleString()}
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
                placeholder="Buscar por nombre o email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="flex gap-2">
              {['todos', 'usuario', 'moderador', 'admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => setFilterRole(role)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterRole === role
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-foreground hover:bg-secondary/80'
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tabla de Usuarios */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Usuario
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Rol
                  </th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Registro
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Publicidades
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Gasto Total
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-semibold text-muted-foreground">
                    Comisión Generada
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
                {filteredUsuarios.map((usuario) => (
                  <tr
                    key={usuario.id}
                    className="border-b border-border hover:bg-secondary/50 transition-colors"
                  >
                    <td className="py-4 px-4">
                      <div>
                        <p className="font-medium text-foreground">
                          {usuario.nombre}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {usuario.email}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getRoleBadge(
                          usuario.rol
                        )}`}
                      >
                        {usuario.rol === 'moderador' ||
                        usuario.rol === 'admin' ? (
                          <Shield className="w-3 h-3" />
                        ) : null}
                        {usuario.rol.charAt(0).toUpperCase() +
                          usuario.rol.slice(1)}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-foreground text-center">
                      {usuario.fecha_registro}
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-foreground">
                      {usuario.publicidades}
                    </td>
                    <td className="py-4 px-4 text-right font-medium text-foreground">
                      ${usuario.gasto_total.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 text-right font-bold text-primary">
                      ${usuario.comision_por_referido}
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                          usuario.estado
                        )}`}
                      >
                        {usuario.estado === 'suspendido' && (
                          <AlertCircle className="w-3 h-3 inline mr-1" />
                        )}
                        {usuario.estado.charAt(0).toUpperCase() +
                          usuario.estado.slice(1)}
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

          {filteredUsuarios.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">
                No se encontraron usuarios que coincidan con tu búsqueda.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
