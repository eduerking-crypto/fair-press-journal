import { ETHICS_SECTIONS } from "@/data/editorial";
import styles from "../content.module.css";

export const metadata = {
  title: "Publication Ethics | Fair Press",
  description:
    "Publication ethics of the Fair Press Journal of Science, aligned with the Committee on Publication Ethics (COPE).",
};

export default function EthicsPage() {
  return (
    <main>
      <div className={`container ${styles.page}`}>
        <div className={styles.wrap}>
          <p className={styles.kicker}>Research and publication ethics</p>
          <h1 className={styles.title}>Publication Ethics</h1>
          <p className={styles.lead}>
            The Fair Press Journal of Science follows the guidance of the
            Committee on Publication Ethics (COPE) in every aspect of its
            editorial work. The statements below apply to authors, reviewers
            and editors alike.
          </p>

          {ETHICS_SECTIONS.map((s) => (
            <div key={s.heading} className={styles.docSection}>
              <h2>{s.heading}</h2>
              {s.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ))}

          <div className={styles.note}>
            Suspected misconduct can be reported confidentially to the
            Editor-in-Chief at{" "}
            <a href="mailto:editorial@fairpressjournal.org">
              editorial@fairpressjournal.org
            </a>
            . Every report is acknowledged and handled under the relevant COPE
            flowchart.
          </div>
        </div>
      </div>
    </main>
  );
}
