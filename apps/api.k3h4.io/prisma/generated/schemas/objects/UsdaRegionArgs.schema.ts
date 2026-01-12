import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaRegionSelectObjectSchema as UsdaRegionSelectObjectSchema } from './UsdaRegionSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => UsdaRegionSelectObjectSchema).optional()
}).strict();
export const UsdaRegionArgsObjectSchema = makeSchema();
export const UsdaRegionArgsObjectZodSchema = makeSchema();
