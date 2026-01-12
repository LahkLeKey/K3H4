import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const agricultureslotscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureSlotScalarWhereInputObjectSchema), z.lazy(() => AgricultureSlotScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureSlotScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureSlotScalarWhereInputObjectSchema), z.lazy(() => AgricultureSlotScalarWhereInputObjectSchema).array()]).optional(),
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
  plotId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable()
}).strict();
export const AgricultureSlotScalarWhereInputObjectSchema: z.ZodType<Prisma.AgricultureSlotScalarWhereInput> = agricultureslotscalarwhereinputSchema as unknown as z.ZodType<Prisma.AgricultureSlotScalarWhereInput>;
export const AgricultureSlotScalarWhereInputObjectZodSchema = agricultureslotscalarwhereinputSchema;
