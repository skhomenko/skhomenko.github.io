/**
 * Hero portrait. Sources are generated from the original at
 * `~/Documents/pictures/me.png`; regenerate with sips if the photo changes.
 * Set to `null` to drop the photo. The hero then runs as a single column.
 */
export const portrait: {
  sources: { src: string; width: number }[];
  alt: string;
} | null = {
  sources: [
    { src: "/portrait/me-480.jpg", width: 480 },
    { src: "/portrait/me-720.jpg", width: 720 },
    { src: "/portrait/me-1000.jpg", width: 1000 },
  ],
  alt: "Sergii Khomenko",
};

export const profile = {
  name: "Sergii Khomenko",
  role: "Software engineer · Quality engineering and development",
  positioning:
    "A software engineer who specializes in quality, automation, and delivery you can rely on.",
  headline:
    "I build the systems that tell a team whether their software actually works.",
  statement:
    "I don’t start by asking whether something is possible. I start by finding a way.",
  introduction:
    "Close to twenty years building test platforms, CI pipelines, and developer tools. I come at quality as a software engineer, and lately a good part of my time goes into working out where AI genuinely helps.",
  availability:
    "I’m open to roles in quality engineering, automation architecture, and developer productivity, and always happy to talk about applied AI.",
  about: [
    "I want to understand the whole system: the product, the code, the path to release, and what an engineer actually looks at when something breaks. It’s why I’ve never settled into development, infrastructure, or testing for very long.",
    "Most of my work starts with something vague and ends with something a team can maintain. What I care about is the friction in between: slow feedback, a signal nobody trusts, the step everyone quietly dreads.",
    "I tend to stay with a problem until it’s properly solved, and I’d rather explain a decision than defend it. Away from a terminal I’m into travel, cars, aviation, and space.",
  ],
} as const;
