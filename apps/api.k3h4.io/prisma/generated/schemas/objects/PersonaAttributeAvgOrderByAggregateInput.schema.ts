import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  weight: SortOrderSchema.optional()
}).strict();
export const PersonaAttributeAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PersonaAttributeAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeAvgOrderByAggregateInput>;
export const PersonaAttributeAvgOrderByAggregateInputObjectZodSchema = makeSchema();
