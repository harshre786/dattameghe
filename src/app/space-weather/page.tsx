"use client";

import { useEffect, useState } from "react";
import {
  getPlanetaryKIndex,
  KpIndex,
  getSolarFlares,
  SolarFlare,
} from "@/lib/api/weather";

const SpaceWeatherPage = () => {
  const [kpIndex, setKpIndex] = useState<KpIndex | null>(null);
  const [solarFlares, setSolarFlares] = useState<SolarFlare[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [kpIndexData, solarFlareData] = await Promise.all([
          getPlanetaryKIndex(),
          getSolarFlares(),
        ]);
        setKpIndex(kpIndexData[kpIndexData.length - 1]);
        setSolarFlares(solarFlareData);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  const latestFlare =
    solarFlares.length > 0 ? solarFlares[solarFlares.length - 1] : null;

  const kpValue = kpIndex ? Number(kpIndex.kp_index) : null;

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* ☀️ SOLAR STORM + MAGNETIC FIELD BACKGROUND */}
      <div className="space-bg solar-storm-bg" />
      <div className="space-bg solar-eruption" />
      <div className="space-bg magnetic-field" />

      <main className="relative z-20 mx-auto max-w-6xl px-4 py-10 space-y-8">
        {/* Header */}
        <section className="space-y-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-yellow-400/60 bg-slate-900/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wide text-yellow-300 backdrop-blur">
            ☀️ AstroVision · Space Weather
          </span>

          <h1 className="text-3xl md:text-4xl font-bold leading-tight drop-shadow-[0_0_22px_rgba(251,191,36,0.45)]">
            Live{" "}
            <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Solar Storm & Magnetic Activity
            </span>
          </h1>

          <p className="max-w-xl text-sm md:text-base text-slate-200/90">
            Track real-time solar flares, geomagnetic storms, and aurora
            activity caused by energetic particles from the Sun interacting with
            Earth&apos;s magnetic field.
          </p>
        </section>

        {/* Main Cards */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Solar Flares */}
          <div className="rounded-2xl border border-yellow-400/40 bg-slate-900/80 p-5 shadow-md shadow-yellow-500/30 backdrop-blur">
            <h2 className="text-lg font-semibold mb-2">🌋 Solar Flares</h2>
            {loading ? (
              <p className="text-sm text-slate-300">Loading…</p>
            ) : (
              <p className="text-sm">
                Latest Flare:{" "}
                <span className="font-semibold text-yellow-300">
                  {latestFlare?.classType || "None"}
                </span>
              </p>
            )}
          </div>

          {/* Geomagnetic Storm */}
          <div className="rounded-2xl border border-cyan-400/40 bg-slate-900/80 p-5 shadow-md shadow-cyan-500/30 backdrop-blur">
            <h2 className="text-lg font-semibold mb-2">🧲 Geomagnetic Storm</h2>
            {loading ? (
              <p className="text-sm text-slate-300">Loading…</p>
            ) : (
              <p className="text-sm">
                Kp-Index:{" "}
                <span className="font-semibold text-cyan-300">
                  {kpValue ?? "--"}
                </span>
              </p>
            )}
          </div>

          {/* Aurora Forecast */}
          <div className="rounded-2xl border border-emerald-400/40 bg-slate-900/80 p-5 shadow-md shadow-emerald-500/30 backdrop-blur">
            <h2 className="text-lg font-semibold mb-2">🌈 Aurora Forecast</h2>
            <p className="text-sm text-slate-300">
              {kpValue && kpValue > 4
                ? "Elevated aurora activity possible."
                : "Low aurora activity expected."}
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SpaceWeatherPage;
