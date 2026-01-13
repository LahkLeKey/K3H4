import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const PersonaCompatibilityOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityOrderByRelationAggregateInput>;
export const PersonaCompatibilityOrderByRelationAggregateInputObjectZodSchema = makeSchema();
