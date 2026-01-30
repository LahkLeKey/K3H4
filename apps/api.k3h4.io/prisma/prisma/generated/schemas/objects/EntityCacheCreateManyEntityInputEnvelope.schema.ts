import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityCacheCreateManyEntityInputObjectSchema as EntityCacheCreateManyEntityInputObjectSchema } from './EntityCacheCreateManyEntityInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => EntityCacheCreateManyEntityInputObjectSchema), z.lazy(() => EntityCacheCreateManyEntityInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const EntityCacheCreateManyEntityInputEnvelopeObjectSchema: z.ZodType<Prisma.EntityCacheCreateManyEntityInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.EntityCacheCreateManyEntityInputEnvelope>;
export const EntityCacheCreateManyEntityInputEnvelopeObjectZodSchema = makeSchema();
