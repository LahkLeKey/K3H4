import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { ArcadeSessionUncheckedCreateNestedManyWithoutRewardRedemptionInputObjectSchema as ArcadeSessionUncheckedCreateNestedManyWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionUncheckedCreateNestedManyWithoutRewardRedemptionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  cardId: z.string().optional().nullable(),
  prizeId: z.string(),
  status: LifecycleStatusSchema.optional(),
  fulfilledAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  sessions: z.lazy(() => ArcadeSessionUncheckedCreateNestedManyWithoutRewardRedemptionInputObjectSchema).optional()
}).strict();
export const ArcadeRedemptionUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUncheckedCreateWithoutUserInput>;
export const ArcadeRedemptionUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
