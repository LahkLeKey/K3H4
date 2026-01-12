import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutArcadeSessionsInputObjectSchema as UserCreateNestedOneWithoutArcadeSessionsInputObjectSchema } from './UserCreateNestedOneWithoutArcadeSessionsInput.schema';
import { ArcadeMachineCreateNestedOneWithoutSessionsInputObjectSchema as ArcadeMachineCreateNestedOneWithoutSessionsInputObjectSchema } from './ArcadeMachineCreateNestedOneWithoutSessionsInput.schema';
import { ArcadeCardCreateNestedOneWithoutSessionsInputObjectSchema as ArcadeCardCreateNestedOneWithoutSessionsInputObjectSchema } from './ArcadeCardCreateNestedOneWithoutSessionsInput.schema';
import { ArcadeRedemptionCreateNestedOneWithoutSessionsInputObjectSchema as ArcadeRedemptionCreateNestedOneWithoutSessionsInputObjectSchema } from './ArcadeRedemptionCreateNestedOneWithoutSessionsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  creditsSpent: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'creditsSpent' must be a Decimal",
}),
  score: z.number().int().optional().nullable(),
  startedAt: z.coerce.date().optional(),
  endedAt: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutArcadeSessionsInputObjectSchema),
  machine: z.lazy(() => ArcadeMachineCreateNestedOneWithoutSessionsInputObjectSchema),
  card: z.lazy(() => ArcadeCardCreateNestedOneWithoutSessionsInputObjectSchema),
  rewardRedemption: z.lazy(() => ArcadeRedemptionCreateNestedOneWithoutSessionsInputObjectSchema).optional()
}).strict();
export const ArcadeSessionCreateInputObjectSchema: z.ZodType<Prisma.ArcadeSessionCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionCreateInput>;
export const ArcadeSessionCreateInputObjectZodSchema = makeSchema();
