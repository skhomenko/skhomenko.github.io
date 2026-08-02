/**
 * Launch checklist. Fill these in before publishing.
 *
 * Anything left as `null` is treated as "not published yet": the matching
 * links are hidden rather than rendered pointing at a dead destination.
 * A portfolio that 404s a recruiter is worse than one that stays quiet.
 */
const email: string | null = null; // e.g. "sergii@example.dev"
const linkedin: string | null =
  "https://www.linkedin.com/in/sergii-khomenko-24653b29/";
const resumePath: string | null =
  "/resume/sergii-khomenko-software-engineer-cv.pdf";

export const siteConfig = {
  url: "https://skhomenko.github.io",
  name: "Sergii Khomenko",
  title:
    "Sergii Khomenko | Quality Engineering, Automation, AI and Software Development",
  description:
    "Software engineer working across quality engineering and development. Automation architecture, CI/CD, developer tooling, applied AI, and delivery you can rely on.",
  motto: "Every difficult problem has a path forward.",
  email,
  github: "https://github.com/skhomenko",
  linkedin,
  resumePath,
};

/** Public profile links that actually resolve, for JSON-LD `sameAs`. */
export const publicProfiles: string[] = [
  siteConfig.github,
  siteConfig.linkedin,
].filter((href): href is string => Boolean(href));

/**
 * `spy` is the id of the home-page section this link represents. The header
 * highlights the link while that section is under the viewport top; `null`
 * means the destination has no home-page counterpart to track.
 */
export const navigation = [
  { label: "Expertise", href: "/#expertise", spy: "expertise" },
  { label: "Work", href: "/work", spy: "work" },
  { label: "Approach", href: "/#approach", spy: "approach" },
  { label: "About", href: "/about", spy: null },
] as const;
