export type CalendarView = "Mês" | "Semana" | "Dia" | "Agenda";

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: EventColor;
  label?: string;
  location?: string;
}

export type EventColor = "blue" | "orange" | "violet" | "rose" | "emerald";
