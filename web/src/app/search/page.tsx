import type { Metadata } from "next";
import SearchClient from "./search-client";

export const metadata: Metadata = {
  title: "Search | Fair Press",
  description:
    "Search articles of the Fair Press Journal of Science by title, author or keyword.",
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; author?: string; journal?: string; type?: string }>;
}) {
  const { q, author, journal, type } = await searchParams;
  return (
    <SearchClient
      initialQuery={q ?? ""}
      initialAuthor={author ?? ""}
      initialJournal={journal ?? ""}
      initialType={type ?? ""}
    />
  );
}
