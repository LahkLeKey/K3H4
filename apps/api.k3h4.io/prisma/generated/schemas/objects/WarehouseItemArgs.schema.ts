import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemSelectObjectSchema as WarehouseItemSelectObjectSchema } from './WarehouseItemSelect.schema';
import { WarehouseItemIncludeObjectSchema as WarehouseItemIncludeObjectSchema } from './WarehouseItemInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => WarehouseItemSelectObjectSchema).optional(),
  include: z.lazy(() => WarehouseItemIncludeObjectSchema).optional()
}).strict();
export const WarehouseItemArgsObjectSchema = makeSchema();
export const WarehouseItemArgsObjectZodSchema = makeSchema();
