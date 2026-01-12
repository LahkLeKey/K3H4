import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { ArcadeMachineScalarRelationFilterObjectSchema as ArcadeMachineScalarRelationFilterObjectSchema } from './ArcadeMachineScalarRelationFilter.schema';
import { ArcadeMachineWhereInputObjectSchema as ArcadeMachineWhereInputObjectSchema } from './ArcadeMachineWhereInput.schema';
import { ArcadeCardScalarRelationFilterObjectSchema as ArcadeCardScalarRelationFilterObjectSchema } from './ArcadeCardScalarRelationFilter.schema';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './ArcadeCardWhereInput.schema';
import { ArcadeRedemptionNullableScalarRelationFilterObjectSchema as ArcadeRedemptionNullableScalarRelationFilterObjectSchema } from './ArcadeRedemptionNullableScalarRelationFilter.schema';
import { ArcadeRedemptionWhereInputObjectSchema as ArcadeRedemptionWhereInputObjectSchema } from './ArcadeRedemptionWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const arcadesessionwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ArcadeSessionWhereInputObjectSchema), z.lazy(() => ArcadeSessionWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ArcadeSessionWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ArcadeSessionWhereInputObjectSchema), z.lazy(() => ArcadeSessionWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  machineId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  cardId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  creditsSpent: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'creditsSpent' must be a Decimal",
})]).optional(),
  score: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  rewardRedemptionId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  startedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  endedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  machine: z.union([z.lazy(() => ArcadeMachineScalarRelationFilterObjectSchema), z.lazy(() => ArcadeMachineWhereInputObjectSchema)]).optional(),
  card: z.union([z.lazy(() => ArcadeCardScalarRelationFilterObjectSchema), z.lazy(() => ArcadeCardWhereInputObjectSchema)]).optional(),
  rewardRedemption: z.union([z.lazy(() => ArcadeRedemptionNullableScalarRelationFilterObjectSchema), z.lazy(() => ArcadeRedemptionWhereInputObjectSchema)]).optional()
}).strict();
export const ArcadeSessionWhereInputObjectSchema: z.ZodType<Prisma.ArcadeSessionWhereInput> = arcadesessionwhereinputSchema as unknown as z.ZodType<Prisma.ArcadeSessionWhereInput>;
export const ArcadeSessionWhereInputObjectZodSchema = arcadesessionwhereinputSchema;
