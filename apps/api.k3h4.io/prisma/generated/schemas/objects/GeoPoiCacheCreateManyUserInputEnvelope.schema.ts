import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoPoiCacheCreateManyUserInputObjectSchema as GeoPoiCacheCreateManyUserInputObjectSchema } from './GeoPoiCacheCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => GeoPoiCacheCreateManyUserInputObjectSchema), z.lazy(() => GeoPoiCacheCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const GeoPoiCacheCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.GeoPoiCacheCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheCreateManyUserInputEnvelope>;
export const GeoPoiCacheCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
