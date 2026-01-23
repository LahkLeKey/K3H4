import * as z from 'zod';
export const ChatMessageAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    sessionId: z.number(),
    session: z.number(),
    role: z.number(),
    content: z.number(),
    metadata: z.number(),
    createdAt: z.number()
  }).optional(),
  _min: z.object({
    id: z.string().nullable(),
    sessionId: z.string().nullable(),
    content: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    sessionId: z.string().nullable(),
    content: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});