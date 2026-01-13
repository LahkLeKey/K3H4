import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutPosTicketsInputObjectSchema as UserCreateNestedOneWithoutPosTicketsInputObjectSchema } from './UserCreateNestedOneWithoutPosTicketsInput.schema';
import { PosStoreCreateNestedOneWithoutTicketsInputObjectSchema as PosStoreCreateNestedOneWithoutTicketsInputObjectSchema } from './PosStoreCreateNestedOneWithoutTicketsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  total: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'total' must be a Decimal",
}),
  itemsCount: z.number().int().optional(),
  channel: z.string(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPosTicketsInputObjectSchema),
  store: z.lazy(() => PosStoreCreateNestedOneWithoutTicketsInputObjectSchema)
}).strict();
export const PosTicketCreateWithoutLineItemsInputObjectSchema: z.ZodType<Prisma.PosTicketCreateWithoutLineItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketCreateWithoutLineItemsInput>;
export const PosTicketCreateWithoutLineItemsInputObjectZodSchema = makeSchema();
