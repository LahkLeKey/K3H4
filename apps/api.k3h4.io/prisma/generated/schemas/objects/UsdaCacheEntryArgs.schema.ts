import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaCacheEntrySelectObjectSchema as UsdaCacheEntrySelectObjectSchema } from './UsdaCacheEntrySelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => UsdaCacheEntrySelectObjectSchema).optional()
}).strict();
export const UsdaCacheEntryArgsObjectSchema = makeSchema();
export const UsdaCacheEntryArgsObjectZodSchema = makeSchema();
