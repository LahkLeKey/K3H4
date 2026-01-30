import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingCountOutputTypeCountPOIsArgsObjectSchema as BuildingCountOutputTypeCountPOIsArgsObjectSchema } from './BuildingCountOutputTypeCountPOIsArgs.schema'

const makeSchema = () => z.object({
  POIs: z.union([z.boolean(), z.lazy(() => BuildingCountOutputTypeCountPOIsArgsObjectSchema)]).optional()
}).strict();
export const BuildingCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.BuildingCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.BuildingCountOutputTypeSelect>;
export const BuildingCountOutputTypeSelectObjectZodSchema = makeSchema();
