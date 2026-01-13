import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  _count: SortOrderSchema.optional()
}).strict();
export const AgricultureShipmentOrderByRelationAggregateInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentOrderByRelationAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentOrderByRelationAggregateInput>;
export const AgricultureShipmentOrderByRelationAggregateInputObjectZodSchema = makeSchema();
