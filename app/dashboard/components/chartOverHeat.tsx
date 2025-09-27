"use client"
import { authService } from "@/api/auth-service"
import { teamService } from "@/api/dashboard/team-service"
import { routes } from "@/api/routes"
import { CalendarEvent } from "@/components"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import axios from "axios"
import { useEffect, useState } from "react"
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

interface Task {
  initDate: string;
  status: string;
  // você pode adicionar outros campos se precisar
}

export function ChartOverHeat() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [notActiveGroup, setNotActiveGroup] = useState(false)
  const [loading, setLoading] = useState(true)
  const [groupedTasks, setGroupedTasks] = useState<Record<string, { total: number; concluidas: number }>>({});

  useEffect(() => {
    async function getData() {
      const sessionId = await authService.getToken();
      const actualGroupRaw = await teamService.getTeamByUser();
      let actualGroup: { id_group: string } | null = null;

      if (actualGroupRaw) {
        try {
          actualGroup = JSON.parse(actualGroupRaw);
          setLoading(false);
        } catch {
          actualGroup = null;
          setLoading(false);
        }
      } else {
        setNotActiveGroup(true);
        setLoading(false);
      }

      if (!actualGroup) return;

      setLoading(true);

      try {
        const response = await axios.get(routes.getTasksByGroup + actualGroup.id_group, {
          headers: { authToken: sessionId },
        });

        const tasks = response.data.data;

        // === AGREGAR POR DIA ===
        const groupedByDate: Record<string, { total: number; concluidas: number }> = {};

        tasks.forEach((task: Task) => {
          const date = new Date(task.initDate);
          const day = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}`;

          if (!groupedByDate[day]) {
            groupedByDate[day] = { total: 0, concluidas: 0 };
          }

          groupedByDate[day].total += 1;

          // Só considera como concluída se for exatamente "Concluído"
          if (task.status === "Concluído") {
            groupedByDate[day].concluidas += 1;
          }
        });

        console.log(groupedByDate); // Aqui você vê os dados prontos para o gráfico
        setEvents(tasks); // Mantém o setEvents original se precisar da lista completa
        setGroupedTasks(groupedByDate); // Se você criar um estado separado para o gráfico
        setLoading(false);

      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    }

    getData();
  }, []);

  const chartDataForGraph = Object.entries(groupedTasks).map(([day, values]) => ({
    month: day,               // XAxis vai usar "month"
    totalTasks: values.total,
    completedTasks: values.concluidas,
  }));

  return (
    <div className="relative p-4 pb-0 w-full xl:w-[50%] h-62 space-y-2 border border-border bg-gradient-to-br from-sidebar/60 to-sidebar rounded-lg">
      <div>
        <h2 className="text-xl font-semibold">Tarefas concluídas</h2>
        <p className="text-muted-foreground overflow-hidden whitespace-nowrap text-ellipsis truncate">Visualize aqui as tarefas concluídas.</p>
      </div>
      <ChartContainer config={chartConfig} className="absolute aspect-auto h-44 w-full pr-8">
        <AreaChart accessibilityLayer data={chartDataForGraph}>
          <CartesianGrid vertical={true} />
          <XAxis
            dataKey="month"
            tickLine={true}
            axisLine={false}
            tickMargin={0}
            tickFormatter={(value) => value.slice(0, 5)}
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
