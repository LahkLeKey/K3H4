import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  dataset: z.string(),
  scope: z.string(),
  lastReleaseOn: z.coerce.date().optional().nullable(),
  lastSyncedAt: z.coerce.date().optional().nullable(),
  note: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const UsdaSyncStateCreateInputObjectSchema: z.ZodType<Prisma.UsdaSyncStateCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.UsdaSyncStateCreateInput>;
export const UsdaSyncStateCreateInputObjectZodSchema = makeSchema();
