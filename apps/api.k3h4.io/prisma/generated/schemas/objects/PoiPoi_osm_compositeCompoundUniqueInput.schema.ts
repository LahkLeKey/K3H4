import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  osmType: z.string(),
  osmId: z.bigint()
}).strict();
export const PoiPoi_osm_compositeCompoundUniqueInputObjectSchema: z.ZodType<Prisma.PoiPoi_osm_compositeCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiPoi_osm_compositeCompoundUniqueInput>;
export const PoiPoi_osm_compositeCompoundUniqueInputObjectZodSchema = makeSchema();
