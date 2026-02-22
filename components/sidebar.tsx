'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Link as LinkIcon,
  DollarSign,
  Users,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
} from 'lucide-react'

export function Sidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      label: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      label: 'Crear Referido',
      href: '/admin/crear-referido',
      icon: LinkIcon,
    },
    {
      label: 'Mis Referidos',
      href: '/admin/referidos',
      icon: Users,
    },
    {
      label: 'Pagos & Comisiones',
      href: '/admin/pagos',
      icon: DollarSign,
    },
    {
      label: 'Usuarios',
      href: '/admin/usuarios',
      icon: Users,
    },
    {
      label: 'Reportes',
      href: '/admin/reportes',
      icon: BarChart3,
    },
    {
      label: 'Configuración',
      href: '/admin/configuracion',
      icon: Settings,
    },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar-background border-r border-sidebar-border overflow-y-auto">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold">AD</span>
          </div>
          <div>
            <h1 className="font-bold text-sidebar-foreground">AdManager</h1>
            <p className="text-xs text-sidebar-accent-foreground">Panel Admin</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* User Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border bg-sidebar-background">
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer hover:bg-sidebar-accent transition-colors">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
            JD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">
              Juan Diaz
            </p>
            <p className="text-xs text-sidebar-accent-foreground truncate">
              admin@admanager.com
            </p>
          </div>
        </div>
        <button className="w-full flex items-center gap-3 px-4 py-2 mt-2 text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors text-sm">
          <LogOut className="w-4 h-4" />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </aside>
  )
}
