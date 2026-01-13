import * as z from 'zod';
export const BankTransactionGroupByResultSchema = z.array(z.object({
  id: z.string(),
  userId: z.string(),
  amount: z.number(),
  kind: z.string(),
  direction: z.string(),
  note: z.string(),
  balanceAfter: z.number(),
  createdAt: z.date(),
  _count: z.object({
    id: z.number(),
    userId: z.number(),
    user: z.number(),
    amount: z.number(),
    kind: z.number(),
    direction: z.number(),
    note: z.number(),
    balanceAfter: z.number(),
    createdAt: z.number()
  }).optional(),
  _sum: z.object({
    amount: z.number().nullable(),
    balanceAfter: z.number().nullable()
  }).nullable().optional(),
  _avg: z.object({
    amount: z.number().nullable(),
    balanceAfter: z.number().nullable()
  }).nullable().optional(),
  _min: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    amount: z.number().nullable(),
    kind: z.string().nullable(),
    direction: z.string().nullable(),
    note: z.string().nullable(),
    balanceAfter: z.number().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional(),
  _max: z.object({
    id: z.string().nullable(),
    userId: z.string().nullable(),
    amount: z.number().nullable(),
    kind: z.string().nullable(),
    direction: z.string().nullable(),
    note: z.string().nullable(),
    balanceAfter: z.number().nullable(),
    createdAt: z.date().nullable()
  }).nullable().optional()
}));