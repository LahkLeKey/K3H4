import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ArcadeCardOrderByWithRelationInputObjectSchema as ArcadeCardOrderByWithRelationInputObjectSchema } from './ArcadeCardOrderByWithRelationInput.schema';
import { ArcadePrizeOrderByWithRelationInputObjectSchema as ArcadePrizeOrderByWithRelationInputObjectSchema } from './ArcadePrizeOrderByWithRelationInput.schema';
import { ArcadeSessionOrderByRelationAggregateInputObjectSchema as ArcadeSessionOrderByRelationAggregateInputObjectSchema } from './ArcadeSessionOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  cardId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  prizeId: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  fulfilledAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  card: z.lazy(() => ArcadeCardOrderByWithRelationInputObjectSchema).optional(),
  prize: z.lazy(() => ArcadePrizeOrderByWithRelationInputObjectSchema).optional(),
  sessions: z.lazy(() => ArcadeSessionOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ArcadeRedemptionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionOrderByWithRelationInput>;
export const ArcadeRedemptionOrderByWithRelationInputObjectZodSchema = makeSchema();
