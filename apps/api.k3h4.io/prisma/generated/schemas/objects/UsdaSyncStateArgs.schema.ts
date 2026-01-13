import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaSyncStateSelectObjectSchema as UsdaSyncStateSelectObjectSchema } from './UsdaSyncStateSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => UsdaSyncStateSelectObjectSchema).optional()
}).strict();
export const UsdaSyncStateArgsObjectSchema = makeSchema();
export const UsdaSyncStateArgsObjectZodSchema = makeSchema();
