import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  z: z.literal(true).optional(),
  x: z.literal(true).optional(),
  y: z.literal(true).optional(),
  byteLength: z.literal(true).optional()
}).strict();
export const GeoDemTileCacheAvgAggregateInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheAvgAggregateInputType>;
export const GeoDemTileCacheAvgAggregateInputObjectZodSchema = makeSchema();
