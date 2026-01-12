import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementSelectObjectSchema as AgricultureInventoryMovementSelectObjectSchema } from './AgricultureInventoryMovementSelect.schema';
import { AgricultureInventoryMovementIncludeObjectSchema as AgricultureInventoryMovementIncludeObjectSchema } from './AgricultureInventoryMovementInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => AgricultureInventoryMovementSelectObjectSchema).optional(),
  include: z.lazy(() => AgricultureInventoryMovementIncludeObjectSchema).optional()
}).strict();
export const AgricultureInventoryMovementArgsObjectSchema = makeSchema();
export const AgricultureInventoryMovementArgsObjectZodSchema = makeSchema();
