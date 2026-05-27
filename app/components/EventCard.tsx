"use client"

import React from "react";

export interface EventItem {
  id: number;
  title: string;
  peopleCount: number;
  organizer: string;
  description: string;
  location: string;
  datetime: string;
}

export default function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="w-full bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition p-4 flex flex-col sm:flex-row gap-4">
      <div className="shrink-0 flex items-center justify-center w-full sm:w-40 h-32 bg-gray-100 border border-gray-100 rounded-md">
        <div className="text-center">
          <div className="text-xs text-gray-500">Počet ľudí</div>
          <div className="text-2xl font-semibold text-gray-900">{event.peopleCount}</div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
          <p className="text-sm text-gray-600 mt-1">Organizuje: <span className="font-medium text-gray-800">{event.organizer}</span></p>
          <p className="text-sm text-gray-600 mt-2 line-clamp-3">{event.description}</p>
        </div>

        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="text-sm text-gray-600">
            <div className="font-medium text-gray-900">{event.location}</div>
            <div className="text-xs">{new Date(event.datetime).toLocaleString()}</div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-3 py-1 text-sm font-medium bg-black text-white rounded-md hover:opacity-90">Pridať sa</button>
            <button className="px-3 py-1 text-sm font-medium border border-gray-300 rounded-md text-gray-800">Viac</button>
          </div>
        </div>
      </div>
    </article>
  );
}
