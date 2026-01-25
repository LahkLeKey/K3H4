import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { PosLineItemUncheckedCreateNestedManyWithoutTicketInputObjectSchema as PosLineItemUncheckedCreateNestedManyWithoutTicketInputObjectSchema } from './PosLineItemUncheckedCreateNestedManyWithoutTicketInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  storeId: z.string(),
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
  lineItems: z.lazy(() => PosLineItemUncheckedCreateNestedManyWithoutTicketInputObjectSchema).optional()
}).strict();
export const PosTicketUncheckedCreateInputObjectSchema: z.ZodType<Prisma.PosTicketUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketUncheckedCreateInput>;
export const PosTicketUncheckedCreateInputObjectZodSchema = makeSchema();
