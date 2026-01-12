import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const poslineitemscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PosLineItemScalarWhereInputObjectSchema), z.lazy(() => PosLineItemScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PosLineItemScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PosLineItemScalarWhereInputObjectSchema), z.lazy(() => PosLineItemScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  ticketId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  name: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  price: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'price' must be a Decimal",
})]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const PosLineItemScalarWhereInputObjectSchema: z.ZodType<Prisma.PosLineItemScalarWhereInput> = poslineitemscalarwhereinputSchema as unknown as z.ZodType<Prisma.PosLineItemScalarWhereInput>;
export const PosLineItemScalarWhereInputObjectZodSchema = poslineitemscalarwhereinputSchema;
