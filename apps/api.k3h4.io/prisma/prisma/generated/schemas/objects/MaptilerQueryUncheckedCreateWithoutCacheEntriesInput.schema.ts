import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  signature: z.string(),
  kind: z.string(),
  path: z.string(),
  params: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  lastUsedAt: z.coerce.date().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const MaptilerQueryUncheckedCreateWithoutCacheEntriesInputObjectSchema: z.ZodType<Prisma.MaptilerQueryUncheckedCreateWithoutCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryUncheckedCreateWithoutCacheEntriesInput>;
export const MaptilerQueryUncheckedCreateWithoutCacheEntriesInputObjectZodSchema = makeSchema();
