import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  weight: z.literal(true).optional()
}).strict();
export const PersonaAttributeSumAggregateInputObjectSchema: z.ZodType<Prisma.PersonaAttributeSumAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeSumAggregateInputType>;
export const PersonaAttributeSumAggregateInputObjectZodSchema = makeSchema();
