import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  jaccardScore: z.literal(true).optional(),
  intersectionCount: z.literal(true).optional(),
  unionCount: z.literal(true).optional()
}).strict();
export const PersonaCompatibilityAvgAggregateInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityAvgAggregateInputType>;
export const PersonaCompatibilityAvgAggregateInputObjectZodSchema = makeSchema();
