export interface Author {
  name: string;
  affiliation: string;
  orcid?: string;
  corresponding?: boolean;
  email?: string;
}

export interface StructuredAbstract {
  background?: string;
  methods?: string;
  results?: string;
  conclusions?: string;
}

export interface Journal {
  id: string;
  name: string;
  abbrev: string;
  subj: string;
  c: string;
  issn: string;
  eissn?: string;
  active: boolean;
  launched: string;
  aims: string;
  frequency: string;
  apc: string;
  doiPrefix: string;
  publisher: string;
}

export interface Article {
  id: string;
  journalId: string;
  type: string;
  title: string;
  authors: Author[];
  abstract: StructuredAbstract;
  keywords: string[];
  doi: string;
  received: string;
  accepted: string;
  published: string;
  volume: number;
  issue: number;
  articleNo: string;
  section?: string;
}

export interface BoardMember {
  name: string;
  role: string;
  affiliation: string;
  expertise: string;
  orcid?: string;
}

export interface Topic {
  id: string;
  name: string;
  c: string;
  description: string;
}

export interface SpecialIssue {
  id: string;
  title: string;
  description: string;
  deadline: string;
  status: "open" | "upcoming" | "closed";
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  kind: "news" | "announcement";
}

export interface LegalDoc {
  slug: string;
  title: string;
  updated: string;
  sections: { heading: string; body: string[] }[];
}
