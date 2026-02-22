'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, RefreshCw } from 'lucide-react'
import { useState } from 'react'

interface ReferralCode {
  code: string
  usuario: string
  usos: number
  ingresos: number
  estado: 'activo' | 'pausado'
}

const referralCodes: ReferralCode[] = [
  { code: 'JUAN2024', usuario: 'Juan Martinez', usos: 8, ingresos: 320.5, estado: 'activo' },
  { code: 'MARIA2024', usuario: 'Maria García', usos: 5, ingresos: 200.25, estado: 'activo' },
  { code: 'CARLOS2024', usuario: 'Carlos López', usos: 12, ingresos: 480.75, estado: 'activo' },
  { code: 'DIEGO2024', usuario: 'Diego Fernández', usos: 10, ingresos: 400.1, estado: 'activo' },
]

export function ReferralPanel() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const generateNewCode = () => {
    // Simulate generating a new code
    alert('Se ha generado un nuevo código de referido')
  }

  const totalReferralIncome = referralCodes.reduce((sum, ref) => sum + ref.ingresos, 0)
  const totalReferrals = referralCodes.reduce((sum, ref) => sum + ref.usos, 0)

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* Stats */}
      <div className="md:col-span-2 grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-card to-secondary border-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Total Referidos</p>
            <h3 className="text-3xl font-bold text-foreground mb-2">{totalReferrals}</h3>
            <p className="text-xs text-muted-foreground">Usuarios reclutados exitosamente</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-card to-secondary border-border/50">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Ingresos por Referidos</p>
            <h3 className="text-3xl font-bold text-green-400 mb-2">${totalReferralIncome.toFixed(2)}</h3>
            <p className="text-xs text-muted-foreground">Comisiones generadas</p>
          </CardContent>
        </Card>
      </div>

      {/* Referral Codes */}
      <Card className="md:col-span-2 border-border/50">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Códigos de Referido</CardTitle>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={generateNewCode}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Generar Código
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {referralCodes.map((ref) => (
              <div
                key={ref.code}
                className="flex items-center justify-between p-4 bg-secondary/50 rounded-lg border border-border/50 hover:bg-secondary/70 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <code className="text-sm font-mono font-bold text-primary">{ref.code}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => copyToClipboard(ref.code)}
                    >
                      <Copy className="w-3 h-3 text-primary hover:text-accent" />
                      {copiedCode === ref.code && (
                        <span className="text-xs text-green-400 ml-1">¡Copiado!</span>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">{ref.usuario}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Usos</p>
                      <p className="text-lg font-bold text-foreground">{ref.usos}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Ingresos</p>
                      <p className="text-lg font-bold text-green-400">${ref.ingresos.toFixed(2)}</p>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 hover:bg-green-500/20">
                      {ref.estado}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
