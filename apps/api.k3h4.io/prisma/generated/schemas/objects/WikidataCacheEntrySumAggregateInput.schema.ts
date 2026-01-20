import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  statusCode: z.literal(true).optional(),
  cacheControlSeconds: z.literal(true).optional()
}).strict();
export const WikidataCacheEntrySumAggregateInputObjectSchema: z.ZodType<Prisma.WikidataCacheEntrySumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.WikidataCacheEntrySumAggregateInputType>;
export const WikidataCacheEntrySumAggregateInputObjectZodSchema = makeSchema();
