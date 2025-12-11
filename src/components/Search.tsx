"use client";

import { useState } from "react";

const Search = ({ onSearch }: { onSearch: (query: string) => void }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center bg-slate-800/60 border border-slate-700 rounded-md overflow-hidden shadow-sm"
    >
      {/* Input */}
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="
          bg-transparent
          text-white 
          px-4 py-2 
          outline-none 
          placeholder-slate-400
          text-sm
        "
      />

      {/* Divider */}
      <div className="w-px h-6 bg-slate-600 mx-1" />

      {/* Button */}
      <button
        type="submit"
        className="
          px-4 py-2 
          text-sm 
          bg-sky-600 
          hover:bg-sky-500 
          text-white 
          font-medium
          transition-colors
        "
      >
        Search
      </button>
    </form>
  );
};

export default Search;
