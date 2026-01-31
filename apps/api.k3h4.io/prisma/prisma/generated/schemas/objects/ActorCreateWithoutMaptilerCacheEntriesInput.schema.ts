import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorTypeSchema } from '../enums/ActorType.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutActorsInputObjectSchema as UserCreateNestedOneWithoutActorsInputObjectSchema } from './UserCreateNestedOneWithoutActorsInput.schema';
import { EntityCreateNestedManyWithoutActorInputObjectSchema as EntityCreateNestedManyWithoutActorInputObjectSchema } from './EntityCreateNestedManyWithoutActorInput.schema';
import { ActorCacheCreateNestedManyWithoutActorInputObjectSchema as ActorCacheCreateNestedManyWithoutActorInputObjectSchema } from './ActorCacheCreateNestedManyWithoutActorInput.schema';
import { GeoDirectionCreateNestedManyWithoutActorInputObjectSchema as GeoDirectionCreateNestedManyWithoutActorInputObjectSchema } from './GeoDirectionCreateNestedManyWithoutActorInput.schema';
import { MaptilerQueryCreateNestedManyWithoutActorInputObjectSchema as MaptilerQueryCreateNestedManyWithoutActorInputObjectSchema } from './MaptilerQueryCreateNestedManyWithoutActorInput.schema';
import { OsrmCacheEntryCreateNestedManyWithoutActorInputObjectSchema as OsrmCacheEntryCreateNestedManyWithoutActorInputObjectSchema } from './OsrmCacheEntryCreateNestedManyWithoutActorInput.schema'

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
  user: z.lazy(() => UserCreateNestedOneWithoutActorsInputObjectSchema).optional(),
  entities: z.lazy(() => EntityCreateNestedManyWithoutActorInputObjectSchema).optional(),
  caches: z.lazy(() => ActorCacheCreateNestedManyWithoutActorInputObjectSchema).optional(),
  geoDirections: z.lazy(() => GeoDirectionCreateNestedManyWithoutActorInputObjectSchema).optional(),
  maptilerQueries: z.lazy(() => MaptilerQueryCreateNestedManyWithoutActorInputObjectSchema).optional(),
  osrmCacheEntries: z.lazy(() => OsrmCacheEntryCreateNestedManyWithoutActorInputObjectSchema).optional()
}).strict();
export const ActorCreateWithoutMaptilerCacheEntriesInputObjectSchema: z.ZodType<Prisma.ActorCreateWithoutMaptilerCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorCreateWithoutMaptilerCacheEntriesInput>;
export const ActorCreateWithoutMaptilerCacheEntriesInputObjectZodSchema = makeSchema();
