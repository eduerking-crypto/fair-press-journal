import Link from "next/link";
import { AUTHOR_GUIDELINES, PROCESS_STAGES } from "@/data/editorial";
import styles from "../content.module.css";

export const metadata = {
  title: "Editorial Process | Fair Press",
  description:
    "The editorial and peer review process of the Fair Press Journal of Science, from submission to publication.",
};

export default function EditorialProcessPage() {
  return (
    <main>
      <div className={`container ${styles.page}`}>
        <div className={styles.wrap}>
          <p className={styles.kicker}>From submission to publication</p>
          <h1 className={styles.title}>Editorial Process</h1>
          <p className={styles.lead}>
            Every submission to the Fair Press Journal of Science follows the
            same strict, documented process. The journal operates a double-blind
            peer review model with a minimum of two independent reviewers, and
            editorial decisions are always supported by reviewer reports.
          </p>

          <div className={styles.docSection}>
            <h2>The eight stages</h2>
          </div>
          <div className={styles.stages}>
            {PROCESS_STAGES.map((s) => (
              <div key={s.n} className={styles.stage}>
                <div className={styles.stageNum} aria-hidden="true">
                  {s.n}
                </div>
                <div>
                  <h3 className={styles.stageName}>
                    {s.name}
                    <span className={styles.stageDays}>{s.days}</span>
                  </h3>
                  <p className={styles.stageDesc}>{s.description}</p>
                </div>
              </div>
            ))}
          </div>

          {AUTHOR_GUIDELINES.map((g) => (
            <div key={g.heading} className={styles.docSection}>
              <h2>{g.heading}</h2>
              {g.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ))}

          <div className={styles.note}>
            <strong>Ready to submit?</strong> During the launch phase,
            manuscripts are received at{" "}
            <a href="mailto:submissions@fairpressjournal.org">
              submissions@fairpressjournal.org
            </a>{" "}
            with a confirmation and manuscript number within 24 hours. The
            online submission system opens with the first issue. Our{" "}
            <Link href="/ethics">publication ethics</Link> policy applies to all
            submissions.
          </div>
        </div>
      </div>
    </main>
  );
}
