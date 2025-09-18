export type CalendarView = "Mês" | "Semana" | "Dia" | "Agenda";

export interface CalendarEvent {
  id_task: string;
  title: string;
  status?: string;
  priority?: string;
  attributedAt: string;
  description?: string;
  initDate: Date;
  endDate: Date;
  all_day?: boolean;
  color?: EventColor;
  label?: string;
  location?: string;
}

export type EventColor = "blue" | "orange" | "violet" | "rose" | "emerald";
