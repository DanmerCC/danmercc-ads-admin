'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Copy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface User {
  id: string
  name: string
  email: string
  publicaciones: number
  ingresos: number
  estado: 'activo' | 'inactivo'
  codigoReferido: string
  referidos: number
}

const usuarios: User[] = [
  {
    id: '1',
    name: 'Juan Martinez',
    email: 'juan@example.com',
    publicaciones: 24,
    ingresos: 1250.5,
    estado: 'activo',
    codigoReferido: 'JUAN2024',
    referidos: 8,
  },
  {
    id: '2',
    name: 'Maria García',
    email: 'maria@example.com',
    publicaciones: 18,
    ingresos: 890.25,
    estado: 'activo',
    codigoReferido: 'MARIA2024',
    referidos: 5,
  },
  {
    id: '3',
    name: 'Carlos López',
    email: 'carlos@example.com',
    publicaciones: 31,
    ingresos: 2150.75,
    estado: 'activo',
    codigoReferido: 'CARLOS2024',
    referidos: 12,
  },
  {
    id: '4',
    name: 'Ana Rodríguez',
    email: 'ana@example.com',
    publicaciones: 12,
    ingresos: 450.1,
    estado: 'inactivo',
    codigoReferido: 'ANA2024',
    referidos: 2,
  },
  {
    id: '5',
    name: 'Diego Fernández',
    email: 'diego@example.com',
    publicaciones: 28,
    ingresos: 1875.5,
    estado: 'activo',
    codigoReferido: 'DIEGO2024',
    referidos: 10,
  },
]

export function UsersTable() {
  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-xl">Gestión de Usuarios</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-secondary/30">
                <TableHead className="text-muted-foreground">Usuario</TableHead>
                <TableHead className="text-muted-foreground">Email</TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Publicaciones
                </TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Ingresos
                </TableHead>
                <TableHead className="text-muted-foreground">Código Referido</TableHead>
                <TableHead className="text-right text-muted-foreground">
                  Referidos
                </TableHead>
                <TableHead className="text-muted-foreground">Estado</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {usuarios.map((user) => (
                <TableRow
                  key={user.id}
                  className="border-border/30 hover:bg-secondary/50 transition-colors"
                >
                  <TableCell className="font-medium text-foreground">{user.name}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                  <TableCell className="text-right text-foreground">{user.publicaciones}</TableCell>
                  <TableCell className="text-right font-semibold text-green-400">
                    ${user.ingresos.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-xs bg-secondary/50 px-2 py-1 rounded text-primary">
                        {user.codigoReferido}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => copyCode(user.codigoReferido)}
                      >
                        <Copy className="w-3 h-3 text-primary hover:text-accent" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-foreground">{user.referidos}</TableCell>
                  <TableCell>
                    <Badge
                      variant={user.estado === 'activo' ? 'default' : 'secondary'}
                      className={
                        user.estado === 'activo'
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/20'
                          : 'bg-muted text-muted-foreground'
                      }
                    >
                      {user.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                        <DropdownMenuItem>Editar usuario</DropdownMenuItem>
                        <DropdownMenuItem>Historial de pagos</DropdownMenuItem>
                        <DropdownMenuItem>Suspender</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
