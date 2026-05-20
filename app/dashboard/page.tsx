'use client'
import { useState } from "react";
import EventsBox from "@/app/components/EventBox";
import NearbyEventsBox from "@/app/components/NearbyEventsBox";
import MyEventsBox from "@/app/components/MyEventsBox";

export default function Dashboard() {
 const [activeTab, setActiveTab] = useState("events");

  return (
    <main className="min-h-screen bg-[#121212] text-zinc-100">
      <nav className="sticky top-0 z-20 border-b border-white/10 bg-[#121212]/90 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
          <button
            type="button"
            className="relative flex h-11 min-w-24 items-center justify-center overflow-hidden border border-white/15 bg-white px-5 text-xs font-black uppercase tracking-[0.22em] text-[#121212] shadow-[0_0_28px_rgba(255,61,113,0.22)] transition hover:-translate-y-0.5 hover:border-fuchsia-300"
          >
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#ff3d71] via-[#ffd166] to-[#06d6a0]" />
            Logo
          </button>

          <div className="hidden items-center rounded-full border border-white/10 bg-white/[0.04] p-1 text-[11px] font-bold uppercase tracking-[0.14em] text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] md:flex">
            <button
              onClick={() => setActiveTab("events")}
              type="button"
              className="rounded-full px-5 py-3 transition hover:bg-[#ff3d71] hover:text-white"
            >
              Eventy
            </button>
            <button
              onClick={() => setActiveTab("nearby")}
              type="button"
              className="rounded-full px-5 py-3 transition hover:bg-[#00c2ff] hover:text-[#071016]"
            >
              Eventy blizko mna
            </button>
            <button
              onClick={() => setActiveTab("mine")}
              type="button"
              className="rounded-full px-5 py-3 transition hover:bg-[#ffd166] hover:text-[#1b1300]"
            >
              Moje eventy
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="hidden h-11 items-center gap-2 border border-[#ff3d71]/70 bg-[#ff3d71] px-4 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_0_32px_rgba(255,61,113,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ff5d8a] sm:flex"
            >
              <span className="text-base leading-none">+</span>
              Vytvorit event
            </button>

            <button
              type="button"
              aria-label="Notifications"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-zinc-200 transition hover:border-[#00c2ff]/70 hover:bg-[#00c2ff]/15"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 17h5l-1.4-1.4A2 2 0 0 1 18 14.2V11a6 6 0 1 0-12 0v3.2c0 .5-.2 1-.6 1.4L4 17h5m6 0a3 3 0 0 1-6 0"
                />
              </svg>
            </button>

            <button
              type="button"
              className="flex h-11 items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] py-1 pl-1 pr-2 text-left transition hover:border-[#06d6a0]/70 hover:bg-[#06d6a0]/10 sm:pr-4"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[#06d6a0] via-[#00c2ff] to-[#ff3d71] text-sm font-black text-white">
                M
              </span>
              <span className="hidden text-xs font-bold text-zinc-100 sm:block">
                Meno Priezvisko
              </span>
              <svg
                aria-hidden="true"
                className="hidden h-4 w-4 text-zinc-400 sm:block"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m6 9 6 6 6-6"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      <section>
    {activeTab === "events" && <EventsBox />}
    {activeTab === "nearby" && <NearbyEventsBox />}
    {activeTab === "mine" && <MyEventsBox />}
</section>
    </main>
  );
}
