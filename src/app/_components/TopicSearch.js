"use client";

import { useMemo, useState } from "react";

/**
 * @param {{ tags: string[] }} props
 */
export function TopicSearch({ tags }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const raw = query.trim().toLowerCase();
    if (!raw) return tags;
    const needle = raw.startsWith("#") ? raw.slice(1) : raw;
    if (!needle) return tags;
    return tags.filter((tag) => {
      const label = tag.replace(/^#/, "").toLowerCase();
      return label.includes(needle);
    });
  }, [query, tags]);

  return (
    <>
      <div
        id="search"
        className="mt-8 rounded-2xl border border-asas-ink/10 bg-asas-ink/[0.02] p-4 sm:p-5"
      >
        <label htmlFor="site-search" className="sr-only">
          Поиск по платформе
        </label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Введите часть хештега, например: намаз"
          autoComplete="off"
          className="h-11 w-full rounded-xl border border-asas-ink/15 bg-asas-white px-4 text-sm text-asas-ink placeholder:text-asas-ink/45 outline-none ring-asas-green/30 focus:border-asas-green/40 focus:ring-2"
        />
      </div>
      <div className="mt-6 flex flex-wrap gap-3" aria-live="polite">
        {filtered.length > 0 ? (
          filtered.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-asas-wood/50 bg-asas-wood/5 px-4 py-2 text-sm font-medium text-asas-green"
            >
              {tag}
            </span>
          ))
        ) : (
          <p className="text-sm text-asas-ink/65">
            По запросу «{query.trim()}» темы не найдены — попробуйте другое
            слово.
          </p>
        )}
      </div>
    </>
  );
}
