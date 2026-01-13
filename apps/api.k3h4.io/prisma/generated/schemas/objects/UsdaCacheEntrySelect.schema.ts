import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  dataset: z.boolean().optional(),
  endpoint: z.boolean().optional(),
  params: z.boolean().optional(),
  paramsHash: z.boolean().optional(),
  payload: z.boolean().optional(),
  fetchedAt: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const UsdaCacheEntrySelectObjectSchema: z.ZodType<Prisma.UsdaCacheEntrySelect> = makeSchema() as unknown as z.ZodType<Prisma.UsdaCacheEntrySelect>;
export const UsdaCacheEntrySelectObjectZodSchema = makeSchema();
