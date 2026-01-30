import * as z from 'zod';
export const RefreshTokenGroupByResultSchema = z.array(z.object({
  id: z.string(),
  token: z.string(),
  userId: z.string(),
  createdAt: z.date(),
  expiresAt: z.date(),
  _count: z.object({
    id: z.number(),
    token: z.number(),
    userId: z.number(),
    user: z.number(),
    createdAt: z.number(),
    expiresAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    token: z.string().nullable(),
    userId: z.string().nullable(),
    createdAt: z.date().nullable(),
    expiresAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    token: z.string().nullable(),
    userId: z.string().nullable(),
    createdAt: z.date().nullable(),
    expiresAt: z.date().nullable()
  }).nullable().optional()
}));