import { useQuery } from "@tanstack/react-query";
import fetchEvents from "@/app/api/event-api";

export function useEvents() {
  return useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5,
  });
}