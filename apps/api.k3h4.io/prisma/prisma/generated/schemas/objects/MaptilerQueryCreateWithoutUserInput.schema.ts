import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { ActorCreateNestedOneWithoutMaptilerQueriesInputObjectSchema as ActorCreateNestedOneWithoutMaptilerQueriesInputObjectSchema } from './ActorCreateNestedOneWithoutMaptilerQueriesInput.schema';
import { MaptilerCacheEntryCreateNestedManyWithoutQueryInputObjectSchema as MaptilerCacheEntryCreateNestedManyWithoutQueryInputObjectSchema } from './MaptilerCacheEntryCreateNestedManyWithoutQueryInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  signature: z.string(),
  kind: z.string(),
  path: z.string(),
  params: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  lastUsedAt: z.coerce.date().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  actor: z.lazy(() => ActorCreateNestedOneWithoutMaptilerQueriesInputObjectSchema).optional(),
  cacheEntries: z.lazy(() => MaptilerCacheEntryCreateNestedManyWithoutQueryInputObjectSchema).optional()
}).strict();
export const MaptilerQueryCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.MaptilerQueryCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryCreateWithoutUserInput>;
export const MaptilerQueryCreateWithoutUserInputObjectZodSchema = makeSchema();
