import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const arcadesessionscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema), z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema), z.lazy(() => ArcadeSessionScalarWhereInputObjectSchema).array()]).optional(),
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
  endedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable()
}).strict();
export const ArcadeSessionScalarWhereInputObjectSchema: z.ZodType<Prisma.ArcadeSessionScalarWhereInput> = arcadesessionscalarwhereinputSchema as unknown as z.ZodType<Prisma.ArcadeSessionScalarWhereInput>;
export const ArcadeSessionScalarWhereInputObjectZodSchema = arcadesessionscalarwhereinputSchema;
