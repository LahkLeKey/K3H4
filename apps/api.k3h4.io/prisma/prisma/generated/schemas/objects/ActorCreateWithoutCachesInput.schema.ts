import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutActorsInputObjectSchema as UserCreateNestedOneWithoutActorsInputObjectSchema } from './UserCreateNestedOneWithoutActorsInput.schema';
import { EntityCreateNestedManyWithoutActorInputObjectSchema as EntityCreateNestedManyWithoutActorInputObjectSchema } from './EntityCreateNestedManyWithoutActorInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  label: z.string(),
  type: z.string(),
  note: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  category: z.string().optional().nullable(),
  lastSeenAt: z.coerce.date().optional().nullable(),
  isGlobal: z.boolean().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutActorsInputObjectSchema).optional(),
  entities: z.lazy(() => EntityCreateNestedManyWithoutActorInputObjectSchema).optional()
}).strict();
export const ActorCreateWithoutCachesInputObjectSchema: z.ZodType<Prisma.ActorCreateWithoutCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateWithoutCachesInput>;
export const ActorCreateWithoutCachesInputObjectZodSchema = makeSchema();
