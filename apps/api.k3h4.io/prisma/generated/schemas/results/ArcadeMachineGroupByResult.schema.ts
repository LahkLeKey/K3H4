import * as z from 'zod';
export const ArcadeMachineGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  gameTitle: z.string(),
  location: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    name: z.number(),
    gameTitle: z.number(),
    status: z.number(),
    location: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    sessions: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    gameTitle: z.string().nullable(),
    location: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    name: z.string().nullable(),
    gameTitle: z.string().nullable(),
    location: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()
}));