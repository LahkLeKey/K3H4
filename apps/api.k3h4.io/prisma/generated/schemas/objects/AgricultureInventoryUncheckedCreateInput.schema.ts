import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { AgricultureInventoryMovementUncheckedCreateNestedManyWithoutInventoryInputObjectSchema as AgricultureInventoryMovementUncheckedCreateNestedManyWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateNestedManyWithoutInventoryInput.schema'

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
  movements: z.lazy(() => AgricultureInventoryMovementUncheckedCreateNestedManyWithoutInventoryInputObjectSchema).optional()
}).strict();
export const AgricultureInventoryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryUncheckedCreateInput>;
export const AgricultureInventoryUncheckedCreateInputObjectZodSchema = makeSchema();
