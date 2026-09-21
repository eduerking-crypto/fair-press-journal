import Link from "next/link";
import { getJournals } from "@/lib/data";
import c from "../content.module.css";
import v from "../views.module.css";

export const metadata = {
  title: "Journals | Fair Press",
  description: "Explore the Fair Press journal portfolio.",
};

export default async function JournalsPage() {
  const journals = await getJournals();

  return (
    <main>
      <div className="container">
        <div className={c.page}>
          <div className={v.pageHead} style={{ padding: 0 }}>
            <p className={c.kicker}>Our portfolio</p>
            <h1 className={c.title}>Journals</h1>
            <p className={c.lead}>
              Fair Press publishes peer-reviewed journals across medicine and the
              health sciences. Every journal is fully open access under a CC BY
              license and upholds the same editorial standards.
            </p>
          </div>
          <div className={v.journalGrid}>
            {journals.map((j) => (
              <article key={j.id} className={v.journalCard}>
                <div
                  className={v.journalBand}
                  style={{ backgroundColor: j.c }}
                  aria-hidden="true"
                />
                <div className={v.journalBody}>
                  <span
                    className={`${v.statusChip} ${j.active ? v.statusActive : v.statusSoon}`}
                  >
                    {j.active ? "Active" : `Launching ${j.launched}`}
                  </span>
                  <h2 className={v.journalName}>{j.name}</h2>
                  <p className={v.journalSubj}>{j.subj}</p>
                  <p className={v.journalIssn}>
                    ISSN {j.issn} (Print) &middot; {j.eissn ? `ISSN ${j.eissn} (Online)` : null}
                  </p>
                  <p className={v.journalAims}>{j.aims}</p>
                  {j.active ? (
                    <Link href={`/journal/${j.id}`} className={v.journalLink}>
                      View journal &rarr;
                    </Link>
                  ) : (
                    <p className={v.journalLink}>Call for papers open</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
