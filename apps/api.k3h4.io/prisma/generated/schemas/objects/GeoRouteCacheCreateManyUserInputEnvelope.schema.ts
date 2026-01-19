import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheCreateManyUserInputObjectSchema as GeoRouteCacheCreateManyUserInputObjectSchema } from './GeoRouteCacheCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => GeoRouteCacheCreateManyUserInputObjectSchema), z.lazy(() => GeoRouteCacheCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const GeoRouteCacheCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.GeoRouteCacheCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheCreateManyUserInputEnvelope>;
export const GeoRouteCacheCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
