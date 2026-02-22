'use client'

import React from "react"

import { useState } from 'react'
import { Copy, Check, Plus } from 'lucide-react'

export default function CrearReferidoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    comision: '15',
  })

  const [referidos, setReferidos] = useState([
    {
      id: 1,
      codigo: 'JUAN2024',
      nombre: 'Promoción Enero',
      comision: 15,
      creado: '2024-01-15',
      usos: 23,
      estado: 'activo',
    },
    {
      id: 2,
      codigo: 'MARIA2024',
      nombre: 'Promoción Febrero',
      comision: 20,
      creado: '2024-02-01',
      usos: 45,
      estado: 'activo',
    },
  ])

  const [copied, setCopied] = useState<string | null>(null)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCreateReferido = (e: React.FormEvent) => {
    e.preventDefault()

    const newCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase()
    const newReferido = {
      id: referidos.length + 1,
      codigo: newCode,
      nombre: formData.nombre,
      comision: Number(formData.comision),
      creado: new Date().toISOString().split('T')[0],
      usos: 0,
      estado: 'activo',
    }

    setReferidos([newReferido, ...referidos])
    setFormData({ nombre: '', descripcion: '', comision: '15' })
  }

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(code)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Crear Código de Referido
        </h1>
        <p className="text-muted-foreground mb-8">
          Crea nuevos enlaces de referidos que los usuarios pueden compartir para
          obtener acceso gratuito
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Formulario */}
          <div className="md:col-span-1">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Nuevo Referido
              </h2>

              <form onSubmit={handleCreateReferido} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Nombre de Campaña
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Ej: Promoción Especial"
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Descripción
                  </label>
                  <textarea
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    placeholder="Describe los beneficios..."
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary h-24 resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Comisión por Referido (%)
                  </label>
                  <input
                    type="number"
                    name="comision"
                    value={formData.comision}
                    onChange={handleInputChange}
                    min="5"
                    max="50"
                    className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Crear Referido
                </button>
              </form>
            </div>
          </div>

          {/* Lista de Referidos */}
          <div className="md:col-span-2">
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Tus Códigos de Referido
              </h2>

              <div className="space-y-4">
                {referidos.map((ref) => (
                  <div
                    key={ref.id}
                    className="border border-border rounded-lg p-4 hover:bg-secondary transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-foreground">
                          {ref.nombre}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Creado el {ref.creado}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          ref.estado === 'activo'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {ref.estado === 'activo' ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <code className="flex-1 px-3 py-2 bg-secondary border border-border rounded text-primary font-mono text-sm">
                        {ref.codigo}
                      </code>
                      <button
                        onClick={() => copyToClipboard(ref.codigo)}
                        className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                      >
                        {copied === ref.codigo ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">
                          Comisión
                        </p>
                        <p className="font-semibold text-foreground">
                          {ref.comision}%
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">
                          Usos
                        </p>
                        <p className="font-semibold text-foreground">
                          {ref.usos}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground text-xs mb-1">
                          Ganancias
                        </p>
                        <p className="font-semibold text-primary">
                          ${(ref.usos * 50 * (ref.comision / 100)).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
