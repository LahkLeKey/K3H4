import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityKindSchema } from '../enums/EntityKind.schema';
import { EntityDirectionSchema } from '../enums/EntityDirection.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { ActorCreateNestedOneWithoutEntitiesInputObjectSchema as ActorCreateNestedOneWithoutEntitiesInputObjectSchema } from './ActorCreateNestedOneWithoutEntitiesInput.schema';
import { EntityCacheCreateNestedManyWithoutEntityInputObjectSchema as EntityCacheCreateNestedManyWithoutEntityInputObjectSchema } from './EntityCacheCreateNestedManyWithoutEntityInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  kind: EntityKindSchema,
  direction: EntityDirectionSchema.optional().nullable(),
  name: z.string().optional().nullable(),
  targetType: z.string().optional().nullable(),
  targetId: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  actor: z.lazy(() => ActorCreateNestedOneWithoutEntitiesInputObjectSchema),
  caches: z.lazy(() => EntityCacheCreateNestedManyWithoutEntityInputObjectSchema).optional()
}).strict();
export const EntityCreateInputObjectSchema: z.ZodType<Prisma.EntityCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityCreateInput>;
export const EntityCreateInputObjectZodSchema = makeSchema();
