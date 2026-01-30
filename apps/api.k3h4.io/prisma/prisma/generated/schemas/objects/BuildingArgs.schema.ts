import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingSelectObjectSchema as BuildingSelectObjectSchema } from './BuildingSelect.schema';
import { BuildingIncludeObjectSchema as BuildingIncludeObjectSchema } from './BuildingInclude.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => BuildingSelectObjectSchema).optional(),
  include: z.lazy(() => BuildingIncludeObjectSchema).optional()
}).strict();
export const BuildingArgsObjectSchema = makeSchema();
export const BuildingArgsObjectZodSchema = makeSchema();
