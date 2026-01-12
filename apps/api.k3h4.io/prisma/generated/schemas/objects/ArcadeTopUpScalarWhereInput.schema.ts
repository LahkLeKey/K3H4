import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const arcadetopupscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => ArcadeTopUpScalarWhereInputObjectSchema), z.lazy(() => ArcadeTopUpScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => ArcadeTopUpScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => ArcadeTopUpScalarWhereInputObjectSchema), z.lazy(() => ArcadeTopUpScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  cardId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  amount: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'amount' must be a Decimal",
})]).optional(),
  source: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const ArcadeTopUpScalarWhereInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpScalarWhereInput> = arcadetopupscalarwhereinputSchema as unknown as z.ZodType<Prisma.ArcadeTopUpScalarWhereInput>;
export const ArcadeTopUpScalarWhereInputObjectZodSchema = arcadetopupscalarwhereinputSchema;
