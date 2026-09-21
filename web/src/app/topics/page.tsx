import { TOPICS } from "@/data/topics";
import c from "../content.module.css";
import v from "../views.module.css";

export const metadata = {
  title: "Topics | Fair Press",
  description: "Research areas covered by the Fair Press Journal of Science.",
};

export default function TopicsPage() {
  return (
    <main>
      <div className="container">
        <div className={v.pageHead}>
          <p className={c.kicker}>Browse by area</p>
          <h1 className={c.title}>Topics</h1>
          <p className={c.lead}>
            The Fair Press Journal of Science welcomes submissions across the
            following research areas within medicine and the health sciences.
          </p>
        </div>
        <div className={v.topicGrid}>
          {TOPICS.map((t) => (
            <article key={t.id} className={v.topicCard}>
              <div
                className={v.journalBand}
                style={{ backgroundColor: t.c, height: 4, margin: "-1.5rem -1.5rem 1.25rem" }}
                aria-hidden="true"
              />
              <h2 className={v.topicName}>{t.name}</h2>
              <p className={v.topicDesc}>{t.description}</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
