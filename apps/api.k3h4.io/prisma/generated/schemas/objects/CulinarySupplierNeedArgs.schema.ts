import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinarySupplierNeedSelectObjectSchema as CulinarySupplierNeedSelectObjectSchema } from './CulinarySupplierNeedSelect.schema';
import { CulinarySupplierNeedIncludeObjectSchema as CulinarySupplierNeedIncludeObjectSchema } from './CulinarySupplierNeedInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => CulinarySupplierNeedSelectObjectSchema).optional(),
  include: z.lazy(() => CulinarySupplierNeedIncludeObjectSchema).optional()
}).strict();
export const CulinarySupplierNeedArgsObjectSchema = makeSchema();
export const CulinarySupplierNeedArgsObjectZodSchema = makeSchema();
