import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
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
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  caches: z.lazy(() => ActorCacheUncheckedCreateNestedManyWithoutActorInputObjectSchema).optional()
}).strict();
export const ActorUncheckedCreateWithoutEntitiesInputObjectSchema: z.ZodType<Prisma.ActorUncheckedCreateWithoutEntitiesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUncheckedCreateWithoutEntitiesInput>;
export const ActorUncheckedCreateWithoutEntitiesInputObjectZodSchema = makeSchema();
