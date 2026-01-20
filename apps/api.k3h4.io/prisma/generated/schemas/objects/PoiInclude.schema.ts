import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingArgsObjectSchema as BuildingArgsObjectSchema } from './BuildingArgs.schema'

const makeSchema = () => z.object({
  building: z.union([z.boolean(), z.lazy(() => BuildingArgsObjectSchema)]).optional()
}).strict();
export const PoiIncludeObjectSchema: z.ZodType<Prisma.PoiInclude> = makeSchema() as unknown as z.ZodType<Prisma.PoiInclude>;
export const PoiIncludeObjectZodSchema = makeSchema();
