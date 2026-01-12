import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryMenuItemSelectObjectSchema as CulinaryMenuItemSelectObjectSchema } from './CulinaryMenuItemSelect.schema';
import { CulinaryMenuItemIncludeObjectSchema as CulinaryMenuItemIncludeObjectSchema } from './CulinaryMenuItemInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CulinaryMenuItemSelectObjectSchema).optional(),
  include: z.lazy(() => CulinaryMenuItemIncludeObjectSchema).optional()
}).strict();
export const CulinaryMenuItemArgsObjectSchema = makeSchema();
export const CulinaryMenuItemArgsObjectZodSchema = makeSchema();
