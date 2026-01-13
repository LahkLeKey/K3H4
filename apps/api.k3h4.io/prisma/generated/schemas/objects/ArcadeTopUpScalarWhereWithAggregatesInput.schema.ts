import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const arcadetopupscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => ArcadeTopUpScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ArcadeTopUpScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ArcadeTopUpScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ArcadeTopUpScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => ArcadeTopUpScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  cardId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  amount: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
})]).optional(),
  source: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ArcadeTopUpScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpScalarWhereWithAggregatesInput> = arcadetopupscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.ArcadeTopUpScalarWhereWithAggregatesInput>;
export const ArcadeTopUpScalarWhereWithAggregatesInputObjectZodSchema = arcadetopupscalarwherewithaggregatesinputSchema;
