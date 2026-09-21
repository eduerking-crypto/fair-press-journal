"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ARTICLES } from "@/data/articles";
import { formatDate } from "@/lib/format";
import c from "../content.module.css";
import v from "../views.module.css";

export default function SearchClient({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState(initialQuery);

  const q = submitted.trim().toLowerCase();
  const results = q
    ? ARTICLES.filter((a) =>
        [
          a.title,
          a.abstract.background,
          a.abstract.methods,
          a.abstract.results,
          a.abstract.conclusions,
          ...a.keywords,
          ...a.authors.map((au) => au.name),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(q),
      )
    : ARTICLES;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next = query.trim();
    setSubmitted(next);
    const url = next ? `/search?q=${encodeURIComponent(next)}` : "/search";
    window.history.replaceState(null, "", url);
  };

  return (
    <main>
      <div className="container">
        <div className={v.pageHead}>
          <p className={c.kicker}>Find research</p>
          <h1 className={c.title}>Search</h1>
          <p className={c.lead}>
            Search the Fair Press Journal of Science by title, author, keyword
            or abstract text.
          </p>
          <form className={v.searchBar} onSubmit={onSubmit} role="search">
            <input
              type="search"
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className={v.searchInput}
              placeholder="e.g. hypertension, telemedicine, maternal health"
              aria-label="Search articles"
            />
            <button type="submit" className="btn">
              Search
            </button>
          </form>
          <p className={v.countLine}>
            {q
              ? `${results.length} result${results.length === 1 ? "" : "s"} for "${submitted.trim()}"`
              : `Showing all ${ARTICLES.length} articles`}
          </p>
        </div>

        {q && results.length === 0 ? (
          <div className={v.pendingNote} style={{ margin: "0 0 3.5rem" }}>
            No articles match your search. Try a broader term such as
            &ldquo;hypertension&rdquo; or &ldquo;health policy&rdquo;.
          </div>
        ) : (
          <div className={v.articleList}>
            {results.map((a) => (
              <Link key={a.id} href={`/article/${a.id}`} className={v.articleCard}>
                <span className={v.articleType}>{a.type}</span>
                <h3 className={v.articleTitle}>{a.title}</h3>
                <p className={v.articleAuthors}>
                  {a.authors.map((au) => au.name).join(", ")}
                </p>
                <p className={v.articleMeta}>
                  {a.section ? `${a.section} · ` : ""}Vol. {a.volume}, Issue{" "}
                  {a.issue} &middot; {formatDate(a.published)} &middot; DOI {a.doi}
                </p>
                <p className={v.articleExcerpt}>{a.abstract.background}</p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
