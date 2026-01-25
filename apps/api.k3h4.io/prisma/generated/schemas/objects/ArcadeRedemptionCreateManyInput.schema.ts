import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  cardId: z.string().optional().nullable(),
  prizeId: z.string(),
  status: LifecycleStatusSchema.optional(),
  fulfilledAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const ArcadeRedemptionCreateManyInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateManyInput>;
export const ArcadeRedemptionCreateManyInputObjectZodSchema = makeSchema();
