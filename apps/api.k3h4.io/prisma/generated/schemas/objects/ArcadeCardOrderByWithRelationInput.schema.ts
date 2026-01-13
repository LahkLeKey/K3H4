import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ArcadeTopUpOrderByRelationAggregateInputObjectSchema as ArcadeTopUpOrderByRelationAggregateInputObjectSchema } from './ArcadeTopUpOrderByRelationAggregateInput.schema';
import { ArcadeSessionOrderByRelationAggregateInputObjectSchema as ArcadeSessionOrderByRelationAggregateInputObjectSchema } from './ArcadeSessionOrderByRelationAggregateInput.schema';
import { ArcadeRedemptionOrderByRelationAggregateInputObjectSchema as ArcadeRedemptionOrderByRelationAggregateInputObjectSchema } from './ArcadeRedemptionOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  label: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  balance: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  topUps: z.lazy(() => ArcadeTopUpOrderByRelationAggregateInputObjectSchema).optional(),
  sessions: z.lazy(() => ArcadeSessionOrderByRelationAggregateInputObjectSchema).optional(),
  redemptions: z.lazy(() => ArcadeRedemptionOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ArcadeCardOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ArcadeCardOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardOrderByWithRelationInput>;
export const ArcadeCardOrderByWithRelationInputObjectZodSchema = makeSchema();
