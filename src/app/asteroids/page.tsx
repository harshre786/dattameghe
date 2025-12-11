"use client";

import { useEffect, useMemo, useState } from "react";
import { getAsteroidsForRange, Asteroid } from "@/lib/api/asteroids";

/** generate a pleasant random HSL color string */
function randomColor() {
  const h = Math.floor(Math.random() * 360);
  const s = 75 + Math.floor(Math.random() * 10); // 75-85% sat
  const l = 55 + Math.floor(Math.random() * 8); // 55-63% light
  return `hsl(${h} ${s}% ${l}%)`;
}

const AsteroidsPage = () => {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAsteroids = async () => {
      try {
        const asteroidData = await getAsteroidsForRange(
          "2025-02-01",
          "2025-02-07"
        );
        setAsteroids(asteroidData);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchAsteroids();
  }, []);

  // stable star specs for this page render
  const fallingStars = useMemo(() => {
    const count = 2; // REDUCED NUMBER OF STARS
    return Array.from({ length: count }).map(() => {
      const startLeft = 65 + Math.random() * 30; // 65%–95% right side
      const startTop = -10 + Math.random() * 20; // above viewport
      const length = 60 + Math.random() * 120; // streak size
      const thickness = 1 + Math.random() * 2; // thin streaks
      const duration = 2.5 + Math.random() * 3; // SHORTER = continuous effect
      const delay = Math.random() * 3; // QUICK LOOP — NO LONG PAUSES
      const color = randomColor();
      return { startLeft, startTop, length, thickness, duration, delay, color };
    });
  }, []);


  const hazardousCount = asteroids.filter(
    (a) => a.is_potentially_hazardous_asteroid
  ).length;
  const totalCount = asteroids.length;

  const downloadCSV = () => {
    if (!asteroids || asteroids.length === 0) return;
    const headers = [
      "id",
      "name",
      "approach_date",
      "miss_distance_km",
      "relative_velocity_km_s",
      "hazard",
    ];
    const rows = asteroids.map((a) => {
      const cad = a.close_approach_data?.[0];
      return [
        a.id,
        `"${a.name.replace(/"/g, '""')}"`,
        cad?.close_approach_date ?? "",
        cad?.miss_distance?.kilometers
          ? Number(cad.miss_distance.kilometers).toFixed(0)
          : "",
        cad?.relative_velocity?.kilometers_per_second ?? "",
        a.is_potentially_hazardous_asteroid ? "High" : "Low",
      ].join(",");
    });
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `asteroids_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* existing cosmic background layers */}
      <div className="space-bg space-gradient" />
      <div className="space-bg star-field" />

      {/* --- FALLING STARS IN BACKGROUND (zIndex 10) --- */}
      <div
        className="falling-stars-bg"
        aria-hidden="true"
        style={{ zIndex: 10 }}
      >
        {fallingStars.map((s, i) => (
          <div
            key={i}
            className="fall-star"
            style={{
              left: `${s.startLeft}%`,
              top: `${s.startTop}vh`,
              width: `${s.length}px`,
              height: `${s.thickness}px`,
              backgroundColor: s.color, // single color
              boxShadow: `0 0 10px ${s.color}`,
              color: s.color, // used by filter:drop-shadow(currentColor)
              animationName: "fall-diagonal", // ensure animation name set inline (important)
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
              animationIterationCount: "infinite",
              animationTimingFunction: "cubic-bezier(0.22,0.9,0.15,1)",
            }}
          />
        ))}
      </div>

      {/* MAIN CONTENT */}
      <main className="relative z-20 mx-auto max-w-6xl px-4 py-10">
        {/* header + stats */}
        <header className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-bold">Asteroids &amp; NEO Tracking</h1>
            <p className="mt-1 text-sm text-slate-300 max-w-xl">
              Near-Earth objects (NEOs) observed in the selected date range.
            </p>
          </div>

          <div className="flex gap-3 items-center">
            <div className="rounded-xl bg-slate-900/60 px-4 py-3 backdrop-blur border border-slate-800/60 text-center">
              <div className="text-sm text-slate-400">Total Objects</div>
              <div className="text-2xl font-semibold">
                {loading ? "—" : totalCount}
              </div>
            </div>

            <div className="rounded-xl bg-slate-900/60 px-4 py-3 backdrop-blur border border-slate-800/60 text-center">
              <div className="text-sm text-slate-400">Hazardous</div>
              <div className="text-2xl font-semibold text-amber-300">
                {loading ? "—" : hazardousCount}
              </div>
            </div>

            <button
              onClick={downloadCSV}
              disabled={loading || asteroids.length === 0}
              className="ml-2 rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Download CSV
            </button>
          </div>
        </header>

        {/* table */}
        <section className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 shadow-lg backdrop-blur">
          <div className="overflow-x-auto">
            <table className="min-w-full table-fixed">
              <thead className="sticky top-0 bg-slate-900/70 backdrop-blur z-10">
                <tr className="text-left text-sm text-slate-300">
                  <th className="p-3 w-2/5">Object Name</th>
                  <th className="p-3 w-1/5">Approach Date</th>
                  <th className="p-3 w-1/5">Miss Distance (km)</th>
                  <th className="p-3 w-1/5">Hazard Rating</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-slate-300">
                      Loading...
                    </td>
                  </tr>
                ) : asteroids.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-slate-400">
                      No asteroids found.
                    </td>
                  </tr>
                ) : (
                  asteroids.map((asteroid) => {
                    const cad = asteroid.close_approach_data?.[0];
                    const missKm = cad?.miss_distance?.kilometers
                      ? Number(cad.miss_distance.kilometers)
                      : NaN;
                    const hazard = asteroid.is_potentially_hazardous_asteroid;

                    return (
                      <tr
                        key={asteroid.id}
                        className="border-b border-slate-800/60 hover:bg-slate-800/40 transition"
                      >
                        <td className="p-3 align-top">
                          <div className="font-medium">{asteroid.name}</div>
                          <div className="mt-1 text-xs text-slate-400">
                            ID: {asteroid.id}
                          </div>
                        </td>

                        <td className="p-3 align-top">
                          <div className="text-sm text-slate-200">
                            {cad?.close_approach_date ?? "—"}
                          </div>
                        </td>

                        <td className="p-3 align-top">
                          <div className="text-sm text-slate-200">
                            {!Number.isNaN(missKm)
                              ? missKm.toLocaleString()
                              : "—"}
                          </div>
                          {cad?.relative_velocity?.kilometers_per_second && (
                            <div className="mt-1 text-xs text-slate-400">
                              {Number(
                                cad.relative_velocity.kilometers_per_second
                              ).toFixed(2)}{" "}
                              km/s
                            </div>
                          )}
                        </td>

                        <td className="p-3 align-top">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              hazard
                                ? "bg-amber-300 text-slate-900"
                                : "bg-slate-700 text-slate-200"
                            }`}
                          >
                            {hazard ? "High" : "Low"}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-xs text-slate-400">
            Data fetched from NASA APIs (date range hard-coded for demo).
          </div>
        </section>
      </main>
    </div>
  );
};

export default AsteroidsPage;
