"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ResponsiveContainer,
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

interface LineChartProps {
  title: string
  description?: string
  data: any[]
  categories: {
    name: string
    color: string
  }[]
  index: string
  className?: string
  valueFormatter?: (value: number) => string
  yAxisWidth?: number
  showLegend?: boolean
}

export function LineChart({
  title,
  description,
  data,
  categories,
  index,
  className,
  valueFormatter = (value: number) => `${value}`,
  yAxisWidth = 60,
  showLegend = true,
}: LineChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} className="stroke-muted" />
              <XAxis
                dataKey={index}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                className="text-xs text-muted-foreground"
              />
              <YAxis
                width={yAxisWidth}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={valueFormatter}
                className="text-xs text-muted-foreground"
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div className="font-medium">{label}</div>
                          <div className="font-medium text-right"></div>
                          {payload.map((item: any) => (
                            <div key={item.name} className="flex items-center gap-1 text-sm">
                              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
                              <span>{item.name}</span>
                            </div>
                          ))}
                          {payload.map((item: any) => (
                            <div key={item.name} className="text-right text-sm font-medium">
                              {valueFormatter(item.value)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  }
                  return null
                }}
              />
              {showLegend && <Legend />}
              {categories.map((category) => (
                <Line
                  key={category.name}
                  type="monotone"
                  dataKey={category.name}
                  stroke={category.color}
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 2 }}
                />
              ))}
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
