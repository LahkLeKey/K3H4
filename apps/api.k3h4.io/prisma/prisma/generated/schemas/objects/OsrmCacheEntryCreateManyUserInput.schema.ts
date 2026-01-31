import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
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
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const OsrmCacheEntryCreateManyUserInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryCreateManyUserInput>;
export const OsrmCacheEntryCreateManyUserInputObjectZodSchema = makeSchema();
