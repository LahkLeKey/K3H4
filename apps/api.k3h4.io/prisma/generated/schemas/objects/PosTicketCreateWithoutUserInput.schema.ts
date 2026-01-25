import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { PosStoreCreateNestedOneWithoutTicketsInputObjectSchema as PosStoreCreateNestedOneWithoutTicketsInputObjectSchema } from './PosStoreCreateNestedOneWithoutTicketsInput.schema';
import { PosLineItemCreateNestedManyWithoutTicketInputObjectSchema as PosLineItemCreateNestedManyWithoutTicketInputObjectSchema } from './PosLineItemCreateNestedManyWithoutTicketInput.schema'

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
  status: LifecycleStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  store: z.lazy(() => PosStoreCreateNestedOneWithoutTicketsInputObjectSchema),
  lineItems: z.lazy(() => PosLineItemCreateNestedManyWithoutTicketInputObjectSchema).optional()
}).strict();
export const PosTicketCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.PosTicketCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketCreateWithoutUserInput>;
export const PosTicketCreateWithoutUserInputObjectZodSchema = makeSchema();
