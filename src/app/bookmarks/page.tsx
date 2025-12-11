"use client";

const BookmarksPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* Shared animated background */}
      <div className="space-bg space-gradient" />
      <div className="space-bg star-field" />

      {/* Cute floating bookmark icons */}
      <div className="absolute inset-0 pointer-events-none floating-icons z-0">
        <div className="bookmark-float b1">🔖</div>
        <div className="bookmark-float b2">⭐</div>
        <div className="bookmark-float b3">📌</div>
      </div>

      <main className="relative z-20 mx-auto max-w-4xl px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">My Bookmarks</h1>

        {/* Empty State Card */}
        <div className="bg-slate-900/60 border border-slate-800/70 rounded-2xl p-10 shadow-lg backdrop-blur text-center relative">
          {/* Glowing animated effect */}
          <div className="absolute -inset-1 bg-gradient-to-br from-sky-600/20 to-indigo-600/20 rounded-2xl blur-xl opacity-40 animate-pulse" />

          <h2 className="relative text-2xl font-semibold mb-4">
            No Bookmarks Yet
          </h2>
          <p className="relative text-slate-300 max-w-md mx-auto mb-6">
            Save interesting launches, astronomy events, news articles, or
            asteroid details. They will appear here for quick access.
          </p>

          <a
            href="/"
            className="relative inline-flex items-center gap-2 rounded-lg bg-sky-500 px-5 py-3 text-slate-900 font-medium text-sm hover:bg-sky-400 transition"
          >
            Explore SpaceScope
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </main>
    </div>
  );
};

export default BookmarksPage;
