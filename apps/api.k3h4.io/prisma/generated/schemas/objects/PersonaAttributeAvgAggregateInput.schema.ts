import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  weight: z.literal(true).optional()
}).strict();
export const PersonaAttributeAvgAggregateInputObjectSchema: z.ZodType<Prisma.PersonaAttributeAvgAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeAvgAggregateInputType>;
export const PersonaAttributeAvgAggregateInputObjectZodSchema = makeSchema();
