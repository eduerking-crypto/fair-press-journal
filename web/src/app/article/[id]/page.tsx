import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ARTICLES } from "@/data/articles";
import { getArticle, getJournal } from "@/lib/data";
import { formatDate } from "@/lib/format";
import views from "../../views.module.css";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ id: a.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticle(id);
  return {
    title: article ? `${article.title} | Fair Press` : "Article | Fair Press",
    description: article?.abstract.background,
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = await getArticle(id);
  if (!article) notFound();

  const journal = await getJournal(article.journalId);
  const year = article.published.slice(0, 4);
  const citation = `${article.authors.map((a) => a.name).join(", ")} "${article.title}" ${
    journal?.abbrev ?? "FPJS"
  } ${article.volume}(${article.issue}) (${year}): ${article.articleNo}. https://doi.org/${article.doi}`;

  const absEntries = [
    { label: "Background", text: article.abstract.background },
    { label: "Methods", text: article.abstract.methods },
    { label: "Results", text: article.abstract.results },
    { label: "Conclusions", text: article.abstract.conclusions },
  ].filter((e): e is { label: string; text: string } => Boolean(e.text));

  return (
    <main>
      <div className="container">
        <p className={views.crumbs}>
          <Link href="/">Home</Link> &rsaquo;{" "}
          <Link href={`/journal/${article.journalId}`}>
            {journal?.name ?? "Journal"}
          </Link>{" "}
          &rsaquo; Article {article.articleNo}
        </p>

        <article className={views.detail}>
          <span className={views.articleType}>{article.type}</span>
          <h1 className={views.detailTitle}>{article.title}</h1>

          <div className={views.detailAuthors}>
            {article.authors.map((a) => (
              <div key={a.name}>
                <span className={views.authorName}>{a.name}</span>
                {a.corresponding ? <span className={views.authorSup}>*</span> : null}
                <br />
                <span className={views.authorAffil}>{a.affiliation}</span>
                {a.orcid ? (
                  <>
                    <br />
                    <span className={views.authorOrcid}>ORCID: {a.orcid}</span>
                  </>
                ) : null}
              </div>
            ))}
            <p className={views.authorAffil}>
              * Corresponding author: {article.authors.find((a) => a.corresponding)?.email}
            </p>
          </div>

          <div className={views.abstractBox}>
            <h2>Abstract</h2>
            {absEntries.map((e) => (
              <p key={e.label} className={views.absPara}>
                <span className={views.absLabel}>{e.label}: </span>
                {e.text}
              </p>
            ))}
          </div>

          <div className={views.keywords}>
            {article.keywords.map((k) => (
              <span key={k} className={views.keyword}>
                {k}
              </span>
            ))}
          </div>

          <table className={views.metaTable}>
            <tbody>
              <tr>
                <th scope="row">Journal</th>
                <td>
                  <Link href={`/journal/${article.journalId}`}>
                    {journal?.name ?? "Fair Press Journal of Science"}
                  </Link>
                </td>
              </tr>
              <tr>
                <th scope="row">Section</th>
                <td>{article.section}</td>
              </tr>
              <tr>
                <th scope="row">Volume / Issue</th>
                <td>
                  Vol. {article.volume}, Issue {article.issue}
                </td>
              </tr>
              <tr>
                <th scope="row">Article number</th>
                <td>{article.articleNo}</td>
              </tr>
              <tr>
                <th scope="row">DOI</th>
                <td>
                  <a href={`https://doi.org/${article.doi}`}>https://doi.org/{article.doi}</a>
                </td>
              </tr>
              <tr>
                <th scope="row">Received</th>
                <td>{formatDate(article.received)}</td>
              </tr>
              <tr>
                <th scope="row">Accepted</th>
                <td>{formatDate(article.accepted)}</td>
              </tr>
              <tr>
                <th scope="row">Published</th>
                <td>{formatDate(article.published)}</td>
              </tr>
              <tr>
                <th scope="row">License</th>
                <td>CC BY 4.0</td>
              </tr>
            </tbody>
          </table>

          <div className={views.citeBox}>
            <h2>How to cite</h2>
            <p>{citation}</p>
          </div>

          <div className={views.pendingNote}>
            The full text, figures and supplementary materials of this article
            will be made available on this page.
          </div>
        </article>
      </div>
    </main>
  );
}
