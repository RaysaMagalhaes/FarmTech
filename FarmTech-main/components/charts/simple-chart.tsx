"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface SimpleChartProps {
  title: string
  description?: string
  data: {
    label: string
    value: number
    formattedValue?: string
    color?: string
  }[]
  maxValue?: number
  className?: string
}

export function SimpleChart({ title, description, data, maxValue = 100, className }: SimpleChartProps) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{item.label}</span>
                <span className="text-sm font-bold">{item.formattedValue || item.value}</span>
              </div>
              <Progress
                value={(item.value / maxValue) * 100}
                className={`h-2 ${
                  item.color === "green"
                    ? "[&>div]:bg-green-500"
                    : item.color === "yellow"
                      ? "[&>div]:bg-yellow-500"
                      : item.color === "red"
                        ? "[&>div]:bg-red-500"
                        : item.color === "blue"
                          ? "[&>div]:bg-blue-500"
                          : ""
                }`}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
