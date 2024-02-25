import { z } from 'zod'

export const customSettingsSchema = z.object({
  source: z.string().default('./src'),
  port: z.number().default(3333),
  lang: z.string().default('en'),
  silent: z.boolean().default(import.meta.env.NODE_ENV === 'production'),
  nocompress: z.boolean().default(false),
  patterns: z.object({
    page: z.string().default('**/*.page.{jsx,tsx}'),
    style: z.string().default('global.css'),
    document: z.string().default('Document.tsx'),
    assets: z.string().default('assets'),
    static: z.string().default('assets/static'),
  }).readonly().default({}),
}).readonly()
