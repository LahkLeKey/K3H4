import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosLineItemSelectObjectSchema as PosLineItemSelectObjectSchema } from './PosLineItemSelect.schema';
import { PosLineItemIncludeObjectSchema as PosLineItemIncludeObjectSchema } from './PosLineItemInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => PosLineItemSelectObjectSchema).optional(),
  include: z.lazy(() => PosLineItemIncludeObjectSchema).optional()
}).strict();
export const PosLineItemArgsObjectSchema = makeSchema();
export const PosLineItemArgsObjectZodSchema = makeSchema();
