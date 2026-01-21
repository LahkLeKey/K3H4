import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  resource: z.string(),
  endpoint: z.string(),
  params: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  paramsHash: z.string(),
  url: z.string(),
  statusCode: z.number().int(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  fetchedAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  cacheControlSeconds: z.number().int().optional().nullable(),
  etag: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const WikidataCacheEntryCreateManyInputObjectSchema: z.ZodType<Prisma.WikidataCacheEntryCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.WikidataCacheEntryCreateManyInput>;
export const WikidataCacheEntryCreateManyInputObjectZodSchema = makeSchema();
