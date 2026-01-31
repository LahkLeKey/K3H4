import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PointOfInterestPoi_osm_compositeCompoundUniqueInputObjectSchema as PointOfInterestPoi_osm_compositeCompoundUniqueInputObjectSchema } from './PointOfInterestPoi_osm_compositeCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  poi_osm_composite: z.lazy(() => PointOfInterestPoi_osm_compositeCompoundUniqueInputObjectSchema).optional()
}).strict();
export const PointOfInterestWhereUniqueInputObjectSchema: z.ZodType<Prisma.PointOfInterestWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PointOfInterestWhereUniqueInput>;
export const PointOfInterestWhereUniqueInputObjectZodSchema = makeSchema();
