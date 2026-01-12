import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  creditsSpent: z.literal(true).optional(),
  score: z.literal(true).optional()
}).strict();
export const ArcadeSessionAvgAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeSessionAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionAvgAggregateInputType>;
export const ArcadeSessionAvgAggregateInputObjectZodSchema = makeSchema();
