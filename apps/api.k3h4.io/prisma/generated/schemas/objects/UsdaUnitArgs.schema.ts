import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaUnitSelectObjectSchema as UsdaUnitSelectObjectSchema } from './UsdaUnitSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => UsdaUnitSelectObjectSchema).optional()
}).strict();
export const UsdaUnitArgsObjectSchema = makeSchema();
export const UsdaUnitArgsObjectZodSchema = makeSchema();
