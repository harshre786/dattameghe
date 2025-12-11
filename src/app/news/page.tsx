"use client";

import { useEffect, useMemo, useState } from "react";
import { getArticles, Article } from "@/lib/api/news";

/**
 * Local helper type: extend the Article definition to allow
 * any of the common timestamp/image property names we might receive.
 * This avoids editing the global API type immediately and keeps this page tolerant.
 */
type AnyArticle = Article & {
  // common server variants
  published_at?: string;
  publishedAt?: string;
  publishedDate?: string;
  image_url?: string;
  imageUrl?: string;
  [k: string]: any;
};

const timeAgo = (iso?: string) => {
  if (!iso) return "";
  const now = Date.now();
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const diff = Math.max(0, Math.floor((now - then) / 1000)); // seconds

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

/** Helper to safely resolve a published timestamp from multiple possible keys */
function resolvePublished(article: AnyArticle): string | undefined {
  return (
    article.published_at ??
    article.publishedAt ??
    article.publishedDate ??
    article.published ?? // sometimes API uses `published`
    undefined
  );
}

/** Helper to safely resolve image URL from multiple possible keys */
function resolveImage(article: AnyArticle): string | undefined {
  return (
    article.image_url ??
    article.imageUrl ??
    article.thumbnail ??
    article.image ??
    undefined
  );
}

const NewsPage = () => {
  // original data logic preserved
  const [articles, setArticles] = useState<AnyArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // we keep using the original API call
        const articleData = await getArticles();
        // cast to AnyArticle so our page can safely probe multiple keys
        setArticles(articleData as AnyArticle[]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  // UI-only state
  const [query, setQuery] = useState("");
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [showOnlyLongReads, setShowOnlyLongReads] = useState(false);

  const sources = useMemo(() => {
    const s = new Set<string>();
    articles.forEach((a) => {
      if (a.news_site) s.add(String(a.news_site));
    });
    return Array.from(s).slice(0, 12);
  }, [articles]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return articles
      .filter((a) => {
        if (selectedSource && a.news_site !== selectedSource) return false;
        if (showOnlyLongReads && (a.summary?.length ?? 0) < 250) return false;
        if (!q) return true;
        return (
          String(a.title ?? "")
            .toLowerCase()
            .includes(q) ||
          String(a.summary ?? "")
            .toLowerCase()
            .includes(q) ||
          String(a.news_site ?? "")
            .toLowerCase()
            .includes(q)
        );
      })
      .sort((a, b) => {
        const da = new Date(resolvePublished(a) ?? 0).getTime();
        const db = new Date(resolvePublished(b) ?? 0).getTime();
        return db - da;
      });
  }, [articles, query, selectedSource, showOnlyLongReads]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      {/* subtle shared animated background layers (reuse your globals.css classes) */}
      <div className="space-bg space-gradient" />
      <div className="space-bg star-field" />

      <main className="relative z-20 mx-auto max-w-7xl px-4 py-10">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center">
            News &amp; Articles
          </h1>
          <p className="text-center mt-2 text-sm text-slate-300 max-w-2xl mx-auto">
            Curated space &amp; science news feeds. Search, filter by source,
            and browse the latest mission updates.
          </p>
        </header>

        {/* Controls */}
        <section className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex-1 flex gap-3">
            <label className="relative flex w-full" aria-hidden>
              <input
                aria-label="Search articles"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, summary, or source..."
                className="w-full rounded-lg border border-slate-800/60 bg-slate-900/50 px-4 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </label>

            <button
              onClick={() => {
                setQuery("");
                setSelectedSource(null);
                setShowOnlyLongReads(false);
              }}
              className="rounded-lg bg-slate-800/60 px-4 py-2 text-sm text-slate-200 hover:bg-slate-800/70"
              aria-label="Reset filters"
            >
              Reset
            </button>
          </div>

          <div className="mt-2 md:mt-0 flex items-center gap-3">
            <div className="text-sm text-slate-300 hidden sm:block">
              Filters:
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedSource(null)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  selectedSource === null
                    ? "bg-sky-500 text-slate-900"
                    : "bg-slate-800/50 text-slate-300"
                }`}
              >
                All
              </button>
              {sources.map((s) => (
                <button
                  key={s}
                  onClick={() =>
                    setSelectedSource((prev) => (prev === s ? null : s))
                  }
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    selectedSource === s
                      ? "bg-sky-500 text-slate-900"
                      : "bg-slate-800/50 text-slate-300"
                  }`}
                >
                  {s.length > 20 ? s.slice(0, 18) + "…" : s}
                </button>
              ))}
              <button
                onClick={() => setShowOnlyLongReads((v) => !v)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  showOnlyLongReads
                    ? "bg-amber-400 text-slate-900"
                    : "bg-slate-800/50 text-slate-300"
                }`}
                title="Toggle long-read filter"
              >
                Long reads
              </button>
            </div>
          </div>
        </section>

        {/* Content grid */}
        <section>
          {loading ? (
            <div className="py-20 text-center text-slate-300">
              Loading articles…
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              No articles match your filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((article) => {
                const published = resolvePublished(article);
                const image = resolveImage(article);
                return (
                  <article
                    key={article.id}
                    className="relative rounded-2xl border border-slate-800/70 bg-slate-900/50 p-4 shadow-lg hover:translate-y-[-4px] transition-transform"
                    aria-labelledby={`title-${article.id}`}
                    role="article"
                  >
                    {/* thumbnail */}
                    <div className="mb-3 rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
                      {image ? (
                        <img
                          src={image}
                          alt={article.title ?? "Article image"}
                          className="w-full h-40 object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-40 flex items-center justify-center bg-gradient-to-tr from-indigo-900 via-sky-900 to-emerald-900 text-slate-200">
                          <span className="text-sm opacity-80">No image</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <h2
                          id={`title-${article.id}`}
                          className="text-lg font-semibold"
                        >
                          {article.title}
                        </h2>
                        <div className="mt-2 text-sm text-slate-300 line-clamp-3">
                          {article.summary}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="text-xs text-slate-400">
                          {article.news_site ?? "Unknown"}
                        </div>
                        <div className="text-xs text-slate-400">
                          {published
                            ? `${new Date(
                                published
                              ).toLocaleDateString()} • ${timeAgo(published)}`
                            : ""}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-md bg-sky-500 px-3 py-2 text-sm font-medium text-slate-900 hover:bg-sky-400"
                        aria-label={`Read more: ${article.title}`}
                      >
                        Read more
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
                            d="M14 3l7 7m0 0v7a2 2 0 0 1-2 2h-7m9-9L10 21"
                          />
                        </svg>
                      </a>

                      <div className="text-xs text-slate-400">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-semibold ${
                            article.news_site
                              ? "bg-slate-800/50 text-slate-200"
                              : "bg-slate-700 text-slate-200"
                          }`}
                        >
                          {article.news_site ?? "Unknown"}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default NewsPage;
