import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const work = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/work" }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string(),
    summary: z.string(),
    description: z.string(),
    order: z.number(),
    status: z.enum(["completed", "sanitized", "ongoing"]),
    role: z.string(),
    collaboration: z.string(),
    technologies: z.array(z.string()),
    diagram: z.enum([
      "reporting",
      "enterprise",
      "api",
      "scheduling",
      "assistant",
    ]),
  }),
});

export const collections = { work };
