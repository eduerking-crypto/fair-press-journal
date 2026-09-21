import Link from "next/link";
import { MISSION } from "@/data/editorial";
import { getJournal } from "@/lib/data";
import styles from "../content.module.css";

export const metadata = {
  title: "About | Fair Press",
  description:
    "Fair Press is an independent open access publisher of peer-reviewed science in medicine and the health sciences.",
};

const FACTS = [
  { label: "Founded", value: "2026" },
  { label: "Headquarters", value: "Wilmington, DE, USA" },
  { label: "Focus", value: "Medicine & Health Sciences" },
  { label: "Model", value: "Open Access, CC BY 4.0" },
  { label: "Review", value: "Double-blind, minimum two reviewers" },
  { label: "Journals", value: "Fair Press Journal of Science" },
];

export default async function AboutPage() {
  const journal = await getJournal("fpjs");

  return (
    <main>
      <div className={`container ${styles.page}`}>
        <div className={styles.wrap}>
          <p className={styles.kicker}>About the publisher</p>
          <h1 className={styles.title}>Fair Press</h1>
          <p className={styles.lead}>
            Fair Press is an independent publisher of peer-reviewed science,
            founded in 2026 with a single commitment: rigorous research deserves
            a permanent, open and citable home under fair and transparent terms.
          </p>

          {MISSION ? (
            <div className={styles.docSection}>
              <h2>{MISSION.heading}</h2>
              {MISSION.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ) : null}

          <div className={styles.docSection}>
            <h2>Publisher facts</h2>
            <dl className={styles.factList}>
              {FACTS.map((f) => (
                <div key={f.label} className={styles.factRow}>
                  <dt>{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className={styles.note}>
            Our flagship journal, the{" "}
            <Link href={`/journal/${journal?.id ?? "fpjs"}`}>
              {journal?.name ?? "Fair Press Journal of Science"}
            </Link>
            , welcomes submissions across medicine and the health sciences. To
            reach the editorial office, see the{" "}
            <Link href="/contact">contact page</Link>.
          </div>
        </div>
      </div>
    </main>
  );
}
