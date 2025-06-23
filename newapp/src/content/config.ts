import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()),
    author: z.string(),
    image: z.string(),
    linkTags: z.array(z.string()),
    blockCategory: z.string(),
  }),
});

export const collections = {
  blog,
};
