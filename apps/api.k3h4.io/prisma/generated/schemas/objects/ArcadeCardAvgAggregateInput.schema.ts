import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  balance: z.literal(true).optional()
}).strict();
export const ArcadeCardAvgAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeCardAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardAvgAggregateInputType>;
export const ArcadeCardAvgAggregateInputObjectZodSchema = makeSchema();
