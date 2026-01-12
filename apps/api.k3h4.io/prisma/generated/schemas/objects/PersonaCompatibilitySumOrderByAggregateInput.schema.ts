import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  jaccardScore: SortOrderSchema.optional(),
  intersectionCount: SortOrderSchema.optional(),
  unionCount: SortOrderSchema.optional()
}).strict();
export const PersonaCompatibilitySumOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilitySumOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilitySumOrderByAggregateInput>;
export const PersonaCompatibilitySumOrderByAggregateInputObjectZodSchema = makeSchema();
