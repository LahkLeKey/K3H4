import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { EntityUncheckedCreateNestedManyWithoutActorInputObjectSchema as EntityUncheckedCreateNestedManyWithoutActorInputObjectSchema } from './EntityUncheckedCreateNestedManyWithoutActorInput.schema';
import { ActorCacheUncheckedCreateNestedManyWithoutActorInputObjectSchema as ActorCacheUncheckedCreateNestedManyWithoutActorInputObjectSchema } from './ActorCacheUncheckedCreateNestedManyWithoutActorInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  label: z.string(),
  type: z.string(),
  note: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  category: z.string().optional().nullable(),
  lastSeenAt: z.coerce.date().optional().nullable(),
  isGlobal: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  entities: z.lazy(() => EntityUncheckedCreateNestedManyWithoutActorInputObjectSchema).optional(),
  caches: z.lazy(() => ActorCacheUncheckedCreateNestedManyWithoutActorInputObjectSchema).optional()
}).strict();
export const ActorUncheckedCreateInputObjectSchema: z.ZodType<Prisma.ActorUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUncheckedCreateInput>;
export const ActorUncheckedCreateInputObjectZodSchema = makeSchema();
