import * as z from 'zod';
export const AssignmentAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    personaId: z.number(),
    persona: z.number(),
    title: z.number(),
    hourlyRate: z.number(),
    status: z.number(),
    createdAt: z.number(),
    updatedAt: z.number(),
    timecards: z.number(),
    payouts: z.number()
  }).optional(),
  _sum: z.object({
    hourlyRate: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    hourlyRate: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    personaId: z.string().nullable(),
    title: z.string().nullable(),
    hourlyRate: z.number().nullable(),
    status: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    personaId: z.string().nullable(),
    title: z.string().nullable(),
    hourlyRate: z.number().nullable(),
    status: z.string().nullable(),
    createdAt: z.date().nullable(),
    updatedAt: z.date().nullable()
  }).nullable().optional()});