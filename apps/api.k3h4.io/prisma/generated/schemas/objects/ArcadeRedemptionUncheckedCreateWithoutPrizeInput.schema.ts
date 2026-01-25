import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { ArcadeSessionUncheckedCreateNestedManyWithoutRewardRedemptionInputObjectSchema as ArcadeSessionUncheckedCreateNestedManyWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionUncheckedCreateNestedManyWithoutRewardRedemptionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  cardId: z.string().optional().nullable(),
  status: LifecycleStatusSchema.optional(),
  fulfilledAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  sessions: z.lazy(() => ArcadeSessionUncheckedCreateNestedManyWithoutRewardRedemptionInputObjectSchema).optional()
}).strict();
export const ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUncheckedCreateWithoutPrizeInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUncheckedCreateWithoutPrizeInput>;
export const ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectZodSchema = makeSchema();
