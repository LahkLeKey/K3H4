import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionCreateManyUserInputObjectSchema as GeoDirectionCreateManyUserInputObjectSchema } from './GeoDirectionCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => GeoDirectionCreateManyUserInputObjectSchema), z.lazy(() => GeoDirectionCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const GeoDirectionCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.GeoDirectionCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionCreateManyUserInputEnvelope>;
export const GeoDirectionCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
