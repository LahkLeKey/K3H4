import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ArcadeRedemptionOrderByRelationAggregateInputObjectSchema as ArcadeRedemptionOrderByRelationAggregateInputObjectSchema } from './ArcadeRedemptionOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  sku: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  costCoins: SortOrderSchema.optional(),
  stock: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  redemptions: z.lazy(() => ArcadeRedemptionOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ArcadePrizeOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ArcadePrizeOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadePrizeOrderByWithRelationInput>;
export const ArcadePrizeOrderByWithRelationInputObjectZodSchema = makeSchema();
