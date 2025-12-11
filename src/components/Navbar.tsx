"use client";

import Link from "next/link";
import Search from "./Search";

const Navbar = () => {
  const handleSearch = (query: string) => {
    console.log("Searching for:", query);
  };

  return (
    <nav className="p-4 bg-[#0B0F19]/70 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* LOGO */}
        <Link
          href="/"
          className="text-2xl font-semibold text-white tracking-tight hover:text-sky-300 transition-colors duration-150"
        >
          AstroVision
        </Link>

        {/* NAV ITEMS */}
        <div className="hidden md:flex items-center space-x-8">
          {/* CLEAN + MODERN LINKS */}
          {[
            ["Home", "/"],
            ["Launches", "/launches"],
            ["Space Weather", "/space-weather"],
            ["Astronomy", "/astronomy"],
            ["Asteroids", "/asteroids"],
            ["News", "/news"],
            ["Bookmarks", "/bookmarks"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="
                text-sm text-slate-200 font-medium
                hover:text-white transition-colors duration-150
                px-2 py-1 rounded-md
                hover:bg-white/10
              "
            >
              {label}
            </Link>
          ))}

          {/* SEARCH (unchanged logic) */}
          <Search onSearch={handleSearch} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
