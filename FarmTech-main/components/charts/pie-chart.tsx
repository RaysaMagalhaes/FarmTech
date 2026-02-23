"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, PieChart as RechartsPieChart, Pie, Cell, Legend, Tooltip } from "recharts"

interface PieChartProps {
  title: string
  description?: string
  data: {
    name: string
    value: number
    color: string
  }[]
  className?: string
  valueFormatter?: (value: number) => string
  showLegend?: boolean
}

export function PieChart({
  title,
  description,
  data,
  className,
  valueFormatter = (value: number) => `${value}`,
  showLegend = true,
}: PieChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsPieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: data.color }} />
                            <span className="font-medium">{data.name}</span>
                          </div>
                          <div className="text-right font-medium">{valueFormatter(data.value)}</div>
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              {showLegend && (
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  formatter={(value, entry, index) => <span className="text-xs text-muted-foreground">{value}</span>}
                />
              )}
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
