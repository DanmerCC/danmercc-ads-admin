'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { mes: 'Ene', ingresos: 2400, referidos: 240 },
  { mes: 'Feb', ingresos: 3210, referidos: 321 },
  { mes: 'Mar', ingresos: 2290, referidos: 229 },
  { mes: 'Abr', ingresos: 2000, referidos: 200 },
  { mes: 'May', ingresos: 2181, referidos: 218 },
  { mes: 'Jun', ingresos: 2500, referidos: 250 },
]

export function RevenueChart() {
  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Ingresos por Publicidad</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis stroke="hsl(var(--muted-foreground))" />
            <YAxis stroke="hsl(var(--muted-foreground))" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '0.5rem',
              }}
              labelStyle={{ color: 'hsl(var(--foreground))' }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="ingresos"
              stroke="hsl(var(--chart-1))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-1))', r: 4 }}
              name="Ingresos ($)"
            />
            <Line
              type="monotone"
              dataKey="referidos"
              stroke="hsl(var(--chart-2))"
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--chart-2))', r: 4 }}
              name="Referidos (#)"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
