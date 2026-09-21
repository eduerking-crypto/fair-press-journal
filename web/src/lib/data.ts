import { ARTICLES } from "@/data/articles";
import { JOURNALS } from "@/data/journals";
import type { Article, Journal } from "@/lib/types";

async function fetchRemote(): Promise<{ journals: Journal[]; articles: Article[] } | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) return null;
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const db = createClient(url, anon);
    const [j, a] = await Promise.all([
      db.from("journals").select("*"),
      db.from("articles").select("*"),
    ]);
    if (j.error || a.error) return null;
    const journals = (j.data ?? []) as Partial<Journal>[];
    if (!journals.length) return null;
    const articles = (a.data ?? []) as Partial<Article>[];
    return {
      journals: journals.filter((r): r is Journal => Boolean(r.id && r.name)),
      articles: articles.filter((r): r is Article => Boolean(r.id && r.title)) as Article[],
    };
  } catch {
    return null;
  }
}

export async function getJournals(): Promise<Journal[]> {
  const remote = await fetchRemote();
  return remote?.journals ?? JOURNALS;
}

export async function getJournal(id: string): Promise<Journal | undefined> {
  return (await getJournals()).find((j) => j.id === id);
}

export async function getArticles(): Promise<Article[]> {
  const remote = await fetchRemote();
  return remote?.articles ?? ARTICLES;
}

export async function getArticle(id: string): Promise<Article | undefined> {
  return (await getArticles()).find((a) => a.id === id);
}
