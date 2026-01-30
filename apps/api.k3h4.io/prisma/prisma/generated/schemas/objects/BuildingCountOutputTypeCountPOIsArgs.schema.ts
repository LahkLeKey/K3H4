import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PoiWhereInputObjectSchema as PoiWhereInputObjectSchema } from './PoiWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => PoiWhereInputObjectSchema).optional()
}).strict();
export const BuildingCountOutputTypeCountPOIsArgsObjectSchema = makeSchema();
export const BuildingCountOutputTypeCountPOIsArgsObjectZodSchema = makeSchema();
