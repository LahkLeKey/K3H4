import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { MaptilerCacheEntryUncheckedCreateNestedManyWithoutQueryInputObjectSchema as MaptilerCacheEntryUncheckedCreateNestedManyWithoutQueryInputObjectSchema } from './MaptilerCacheEntryUncheckedCreateNestedManyWithoutQueryInput.schema'

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
  cacheEntries: z.lazy(() => MaptilerCacheEntryUncheckedCreateNestedManyWithoutQueryInputObjectSchema).optional()
}).strict();
export const MaptilerQueryUncheckedCreateInputObjectSchema: z.ZodType<Prisma.MaptilerQueryUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryUncheckedCreateInput>;
export const MaptilerQueryUncheckedCreateInputObjectZodSchema = makeSchema();
