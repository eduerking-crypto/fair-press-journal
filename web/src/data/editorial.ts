export const PROCESS_STAGES: {
  n: number;
  name: string;
  days: string;
  description: string;
}[] = [
  {
    n: 1,
    name: "Submission",
    days: "Day 0",
    description:
      "The manuscript is submitted through the online system with all author information, declarations and source files. The corresponding author receives a confirmation with a manuscript number within 24 hours.",
  },
  {
    n: 2,
    name: "Administrative & Technical Check",
    days: "1–3 days",
    description:
      "Editorial staff verify scope fit, formatting against the author guidelines and completeness of declarations. All submissions undergo plagiarism screening with similarity-detection software before entering peer review.",
  },
  {
    n: 3,
    name: "Peer Review",
    days: "15–30 days",
    description:
      "The manuscript is evaluated under a double-blind model by a minimum of two independent reviewers with relevant expertise. Reviewers assess originality, methodological rigor, data validity and clarity of reporting.",
  },
  {
    n: 4,
    name: "Editorial Decision",
    days: "3–5 days",
    description:
      "The handling editor weighs the reviewer reports and issues one of four decisions: accept, minor revision, major revision or reject. The decision letter is sent to all authors together with anonymized reviewer comments.",
  },
  {
    n: 5,
    name: "Revision",
    days: "7–30 days",
    description:
      "Authors respond point by point to the reviewer comments and upload a revised manuscript with tracked changes. Minor revisions are expected within 7 days and major revisions within 30 days, with extensions available on request.",
  },
  {
    n: 6,
    name: "Final Decision",
    days: "3–5 days",
    description:
      "The editor confirms that the revision requirements are met and, where necessary, obtains an additional assessment from the original reviewers. Final acceptance is recorded and the manuscript enters production.",
  },
  {
    n: 7,
    name: "Production",
    days: "5–10 days",
    description:
      "The accepted manuscript undergoes professional copyediting, typesetting and author proofing. Authors verify the final proof and approve all corrections before publication.",
  },
  {
    n: 8,
    name: "Online Publication",
    days: "1–2 days",
    description:
      "The article of record is published online with a DOI registered through Crossref and immediate open access under a CC BY 4.0 license. Continuous publication makes the article citable as soon as it appears.",
  },
];

export const ETHICS_SECTIONS: { heading: string; body: string[] }[] = [
  {
    heading: "Authorship",
    body: [
      "Authorship is granted only to those who meet the ICMJE criteria: substantial contribution to the design, data or analysis; drafting or critical revision of the manuscript; final approval of the version to be published; and accountability for all aspects of the work.",
      "All listed authors must approve the final author list before acceptance, and changes after submission require the written agreement of every author. Gift, ghost or honorary authorship is not accepted.",
      "The corresponding author is responsible for communication with the journal and for confirming that all authors have disclosed any competing interests.",
    ],
  },
  {
    heading: "Plagiarism",
    body: [
      "Every submission is screened with similarity-detection software during the administrative check, and manuscripts with unattributed overlap are returned or rejected according to the severity of the case.",
      "Salami slicing, the division of one body of work into multiple minimally different papers, is treated as a form of redundant publication. Duplicate submission of the same manuscript to more than one journal at a time is not permitted.",
      "Proper citation of prior work, including one's own, is mandatory, and text recycling must always be disclosed to the editor.",
    ],
  },
  {
    heading: "Data Integrity",
    body: [
      "Fabrication or falsification of data is a serious breach of research integrity and leads to rejection or retraction of published work, in line with COPE guidance.",
      "Authors must retain the datasets and code underlying their results for a reasonable period after publication and be prepared to make them available on reasonable request.",
      "Data availability statements are required in every manuscript, indicating where the underlying data can be accessed or the conditions under which they can be shared.",
    ],
  },
  {
    heading: "Peer Review Ethics",
    body: [
      "Review operates under a double-blind model, and both reviewers and editors are required to keep manuscripts and reviewer comments strictly confidential until publication.",
      "Reviewers must declare any conflicts of interest and decline invitations where they cannot evaluate the work impartially. Reviewer conduct that is abusive, biased or unprofessional is addressed under COPE guidance.",
      "Editors recuse themselves from decisions involving manuscripts with which they have a personal, financial or institutional conflict, and reviewer identity is never revealed to authors during the process.",
    ],
  },
  {
    heading: "Corrections & Retractions",
    body: [
      "Errors discovered after publication are corrected through formal corrections and retractions following the COPE flowcharts, with the type of notice matched to the severity of the issue.",
      "Corrections are linked bidirectionally to the original article and are citable in their own right, so that readers of the original record are directed to the updated version.",
      "Retractions state the reason for the action and who is issuing it, and retracted articles remain online with clear watermarks to preserve the scholarly record.",
    ],
  },
  {
    heading: "Appeals",
    body: [
      "Authors may appeal an editorial decision by submitting a formal, written appeal to the editorial office within 60 days, stating point by point the grounds on which the decision is contested.",
      "Appeals are assessed by an editor who was not involved in the original decision, and, where warranted, additional independent review is obtained before the case is settled.",
      "The outcome of the appeal is communicated in writing and is final. Appeals are handled under COPE guidance on complaints and appeals.",
    ],
  },
];

