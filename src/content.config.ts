import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const noticiasSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  pubDate: z.coerce.date(),
  category: z.enum(['Avisos', 'Eventos', 'Datas Liturgicas', 'Geral']).default('Geral'),
  image: z.string().optional(),
  church: z.enum(['rosario', 'coracao']),
});

const gruposSchema = z.object({
  title: z.string(),
  category: z.string(),
  coordinator: z.string(),
  description: z.string().optional(),
  image: z.string().optional(),
  order: z.number().optional(),
  church: z.enum(['rosario', 'coracao']),
});

const formacaoSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  pubDate: z.coerce.date(),
  author: z.string().optional(),
  category: z.enum(['Sacramentos', 'Santos', 'Liturgia', 'Doutrina', 'Oracoes', 'Geral']).default('Geral'),
  church: z.enum(['rosario', 'coracao']),
});

const noticias = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/noticias' }),
  schema: noticiasSchema,
});

const grupos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/grupos' }),
  schema: gruposSchema,
});

const formacao = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/formacao' }),
  schema: formacaoSchema,
});

export const collections = {
  noticias,
  grupos,
  formacao,
};
