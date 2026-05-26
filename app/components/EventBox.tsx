'use client'

import { createClient } from "@/app/lib/supabase/client";
import { useEffect, useMemo, useState } from "react";

type EventItem = {
  event_id: number;
  title: string | null;
  location: string | null;
  date: string | null;
  description: string | null;
  event_categories?: {
    category: {
      id: number;
      category: string;
    } | null;
  }[];
};

export default function EventBox() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const categories = ["koncert", "Sport", "Kultura", "Zabava", "Ine"];
  const dates = ["Dnes", "Tento tyzden", "Tento mesiac", "Tento rok"];
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [query, setQuery] = useState<string>("");
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadEvents = async () => {
      try {
        setIsLoadingEvents(true);

        const supabase = createClient();

        const { data, error } = await supabase
          .from("event")
          .select(`
            *,
            event_categories (
              category (
                id,
                category
              )
            )
          `)
          .order("created_at", { ascending: true });

        if (error) {
          throw error;
        }

        if (isMounted) {
          setEvents((data ?? []) as EventItem[]);
        }
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        if (isMounted) {
          setIsLoadingEvents(false);
        }
      }
    };

    loadEvents();

    return () => {
      isMounted = false;
    };
  }, []);

  function matchesSelectedDate(eventDate: string | null, selectedDate: string) {
    if (!eventDate) return false;

    const date = new Date(eventDate);
    const now = new Date();

    if (Number.isNaN(date.getTime())) return false;

    if (selectedDate === "Dnes") {
      return date.toDateString() === now.toDateString();
    }

    if (selectedDate === "Tento tyzden") {
      const weekFromNow = new Date(now);
      weekFromNow.setDate(now.getDate() + 7);

      return date >= now && date <= weekFromNow;
    }

    if (selectedDate === "Tento mesiac") {
      return (
        date.getFullYear() === now.getFullYear() &&
        date.getMonth() === now.getMonth()
      );
    }

    if (selectedDate === "Tento rok") {
      return date.getFullYear() === now.getFullYear();
    }

    return true;
  }

  const filteredEvents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return events.filter((event) => {
      const matchesCategory =
        selectedCategories.length === 0 ||
        event.event_categories?.some((item) =>
          selectedCategories.includes(
            item.category?.category.toLowerCase() ?? ""
          )
        );

      const matchesQuery =
        normalizedQuery === "" ||
        event.title?.toLowerCase().includes(normalizedQuery) ||
        event.location?.toLowerCase().includes(normalizedQuery);

      const matchesDate =
        selectedDate === "" || matchesSelectedDate(event.date, selectedDate);

      return matchesCategory && matchesQuery && matchesDate;
    });
  }, [events, selectedCategories, selectedDate, query]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-8 text-zinc-100">
      <div className="border border-white/15 bg-[#f4f4f4] p-4 text-[#121212] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
        <h1 className="mb-4 text-sm font-black uppercase tracking-wide">
          1. Eventy - zoznam vsetkych eventov
        </h1>

        <div className="grid gap-5 md:grid-cols-[230px_1fr]">
          <aside className="border border-zinc-400 bg-white p-4">
            <label className="relative block">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Zadaj event alebo miesto.."
                className="h-9 w-full border border-zinc-400 bg-white px-3 pr-9 text-xs font-medium outline-none placeholder:text-zinc-500"
              />

              <svg
                aria-hidden="true"
                className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.3-4.3m1.8-5.2a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                />
              </svg>
            </label>

            <div className="mt-5">
              <h2 className="mb-2 text-xs font-black uppercase">Kategorie</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 text-xs font-medium"
                  >
                   <input
                    type="checkbox"
                    checked={selectedCategories.includes(category.toLowerCase())}
                    onChange={() => {
                      if (selectedCategories.includes(category.toLowerCase())) {
                        setSelectedCategories(
                          selectedCategories.filter(
                            (item) => item !== category.toLowerCase()
                          )
                        );
                      } else {
                        setSelectedCategories([
                          ...selectedCategories,
                          category.toLowerCase(),
                        ]);
                      }
                    }}
                    className="h-3.5 w-3.5 accent-[#ff3d71]"
                  />
                    {category}
                  </label>
                ))}
              </div>
            </div>

            <div className="mt-5">
              <h2 className="mb-2 text-xs font-black uppercase">Datum</h2>
              <div className="space-y-2">
                {dates.map((date) => (
                  <button
                    key={date}
                    type="button"
                    onClick={() =>
                      setSelectedDate(selectedDate === date ? "" : date)
                    }
                    className={`h-7 w-full border px-2 text-left text-[10px] font-bold uppercase transition ${
                      selectedDate === date
                        ? "border-[#121212] bg-[#121212] text-white"
                        : "border-zinc-400 bg-white text-[#121212] hover:border-[#ff3d71] hover:text-[#ff3d71]"
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="space-y-3">
            {isLoadingEvents ? (
              <p className="border border-zinc-400 bg-white p-4 text-sm font-bold">
                Nacitavam eventy...
              </p>
            ) : filteredEvents.length === 0 ? (
              <p className="border border-zinc-400 bg-white p-4 text-sm font-bold">
                Nenasli sa ziadne eventy.
              </p>
            ) : (
              filteredEvents.map((event) => (
                <article
                  key={event.event_id}
                  className="grid min-h-28 grid-cols-[120px_1fr] border border-zinc-400 bg-white sm:grid-cols-[180px_1fr]"
                >
                  <div className="relative border-r border-zinc-400 bg-zinc-100">
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,transparent_49%,#bdbdbd_50%,transparent_51%),linear-gradient(to_top_right,transparent_49%,#bdbdbd_50%,transparent_51%)]" />
                  </div>

                  <div className="flex items-start justify-between gap-4 p-4">
                    <div className="flex flex-col justify-between">
                      <div>
                        <h2 className="text-sm font-black">{event.title}</h2>
                        <p className="mt-1 text-xs font-semibold">
                          {event.location}
                        </p>
                        <p className="text-xs font-semibold">{event.date}</p>
                      </div>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {event.event_categories?.map((item) =>
                          item.category ? (
                            <span
                              key={item.category.id}
                              className="border border-zinc-300 px-2 py-1 text-[10px] font-bold uppercase"
                            >
                              {item.category.category}
                            </span>
                          ) : null
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-5">
                      <span className="flex items-center gap-1 text-xs font-bold">
                        <svg
                          aria-hidden="true"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16 19c0-2.2-1.8-4-4-4s-4 1.8-4 4m8-10a4 4 0 1 1-8 0m12 10c0-1.7-1-3.2-2.5-3.8M17 5.3a3 3 0 0 1 0 5.4"
                          />
                        </svg>
                        xY
                      </span>

                      <button
                        type="button"
                        className="border border-[#121212] bg-white px-3 py-1.5 text-[10px] font-black uppercase transition hover:bg-[#121212] hover:text-white"
                      >
                        Zobrazit
                      </button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
