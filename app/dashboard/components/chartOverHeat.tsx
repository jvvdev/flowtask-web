"use client"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

export const description = "An area chart with gradient fill"

const chartData = [
  { month: "01/25", completedTasks: 186, totalTasks: 80 },
  { month: "02/25", completedTasks: 305, totalTasks: 200 },
  { month: "03/25", completedTasks: 257, totalTasks: 120 },
  { month: "04/25", completedTasks: 73, totalTasks: 190 },
  { month: "05/25", completedTasks: 209, totalTasks: 130 },
  { month: "06/25", completedTasks: 214, totalTasks: 140 },
]

const chartConfig = {
  completedTasks: {
    label: "Tarefas concluídas",
    color: "var(--chart-1)",
  },
  totalTasks: {
    label: "Tarefas totais",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartOverHeat() {
  return (
    <div className="relative p-4 pb-0 w-[38%] h-62 space-y-2 border border-border bg-gradient-to-br from-sidebar/60 to-sidebar rounded-lg">
      <div>
        <h2 className="text-2xl font-semibold">Tarefas concluídas</h2>
        <p className="text-muted-foreground text-sm">
          Abaixo um grafico completo sobre suas tarefas.
        </p>
      </div>
      <ChartContainer config={chartConfig} className="absolute aspect-auto h-44 w-full pr-8">
        <AreaChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="month"
            tickLine={true}
            axisLine={false}
            tickMargin={0}
            tickFormatter={(value) => value.slice(0, 2)}
          />
          <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillcompletedTasks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-completedTasks)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-completedTasks)" stopOpacity={0.1} />
            </linearGradient>
            <linearGradient id="filltotalTasks" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-totalTasks)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-totalTasks)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <Area
            dataKey="totalTasks"
            type="natural"
            fill="url(#filltotalTasks)"
            fillOpacity={0.4}
            stroke="var(--color-totalTasks)"
            stackId="a"
          />
          <Area
            dataKey="completedTasks"
            type="natural"
            fill="url(#fillcompletedTasks)"
            fillOpacity={0.4}
            stroke="var(--color-completedTasks)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
