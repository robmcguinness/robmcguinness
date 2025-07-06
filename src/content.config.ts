import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

const blogs = defineCollection({
  loader: glob({ pattern: "*.md", base: "src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.coerce.date(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
  }),
});

const jobs = defineCollection({
  loader: file("src/content/jobs.json"),
  schema: z.object({
    id: z.number(),
    company: z.string(),
    location: z.string().optional(),
    logo: z.string(),
    positions: z.array(
      z.object({
        from: z.string(),
        to: z.string(),
        title: z.string(),
      }),
    )

  }),
});

export const collections = {
  blogs,
  jobs,
};
