import React from "react";

const Footer = () => {
  return (
    <footer className="relative mt-16 py-10 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-800/40 to-transparent pointer-events-none"></div>
      <div className="absolute inset-0 opacity-30 starry-bg pointer-events-none"></div>

      <div className="relative container mx-auto text-center px-4">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-500/40 to-transparent mb-6" />
        <h3 className="text-xl font-semibold tracking-wide text-sky-300 drop-shadow-md">
          ✦ AstroVision
        </h3>
        <p className="text-sm text-slate-300 mt-1">
          Exploring the universe through data &amp; technology
        </p>
        <p className="mt-4 text-sm text-slate-400">
          © {new Date().getFullYear()} AstroVision — All rights reserved.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          Data sourced from NASA, ESA, SpaceX, NOAA, and publicly available
          APIs.
        </p>
        <p className="text-xs text-slate-500 mt-1">
          This project is for educational and research purposes only.
        </p>

        <div className="flex justify-center gap-6 mt-5 text-slate-300">
          {/* social icons as before */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
