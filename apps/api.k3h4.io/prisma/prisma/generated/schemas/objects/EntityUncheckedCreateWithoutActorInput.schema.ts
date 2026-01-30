import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityKindSchema } from '../enums/EntityKind.schema';
import { EntityDirectionSchema } from '../enums/EntityDirection.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { EntityCacheUncheckedCreateNestedManyWithoutEntityInputObjectSchema as EntityCacheUncheckedCreateNestedManyWithoutEntityInputObjectSchema } from './EntityCacheUncheckedCreateNestedManyWithoutEntityInput.schema'

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
  updatedAt: z.coerce.date().optional(),
  caches: z.lazy(() => EntityCacheUncheckedCreateNestedManyWithoutEntityInputObjectSchema).optional()
}).strict();
export const EntityUncheckedCreateWithoutActorInputObjectSchema: z.ZodType<Prisma.EntityUncheckedCreateWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityUncheckedCreateWithoutActorInput>;
export const EntityUncheckedCreateWithoutActorInputObjectZodSchema = makeSchema();
