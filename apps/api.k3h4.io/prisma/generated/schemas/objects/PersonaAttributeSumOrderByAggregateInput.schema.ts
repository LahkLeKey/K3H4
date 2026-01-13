import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  weight: SortOrderSchema.optional()
}).strict();
export const PersonaAttributeSumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PersonaAttributeSumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeSumOrderByAggregateInput>;
export const PersonaAttributeSumOrderByAggregateInputObjectZodSchema = makeSchema();
