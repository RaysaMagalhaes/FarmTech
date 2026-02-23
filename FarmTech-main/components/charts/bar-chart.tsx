"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"

interface BarChartProps {
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
  layout?: "horizontal" | "vertical"
  showLegend?: boolean
}

export function BarChart({
  title,
  description,
  data,
  categories,
  index,
  className,
  valueFormatter = (value: number) => `${value}`,
  yAxisWidth = 60,
  layout = "horizontal",
  showLegend = true,
}: BarChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBarChart
              data={data}
              layout={layout}
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
                type={layout === "horizontal" ? "category" : "number"}
              />
              <YAxis
                width={yAxisWidth}
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
                tickFormatter={valueFormatter}
                className="text-xs text-muted-foreground"
                type={layout === "horizontal" ? "number" : "category"}
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
                <Bar
                  key={category.name}
                  dataKey={category.name}
                  fill={category.color}
                  radius={[4, 4, 0, 0]}
                  className="cursor-pointer"
                />
              ))}
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
