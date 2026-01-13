import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  dataset: z.boolean().optional(),
  scope: z.boolean().optional(),
  lastReleaseOn: z.boolean().optional(),
  lastSyncedAt: z.boolean().optional(),
  note: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const UsdaSyncStateSelectObjectSchema: z.ZodType<Prisma.UsdaSyncStateSelect> = makeSchema() as unknown as z.ZodType<Prisma.UsdaSyncStateSelect>;
export const UsdaSyncStateSelectObjectZodSchema = makeSchema();
