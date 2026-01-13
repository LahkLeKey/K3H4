import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreCountOutputTypeSelectObjectSchema as PosStoreCountOutputTypeSelectObjectSchema } from './PosStoreCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PosStoreCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const PosStoreCountOutputTypeArgsObjectSchema = makeSchema();
export const PosStoreCountOutputTypeArgsObjectZodSchema = makeSchema();
