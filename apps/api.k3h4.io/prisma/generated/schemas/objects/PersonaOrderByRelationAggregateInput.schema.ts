import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const PersonaOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.PersonaOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaOrderByRelationAggregateInput>;
export const PersonaOrderByRelationAggregateInputObjectZodSchema = makeSchema();
