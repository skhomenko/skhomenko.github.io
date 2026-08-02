export type Project = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  tags: readonly string[];
  status: string;
  signal: string;
};

export const projects: readonly Project[] = [
  {
    slug: "booking-scheduling-platform",
    title: "Booking & Scheduling Platform",
    eyebrow: "Product engineering",
    summary:
      "A Go and React scheduling product, from the booking lifecycle down to the deploy pipeline. Built and shipped solo.",
    tags: ["Go", "React", "TypeScript", "PostgreSQL", "Docker"],
    status: "In active development",
    signal: "Request → conflict check → confirmation",
  },
  {
    slug: "bilingual-document-assistant",
    title: "Bilingual Document Assistant",
    eyebrow: "Applied AI demonstrator",
    summary:
      "A retrieval-augmented assistant that answers questions in French or English about a long French agreement, and cites the article it used.",
    tags: ["Next.js", "pgvector", "Local LLMs", "RAG", "Python"],
    status: "Working demonstrator",
    signal: "Question → retrieval → cited answer",
  },
  {
    slug: "test-automation-reporting-platform",
    title: "Test Automation Reporting Platform",
    eyebrow: "Developer productivity platform",
    summary:
      "A Go and PostgreSQL service that turns scattered CI test runs into one queryable record an engineer can read.",
    tags: ["Go", "PostgreSQL", "REST", "PyTest", "Docker"],
    status: "Built · evolving",
    signal: "Execution → context → diagnosis",
  },
  {
    slug: "enterprise-quality-engineering",
    title: "Enterprise Quality Engineering",
    eyebrow: "Sanitized enterprise case study",
    summary:
      "Automation architecture, cloud test infrastructure, CI stability, and coaching across several products at once.",
    tags: ["Automation architecture", "Cloud testing", "CI/CD", "Leadership"],
    status: "Completed work · sanitized",
    signal: "Risk → coverage → reliable feedback",
  },
  {
    slug: "api-automation-ci-transformation",
    title: "API Automation & CI Transformation",
    eyebrow: "Quality practice transformation",
    summary:
      "An API automation framework and a regression strategy that put the results in front of developers, in CI.",
    tags: ["API testing", "CI", "Regression design", "Team leadership"],
    status: "Completed professional work",
    signal: "Service risk → automated evidence",
  },
] as const;
