import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  jaccardScore: SortOrderSchema.optional(),
  intersectionCount: SortOrderSchema.optional(),
  unionCount: SortOrderSchema.optional()
}).strict();
export const PersonaCompatibilityAvgOrderByAggregateInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityAvgOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityAvgOrderByAggregateInput>;
export const PersonaCompatibilityAvgOrderByAggregateInputObjectZodSchema = makeSchema();
