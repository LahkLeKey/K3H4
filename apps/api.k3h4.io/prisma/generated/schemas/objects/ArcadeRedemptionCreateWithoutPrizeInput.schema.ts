import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { UserCreateNestedOneWithoutArcadeRedemptionsInputObjectSchema as UserCreateNestedOneWithoutArcadeRedemptionsInputObjectSchema } from './UserCreateNestedOneWithoutArcadeRedemptionsInput.schema';
import { ArcadeCardCreateNestedOneWithoutRedemptionsInputObjectSchema as ArcadeCardCreateNestedOneWithoutRedemptionsInputObjectSchema } from './ArcadeCardCreateNestedOneWithoutRedemptionsInput.schema';
import { ArcadeSessionCreateNestedManyWithoutRewardRedemptionInputObjectSchema as ArcadeSessionCreateNestedManyWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionCreateNestedManyWithoutRewardRedemptionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  status: LifecycleStatusSchema.optional(),
  fulfilledAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutArcadeRedemptionsInputObjectSchema),
  card: z.lazy(() => ArcadeCardCreateNestedOneWithoutRedemptionsInputObjectSchema).optional(),
  sessions: z.lazy(() => ArcadeSessionCreateNestedManyWithoutRewardRedemptionInputObjectSchema).optional()
}).strict();
export const ArcadeRedemptionCreateWithoutPrizeInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateWithoutPrizeInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateWithoutPrizeInput>;
export const ArcadeRedemptionCreateWithoutPrizeInputObjectZodSchema = makeSchema();
