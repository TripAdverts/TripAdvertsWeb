"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const chartData = [
  { date: "2024-04-01", views: 222, interactions: 150 },
  { date: "2024-04-02", views: 97, interactions: 180 },
  { date: "2024-04-03", views: 167, interactions: 120 },
  { date: "2024-04-04", views: 242, interactions: 260 },
  { date: "2024-04-05", views: 373, interactions: 290 },
  { date: "2024-04-06", views: 301, interactions: 340 },
  { date: "2024-04-07", views: 245, interactions: 180 },
  { date: "2024-04-08", views: 409, interactions: 320 },
  { date: "2024-04-09", views: 59, interactions: 110 },
  { date: "2024-04-10", views: 261, interactions: 190 },
  { date: "2024-04-11", views: 327, interactions: 350 },
  { date: "2024-04-12", views: 292, interactions: 210 },
  { date: "2024-04-13", views: 342, interactions: 380 },
  { date: "2024-04-14", views: 137, interactions: 220 },
  { date: "2024-04-15", views: 120, interactions: 170 },
  { date: "2024-04-16", views: 138, interactions: 190 },
  { date: "2024-04-17", views: 446, interactions: 360 },
  { date: "2024-04-18", views: 364, interactions: 410 },
  { date: "2024-04-19", views: 243, interactions: 180 },
  { date: "2024-04-20", views: 89, interactions: 150 },
  { date: "2024-04-21", views: 137, interactions: 200 },
  { date: "2024-04-22", views: 224, interactions: 170 },
  { date: "2024-04-23", views: 138, interactions: 230 },
  { date: "2024-04-24", views: 387, interactions: 290 },
  { date: "2024-04-25", views: 215, interactions: 250 },
  { date: "2024-04-26", views: 75, interactions: 130 },
  { date: "2024-04-27", views: 383, interactions: 420 },
  { date: "2024-04-28", views: 122, interactions: 130 },
  { date: "2024-04-29", views: 315, interactions: 230 },
  { date: "2024-04-30", views: 454, interactions: 380 },
  { date: "2024-05-01", views: 165, interactions: 220 },
  { date: "2024-05-02", views: 293, interactions: 310 },
  { date: "2024-05-03", views: 247, interactions: 190 },
  { date: "2024-05-04", views: 385, interactions: 420 },
  { date: "2024-05-05", views: 481, interactions: 390 },
  { date: "2024-05-06", views: 498, interactions: 520 },
  { date: "2024-05-07", views: 388, interactions: 300 },
  { date: "2024-05-08", views: 149, interactions: 210 },
  { date: "2024-05-09", views: 227, interactions: 180 },
  { date: "2024-05-10", views: 293, interactions: 330 },
  { date: "2024-05-11", views: 335, interactions: 270 },
  { date: "2024-05-12", views: 197, interactions: 240 },
  { date: "2024-05-13", views: 197, interactions: 160 },
  { date: "2024-05-14", views: 448, interactions: 490 },
  { date: "2024-05-15", views: 473, interactions: 380 },
  { date: "2024-05-16", views: 338, interactions: 400 },
  { date: "2024-05-17", views: 499, interactions: 420 },
  { date: "2024-05-18", views: 315, interactions: 350 },
  { date: "2024-05-19", views: 235, interactions: 180 },
  { date: "2024-05-20", views: 177, interactions: 230 },
  { date: "2024-05-21", views: 82, interactions: 140 },
  { date: "2024-05-22", views: 81, interactions: 120 },
  { date: "2024-05-23", views: 252, interactions: 290 },
  { date: "2024-05-24", views: 294, interactions: 220 },
  { date: "2024-05-25", views: 201, interactions: 250 },
  { date: "2024-05-26", views: 213, interactions: 170 },
  { date: "2024-05-27", views: 420, interactions: 460 },
  { date: "2024-05-28", views: 233, interactions: 190 },
  { date: "2024-05-29", views: 78, interactions: 130 },
  { date: "2024-05-30", views: 340, interactions: 280 },
  { date: "2024-05-31", views: 178, interactions: 230 },
  { date: "2024-06-01", views: 178, interactions: 200 },
  { date: "2024-06-02", views: 470, interactions: 410 },
  { date: "2024-06-03", views: 103, interactions: 160 },
  { date: "2024-06-04", views: 439, interactions: 380 },
  { date: "2024-06-05", views: 88, interactions: 140 },
  { date: "2024-06-06", views: 294, interactions: 250 },
  { date: "2024-06-07", views: 323, interactions: 370 },
  { date: "2024-06-08", views: 385, interactions: 320 },
  { date: "2024-06-09", views: 438, interactions: 480 },
  { date: "2024-06-10", views: 155, interactions: 200 },
  { date: "2024-06-11", views: 92, interactions: 150 },
  { date: "2024-06-12", views: 492, interactions: 420 },
  { date: "2024-06-13", views: 81, interactions: 130 },
  { date: "2024-06-14", views: 426, interactions: 380 },
  { date: "2024-06-15", views: 307, interactions: 350 },
  { date: "2024-06-16", views: 371, interactions: 310 },
  { date: "2024-06-17", views: 475, interactions: 520 },
  { date: "2024-06-18", views: 107, interactions: 170 },
  { date: "2024-06-19", views: 341, interactions: 290 },
  { date: "2024-06-20", views: 408, interactions: 450 },
  { date: "2024-06-21", views: 169, interactions: 210 },
  { date: "2024-06-22", views: 317, interactions: 270 },
  { date: "2024-06-23", views: 480, interactions: 530 },
  { date: "2024-06-24", views: 132, interactions: 180 },
  { date: "2024-06-25", views: 141, interactions: 190 },
  { date: "2024-06-26", views: 434, interactions: 380 },
  { date: "2024-06-27", views: 448, interactions: 490 },
  { date: "2024-06-28", views: 149, interactions: 200 },
  { date: "2024-06-29", views: 103, interactions: 160 },
  { date: "2024-06-30", views: 446, interactions: 400 },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  views: {
    label: "Views",
    color: "#44B8A7",
  },
  interactions: {
    label: "Interactions",
    color: "#14b8a6",
  },
} satisfies ChartConfig

export default function DeepEngagementChart() {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="border-none shadow-none bg-transparent w-full text-black">
      <CardContent className="px-2 pt-2 sm:p-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[180px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillViews" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#44B8A7"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#44B8A7"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillInteractions" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="#14b8a6"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="#14b8a6"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="interactions"
              type="monotone"
              fill="url(#fillInteractions)"
              stroke="#14b8a6"
              stackId="a"
            />
            <Area
              dataKey="views"
              type="monotone"
              fill="url(#fillViews)"
              stroke="#44B8A7"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
