import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema'

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
  status: LifecycleStatusSchema.optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const AgricultureInventoryUncheckedCreateWithoutMovementsInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryUncheckedCreateWithoutMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryUncheckedCreateWithoutMovementsInput>;
export const AgricultureInventoryUncheckedCreateWithoutMovementsInputObjectZodSchema = makeSchema();
