export const skillGroups = [
  {
    title: "Software development",
    description:
      "Writing the services, tools, and integrations that hold an automation estate together.",
    items: [
      "Python",
      "Go",
      "SQL",
      "Shell",
      "TypeScript",
      "REST APIs",
      "GraphQL",
    ],
  },
  {
    title: "Quality engineering",
    description:
      "Getting trustworthy evidence out of every layer of a product.",
    items: [
      "PyTest",
      "Playwright",
      "Selenium",
      "API testing",
      "Integration testing",
      "System testing",
      "Regression architecture",
      "Risk-based strategy",
    ],
  },
  {
    title: "Infrastructure & delivery",
    description: "Putting feedback where engineers will actually see it.",
    items: [
      "Docker",
      "AWS",
      "GitHub Actions",
      "CircleCI",
      "Jenkins",
      "CI/CD",
      "Linux",
      "Cloud test infrastructure",
    ],
  },
  {
    title: "Data & backend systems",
    description: "Turning raw execution data into something you can query.",
    items: [
      "PostgreSQL",
      "Relational data",
      "API services",
      "Test reporting",
      "Analytics",
      "Structured test data",
    ],
  },
  {
    title: "Applied AI",
    description:
      "Judging models and workflows on privacy, cost, and whether the output can be checked.",
    items: [
      "LLM-assisted development",
      "Local models",
      "Prompt design",
      "Structured outputs",
      "Model evaluation",
      "Context management",
      "Quantization",
      "Human-in-the-loop",
    ],
  },
  {
    title: "Leadership",
    description:
      "Better systems, and a team that understands why they’re better.",
    items: [
      "Technical design",
      "Mentoring",
      "Code reviews",
      "Architecture reviews",
      "Quality strategy",
      "Risk analysis",
      "Cross-team collaboration",
      "Engineering standards",
    ],
  },
] as const;
