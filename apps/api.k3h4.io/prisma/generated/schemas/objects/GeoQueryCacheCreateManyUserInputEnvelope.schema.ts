import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoQueryCacheCreateManyUserInputObjectSchema as GeoQueryCacheCreateManyUserInputObjectSchema } from './GeoQueryCacheCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => GeoQueryCacheCreateManyUserInputObjectSchema), z.lazy(() => GeoQueryCacheCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const GeoQueryCacheCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.GeoQueryCacheCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheCreateManyUserInputEnvelope>;
export const GeoQueryCacheCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
