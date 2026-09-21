import type { Journal } from "@/lib/types";

export const JOURNALS: Journal[] = [
  {
    id: "fpjs",
    name: "Fair Press Journal of Science",
    abbrev: "FPJS",
    subj: "Medicine & Health Sciences",
    c: "#7A1F2B",
    issn: "2077-0130",
    eissn: "2077-0131",
    active: true,
    launched: "2026",
    aims:
      "The Fair Press Journal of Science publishes rigorously reviewed research, reviews and short communications across medicine and the health sciences, with a focus on methodological rigor, clinical and global health relevance. The journal is fully open access and is committed to transparent, reproducible reporting under international editorial standards. Work of direct value to clinicians, public health practitioners and policy makers is prioritized.",
    frequency: "Continuous",
    apc: "USD 1,200 (waivers available)",
    doiPrefix: "10.55131",
    publisher: "Fair Press",
  },
  {
    id: "fpgph",
    name: "Fair Press Journal of Global Public Health",
    abbrev: "FPGPH",
    subj: "Public Health, Epidemiology & Health Systems",
    c: "#0e7c7b",
    issn: "2077-0148",
    active: false,
    launched: "2027",
    aims:
      "A forthcoming open access journal covering population health, health systems and health policy at global scale, with emphasis on research from low- and middle-income settings.",
    frequency: "Continuous",
    apc: "USD 900 (waivers available)",
    doiPrefix: "10.55131",
    publisher: "Fair Press",
  },
  {
    id: "fpmh",
    name: "Fair Press Journal of Mental Health",
    abbrev: "FPMH",
    subj: "Psychiatry, Psychology & Mental Health Services",
    c: "#5a2d82",
    issn: "2077-0156",
    active: false,
    launched: "2027",
    aims:
      "A forthcoming open access journal on mental health research, from clinical psychiatry and psychology to services and interventions for underserved populations.",
    frequency: "Continuous",
    apc: "USD 900 (waivers available)",
    doiPrefix: "10.55131",
    publisher: "Fair Press",
  },
];

export function getJournal(id: string): Journal | undefined {
  return JOURNALS.find((j) => j.id === id);
}
