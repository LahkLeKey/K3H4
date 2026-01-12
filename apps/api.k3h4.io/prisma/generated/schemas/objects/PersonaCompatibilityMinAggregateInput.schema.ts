import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  sourceId: z.literal(true).optional(),
  targetId: z.literal(true).optional(),
  jaccardScore: z.literal(true).optional(),
  intersectionCount: z.literal(true).optional(),
  unionCount: z.literal(true).optional(),
  computedAt: z.literal(true).optional(),
  rationale: z.literal(true).optional(),
  status: z.literal(true).optional()
}).strict();
export const PersonaCompatibilityMinAggregateInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityMinAggregateInputType>;
export const PersonaCompatibilityMinAggregateInputObjectZodSchema = makeSchema();
