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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Publication {
  id: string
  titulo: string
  usuario: string
  fecha: string
  vistas: number
  clics: number
  ingresos: number
  estado: 'activo' | 'pausado' | 'finalizado'
}

const publicaciones: Publication[] = [
  {
    id: '1',
    titulo: 'Promoción de Zapatillas Nike',
    usuario: 'Juan Martinez',
    fecha: '2024-06-10',
    vistas: 4520,
    clics: 328,
    ingresos: 125.5,
    estado: 'activo',
  },
  {
    id: '2',
    titulo: 'Campaña de Productos Apple',
    usuario: 'Carlos López',
    fecha: '2024-06-08',
    vistas: 7230,
    clics: 512,
    ingresos: 215.75,
    estado: 'activo',
  },
  {
    id: '3',
    titulo: 'Oferta Especial - Tecnología',
    usuario: 'Maria García',
    fecha: '2024-06-05',
    vistas: 3120,
    clics: 184,
    ingresos: 89.25,
    estado: 'finalizado',
  },
  {
    id: '4',
    titulo: 'Descuento en Ropa Deportiva',
    usuario: 'Diego Fernández',
    fecha: '2024-06-12',
    vistas: 5800,
    clics: 420,
    ingresos: 175.5,
    estado: 'activo',
  },
  {
    id: '5',
    titulo: 'Promoción Limitada - Accesorios',
    usuario: 'Juan Martinez',
    fecha: '2024-06-09',
    vistas: 2340,
    clics: 95,
    ingresos: 42.1,
    estado: 'pausado',
  },
]

export function PublicationsTable() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'activo':
        return 'bg-green-500/20 text-green-400'
      case 'pausado':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'finalizado':
        return 'bg-gray-500/20 text-gray-400'
      default:
        return 'bg-muted text-muted-foreground'
    }
  }

  const getTotalIngresos = () => {
    return publicaciones.reduce((sum, pub) => sum + pub.ingresos, 0)
  }

  return (
    <Card className="border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Publicaciones Recientes</CardTitle>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Total Ingresos</p>
          <p className="text-xl font-bold text-green-400">${getTotalIngresos().toFixed(2)}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-border/30 hover:bg-secondary/30">
                <TableHead className="text-muted-foreground">Título</TableHead>
                <TableHead className="text-muted-foreground">Usuario</TableHead>
                <TableHead className="text-muted-foreground">Fecha</TableHead>
                <TableHead className="text-right text-muted-foreground">Vistas</TableHead>
                <TableHead className="text-right text-muted-foreground">Clics</TableHead>
                <TableHead className="text-right text-muted-foreground">CTR</TableHead>
                <TableHead className="text-right text-muted-foreground">Ingresos</TableHead>
                <TableHead className="text-muted-foreground">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publicaciones.map((pub) => {
                const ctr = ((pub.clics / pub.vistas) * 100).toFixed(2)
                return (
                  <TableRow
                    key={pub.id}
                    className="border-border/30 hover:bg-secondary/50 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground">{pub.titulo}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{pub.usuario}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{pub.fecha}</TableCell>
                    <TableCell className="text-right text-foreground">{pub.vistas.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-foreground">{pub.clics}</TableCell>
                    <TableCell className="text-right text-primary font-semibold">{ctr}%</TableCell>
                    <TableCell className="text-right font-semibold text-green-400">
                      ${pub.ingresos.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${getStatusColor(pub.estado)} hover:opacity-80`}>
                        {pub.estado}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
