import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  prizeId: z.string(),
  status: LifecycleStatusSchema.optional(),
  fulfilledAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const ArcadeRedemptionCreateManyCardInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateManyCardInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateManyCardInput>;
export const ArcadeRedemptionCreateManyCardInputObjectZodSchema = makeSchema();
