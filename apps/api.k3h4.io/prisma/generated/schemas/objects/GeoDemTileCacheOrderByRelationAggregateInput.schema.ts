import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const GeoDemTileCacheOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheOrderByRelationAggregateInput>;
export const GeoDemTileCacheOrderByRelationAggregateInputObjectZodSchema = makeSchema();
