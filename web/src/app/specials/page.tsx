import Link from "next/link";
import { SPECIAL_ISSUES } from "@/data/specials";
import c from "../content.module.css";
import v from "../views.module.css";

export const metadata = {
  title: "Special Issues | Fair Press",
  description: "Open and upcoming special issues of the Fair Press Journal of Science.",
};

export default function SpecialsPage() {
  return (
    <main>
      <div className="container">
        <div className={v.pageHead}>
          <p className={c.kicker}>Themed collections</p>
          <h1 className={c.title}>Special Issues</h1>
          <p className={c.lead}>
            Special issues bring together commissioned and submitted work on
            focused themes. Submissions to open issues follow the same
            double-blind peer review process as regular submissions.
          </p>
        </div>
        <div className={v.specialList}>
          {SPECIAL_ISSUES.map((s) => (
            <article key={s.id} className={v.specialCard}>
              <span
                className={`${v.statusChip} ${s.status === "open" ? v.statusActive : v.statusSoon}`}
              >
                {s.status === "open" ? "Open for submissions" : "Upcoming"}
              </span>
              <h2 className={v.specialTitle}>{s.title}</h2>
              <p className={v.specialDesc}>{s.description}</p>
              <p className={v.specialMeta}>
                {s.status === "open"
                  ? `Submission deadline: ${s.deadline}`
                  : `Expected launch: ${s.deadline}`}
              </p>
            </article>
          ))}
        </div>
        <div className={v.pendingNote} style={{ margin: "0 0 3.5rem" }}>
          Proposing a new special issue? Write to{" "}
          <a href="mailto:editorial@fairpressjournal.org">editorial@fairpressjournal.org</a>{" "}
          with a one-page outline and a list of proposed guest editors, or read
          the <Link href="/editorial-process">editorial process</Link> first.
        </div>
      </div>
    </main>
  );
}
