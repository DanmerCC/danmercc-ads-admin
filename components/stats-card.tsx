import React from "react"
import { Card, CardContent } from '@/components/ui/card'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  change: number
  trend: 'up' | 'down'
  icon: React.ReactNode
}

export function StatsCard({ title, value, change, trend, icon }: StatsCardProps) {
  const isPositive = trend === 'up'

  return (
    <Card className="bg-gradient-to-br from-card to-secondary border-border/50">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-bold text-foreground">{value}</h3>
            <div className="flex items-center gap-1 mt-2">
              {isPositive ? (
                <ArrowUpRight className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500" />
              )}
              <span className={isPositive ? 'text-green-500' : 'text-red-500'}>
                {Math.abs(change)}%
              </span>
              <span className="text-xs text-muted-foreground">vs mes anterior</span>
            </div>
          </div>
          <div className="text-primary opacity-70">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}
