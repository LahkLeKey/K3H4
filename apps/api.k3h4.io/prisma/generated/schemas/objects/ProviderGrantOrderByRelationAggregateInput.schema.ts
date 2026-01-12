import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const ProviderGrantOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.ProviderGrantOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ProviderGrantOrderByRelationAggregateInput>;
export const ProviderGrantOrderByRelationAggregateInputObjectZodSchema = makeSchema();
