import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PoiFindManySchema as PoiFindManySchema } from '../findManyPoi.schema';
import { BuildingCountOutputTypeArgsObjectSchema as BuildingCountOutputTypeArgsObjectSchema } from './BuildingCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  POIs: z.union([z.boolean(), z.lazy(() => PoiFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => BuildingCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const BuildingIncludeObjectSchema: z.ZodType<Prisma.BuildingInclude> = makeSchema() as unknown as z.ZodType<Prisma.BuildingInclude>;
export const BuildingIncludeObjectZodSchema = makeSchema();
