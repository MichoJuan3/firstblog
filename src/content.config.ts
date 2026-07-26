import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  // Charge tous les fichiers .md et .mdx du dossier src/content/blog/
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  
  schema: ({ image }) =>
    z.object({
      // Métadonnées principales
      title: z
        .string()
        .max(70, { message: 'Le titre ne doit pas dépasser 70 caractères pour le SEO.' }),
      description: z
        .string()
        .max(160, { message: 'La description ne doit pas dépasser 160 caractères pour le SEO.' }),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      author: z.string().default('Jean Paul Michel'),
      tags: z.array(z.string()).default(['Général']),
      draft: z.boolean().default(false),

      // Image de couverture
      coverImage: z
        .object({
          src: image(),
          alt: z.string().min(1, 'Le texte alternatif (alt) est obligatoire.'),
        })
        .optional(),

      // Galerie / Images secondaires
      gallery: z
        .array(
          z.object({
            src: image(),
            alt: z.string().min(1, 'Le texte alternatif (alt) est obligatoire.'),
            caption: z.string().optional(),
          })
        )
        .optional(),
    }),
});

export const collections = { blog };