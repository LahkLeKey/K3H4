import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  osmType: z.string(),
  osmId: z.bigint()
}).strict();
export const PointOfInterestPoi_osm_compositeCompoundUniqueInputObjectSchema: z.ZodType<Prisma.PointOfInterestPoi_osm_compositeCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PointOfInterestPoi_osm_compositeCompoundUniqueInput>;
export const PointOfInterestPoi_osm_compositeCompoundUniqueInputObjectZodSchema = makeSchema();
