import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingCountOutputTypeSelectObjectSchema as BuildingCountOutputTypeSelectObjectSchema } from './BuildingCountOutputTypeSelect.schema'

const makeSchema = () => z.object({
  select: z.lazy(() => BuildingCountOutputTypeSelectObjectSchema).optional()
}).strict();
export const BuildingCountOutputTypeArgsObjectSchema = makeSchema();
export const BuildingCountOutputTypeArgsObjectZodSchema = makeSchema();
