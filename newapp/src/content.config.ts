import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { array } from 'astro:schema';

const clients = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/clients', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		clients: z.array(
		  z.object({
			title: z.string(),
			image: image()
		  })
		),
	}),
});

const testimonials = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/testimonials', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		author: z.string(),
		description: z.string(),
		authorDesignation: z.string(),
		profileImage: image(),
		siteImage: image(),
	}),
});
const industries = defineCollection({

	loader: glob({ base: './src/content/industries', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		icon: image(),
		description: z.string()
	}),
});

const services = defineCollection({

	loader: glob({ base: './src/content/pages/services', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		slug: z.string(),
		seoTitle: z.string(),
		seoDescription: z.string(),
		lightImage: image().optional(),
		description: z.string(),
		order: z.number(), // Add order field
		text: z.string(),
		primaryText: z.string(),
		blocks: z.array(z.object({
			achievements: z.array(z.string()).optional(),
			title: z.string(),
			slug: z.string().optional(),
			description: z.string(),
			seoTitle: z.string().optional(),
			seoDescription: z.string().optional(),
			featureTitle: z.string().optional(),
			featureSubTitle: z.string().optional(),
			featureImage: image().optional(),
			industries: z.array(z.object({
				title: z.string(),
				description: z.string()
			})).optional(),
			features: z.array(z.object({
				title: z.string(),
				description: z.string()
			})).optional(),
		})).optional(),
		blockImage: image(),
		cardSectionPrimaryTitle: z.string(),
		cardSectionTitle: z.string(),
		isSectionTitlePrimary: z.boolean().optional(),
		serviceCardCollection: z.string(),
		serviceApproachPrimaryTitle: z.string(),
		serviceApproachTitle: z.string(),
		serviceApproach: z.string()
	}),
});


const events = defineCollection({
	loader: glob({ base: './src/content/events', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		events: z.array(
		  z.object({
			title: z.string(),
			image: image(),
			date: z.coerce.date().optional(),
			quote: z.string(),
		  })
		),
	}),
});

