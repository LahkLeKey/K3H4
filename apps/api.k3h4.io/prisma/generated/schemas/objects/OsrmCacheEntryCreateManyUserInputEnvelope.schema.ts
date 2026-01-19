import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryCreateManyUserInputObjectSchema as OsrmCacheEntryCreateManyUserInputObjectSchema } from './OsrmCacheEntryCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => OsrmCacheEntryCreateManyUserInputObjectSchema), z.lazy(() => OsrmCacheEntryCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const OsrmCacheEntryCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.OsrmCacheEntryCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryCreateManyUserInputEnvelope>;
export const OsrmCacheEntryCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
