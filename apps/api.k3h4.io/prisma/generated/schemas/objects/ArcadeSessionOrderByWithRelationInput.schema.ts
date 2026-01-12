import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ArcadeMachineOrderByWithRelationInputObjectSchema as ArcadeMachineOrderByWithRelationInputObjectSchema } from './ArcadeMachineOrderByWithRelationInput.schema';
import { ArcadeCardOrderByWithRelationInputObjectSchema as ArcadeCardOrderByWithRelationInputObjectSchema } from './ArcadeCardOrderByWithRelationInput.schema';
import { ArcadeRedemptionOrderByWithRelationInputObjectSchema as ArcadeRedemptionOrderByWithRelationInputObjectSchema } from './ArcadeRedemptionOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  machineId: SortOrderSchema.optional(),
  cardId: SortOrderSchema.optional(),
  creditsSpent: SortOrderSchema.optional(),
  score: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  rewardRedemptionId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  startedAt: SortOrderSchema.optional(),
  endedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  machine: z.lazy(() => ArcadeMachineOrderByWithRelationInputObjectSchema).optional(),
  card: z.lazy(() => ArcadeCardOrderByWithRelationInputObjectSchema).optional(),
  rewardRedemption: z.lazy(() => ArcadeRedemptionOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const ArcadeSessionOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ArcadeSessionOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionOrderByWithRelationInput>;
export const ArcadeSessionOrderByWithRelationInputObjectZodSchema = makeSchema();
