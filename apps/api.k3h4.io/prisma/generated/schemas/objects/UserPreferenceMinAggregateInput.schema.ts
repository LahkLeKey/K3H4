import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  theme: z.literal(true).optional(),
  locale: z.literal(true).optional(),
  timezone: z.literal(true).optional(),
  marketingOptIn: z.literal(true).optional(),
  note: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const UserPreferenceMinAggregateInputObjectSchema: z.ZodType<Prisma.UserPreferenceMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceMinAggregateInputType>;
export const UserPreferenceMinAggregateInputObjectZodSchema = makeSchema();
