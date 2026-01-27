import * as z from 'zod';
export const ChatSessionAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    title: z.number(),
    systemPrompt: z.number(),
    model: z.number(),
    temperature: z.number(),
    metadata: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    messages: z.number(),
    ollamaOperations: z.number()
  }).optional(),
  _sum: z.object({
    temperature: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    temperature: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    title: z.string().nullable(),
    systemPrompt: z.string().nullable(),
    model: z.string().nullable(),
    temperature: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    title: z.string().nullable(),
    systemPrompt: z.string().nullable(),
    model: z.string().nullable(),
    temperature: z.number().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});