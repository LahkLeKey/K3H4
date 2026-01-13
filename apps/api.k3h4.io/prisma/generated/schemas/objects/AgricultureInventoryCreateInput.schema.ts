import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutAgricultureInventoriesInputObjectSchema as UserCreateNestedOneWithoutAgricultureInventoriesInputObjectSchema } from './UserCreateNestedOneWithoutAgricultureInventoriesInput.schema';
import { AgricultureInventoryMovementCreateNestedManyWithoutInventoryInputObjectSchema as AgricultureInventoryMovementCreateNestedManyWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementCreateNestedManyWithoutInventoryInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
  user: z.lazy(() => UserCreateNestedOneWithoutAgricultureInventoriesInputObjectSchema),
  movements: z.lazy(() => AgricultureInventoryMovementCreateNestedManyWithoutInventoryInputObjectSchema).optional()
}).strict();
export const AgricultureInventoryCreateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryCreateInput>;
export const AgricultureInventoryCreateInputObjectZodSchema = makeSchema();
