import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  signature: z.string().optional()
}).strict();
export const GeoPoiCacheWhereUniqueInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheWhereUniqueInput>;
export const GeoPoiCacheWhereUniqueInputObjectZodSchema = makeSchema();
