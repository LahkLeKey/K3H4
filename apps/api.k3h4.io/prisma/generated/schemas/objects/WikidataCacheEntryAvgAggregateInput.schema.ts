import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  statusCode: z.literal(true).optional(),
  cacheControlSeconds: z.literal(true).optional()
}).strict();
export const WikidataCacheEntryAvgAggregateInputObjectSchema: z.ZodType<Prisma.WikidataCacheEntryAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.WikidataCacheEntryAvgAggregateInputType>;
export const WikidataCacheEntryAvgAggregateInputObjectZodSchema = makeSchema();
