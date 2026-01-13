import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreSelectObjectSchema as PosStoreSelectObjectSchema } from './PosStoreSelect.schema';
import { PosStoreIncludeObjectSchema as PosStoreIncludeObjectSchema } from './PosStoreInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PosStoreSelectObjectSchema).optional(),
  include: z.lazy(() => PosStoreIncludeObjectSchema).optional()
}).strict();
export const PosStoreArgsObjectSchema = makeSchema();
export const PosStoreArgsObjectZodSchema = makeSchema();