export const AUTHOR_GUIDELINES: { heading: string; body: string[] }[] = [
  {
    heading: "Manuscript Structure",
    body: [
      "Manuscripts follow the IMRaD structure: Introduction, Methods, Results and Discussion, with figures and tables numbered in order of citation and uploaded as separate source files where possible.",
      "All research articles include a structured abstract with Background, Methods, Results and Conclusions sections, each concise and self-contained, followed by four to six keywords.",
      "Reports of trials must state the registry number and data availability; observational studies should follow the STROBE checklist and randomized trials the CONSORT statement as appropriate.",
    ],
  },
  {
    heading: "References",
    body: [
      "References are cited in the text with consecutive numbers in square brackets and listed in a numbered reference list in order of first citation.",
      "All references carry DOIs where available, and reference details must be verifiable against the original sources before acceptance.",
      "Excessive self-citation and citation of non-scholarly sources are checked during peer review, and reference lists should reflect the genuine state of the field.",
    ],
  },
  {
    heading: "Author Declarations",
    body: [
      "ORCID iDs are required for the corresponding author at submission and for all authors at acceptance.",
      "Every manuscript includes declarations of competing interests, funding sources and the role of the funder in the study design, analysis and decision to publish.",
      "Statements on ethics approval and informed consent are required for research involving human participants, animals or personal data.",
    ],
  },
  {
    heading: "Submission Checklist",
    body: [
      "Before submitting, confirm that the manuscript follows the IMRaD structure with a structured abstract, that all authors have approved the submission and that the ORCID iD of the corresponding author is linked.",
      "Prepare the declarations of competing interests, funding, ethics approval and data availability, and ensure the manuscript has not been submitted to another journal.",
      "Upload the main document, figures, tables and supplementary files, and confirm that the reference list is complete, numbered and DOI-linked where possible.",
    ],
  },
  {
    heading: "Article Processing Charge",
    body: [
      "Accepted articles are published open access under a CC BY 4.0 license against an article processing charge (APC) of USD 1,200, payable on acceptance.",
      "APC waivers and discounts are available for authors from low- and middle-income countries and for authors without institutional funding; requests are assessed at acceptance and never affect the editorial decision.",
      "There are no submission fees, page charges or fees for supplementary material, and the APC covers professional copyediting, typesetting, DOI registration and permanent online hosting.",
    ],
  },
];

export const MISSION: { heading: string; body: string[] } = {
  heading: "Our Mission",
  body: [
    "Fair Press exists to publish rigorous, methodologically sound medical research that is free for anyone to read, reuse and build upon under open access terms.",
    "We put integrity first: double-blind peer review, plagiarism screening, transparent editorial decisions and formal corrections and retractions governed by COPE guidance are the foundation of every paper we publish.",
    "Transparency extends to our process itself, with published timelines, declared conflicts of interest and data availability statements required of every submission.",
    "Our commitment is to researchers, clinicians and policy makers worldwide, with a deliberate focus on work from and about settings where the burden of disease is greatest.",
  ],
};
