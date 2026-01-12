import * as z from 'zod';
export const UserPreferenceGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  theme: z.string(),
  locale: z.string(),
  timezone: z.string(),
  marketingOptIn: z.boolean(),
  note: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    theme: z.number(),
    locale: z.number(),
    timezone: z.number(),
    marketingOptIn: z.number(),
    note: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    theme: z.string().nullable(),
    locale: z.string().nullable(),
    timezone: z.string().nullable(),
    note: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    theme: z.string().nullable(),
    locale: z.string().nullable(),
    timezone: z.string().nullable(),
    note: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));