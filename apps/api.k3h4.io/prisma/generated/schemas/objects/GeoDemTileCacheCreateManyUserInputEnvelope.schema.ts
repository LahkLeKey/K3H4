import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDemTileCacheCreateManyUserInputObjectSchema as GeoDemTileCacheCreateManyUserInputObjectSchema } from './GeoDemTileCacheCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => GeoDemTileCacheCreateManyUserInputObjectSchema), z.lazy(() => GeoDemTileCacheCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const GeoDemTileCacheCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.GeoDemTileCacheCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheCreateManyUserInputEnvelope>;
export const GeoDemTileCacheCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
