import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  userId: z.literal(true).optional(),
  machineId: z.literal(true).optional(),
  cardId: z.literal(true).optional(),
  creditsSpent: z.literal(true).optional(),
  score: z.literal(true).optional(),
  rewardRedemptionId: z.literal(true).optional(),
  startedAt: z.literal(true).optional(),
  endedAt: z.literal(true).optional()
}).strict();
export const ArcadeSessionMinAggregateInputObjectSchema: z.ZodType<Prisma.ArcadeSessionMinAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionMinAggregateInputType>;
export const ArcadeSessionMinAggregateInputObjectZodSchema = makeSchema();
