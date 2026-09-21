import Link from "next/link";
import { NEWS } from "@/data/news";
import { TOPICS } from "@/data/topics";
import { getArticles, getJournal } from "@/lib/data";
import { formatDate } from "@/lib/format";
import styles from "./page.module.css";
import views from "./views.module.css";

export default async function Home() {
  const articles = await getArticles();
  const journal = await getJournal("fpjs");
  const featured = [...articles]
    .sort((a, b) => b.published.localeCompare(a.published))
    .slice(0, 3);

  return (
    <main>
      <section className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <div className={styles.heroText}>
            <h1 className={styles.heroTitle}>
              Rigorous science, published fair
            </h1>
            <p className={styles.heroLead}>
              An independent open access publisher advancing peer-reviewed
              research in medicine and the health sciences under a transparent,
              double-blind editorial process.
            </p>
          </div>
          <svg
            className={styles.heroRings}
            viewBox="0 0 640 400"
            fill="none"
            aria-hidden="true"
            preserveAspectRatio="xMidYMid slice"
          >
            <circle cx="515" cy="330" r="115" />
            <circle cx="380" cy="300" r="210" />
            <circle cx="180" cy="210" r="320" />
            <circle cx="-30" cy="60" r="420" />
          </svg>
        </div>
      </section>

      <section className={styles.searchPanel} aria-label="Article search">
        <div className="container">
          <form className={styles.searchBar} action="/search" role="search">
            <span className={styles.searchLabel}>Search for Articles:</span>
            <input
              type="search"
              name="q"
              className={styles.searchField}
              placeholder="Title / Keyword"
              aria-label="Title or keyword"
            />
            <input
              type="text"
              name="author"
              className={styles.searchField}
              placeholder="Author / Affiliation / Email"
              aria-label="Author, affiliation or email"
            />
            <select
              name="journal"
              className={styles.searchSelect}
              aria-label="Journal"
            >
              <option value="">All Journals</option>
              <option value="fpjs">Fair Press Journal of Science</option>
            </select>
            <select name="type" className={styles.searchSelect} aria-label="Article type">
              <option value="">All Article Types</option>
              <option value="Research Article">Research Article</option>
              <option value="Review">Review</option>
              <option value="Short Communication">Short Communication</option>
            </select>
            <button type="submit" className="btn">
              Search
            </button>
            <Link href="/search" className={styles.advancedLink}>
              Advanced
            </Link>
          </form>
        </div>
      </section>

      <section className={styles.statsBand}>
        <div className="container">
          <div className={styles.statsRow}>
            <div>
              <div className={styles.statNum}>1</div>
              <div className={styles.statLabel}>Journal</div>
            </div>
            <div>
              <div className={styles.statNum}>{articles.length}</div>
              <div className={styles.statLabel}>Articles</div>
            </div>
            <div>
              <div className={styles.statNum}>{TOPICS.length}</div>
              <div className={styles.statLabel}>Research areas</div>
            </div>
            <div>
              <div className={styles.statNum}>CC BY</div>
              <div className={styles.statLabel}>Open license</div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.homeGrid}>
            <div>
              <div className={styles.sectionHead}>
                <h2>Recent articles</h2>
                <Link href="/journal/fpjs" className={styles.viewAll}>
                  View all
                </Link>
              </div>
              <div className="article-list">
                {featured.map((a) => (
                  <Link
                    key={a.id}
                    href={`/article/${a.id}`}
                    className={views.articleCard}
                  >
                    <span className={views.articleType}>{a.type}</span>
                    <h3 className={views.articleTitle}>{a.title}</h3>
                    <p className={views.articleAuthors}>
                      {a.authors.map((au) => au.name).join(", ")}
                    </p>
                    <p className={views.articleMeta}>
                      <span className="journal-name">{journal?.abbrev ?? "FPJS"}</span>{" "}
                      &middot; Vol. {a.volume}, Issue {a.issue} &middot;{" "}
                      {formatDate(a.published)} &middot; DOI {a.doi}
                    </p>
                    <p className={views.articleExcerpt}>{a.abstract.background}</p>
                  </Link>
                ))}
              </div>
            </div>
            <aside className={styles.newsCol}>
              <div className={styles.sectionHead}>
                <h2>News</h2>
                <span className={styles.viewAll}>&nbsp;</span>
              </div>
              {NEWS.map((n) => (
                <article key={n.id} className={styles.newsCard}>
                  <span className={styles.newsKind}>{n.kind}</span>
                  <h3 className={styles.newsTitle}>{n.title}</h3>
                  <p className={styles.newsDate}>{formatDate(n.date)}</p>
                  <p className={styles.newsExcerpt}>{n.excerpt}</p>
                </article>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2>Research areas</h2>
            <Link href="/topics" className={styles.viewAll}>
              All topics
            </Link>
          </div>
          <div className={styles.topicsStrip}>
            {TOPICS.map((t) => (
              <Link key={t.id} href="/topics" className={styles.topicChip}>
                <span
                  className={styles.topicDot}
                  style={{ backgroundColor: t.c }}
                  aria-hidden="true"
                />
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.journalSpotlight}>
            <div className={styles.journalSpotBand} aria-hidden="true" />
            <div className={styles.journalSpotBody}>
              <p className={styles.journalSpotKicker}>Featured journal</p>
              <h2 className={styles.journalSpotName}>
                {journal?.name ?? "Fair Press Journal of Science"}
              </h2>
              <p className={styles.journalSpotAims}>{journal?.aims}</p>
              <p className={styles.journalSpotIssn}>
                ISSN {journal?.issn} (Print) &middot; ISSN {journal?.eissn} (Online) &middot;{" "}
                {journal?.apc}
              </p>
              <div className={styles.journalSpotActions}>
                <Link href={`/journal/${journal?.id ?? "fpjs"}`} className="btn">
                  View journal
                </Link>
                <Link href="/editorial-process" className="btn btn-ghost">
                  Submit
                </Link>
              </div>
            </div>
            <img
              src={`/covers/${journal?.id ?? "fpjs"}.svg`}
              alt={`Cover of ${journal?.name ?? "Fair Press Journal of Science"}`}
              className={styles.journalSpotCover}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
