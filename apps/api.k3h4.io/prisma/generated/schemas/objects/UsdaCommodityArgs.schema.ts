import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaCommoditySelectObjectSchema as UsdaCommoditySelectObjectSchema } from './UsdaCommoditySelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => UsdaCommoditySelectObjectSchema).optional()
}).strict();
export const UsdaCommodityArgsObjectSchema = makeSchema();
export const UsdaCommodityArgsObjectZodSchema = makeSchema();
