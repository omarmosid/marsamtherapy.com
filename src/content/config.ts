import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		author: z.string().default('Mariya Samreen'),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		image: z.object({
			url: z.union([image(), z.string()]),
			alt: z.string(),
		}).optional(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

const servicesCollection = defineCollection({
	type: 'content',
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		icon: z.string(),
		image: z.object({
			url: z.union([image(), z.string()]),
			alt: z.string(),
		}).optional(),
		benefits: z.array(z.string()),
		approach: z.string(),
		duration: z.string().optional(),
		format: z.array(z.string()).default(['Individual', 'Online']),
		order: z.number().default(0),
	}),
});

export const collections = {
	blog: blogCollection,
	services: servicesCollection,
};
