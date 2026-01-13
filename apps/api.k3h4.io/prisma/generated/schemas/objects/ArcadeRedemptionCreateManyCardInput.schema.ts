import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  prizeId: z.string(),
  status: z.string().optional(),
  fulfilledAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const ArcadeRedemptionCreateManyCardInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateManyCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateManyCardInput>;
export const ArcadeRedemptionCreateManyCardInputObjectZodSchema = makeSchema();
