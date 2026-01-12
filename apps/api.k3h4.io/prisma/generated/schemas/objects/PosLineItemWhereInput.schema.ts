import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { PosTicketScalarRelationFilterObjectSchema as PosTicketScalarRelationFilterObjectSchema } from './PosTicketScalarRelationFilter.schema';
import { PosTicketWhereInputObjectSchema as PosTicketWhereInputObjectSchema } from './PosTicketWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const poslineitemwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PosLineItemWhereInputObjectSchema), z.lazy(() => PosLineItemWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PosLineItemWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PosLineItemWhereInputObjectSchema), z.lazy(() => PosLineItemWhereInputObjectSchema).array()]).optional(),
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
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  ticket: z.union([z.lazy(() => PosTicketScalarRelationFilterObjectSchema), z.lazy(() => PosTicketWhereInputObjectSchema)]).optional()
}).strict();
export const PosLineItemWhereInputObjectSchema: z.ZodType<Prisma.PosLineItemWhereInput> = poslineitemwhereinputSchema as unknown as z.ZodType<Prisma.PosLineItemWhereInput>;
export const PosLineItemWhereInputObjectZodSchema = poslineitemwhereinputSchema;
