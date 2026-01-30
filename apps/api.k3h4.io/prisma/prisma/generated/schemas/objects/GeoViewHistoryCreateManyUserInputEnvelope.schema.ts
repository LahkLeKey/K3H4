import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoViewHistoryCreateManyUserInputObjectSchema as GeoViewHistoryCreateManyUserInputObjectSchema } from './GeoViewHistoryCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => GeoViewHistoryCreateManyUserInputObjectSchema), z.lazy(() => GeoViewHistoryCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const GeoViewHistoryCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.GeoViewHistoryCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryCreateManyUserInputEnvelope>;
export const GeoViewHistoryCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
