import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  z: SortOrderSchema.optional(),
  x: SortOrderSchema.optional(),
  y: SortOrderSchema.optional(),
  byteLength: SortOrderSchema.optional()
}).strict();
export const GeoDemTileCacheAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheAvgOrderByAggregateInput>;
export const GeoDemTileCacheAvgOrderByAggregateInputObjectZodSchema = makeSchema();
