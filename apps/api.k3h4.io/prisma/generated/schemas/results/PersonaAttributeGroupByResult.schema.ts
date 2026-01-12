import * as z from 'zod';
export const PersonaAttributeGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  personaId: z.string(),
  category: z.string(),
  value: z.string(),
  weight: z.number().int(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    personaId: z.number(),
    persona: z.number(),
    category: z.number(),
    value: z.number(),
    weight: z.number(),
    createdAt: z.number(),
    updatedAt: z.number()
  }).optional(),
  _sum: z.object({
    weight: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    weight: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    personaId: z.string().nullable(),
    category: z.string().nullable(),
    value: z.string().nullable(),
    weight: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    personaId: z.string().nullable(),
    category: z.string().nullable(),
    value: z.string().nullable(),
    weight: z.number().int().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));