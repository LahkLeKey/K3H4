import * as z from 'zod';
export const AssignmentTimecardAggregateResultSchema = z.object({  _count: z.object({
    id: z.number(),
    assignmentId: z.number(),
    assignment: z.number(),
    hours: z.number(),
    amount: z.number(),
    note: z.number(),
    status: z.number(),
    createdAt: z.number()
  }).optional(),
  _sum: z.object({
    hours: z.number().nullable(),
    amount: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    hours: z.number().nullable(),
    amount: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    assignmentId: z.string().nullable(),
    hours: z.number().nullable(),
    amount: z.number().nullable(),
    note: z.string().nullable(),
    status: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    assignmentId: z.string().nullable(),
    hours: z.number().nullable(),
    amount: z.number().nullable(),
    note: z.string().nullable(),
    status: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()});