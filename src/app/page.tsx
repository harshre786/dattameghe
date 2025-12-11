"use client";

import { useEffect, useState } from "react";
import { getISSPosition, ISSPosition } from "@/lib/api/iss";
import { getSolarFlares, SolarFlare } from "@/lib/api/weather";
import NotificationBanner from "@/components/NotificationBanner";

export default function Home() {
  const [issPosition, setIssPosition] = useState<ISSPosition | null>(null);
  const [loading, setLoading] = useState(true);
  const [majorEvent, setMajorEvent] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const position = await getISSPosition();
        setIssPosition(position);

        const solarFlares = await getSolarFlares();
        if (
          solarFlares.some((flare: SolarFlare) =>
            flare.classType.startsWith("X")
          )
        ) {
          setMajorEvent(true);
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* ─── EXISTING BACKGROUND LAYERS ───────────────────── */}
      <div className="space-bg space-gradient" />
      <div className="space-bg storm-layer" />
      <div className="space-bg star-field" />
      <div className="space-bg wind-streaks" />

      {/* ─── PREMIUM NEW BACKGROUND LAYERS ────────────────── */}
      <div className="premium-nebula" />
      <div className="premium-stars" />
      <div className="premium-orbit" />
      <div className="premium-earth-glow" />

      {/* ─── NOTIFICATION BANNER ───────────────────────────── */}
      {majorEvent && (
        <div className="sticky top-0 z-30">
          <NotificationBanner message="🚨 Major Solar Flare Detected! Space weather conditions may be elevated." />
        </div>
      )}

      {/* ─── MAIN CONTENT ──────────────────────────────────── */}
      <main className="relative z-20 mx-auto max-w-6xl px-4 py-10 space-y-10">
        {/* ─── HERO SECTION ────────────────────────────────── */}
        <section className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          {/* Left side text */}
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-sky-500/40 bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-sky-300 backdrop-blur">
              🔭 AstroVision · Live Space Dashboard
            </span>

            <h1 className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-[0_0_20px_rgba(56,189,248,0.35)]">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
                AstroVision
              </span>
              , your window to the universe.
            </h1>

            <p className="max-w-xl text-sm md:text-base text-slate-200/90">
              Track the ISS, monitor solar storms, and stay updated on key sky
              events — all in one cinematic dashboard.
            </p>

            {/* Status chips */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-200/80">
              <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 backdrop-blur border border-slate-700/80">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                {loading ? "Syncing with orbit..." : "Live data synced"}
              </span>

              {issPosition && (
                <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/80 px-3 py-1 backdrop-blur border border-slate-700/80">
                  🛰 ISS: Lat {Number(issPosition.latitude).toFixed(2)}, Lon{" "}
                  {Number(issPosition.longitude).toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Highlight card */}
          <div className="w-full md:w-72 rounded-2xl border border-sky-500/40 bg-slate-900/80 p-4 shadow-lg shadow-sky-500/30 backdrop-blur">
            <p className="text-xs text-slate-300 mb-2">Tonight&apos;s Sky</p>
            <p className="text-sm font-semibold">
              Clear skies with{" "}
              <span className="text-sky-300">Perseid Meteor Shower</span>.
            </p>
            <p className="mt-2 text-xs text-slate-300">
              Best viewed after midnight, away from city lights. Allow 15–20
              minutes for your eyes to adjust.
            </p>
          </div>
        </section>

        {/* ─── DASHBOARD CARDS ─────────────────────────────── */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* Next Launch */}
          <div className="group rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-md backdrop-blur hover:-translate-y-1 hover:border-sky-400/70 transition">
            <h3 className="text-sm font-semibold mb-1">🚀 Next Launch</h3>
            <p className="text-lg font-semibold">Falcon 9</p>
            <p className="mt-1 text-sm text-slate-200">
              Cape Canaveral Space Force Station
            </p>
          </div>

          {/* Solar Activity */}
          <div className="group rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-md backdrop-blur hover:-translate-y-1 hover:border-amber-400/70 transition">
            <h3 className="text-sm font-semibold mb-1">☀️ Solar Activity</h3>
            <p className="text-lg font-semibold">Kp-Index: 3</p>
            <p className="mt-1 text-sm text-slate-200">
              Geomagnetic level: Low
            </p>
          </div>

          {/* ISS Position */}
          <div className="group rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-md backdrop-blur hover:-translate-y-1 hover:border-emerald-400/70 transition">
            <h3 className="text-sm font-semibold mb-1">🛰 ISS Position</h3>

            {loading ? (
              <p className="mt-2 text-sm text-slate-300">Fetching data…</p>
            ) : issPosition ? (
              <>
                <p className="mt-2 text-sm">
                  Latitude:{" "}
                  <span className="font-semibold text-emerald-300">
                    {Number(issPosition.latitude).toFixed(2)}°
                  </span>
                </p>
                <p className="text-sm">
                  Longitude:{" "}
                  <span className="font-semibold text-emerald-300">
                    {Number(issPosition.longitude).toFixed(2)}°
                  </span>
                </p>
              </>
            ) : (
              <p className="text-sm text-red-300">Failed to load ISS data.</p>
            )}
          </div>

          {/* Today's Event */}
          <div className="group rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 shadow-md backdrop-blur hover:-translate-y-1 hover:border-purple-400/70 transition">
            <h3 className="text-sm font-semibold mb-1">
              🌌 Today&apos;s Event
            </h3>
            <p className="text-lg font-semibold">Perseid Meteor Shower</p>
            <p className="mt-1 text-sm text-slate-200">Peak viewing tonight</p>
          </div>
        </section>

        {/* ─── LEARN & EXPLORE ─────────────────────────────── */}
        <section className="mt-4 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 backdrop-blur">
            <h2 className="text-base font-semibold mb-2">
              🎓 Learn the Science
            </h2>
            <p className="text-sm text-slate-200 mb-3">
              Understand how satellites, observatories, and agencies monitor
              space.
            </p>
            <ul className="space-y-2 text-sm text-slate-200">
              <li>• How the ISS is tracked</li>
              <li>• Understanding Kp-index</li>
              <li>• How solar flares affect Earth</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/80 p-5 backdrop-blur">
            <h2 className="text-base font-semibold mb-2">
              🌍 Space & Daily Life
            </h2>
            <p className="text-sm text-slate-200 mb-3">
              Explore how space tech influences weather, navigation, and
              disaster alerts.
            </p>
            <p className="text-xs text-slate-300/90">
              Coming soon: interactive Earth maps with climate and pollution
              layers.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
