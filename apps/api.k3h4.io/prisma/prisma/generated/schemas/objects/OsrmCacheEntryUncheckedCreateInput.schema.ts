import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  actorId: z.string().optional().nullable(),
  service: z.string(),
  profile: z.string(),
  coordinates: z.string().optional().nullable(),
  params: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  paramsHash: z.string(),
  signature: z.string(),
  url: z.string(),
  statusCode: z.number().int().optional().nullable(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  fetchedAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const OsrmCacheEntryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryUncheckedCreateInput>;
export const OsrmCacheEntryUncheckedCreateInputObjectZodSchema = makeSchema();
