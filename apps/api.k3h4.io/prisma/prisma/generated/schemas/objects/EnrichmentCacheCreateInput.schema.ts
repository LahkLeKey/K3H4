import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string(),
  provider: z.string().optional(),
  namespace: z.string(),
  kind: z.string(),
  sourceKey: z.string(),
  paramsHash: z.string().optional().nullable(),
  wikidataId: z.string().optional().nullable(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  status: z.string().optional().nullable(),
  fetchedAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  note: z.string().optional().nullable()
}).strict();
export const EnrichmentCacheCreateInputObjectSchema: z.ZodType<Prisma.EnrichmentCacheCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.EnrichmentCacheCreateInput>;
export const EnrichmentCacheCreateInputObjectZodSchema = makeSchema();
