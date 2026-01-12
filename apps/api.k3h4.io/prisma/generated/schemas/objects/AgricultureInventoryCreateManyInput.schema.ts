import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  sku: z.string(),
  description: z.string().optional().nullable(),
  totalQuantity: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'totalQuantity' must be a Decimal",
}).optional(),
  unit: z.string(),
  location: z.string().optional().nullable(),
  status: z.string().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const AgricultureInventoryCreateManyInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryCreateManyInput>;
export const AgricultureInventoryCreateManyInputObjectZodSchema = makeSchema();
