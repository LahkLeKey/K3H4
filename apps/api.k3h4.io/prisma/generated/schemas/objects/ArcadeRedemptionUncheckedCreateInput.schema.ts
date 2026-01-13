import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeSessionUncheckedCreateNestedManyWithoutRewardRedemptionInputObjectSchema as ArcadeSessionUncheckedCreateNestedManyWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionUncheckedCreateNestedManyWithoutRewardRedemptionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  cardId: z.string().optional().nullable(),
  prizeId: z.string(),
  status: z.string().optional(),
  fulfilledAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  sessions: z.lazy(() => ArcadeSessionUncheckedCreateNestedManyWithoutRewardRedemptionInputObjectSchema).optional()
}).strict();
export const ArcadeRedemptionUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUncheckedCreateInput>;
export const ArcadeRedemptionUncheckedCreateInputObjectZodSchema = makeSchema();
