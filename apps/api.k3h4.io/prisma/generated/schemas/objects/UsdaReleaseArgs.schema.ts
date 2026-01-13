import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UsdaReleaseSelectObjectSchema as UsdaReleaseSelectObjectSchema } from './UsdaReleaseSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => UsdaReleaseSelectObjectSchema).optional()
}).strict();
export const UsdaReleaseArgsObjectSchema = makeSchema();
export const UsdaReleaseArgsObjectZodSchema = makeSchema();
