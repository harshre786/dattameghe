"use client";

import Link from 'next/link';
import Search from './Search';

const Navbar = () => {
  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  return (
    <nav className="bg-transparent p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-white">
          AstroVision
        </Link>
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-gray-300">Home</Link>
          <Link href="/launches" className="text-white hover:text-gray-300">Launches</Link>
          <Link href="/space-weather" className="text-white hover:text-gray-300">Space Weather</Link>
          <Link href="/astronomy" className="text-white hover:text-gray-300">Astronomy</Link>
          <Link href="/asteroids" className="text-white hover:text-gray-300">Asteroids</Link>
          <Link href="/news" className="text-white hover:text-gray-300">News</Link>
          <Link href="/bookmarks" className="text-white hover:text-gray-300">Bookmarks</Link>
          <Search onSearch={handleSearch} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
