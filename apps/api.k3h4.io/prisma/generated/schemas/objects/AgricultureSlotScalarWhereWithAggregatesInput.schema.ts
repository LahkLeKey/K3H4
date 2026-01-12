import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const agricultureslotscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureSlotScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AgricultureSlotScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureSlotScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureSlotScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => AgricultureSlotScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  slotIndex: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  unlockedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  costPaid: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'costPaid' must be a Decimal",
})]).optional(),
  plotId: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable()
}).strict();
export const AgricultureSlotScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.AgricultureSlotScalarWhereWithAggregatesInput> = agricultureslotscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.AgricultureSlotScalarWhereWithAggregatesInput>;
export const AgricultureSlotScalarWhereWithAggregatesInputObjectZodSchema = agricultureslotscalarwherewithaggregatesinputSchema;
