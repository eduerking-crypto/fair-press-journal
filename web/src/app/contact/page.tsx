import styles from "../content.module.css";

export const metadata = {
  title: "Contact | Fair Press",
  description: "Contact the Fair Press editorial office.",
};

const OFFICES = [
  {
    name: "Editorial Office",
    description: "General enquiries, editorial decisions and appeals.",
    email: "editorial@fairpressjournal.org",
  },
  {
    name: "Submissions",
    description: "Manuscript submission queries and submission status.",
    email: "submissions@fairpressjournal.org",
  },
  {
    name: "Production & Proofing",
    description: "Copyediting, typesetting and proof corrections.",
    email: "production@fairpressjournal.org",
  },
  {
    name: "Legal & Permissions",
    description: "Licensing, copyright and reuse permissions.",
    email: "legal@fairpressjournal.org",
  },
];

export default function ContactPage() {
  return (
    <main>
      <div className={`container ${styles.page}`}>
        <div className={styles.wrap}>
          <p className={styles.kicker}>Get in touch</p>
          <h1 className={styles.title}>Contact the editorial office</h1>
          <p className={styles.lead}>
            We aim to answer all enquiries within two business days. For
            manuscript-specific questions, include your manuscript number in the
            subject line.
          </p>
          <div className={styles.contactGrid}>
            {OFFICES.map((o) => (
              <div key={o.name} className={styles.contactCard}>
                <h3>{o.name}</h3>
                <p>{o.description}</p>
                <a className={styles.contactMail} href={`mailto:${o.email}`}>
                  {o.email}
                </a>
              </div>
            ))}
          </div>
          <div className={styles.docSection}>
            <h2>Registered office</h2>
            <p>
              Fair Press Publishing
              <br />
              4288 Kingston Street
              <br />
              Wilmington, DE 19801, USA
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
