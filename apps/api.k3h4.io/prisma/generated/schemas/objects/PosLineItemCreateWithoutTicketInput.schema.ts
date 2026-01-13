import * as z from 'zod';
import { Prisma } from '@prisma/client';


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
  createdAt: z.coerce.date().optional()
}).strict();
export const PosLineItemCreateWithoutTicketInputObjectSchema: z.ZodType<Prisma.PosLineItemCreateWithoutTicketInput> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemCreateWithoutTicketInput>;
export const PosLineItemCreateWithoutTicketInputObjectZodSchema = makeSchema();
