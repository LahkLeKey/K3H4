import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  provider: z.string(),
  scope: z.string(),
  endpoint: z.string(),
  params: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  paramsHash: z.string(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  fetchedAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const ApiCacheEntryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ApiCacheEntryUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ApiCacheEntryUncheckedCreateInput>;
export const ApiCacheEntryUncheckedCreateInputObjectZodSchema = makeSchema();
