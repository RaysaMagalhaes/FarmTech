import type { ReactNode } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DataCardProps {
  title: string
  value: string
  description?: string
  icon?: ReactNode
  trend?: {
    value: string
    positive: boolean
  }
  className?: string
  iconClassName?: string
}

export function DataCard({ title, value, description, icon, trend, className, iconClassName }: DataCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="mt-1 text-2xl font-bold tracking-tight">{value}</h3>
            {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
            {trend && (
              <p className={cn("text-xs font-medium mt-2", trend.positive ? "text-green-600" : "text-red-600")}>
                {trend.positive ? "↑" : "↓"} {trend.value}
              </p>
            )}
          </div>
          {icon && (
            <div
              className={cn(
                "flex h-12 w-12 items-center justify-center rounded-full",
                iconClassName || "bg-primary/10",
              )}
            >
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
