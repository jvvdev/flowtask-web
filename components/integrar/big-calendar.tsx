"use client";

import { useState, useMemo, useEffect } from "react";
import { addDays, setHours, setMinutes, getDay } from "date-fns";
import { useCalendarContext } from "@/components/calendar-context";
import { EventCalendar } from "../event-calendar";
import { EventColor, CalendarEvent } from "../types";
import axios from "axios";
import { authService } from "@/api/auth-service";
import { teamService } from "@/api/dashboard/team-service";
import { routes } from "@/api/routes";
import { get } from "http";

// Etiquettes data for calendar filtering
export const etiquettes = [
  {
    id: "my-events",
    name: "My Events",
    color: "emerald" as EventColor,
    isActive: true,
  },
  {
    id: "marketing-team",
    name: "Marketing Team",
    color: "orange" as EventColor,
    isActive: true,
  },
  {
    id: "interviews",
    name: "Interviews",
    color: "violet" as EventColor,
    isActive: true,
  },
  {
    id: "events-planning",
    name: "Events Planning",
    color: "blue" as EventColor,
    isActive: true,
  },
  {
    id: "holidays",
    name: "Holidays",
    color: "rose" as EventColor,
    isActive: true,
  },
];

// Function to calculate days until next Sunday
const getDaysUntilNextSunday = (date: Date) => {
  const day = getDay(date); // 0 is Sunday, 6 is Saturday
  return day === 0 ? 0 : 7 - day; // If today is Sunday, return 0, otherwise calculate days until Sunday
};

// Store the current date to avoid repeated new Date() calls
const currentDate = new Date();

// Calculate the offset once to avoid repeated calculations
const daysUntilNextSunday = getDaysUntilNextSunday(currentDate);

export default function Component() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const { isColorVisible } = useCalendarContext();

  useEffect(() => {
    async function getData() {
      const sessionId = await authService.getToken();
      let activeGroup = await teamService.getTeamByUser();

      activeGroup = JSON.parse(activeGroup as string)

      axios.get(routes.getTasksByGroup + activeGroup.id_group, {
        headers: {
          authToken: sessionId,
        },
      }).then((response) => {
        setEvents(response.data.data);
      }).catch((error) => {
        console.error("Error fetching tasks:", error);
      });
    }

    getData();
  }, []);

  // Filter events based on visible colors
  const visibleEvents = useMemo(() => {
    return events.filter((event) => isColorVisible(event.color));
  }, [events, isColorVisible]);

  const handleEventAdd = (event: CalendarEvent) => {
    setEvents([...events, event]);
  };

  const handleEventUpdate = (updatedEvent: CalendarEvent) => {
    setEvents(
      events.map((event) =>
        event.id_task === updatedEvent.id_task ? updatedEvent : event,
      ),
    );
  };

  const handleEventDelete = (eventId: string) => {
    setEvents(events.filter((event) => event.id_task !== eventId));
  };

  return (
    <EventCalendar
      events={visibleEvents}
      onEventAdd={handleEventAdd}
      onEventUpdate={handleEventUpdate}
      onEventDelete={handleEventDelete}
      initialView="Semana"
    />
  );
}
