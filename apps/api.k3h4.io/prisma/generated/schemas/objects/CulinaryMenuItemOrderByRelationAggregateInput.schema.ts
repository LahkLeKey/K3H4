import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const CulinaryMenuItemOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.CulinaryMenuItemOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemOrderByRelationAggregateInput>;
export const CulinaryMenuItemOrderByRelationAggregateInputObjectZodSchema = makeSchema();
