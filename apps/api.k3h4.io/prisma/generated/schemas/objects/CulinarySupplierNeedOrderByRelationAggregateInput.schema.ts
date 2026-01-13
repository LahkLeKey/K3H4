import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CulinarySupplierNeedOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedOrderByRelationAggregateInput>;
export const CulinarySupplierNeedOrderByRelationAggregateInputObjectZodSchema = makeSchema();