const aboutusPoints = defineCollection({
	loader: glob({ base: './src/content/aboutusPoints', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: () => z.object({
		aboutusPoints: z.array(
		  z.object({
			question: z.string(),
			answer: z.string(),
		  })
		),
	}),
});

const contactfaqs = defineCollection({
	loader: glob({ base: './src/content/contactfaqs', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: () => z.object({
		contactfaqs: z.array(
		  z.object({
			question: z.string(),
			answer: z.string(),
		  })
		),
	}),
});

const blogs = defineCollection({
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		slug: z.string(),
		image: image(),
		description: z.string(),
		seoTitle: z.string(),
		seoDescription: z.string(),
		tags: z.array(z.string()),
		author: z.string(),
		publishDate: z.coerce.date(),
		linkTags: z.array(z.string()).optional(),
		blockCategory: z.string().optional(),
	}),
});

const blog = defineCollection({
	loader: glob({ base: './src/content/pages/blog', pattern: '**/*.{md,mdx}' }),
	schema: () => z.object({
		slug: z.string(),
		title: z.string(),
		description: z.string(),
	}),
});

const privacyPolicy = defineCollection({
	loader: glob({ base: './src/content/pages/privacy-policy', pattern: '**/*.{md,mdx}' }),
	schema: () => z.object({
		slug: z.string(),
		title: z.string(),
		description: z.string(),
		seoTitle: z.string(),
		seoDescription: z.string(),
	}),
});

const termsOfUse = defineCollection({
	loader: glob({ base: './src/content/pages/terms-of-use', pattern: '**/*.{md,mdx}' }),
	schema: () => z.object({
		slug: z.string(),
		title: z.string(),
		description: z.string(),
		seoTitle: z.string(),
		seoDescription: z.string(),
	}),
});

const homepage = defineCollection({
	loader: glob({ base: './src/content/pages/homepage', pattern: '**/*.{md,mdx}' }),
	schema: () => z.object({
		slug: z.string(),
		seoTitle: z.string(),
		seoDescription: z.string(),
	}),
});

const aboutImprowised = defineCollection({
	loader: glob({ base: './src/content/pages/about-improwised', pattern: '**/*.{md,mdx}' }),
	schema: () => z.object({
		slug: z.string(),
		description: z.string(),
		seoTitle: z.string(),
		seoDescription: z.string(),
	}),
});

const casestudies = defineCollection({

	loader: glob({ base: './src/content/casestudies', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		category: z.string(),
		title: z.string(),
		attachments: z.string(),
		image: image(),
		saveCost:z.string().optional(),
		description: z.string(),
		tags: z.array(z.string()),
	}),
});

const casestudy = defineCollection({
	loader: glob({ base: './src/content/pages/casestudies', pattern: '**/*.{md,mdx}' }),
	schema: () => z.object({
		slug: z.string(),
		seoTitle: z.string(),
		seoDescription: z.string(),
	}),
}); 

const career = defineCollection({
	loader: glob({ base: './src/content/pages/careers', pattern: '**/*.{md,mdx}' }),
	schema: () => z.object({
		slug: z.string(),
		seoTitle: z.string(),
		seoDescription: z.string(),
	}),
}); 

const contactUs = defineCollection({
	loader: glob({ base: './src/content/pages/contact-us', pattern: '**/*.{md,mdx}' }),
	schema: () => z.object({
		slug: z.string(),
		seoTitle: z.string(),
		seoDescription: z.string(),
	}),
}); 

const teams = defineCollection({
	loader: glob({ base: './src/content/teams', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		teams: z.array(
		  z.object({
			name: z.string(),
			image: image(),
			designation: z.string().optional(),
			linkedin: z.string().optional()
		  })
		),
	}),
});
const corefeatures = defineCollection({
	loader: glob({ base: './src/content/corefeatures', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		slug: z.string(),
		lightImage: image(),
		description: z.string()
	}),
});
const corefeaturesCloudInfrastructureManagement = defineCollection({
	loader: glob({ base: './src/content/corefeatures-cloud-infrastructure-management', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		slug: z.string(),
		lightImage: image(),
		description: z.string()
	}),
});

const corefeaturesProductModernization = defineCollection({
	loader: glob({ base: './src/content/corefeatures-product-modernization', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		slug: z.string(),
		lightImage: image(),
		description: z.string()
	}),
});

const corefeaturesTechnologyConsulting = defineCollection({
	loader: glob({ base: './src/content/corefeatures-technology-consulting', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		slug: z.string(),
		lightImage: image(),
		description: z.string()
	}),
});

const approaches = defineCollection({
	loader: glob({ base: './src/content/approaches', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		approaches: z.array(
		  z.object({
			title: z.string(),
			description: z.string(),
			image: image()
		  })
		),
	}),
});

const approaches2 = defineCollection({
	loader: glob({ base: './src/content/approaches2', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		approaches: z.array(
		  z.object({
			title: z.string(),
			description: z.string(),
			image: image()
		  })
		),
	}),
});

const approaches3 = defineCollection({
	loader: glob({ base: './src/content/approaches3', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		approaches: z.array(
		  z.object({
			title: z.string(),
			description: z.string(),
			image: image()
		  })
		),
	}),
});

const approaches4 = defineCollection({
	loader: glob({ base: './src/content/approaches4', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		approaches: z.array(
		  z.object({
			title: z.string(),
			description: z.string(),
			image: image()
		  })
		),
	}),
});

const benefits = defineCollection({
	loader: glob({ base: './src/content/benefits', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: () => z.object({
		benefits: z.array(
		  z.object({
			title: z.string(),
			iconName: z.string(),
			description: z.string(),
		  })
		),
	}),
});

const careers = defineCollection({
	loader: glob({ base: './src/content/careers', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: () => z.object({
		title: z.string(),
		slug: z.string(),
		seoTitle: z.string(),
		seoDescription: z.string(),
		tags: z.array(z.string()),
		overview: z.string(),
		objectives: z.array(z.string()),
		responsibilities: z.array(z.string()),
		qualifications: z.array(z.string()),
		payRange: z.string(),
		experience: z.string(),
		place: z.string(),
		jobType: z.string(),
		jobCategory: z.string(),
		postedDate: z.coerce.date(),
		applyLink: z.string()
	}),
});

const lifeimages = defineCollection({
	loader: glob({ base: './src/content/lifeimages', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		images: z.array(image())
	}),
});

const reviews = defineCollection({
	loader: glob({ base: './src/content/reviews', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		reviews: z.array(
			z.object({
				name: z.string(),
				position: z.string(),
				review: z.string(),
				image: image()
			})
		)
	}),
});

const authors = defineCollection({
	loader: glob({ base: './src/content/authors', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		linkedin: z.string(),
		image: image()
	}),
});

export const collections = { authors, reviews, lifeimages, careers, benefits, approaches, corefeatures, clients, testimonials, casestudies, industries, services, teams, blogs, blog, events,corefeaturesCloudInfrastructureManagement,approaches2, approaches3, approaches4, corefeaturesProductModernization, corefeaturesTechnologyConsulting, aboutusPoints, contactfaqs, privacyPolicy, homepage, aboutImprowised, casestudy, career, contactUs, termsOfUse };
