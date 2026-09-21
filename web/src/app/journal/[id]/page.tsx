import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticles, getJournal } from "@/lib/data";
import { formatDate } from "@/lib/format";
import views from "../../views.module.css";

export function generateStaticParams() {
  return [{ id: "fpjs" }, { id: "fpgph" }, { id: "fpmh" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const journal = await getJournal(id);
  return {
    title: journal ? `${journal.name} | Fair Press` : "Journal | Fair Press",
    description: journal?.aims,
  };
}

export default async function JournalPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const journal = await getJournal(id);
  if (!journal) notFound();

  const articles = (await getArticles()).filter((a) => a.journalId === id);

  return (
    <main>
      <div className={views.journalHero}>
        <div className="container">
          <p className={views.journalHeroKicker}>{journal.publisher}</p>
          <h1 className={views.journalHeroName}>{journal.name}</h1>
          <p className={views.journalHeroIssn}>
            ISSN {journal.issn} (Print) &middot; ISSN {journal.eissn} (Online) &middot;{" "}
            {journal.active ? "Active journal" : `Launching ${journal.launched}`}
          </p>
        </div>
      </div>

      <div className="container">
        <div className={views.journalInfo}>
          <div className={views.journalInfoCard}>
            <h2>Aims & Scope</h2>
            <p>{journal.aims}</p>
          </div>
          <div className={views.journalInfoCard}>
            <h2>Journal information</h2>
            <dl className={views.factList}>
              <div className={views.factRow}>
                <dt>Publisher</dt>
                <dd>{journal.publisher}</dd>
              </div>
              <div className={views.factRow}>
                <dt>Launched</dt>
                <dd>{journal.launched}</dd>
              </div>
              <div className={views.factRow}>
                <dt>Frequency</dt>
                <dd>{journal.frequency}</dd>
              </div>
              <div className={views.factRow}>
                <dt>APC</dt>
                <dd>{journal.apc}</dd>
              </div>
              <div className={views.factRow}>
                <dt>DOI prefix</dt>
                <dd>{journal.doiPrefix}</dd>
              </div>
              <div className={views.factRow}>
                <dt>License</dt>
                <dd>CC BY 4.0</dd>
              </div>
            </dl>
          </div>
        </div>

        {journal.active ? (
          <>
            <div className={views.pageHead} style={{ paddingTop: 0 }}>
              <h2>Latest articles</h2>
            </div>
            <div className={views.articleList}>
              {articles.map((a) => (
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
                    {a.section ? `${a.section} · ` : ""}Vol. {a.volume}, Issue{" "}
                    {a.issue} &middot; Article {a.articleNo} &middot;{" "}
                    {formatDate(a.published)} &middot; DOI {a.doi}
                  </p>
                  <p className={views.articleExcerpt}>{a.abstract.background}</p>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className={views.pendingNote} style={{ marginBlock: "2.5rem 3.5rem" }}>
            This journal is in preparation. The call for papers opens alongside
            the launch in {journal.launched}.
          </div>
        )}
      </div>
    </main>
  );
}
