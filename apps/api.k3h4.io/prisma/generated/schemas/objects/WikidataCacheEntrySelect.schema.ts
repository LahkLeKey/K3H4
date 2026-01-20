import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.boolean().optional(),
  resource: z.boolean().optional(),
  endpoint: z.boolean().optional(),
  params: z.boolean().optional(),
  paramsHash: z.boolean().optional(),
  url: z.boolean().optional(),
  statusCode: z.boolean().optional(),
  payload: z.boolean().optional(),
  fetchedAt: z.boolean().optional(),
  expiresAt: z.boolean().optional(),
  cacheControlSeconds: z.boolean().optional(),
  etag: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const WikidataCacheEntrySelectObjectSchema: z.ZodType<Prisma.WikidataCacheEntrySelect> = makeSchema() as unknown as z.ZodType<Prisma.WikidataCacheEntrySelect>;
export const WikidataCacheEntrySelectObjectZodSchema = makeSchema();
