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
        <div className="container">
          <p className={styles.heroKicker}>Fair Press &middot; Open Access Publishing</p>
          <h1 className={styles.heroTitle}>
            Rigorous science, published{" "}
            <span className="journal-name">fair</span>
          </h1>
          <p className={styles.heroLead}>
            The Fair Press Journal of Science publishes peer-reviewed research
            across medicine and the health sciences under a transparent,
            double-blind editorial process. Open access for readers, permanent
            and citable for authors.
          </p>
          <form className={styles.searchForm} action="/search">
            <input
              type="search"
              name="q"
              className={styles.searchInput}
              placeholder="Search articles by title, author or keyword"
              aria-label="Search articles"
            />
            <button type="submit" className="btn">
              Search
            </button>
          </form>
          <div className={styles.heroActions}>
            <Link href="/editorial-process" className="btn">
              Submit a manuscript
            </Link>
            <Link href="/journals" className="btn btn-ghost">
              Browse journals
            </Link>
          </div>
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
          </div>
        </div>
      </section>
    </main>
  );
}
