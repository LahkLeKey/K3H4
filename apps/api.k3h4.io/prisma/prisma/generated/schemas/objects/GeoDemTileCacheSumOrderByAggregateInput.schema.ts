import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  z: SortOrderSchema.optional(),
  x: SortOrderSchema.optional(),
  y: SortOrderSchema.optional(),
  byteLength: SortOrderSchema.optional()
}).strict();
export const GeoDemTileCacheSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheSumOrderByAggregateInput>;
export const GeoDemTileCacheSumOrderByAggregateInputObjectZodSchema = makeSchema();
