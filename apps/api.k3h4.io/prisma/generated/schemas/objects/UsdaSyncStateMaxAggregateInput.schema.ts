import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  dataset: z.literal(true).optional(),
  scope: z.literal(true).optional(),
  lastReleaseOn: z.literal(true).optional(),
  lastSyncedAt: z.literal(true).optional(),
  note: z.literal(true).optional(),
  createdAt: z.literal(true).optional(),
  updatedAt: z.literal(true).optional()
}).strict();
export const UsdaSyncStateMaxAggregateInputObjectSchema: z.ZodType<Prisma.UsdaSyncStateMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.UsdaSyncStateMaxAggregateInputType>;
export const UsdaSyncStateMaxAggregateInputObjectZodSchema = makeSchema();
