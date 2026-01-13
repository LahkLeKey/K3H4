import * as z from 'zod';
export const AssignmentPayoutGroupByResultSchema = z.array(z.object({
  id: z.string(),
  assignmentId: z.string(),
  personaId: z.string(),
  amount: z.number(),
  note: z.string(),
  invoiceUrl: z.string(),
  status: z.string(),
  createdAt: z.date(),
  _count: z.object({
    id: z.number(),
    assignmentId: z.number(),
    assignment: z.number(),
    personaId: z.number(),
    persona: z.number(),
    amount: z.number(),
    note: z.number(),
    invoiceUrl: z.number(),
    status: z.number(),
    createdAt: z.number()
  }).optional(),
  _sum: z.object({
    amount: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    amount: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    assignmentId: z.string().nullable(),
    personaId: z.string().nullable(),
    amount: z.number().nullable(),
    note: z.string().nullable(),
    invoiceUrl: z.string().nullable(),
    status: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    assignmentId: z.string().nullable(),
    personaId: z.string().nullable(),
    amount: z.number().nullable(),
    note: z.string().nullable(),
    invoiceUrl: z.string().nullable(),
    status: z.string().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()
}));