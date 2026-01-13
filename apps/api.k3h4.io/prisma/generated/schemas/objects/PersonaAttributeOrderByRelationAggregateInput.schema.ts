import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const PersonaAttributeOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.PersonaAttributeOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeOrderByRelationAggregateInput>;
export const PersonaAttributeOrderByRelationAggregateInputObjectZodSchema = makeSchema();
