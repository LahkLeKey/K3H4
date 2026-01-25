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
export const ArcadeRedemptionUncheckedCreateWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUncheckedCreateWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUncheckedCreateWithoutSessionsInput>;
export const ArcadeRedemptionUncheckedCreateWithoutSessionsInputObjectZodSchema = makeSchema();
