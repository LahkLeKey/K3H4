import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const AgricultureInventoryMovementOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementOrderByRelationAggregateInput>;
export const AgricultureInventoryMovementOrderByRelationAggregateInputObjectZodSchema = makeSchema();
