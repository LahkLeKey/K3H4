import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { PosTicketCreateNestedOneWithoutLineItemsInputObjectSchema as PosTicketCreateNestedOneWithoutLineItemsInputObjectSchema } from './PosTicketCreateNestedOneWithoutLineItemsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  name: z.string(),
  quantity: z.number().int().optional(),
  price: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'price' must be a Decimal",
}),
  createdAt: z.coerce.date().optional(),
  ticket: z.lazy(() => PosTicketCreateNestedOneWithoutLineItemsInputObjectSchema)
}).strict();
export const PosLineItemCreateInputObjectSchema: z.ZodType<Prisma.PosLineItemCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemCreateInput>;
export const PosLineItemCreateInputObjectZodSchema = makeSchema();
