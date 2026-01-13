import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  machineId: SortOrderSchema.optional(),
  cardId: SortOrderSchema.optional(),
  creditsSpent: SortOrderSchema.optional(),
  score: SortOrderSchema.optional(),
  rewardRedemptionId: SortOrderSchema.optional(),
  startedAt: SortOrderSchema.optional(),
  endedAt: SortOrderSchema.optional()
}).strict();
export const ArcadeSessionCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeSessionCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionCountOrderByAggregateInput>;
export const ArcadeSessionCountOrderByAggregateInputObjectZodSchema = makeSchema();
