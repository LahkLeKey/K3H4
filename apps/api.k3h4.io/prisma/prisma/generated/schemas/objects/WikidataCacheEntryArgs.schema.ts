import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WikidataCacheEntrySelectObjectSchema as WikidataCacheEntrySelectObjectSchema } from './WikidataCacheEntrySelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => WikidataCacheEntrySelectObjectSchema).optional()
}).strict();
export const WikidataCacheEntryArgsObjectSchema = makeSchema();
export const WikidataCacheEntryArgsObjectZodSchema = makeSchema();
