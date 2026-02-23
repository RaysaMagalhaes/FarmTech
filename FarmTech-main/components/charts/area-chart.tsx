"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ResponsiveContainer,
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts"

interface AreaChartProps {
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
}

export function AreaChart({
  title,
  description,
  data,
  categories,
  index,
  className,
  valueFormatter = (value: number) => `${value}`,
  yAxisWidth = 60,
}: AreaChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsAreaChart
              data={data}
              margin={{
                top: 20,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                {categories.map((category, index) => (
                  <linearGradient key={category.name} id={`color-${category.name}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={category.color} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={category.color} stopOpacity={0.1} />
                  </linearGradient>
                ))}
              </defs>
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
              {categories.map((category) => (
                <Area
                  key={category.name}
                  type="monotone"
                  dataKey={category.name}
                  stroke={category.color}
                  strokeWidth={2}
                  fill={`url(#color-${category.name})`}
                  activeDot={{ r: 6 }}
                />
              ))}
            </RechartsAreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
