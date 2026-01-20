import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoStatusLogCreateManyUserInputObjectSchema as GeoStatusLogCreateManyUserInputObjectSchema } from './GeoStatusLogCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => GeoStatusLogCreateManyUserInputObjectSchema), z.lazy(() => GeoStatusLogCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const GeoStatusLogCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.GeoStatusLogCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogCreateManyUserInputEnvelope>;
export const GeoStatusLogCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
