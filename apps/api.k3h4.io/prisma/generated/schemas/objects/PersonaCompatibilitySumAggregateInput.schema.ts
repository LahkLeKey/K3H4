import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  jaccardScore: z.literal(true).optional(),
  intersectionCount: z.literal(true).optional(),
  unionCount: z.literal(true).optional()
}).strict();
export const PersonaCompatibilitySumAggregateInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilitySumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilitySumAggregateInputType>;
export const PersonaCompatibilitySumAggregateInputObjectZodSchema = makeSchema();
