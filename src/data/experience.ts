/**
 * Reverse chronological, because that is how anyone actually reads a career.
 * The early roles are deliberately collapsed into one entry: they are context,
 * not the argument. Full dates and achievements live in the résumé PDF.
 */
type Role = {
  period: string;
  role: string;
  org: string | null;
  focus: string;
};

export const experience: Role[] = [
  {
    period: "2026 to now",
    role: "Independent engineering and applied AI",
    org: null,
    focus:
      "Building a booking platform end to end, and working out where AI earns a place in engineering practice and where it does not.",
  },
  {
    period: "2019 to 2026",
    role: "Staff Quality Test Developer",
    org: "Lightspeed Commerce",
    focus:
      "Automation architecture across several commerce products, AWS test infrastructure, and the long work of making CI feedback worth reading.",
  },
  {
    period: "2015 to 2019",
    role: "QA Technical Lead",
    org: "X2O Media",
    focus:
      "Led a five-person team across web, mobile, desktop, and digital signage. Introduced API testing and moved regression feedback into CI.",
  },
  {
    period: "2011 to 2015",
    role: "Software Test Specialist",
    org: "BlackBerry",
    focus:
      "Owned regression quality for calendar and personal information management, from release validation through performance testing.",
  },
  {
    period: "2000 to 2011",
    role: "Systems, support, and quality leadership",
    org: "GlobalLogic, Hoffmann-La Roche, Unitel",
    focus:
      "Started in systems engineering and IT, moved into development, then into leading a QA team.",
  },
];
