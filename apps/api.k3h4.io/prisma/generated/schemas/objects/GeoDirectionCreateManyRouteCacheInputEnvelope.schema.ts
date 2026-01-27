import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionCreateManyRouteCacheInputObjectSchema as GeoDirectionCreateManyRouteCacheInputObjectSchema } from './GeoDirectionCreateManyRouteCacheInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => GeoDirectionCreateManyRouteCacheInputObjectSchema), z.lazy(() => GeoDirectionCreateManyRouteCacheInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const GeoDirectionCreateManyRouteCacheInputEnvelopeObjectSchema: z.ZodType<Prisma.GeoDirectionCreateManyRouteCacheInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionCreateManyRouteCacheInputEnvelope>;
export const GeoDirectionCreateManyRouteCacheInputEnvelopeObjectZodSchema = makeSchema();
