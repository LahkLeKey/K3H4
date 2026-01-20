import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { MaptilerQueryCreateNestedOneWithoutCacheEntriesInputObjectSchema as MaptilerQueryCreateNestedOneWithoutCacheEntriesInputObjectSchema } from './MaptilerQueryCreateNestedOneWithoutCacheEntriesInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  kind: z.string(),
  path: z.string(),
  params: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  paramsHash: z.string(),
  signature: z.string(),
  method: z.string().optional(),
  responseType: z.string().optional(),
  url: z.string(),
  statusCode: z.number().int().optional().nullable(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  data: z.instanceof(Uint8Array).optional().nullable(),
  contentType: z.string().optional().nullable(),
  cacheControl: z.string().optional().nullable(),
  fetchedAt: z.coerce.date().optional(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  query: z.lazy(() => MaptilerQueryCreateNestedOneWithoutCacheEntriesInputObjectSchema).optional()
}).strict();
export const MaptilerCacheEntryCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryCreateWithoutUserInput>;
export const MaptilerCacheEntryCreateWithoutUserInputObjectZodSchema = makeSchema();
