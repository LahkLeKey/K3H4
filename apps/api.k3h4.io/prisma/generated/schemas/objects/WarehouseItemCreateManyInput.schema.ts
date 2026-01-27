import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { WarehouseCategorySchema } from '../enums/WarehouseCategory.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  sku: z.string(),
  description: z.string().optional().nullable(),
  quantity: z.number().int().optional(),
  location: z.string(),
  status: LifecycleStatusSchema.optional(),
  freightLoadId: z.string().optional().nullable(),
  category: WarehouseCategorySchema.optional(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const WarehouseItemCreateManyInputObjectSchema: z.ZodType<Prisma.WarehouseItemCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemCreateManyInput>;
export const WarehouseItemCreateManyInputObjectZodSchema = makeSchema();
