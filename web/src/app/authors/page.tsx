import Link from "next/link";
import { BOARD } from "@/data/board";
import c from "../content.module.css";
import v from "../views.module.css";

export const metadata = {
  title: "Editorial Board | Fair Press",
  description:
    "The editorial board of the Fair Press Journal of Science: editors, associate editors and editorial board members.",
};

const GROUPS = [
  { role: "Editor-in-Chief", heading: "Editor-in-Chief" },
  { role: "Associate Editor", heading: "Associate Editors" },
  { role: "Editorial Board Member", heading: "Editorial Board Members" },
];

export default function AuthorsPage() {
  return (
    <main>
      <div className={`container ${c.page}`}>
        <div className={v.pageHead} style={{ padding: 0 }}>
          <p className={c.kicker}>People</p>
          <h1 className={c.title}>Editorial Board</h1>
          <p className={c.lead}>
            The Fair Press Journal of Science is led by practicing researchers
            across epidemiology, clinical medicine, biostatistics and health
            policy. Editors declare all conflicts of interest and recuse
            themselves from decisions where one exists.
          </p>
        </div>

        {GROUPS.map((g) => {
          const members = BOARD.filter((m) => m.role === g.role);
          if (!members.length) return null;
          return (
            <section key={g.role} className={c.boardGroup}>
              <h2>{g.heading}</h2>
              <div className={c.boardGrid}>
                {members.map((m) => (
                  <article key={m.name} className={c.boardCard}>
                    <h3 className={c.boardName}>{m.name}</h3>
                    <span className={c.boardRole}>{m.role}</span>
                    <p className={c.boardAffil}>{m.affiliation}</p>
                    <p className={c.boardExpertise}>Expertise: {m.expertise}</p>
                    {m.orcid ? (
                      <p className={c.boardExpertise}>ORCID: {m.orcid}</p>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        <div className={c.note}>
          Interested in joining the board or reviewing for the journal? Write to{" "}
          <a href="mailto:editorial@fairpressjournal.org">
            editorial@fairpressjournal.org
          </a>{" "}
          or see the <Link href="/editorial-process">editorial process</Link>.
        </div>
      </div>
    </main>
  );
}
