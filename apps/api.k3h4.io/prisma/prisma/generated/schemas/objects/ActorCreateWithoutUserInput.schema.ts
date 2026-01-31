import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorTypeSchema } from '../enums/ActorType.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { EntityCreateNestedManyWithoutActorInputObjectSchema as EntityCreateNestedManyWithoutActorInputObjectSchema } from './EntityCreateNestedManyWithoutActorInput.schema';
import { ActorCacheCreateNestedManyWithoutActorInputObjectSchema as ActorCacheCreateNestedManyWithoutActorInputObjectSchema } from './ActorCacheCreateNestedManyWithoutActorInput.schema';
import { GeoDirectionCreateNestedManyWithoutActorInputObjectSchema as GeoDirectionCreateNestedManyWithoutActorInputObjectSchema } from './GeoDirectionCreateNestedManyWithoutActorInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  label: z.string(),
  type: ActorTypeSchema,
  note: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  entities: z.lazy(() => EntityCreateNestedManyWithoutActorInputObjectSchema).optional(),
  caches: z.lazy(() => ActorCacheCreateNestedManyWithoutActorInputObjectSchema).optional(),
  geoDirections: z.lazy(() => GeoDirectionCreateNestedManyWithoutActorInputObjectSchema).optional()
}).strict();
export const ActorCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.ActorCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateWithoutUserInput>;
export const ActorCreateWithoutUserInputObjectZodSchema = makeSchema();
