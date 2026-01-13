import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  cardId: z.string().optional().nullable(),
  prizeId: z.string(),
  status: z.string().optional(),
  fulfilledAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const ArcadeRedemptionCreateManyUserInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateManyUserInput>;
export const ArcadeRedemptionCreateManyUserInputObjectZodSchema = makeSchema();
