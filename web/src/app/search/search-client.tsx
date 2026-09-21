"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ARTICLES } from "@/data/articles";
import { formatDate } from "@/lib/format";
import c from "../content.module.css";
import v from "../views.module.css";

type Filters = {
  query: string;
  author: string;
  journal: string;
  type: string;
};

function matches(a: (typeof ARTICLES)[number], f: Filters): boolean {
  if (f.journal && a.journalId && a.journalId !== f.journal) return false;
  if (f.type && a.type !== f.type) return false;

  const author = f.author.trim().toLowerCase();
  if (
    author &&
    !a.authors.some(
      (au) =>
        au.name.toLowerCase().includes(author) ||
        (au.affiliation ?? "").toLowerCase().includes(author) ||
        (au.email ?? "").toLowerCase().includes(author),
    )
  )
    return false;

  const q = f.query.trim().toLowerCase();
  if (
    q &&
    ![
      a.title,
      a.abstract.background,
      a.abstract.methods,
      a.abstract.results,
      a.abstract.conclusions,
      ...a.keywords,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(q)
  )
    return false;

  return true;
}

export default function SearchClient({
  initialQuery,
  initialAuthor = "",
  initialJournal = "",
  initialType = "",
}: {
  initialQuery: string;
  initialAuthor?: string;
  initialJournal?: string;
  initialType?: string;
}) {
  const initial: Filters = {
    query: initialQuery,
    author: initialAuthor,
    journal: initialJournal,
    type: initialType,
  };
  const [query, setQuery] = useState(initialQuery);
  const [submitted, setSubmitted] = useState<Filters>(initial);

  const active = Object.values(submitted).some((s) => s.trim() !== "");
  const results = ARTICLES.filter((a) => matches(a, submitted));
  const terms = [
    submitted.query && `"${submitted.query.trim()}"`,
    submitted.author && `author "${submitted.author.trim()}"`,
    submitted.journal && "Fair Press Journal of Science",
    submitted.type && `type "${submitted.type}"`,
  ].filter(Boolean);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: Filters = { query: query.trim(), author: "", journal: "", type: "" };
    setSubmitted(next);
    const url = next.query
      ? `/search?q=${encodeURIComponent(next.query)}`
      : "/search";
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
            {active
              ? `${results.length} result${results.length === 1 ? "" : "s"} for ${terms.join(" · ")}`
              : `Showing all ${ARTICLES.length} articles`}
          </p>
        </div>

        {active && results.length === 0 ? (
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
