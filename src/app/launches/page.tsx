"use client";

import { useEffect, useState } from "react";
import { getUpcomingLaunches, Launch } from "@/lib/api/launches";
import { getSpaceXLaunches } from "@/lib/api/spacex";

const LaunchesPage = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const upcomingLaunches = await getUpcomingLaunches();
        setLaunches(upcomingLaunches);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    const fetchSpaceXLaunches = async () => {
      try {
        const spacexLaunches = await getSpaceXLaunches();
        console.log(spacexLaunches);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLaunches();
    fetchSpaceXLaunches();
  }, []);

  const filteredLaunches = launches.filter((launch) =>
    launch.mission.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100 flex items-center justify-center">
        {/* Reuse animated background */}
        <div className="space-bg space-gradient" />
        <div className="space-bg storm-layer" />
        <div className="space-bg star-field" />
        <div className="space-bg wind-streaks" />

        <p className="relative z-20 text-sm md:text-base text-slate-200/90">
          🚀 Fetching upcoming launches…
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Animated sky background (same as astronomy page) */}
      <div className="space-bg space-gradient" />
      <div className="space-bg storm-layer" />
      <div className="space-bg star-field" />
      <div className="space-bg wind-streaks" />

      <main className="relative z-20 mx-auto max-w-6xl px-4 py-10 space-y-8">
        {/* Header */}
        <section className="space-y-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            {/* Left: Text */}
            <div className="space-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-sky-300 backdrop-blur">
                🚀 AstroVision · Rocket Launches
              </span>
              <h1 className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-[0_0_18px_rgba(56,189,248,0.35)]">
                Track{" "}
                <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
                  Upcoming Rocket Launches
                </span>
              </h1>
              <p className="max-w-xl text-sm md:text-base text-slate-200/90">
                Explore scheduled launches from global space agencies and
                providers. Filter missions, inspect rockets, and stay ready for
                the next liftoff.
              </p>
            </div>

            {/* Right: Stats + Rocket */}
            <div className="flex flex-col items-end gap-4 md:w-64">
              {/* Stats card */}
              <div className="w-full rounded-2xl border border-slate-800/80 bg-slate-900/80 px-4 py-3 backdrop-blur shadow-md shadow-slate-900/60">
                <p className="text-xs text-slate-400">Upcoming Launches</p>
                <p className="text-2xl font-semibold">
                  {filteredLaunches.length || launches.length}
                </p>
              </div>

              {/* Rocket bubble */}
              <div className="relative h-32 w-32 rounded-full border border-sky-500/50 bg-slate-900/80 shadow-lg shadow-sky-500/40 backdrop-blur flex items-center justify-center overflow-hidden">
                {/* Rocket SVG */}
                <svg
                  className="h-20 w-20 -rotate-12 animate-bounce"
                  viewBox="0 0 64 64"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Body */}
                  <path
                    d="M32 4C24 10 18 22 18 32c0 8 4 16 14 24 10-8 14-16 14-24 0-10-6-22-14-28Z"
                    fill="url(#rocket-body)"
                  />
                  {/* Window */}
                  <circle cx="32" cy="28" r="5" fill="#0f172a" />
                  <circle cx="32" cy="28" r="3" fill="#e0f2fe" opacity="0.9" />
                  {/* Fins */}
                  <path d="M22 40 16 52l8-2 4-6" fill="#0ea5e9" opacity="0.9" />
                  <path
                    d="M42 40 48 52l-8-2-4-6"
                    fill="#22d3ee"
                    opacity="0.9"
                  />
                  {/* Flame */}
                  <path
                    d="M30 48c-2 3-2 7 2 10 4-3 4-7 2-10h-4Z"
                    fill="url(#rocket-flame)"
                  />
                  <defs>
                    <linearGradient
                      id="rocket-body"
                      x1="18"
                      y1="8"
                      x2="46"
                      y2="44"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#38bdf8" />
                      <stop offset="1" stopColor="#6366f1" />
                    </linearGradient>
                    <linearGradient
                      id="rocket-flame"
                      x1="28"
                      y1="48"
                      x2="36"
                      y2="58"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#f97316" />
                      <stop offset="1" stopColor="#facc15" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Glow trail */}
                <div className="absolute bottom-0 h-10 w-10 rounded-full bg-sky-500/20 blur-2xl" />
              </div>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="relative w-full md:max-w-md">
              <input
                type="text"
                placeholder="Search by mission name…"
                className="w-full rounded-xl border border-slate-700/80 bg-slate-900/80 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-400 shadow-sm shadow-slate-900/70 focus:outline-none focus:ring-2 focus:ring-sky-500/70 focus:border-sky-500/70 backdrop-blur"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                🔍
              </span>
            </div>

            <p className="text-xs text-slate-400">
              Showing{" "}
              <span className="font-semibold text-sky-300">
                {filteredLaunches.length}
              </span>{" "}
              missions
              {searchQuery
                ? ` matching "${searchQuery}"`
                : launches.length === 0
                ? ""
                : " from the latest schedule."}
            </p>
          </div>
        </section>

        {/* Launch cards */}
        {filteredLaunches.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-slate-800/80 bg-slate-900/80 px-5 py-10 text-center text-sm text-slate-300 backdrop-blur shadow-md shadow-slate-900/60">
            <p>
              No missions found with{" "}
              <span className="font-semibold text-sky-300">
                “{searchQuery}”
              </span>
              . Try a different mission name or clear the search.
            </p>
          </div>
        ) : (
          <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLaunches.map((launch) => (
              <div
                key={launch.id}
                className="group flex flex-col rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-md shadow-slate-900/60 backdrop-blur transition hover:-translate-y-1 hover:border-sky-400/70 hover:shadow-sky-700/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <h2 className="text-lg font-semibold text-slate-100">
                    {launch.mission.name}
                  </h2>
                  <span className="rounded-full bg-slate-800 px-2 py-0.5 text-[10px] uppercase tracking-wide text-slate-300">
                    {launch.rocket.configuration.full_name
                      .split(" ")
                      .slice(0, 2)
                      .join(" ")}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-200">
                  {launch.rocket.configuration.full_name}
                </p>

                <p className="mt-2 text-xs text-slate-400">
                  Launch window:{" "}
                  <span className="font-medium text-sky-300">
                    {new Date(launch.window_start).toLocaleString()}
                  </span>
                </p>

                {launch.pad?.name && (
                  <p className="mt-1 text-xs text-slate-400">
                    Launch site:{" "}
                    <span className="text-slate-200">{launch.pad.name}</span>
                  </p>
                )}

                <div className="mt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={() =>
                      console.log(`Bookmarked: ${launch.mission.name}`)
                    }
                    className="rounded-lg bg-sky-500/90 px-4 py-2 text-xs font-medium text-slate-950 hover:bg-sky-400 transition"
                  >
                    ⭐ Bookmark Launch
                  </button>
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-300 transition">
                    Click to save this mission in your watchlist (coming soon)
                  </span>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};

export default LaunchesPage;
