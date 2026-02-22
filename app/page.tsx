'use client'

import Link from 'next/link'
import { ArrowRight, BarChart3, Users, DollarSign, LinkIcon } from 'lucide-react'

export default function Page() {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="max-w-2xl mx-auto text-center">
        {/* Logo */}
        <div className="w-16 h-16 rounded-lg bg-primary flex items-center justify-center mx-auto mb-6">
          <span className="text-primary-foreground text-2xl font-bold">AD</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          AdManager
        </h1>
        <p className="text-lg text-muted-foreground mb-12">
          Panel de administración para agentes de publicidad. Gestiona usuarios,
          referencias, comisiones y más.
        </p>

        {/* Features */}
        <div className="grid gap-4 md:grid-cols-2 mb-12">
          {[
            {
              icon: LinkIcon,
              title: 'Crear Referidos',
              description: 'Genera códigos únicos para que tus usuarios obtengan acceso',
            },
            {
              icon: Users,
              title: 'Gestión de Usuarios',
              description: 'Monitorea todos tus usuarios referidos y su actividad',
            },
            {
              icon: DollarSign,
              title: 'Pagos & Comisiones',
              description: 'Controla tus ganancias por cada usuario que compra publicidad',
            },
            {
              icon: BarChart3,
              title: 'Reportes Detallados',
              description: 'Analiza el desempeño de tus códigos de referido',
            },
          ].map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="bg-card border border-border rounded-xl p-6 text-left hover:border-primary/50 transition-colors"
              >
                <Icon className="w-6 h-6 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity group"
        >
          Ir al Panel de Administración
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>

        {/* Stats */}
        <div className="mt-16 grid gap-4 md:grid-cols-3 text-sm">
          <div>
            <p className="text-2xl font-bold text-primary">247</p>
            <p className="text-muted-foreground">Usuarios Referidos</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-400">$18,450</p>
            <p className="text-muted-foreground">Comisiones Generadas</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-400">4</p>
            <p className="text-muted-foreground">Códigos Activos</p>
          </div>
        </div>
      </div>
    </main>
  )
}
