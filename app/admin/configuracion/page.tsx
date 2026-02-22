'use client'

import React from "react"

import { useState } from 'react'
import { Save, Eye, EyeOff } from 'lucide-react'

export default function ConfiguracionPage() {
  const [formData, setFormData] = useState({
    nombre: 'Juan Diaz',
    email: 'juan@email.com',
    telefono: '+34 666 123 456',
    empresa: 'JD Publicidad Digital',
    sitio_web: 'https://jdpublicidad.com',
    cuenta_banco: '****1234',
    banco: 'Banco Santander',
    comision_default: '15',
    metodo_pago: 'transferencia',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Configuración
        </h1>
        <p className="text-muted-foreground mb-8">
          Administra tu perfil, datos bancarios y preferencias
        </p>

        <div className="space-y-6">
          {/* Información Personal */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Información Personal
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Empresa
                </label>
                <input
                  type="text"
                  name="empresa"
                  value={formData.empresa}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Sitio Web
                </label>
                <input
                  type="url"
                  name="sitio_web"
                  value={formData.sitio_web}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Datos Bancarios */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Información Bancaria
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Banco
                </label>
                <select
                  name="banco"
                  value={formData.banco}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="Banco Santander">Banco Santander</option>
                  <option value="Banco BBVA">Banco BBVA</option>
                  <option value="Banco Sabadell">Banco Sabadell</option>
                  <option value="Caixa Bank">Caixa Bank</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Número de Cuenta
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="cuenta_banco"
                    value={formData.cuenta_banco}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Método de Pago Preferido
                </label>
                <select
                  name="metodo_pago"
                  value={formData.metodo_pago}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="transferencia">
                    Transferencia Bancaria
                  </option>
                  <option value="paypal">PayPal</option>
                  <option value="stripe">Stripe</option>
                </select>
              </div>
            </div>
          </div>

          {/* Configuración de Comisiones */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Configuración de Comisiones
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Comisión Default (%)
                </label>
                <input
                  type="number"
                  name="comision_default"
                  value={formData.comision_default}
                  onChange={handleInputChange}
                  min="5"
                  max="50"
                  className="w-full px-4 py-2 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  Se aplicará a nuevos códigos de referido
                </p>
              </div>

              <div className="bg-secondary border border-border rounded-lg p-4">
                <p className="text-sm text-muted-foreground mb-2">
                  Próximo Pago Estimado
                </p>
                <p className="text-2xl font-bold text-green-400">$4,250</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Procesado el 15 de Febrero
                </p>
              </div>
            </div>
          </div>

          {/* Opciones de Seguridad */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-lg font-semibold text-foreground mb-6">
              Seguridad
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">
                    Cambiar Contraseña
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Última actualización hace 3 meses
                  </p>
                </div>
                <button className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  Cambiar
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">
                    Autenticación de Dos Factores
                  </p>
                  <p className="text-sm text-muted-foreground">
                    No activado
                  </p>
                </div>
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                  Activar
                </button>
              </div>

              <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <p className="font-medium text-foreground">
                    Sessiones Activas
                  </p>
                  <p className="text-sm text-muted-foreground">
                    2 dispositivos conectados
                  </p>
                </div>
                <button className="px-4 py-2 bg-secondary text-foreground rounded-lg hover:bg-secondary/80 transition-colors">
                  Gestionar
                </button>
              </div>
            </div>
          </div>

          {/* Guardar */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
            >
              <Save className="w-4 h-4" />
              Guardar Cambios
            </button>

            {saved && (
              <p className="text-green-400 text-sm font-medium">
                Cambios guardados correctamente
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
