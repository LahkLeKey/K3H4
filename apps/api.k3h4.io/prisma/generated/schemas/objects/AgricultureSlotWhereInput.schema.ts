import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { AgriculturePlotNullableScalarRelationFilterObjectSchema as AgriculturePlotNullableScalarRelationFilterObjectSchema } from './AgriculturePlotNullableScalarRelationFilter.schema';
import { AgriculturePlotWhereInputObjectSchema as AgriculturePlotWhereInputObjectSchema } from './AgriculturePlotWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const agricultureslotwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureSlotWhereInputObjectSchema), z.lazy(() => AgricultureSlotWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureSlotWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureSlotWhereInputObjectSchema), z.lazy(() => AgricultureSlotWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  slotIndex: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  unlockedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  costPaid: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'costPaid' must be a Decimal",
})]).optional(),
  plotId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  plot: z.union([z.lazy(() => AgriculturePlotNullableScalarRelationFilterObjectSchema), z.lazy(() => AgriculturePlotWhereInputObjectSchema)]).optional()
}).strict();
export const AgricultureSlotWhereInputObjectSchema: z.ZodType<Prisma.AgricultureSlotWhereInput> = agricultureslotwhereinputSchema as unknown as z.ZodType<Prisma.AgricultureSlotWhereInput>;
export const AgricultureSlotWhereInputObjectZodSchema = agricultureslotwhereinputSchema;
