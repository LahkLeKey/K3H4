import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
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
export const EnrichmentCacheUncheckedCreateInputObjectSchema: z.ZodType<Prisma.EnrichmentCacheUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.EnrichmentCacheUncheckedCreateInput>;
export const EnrichmentCacheUncheckedCreateInputObjectZodSchema = makeSchema();
