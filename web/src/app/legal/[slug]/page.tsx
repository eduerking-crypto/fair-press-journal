import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEGAL_DOCS } from "../../../data/legal";
import styles from "../legal.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return LEGAL_DOCS.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const doc = LEGAL_DOCS.find((d) => d.slug === slug);
  if (!doc) {
    return { title: "Not Found | Fair Press" };
  }
  return {
    title: `${doc.title} | Fair Press`,
    description: doc.sections[0]?.body[0],
  };
}

export default async function LegalDocPage({ params }: PageProps) {
  const { slug } = await params;
  const doc = LEGAL_DOCS.find((d) => d.slug === slug);
  if (!doc) {
    notFound();
  }
  return (
    <main className={styles.container}>
      <article className={styles.doc}>
        <h1 className={styles.title}>{doc.title}</h1>
        <p className={styles.updated}>Last updated: {doc.updated}</p>
        {doc.sections.map((section) => (
          <section key={section.heading} className={styles.section}>
            <h2 className={styles.heading}>{section.heading}</h2>
            {section.body.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </article>
    </main>
  );
}
