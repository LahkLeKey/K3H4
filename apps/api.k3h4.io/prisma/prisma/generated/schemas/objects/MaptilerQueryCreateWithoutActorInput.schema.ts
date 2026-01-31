import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutMaptilerQueriesInputObjectSchema as UserCreateNestedOneWithoutMaptilerQueriesInputObjectSchema } from './UserCreateNestedOneWithoutMaptilerQueriesInput.schema';
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
  user: z.lazy(() => UserCreateNestedOneWithoutMaptilerQueriesInputObjectSchema).optional(),
  cacheEntries: z.lazy(() => MaptilerCacheEntryCreateNestedManyWithoutQueryInputObjectSchema).optional()
}).strict();
export const MaptilerQueryCreateWithoutActorInputObjectSchema: z.ZodType<Prisma.MaptilerQueryCreateWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryCreateWithoutActorInput>;
export const MaptilerQueryCreateWithoutActorInputObjectZodSchema = makeSchema();
