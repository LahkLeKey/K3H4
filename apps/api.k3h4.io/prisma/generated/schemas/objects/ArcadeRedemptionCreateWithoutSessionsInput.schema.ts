import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { UserCreateNestedOneWithoutArcadeRedemptionsInputObjectSchema as UserCreateNestedOneWithoutArcadeRedemptionsInputObjectSchema } from './UserCreateNestedOneWithoutArcadeRedemptionsInput.schema';
import { ArcadeCardCreateNestedOneWithoutRedemptionsInputObjectSchema as ArcadeCardCreateNestedOneWithoutRedemptionsInputObjectSchema } from './ArcadeCardCreateNestedOneWithoutRedemptionsInput.schema';
import { ArcadePrizeCreateNestedOneWithoutRedemptionsInputObjectSchema as ArcadePrizeCreateNestedOneWithoutRedemptionsInputObjectSchema } from './ArcadePrizeCreateNestedOneWithoutRedemptionsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  status: LifecycleStatusSchema.optional(),
  fulfilledAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutArcadeRedemptionsInputObjectSchema),
  card: z.lazy(() => ArcadeCardCreateNestedOneWithoutRedemptionsInputObjectSchema).optional(),
  prize: z.lazy(() => ArcadePrizeCreateNestedOneWithoutRedemptionsInputObjectSchema)
}).strict();
export const ArcadeRedemptionCreateWithoutSessionsInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateWithoutSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateWithoutSessionsInput>;
export const ArcadeRedemptionCreateWithoutSessionsInputObjectZodSchema = makeSchema();
