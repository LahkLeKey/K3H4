import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutArcadeRedemptionsInputObjectSchema as UserCreateNestedOneWithoutArcadeRedemptionsInputObjectSchema } from './UserCreateNestedOneWithoutArcadeRedemptionsInput.schema';
import { ArcadeCardCreateNestedOneWithoutRedemptionsInputObjectSchema as ArcadeCardCreateNestedOneWithoutRedemptionsInputObjectSchema } from './ArcadeCardCreateNestedOneWithoutRedemptionsInput.schema';
import { ArcadePrizeCreateNestedOneWithoutRedemptionsInputObjectSchema as ArcadePrizeCreateNestedOneWithoutRedemptionsInputObjectSchema } from './ArcadePrizeCreateNestedOneWithoutRedemptionsInput.schema';
import { ArcadeSessionCreateNestedManyWithoutRewardRedemptionInputObjectSchema as ArcadeSessionCreateNestedManyWithoutRewardRedemptionInputObjectSchema } from './ArcadeSessionCreateNestedManyWithoutRewardRedemptionInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  status: z.string().optional(),
  fulfilledAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutArcadeRedemptionsInputObjectSchema),
  card: z.lazy(() => ArcadeCardCreateNestedOneWithoutRedemptionsInputObjectSchema).optional(),
  prize: z.lazy(() => ArcadePrizeCreateNestedOneWithoutRedemptionsInputObjectSchema),
  sessions: z.lazy(() => ArcadeSessionCreateNestedManyWithoutRewardRedemptionInputObjectSchema).optional()
}).strict();
export const ArcadeRedemptionCreateInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionCreateInput>;
export const ArcadeRedemptionCreateInputObjectZodSchema = makeSchema();
