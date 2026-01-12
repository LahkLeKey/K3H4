import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const PosTicketCreateManyUserInputObjectSchema: z.ZodType<Prisma.PosTicketCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketCreateManyUserInput>;
export const PosTicketCreateManyUserInputObjectZodSchema = makeSchema();
