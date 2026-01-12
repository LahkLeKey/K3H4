import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { AgriculturePlotOrderByWithRelationInputObjectSchema as AgriculturePlotOrderByWithRelationInputObjectSchema } from './AgriculturePlotOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  slotIndex: SortOrderSchema.optional(),
  unlockedAt: SortOrderSchema.optional(),
  costPaid: SortOrderSchema.optional(),
  plotId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  plot: z.lazy(() => AgriculturePlotOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const AgricultureSlotOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AgricultureSlotOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotOrderByWithRelationInput>;
export const AgricultureSlotOrderByWithRelationInputObjectZodSchema = makeSchema();
