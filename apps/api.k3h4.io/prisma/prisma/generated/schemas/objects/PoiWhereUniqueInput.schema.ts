import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PoiPoi_osm_compositeCompoundUniqueInputObjectSchema as PoiPoi_osm_compositeCompoundUniqueInputObjectSchema } from './PoiPoi_osm_compositeCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  poi_osm_composite: z.lazy(() => PoiPoi_osm_compositeCompoundUniqueInputObjectSchema).optional()
}).strict();
export const PoiWhereUniqueInputObjectSchema: z.ZodType<Prisma.PoiWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiWhereUniqueInput>;
export const PoiWhereUniqueInputObjectZodSchema = makeSchema();
