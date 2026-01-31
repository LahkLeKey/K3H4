import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OsrmCacheEntryCreateManyActorInputObjectSchema as OsrmCacheEntryCreateManyActorInputObjectSchema } from './OsrmCacheEntryCreateManyActorInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => OsrmCacheEntryCreateManyActorInputObjectSchema), z.lazy(() => OsrmCacheEntryCreateManyActorInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const OsrmCacheEntryCreateManyActorInputEnvelopeObjectSchema: z.ZodType<Prisma.OsrmCacheEntryCreateManyActorInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryCreateManyActorInputEnvelope>;
export const OsrmCacheEntryCreateManyActorInputEnvelopeObjectZodSchema = makeSchema();
