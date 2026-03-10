"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const chartData = [
  { time: "Mon", impressions: 1200 },
  { time: "Tue", impressions: 2100 },
  { time: "Wed", impressions: 1800 },
  { time: "Thu", impressions: 2400 },
  { time: "Fri", impressions: 3200 },
  { time: "Sat", impressions: 4100 },
  { time: "Sun", impressions: 3800 },
]

const chartConfig = {
  impressions: {
    label: "Impressions",
    color: "#44B8A7",
  },
} satisfies ChartConfig

export default function AnalyticsChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[140px] w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: -20,
          right: 10,
          top: 10,
          bottom: 0,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="time"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Area
          dataKey="impressions"
          type="step"
          fill="var(--color-impressions)"
          fillOpacity={0.4}
          stroke="var(--color-impressions)"
        />
      </AreaChart>
    </ChartContainer>
  )
}
