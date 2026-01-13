import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  cardId: z.string().optional().nullable(),
  status: z.string().optional(),
  fulfilledAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const ArcadeRedemptionCreateManyPrizeInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateManyPrizeInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateManyPrizeInput>;
export const ArcadeRedemptionCreateManyPrizeInputObjectZodSchema = makeSchema();
