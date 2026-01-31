import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorTypeSchema } from '../enums/ActorType.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { EntityUncheckedCreateNestedManyWithoutActorInputObjectSchema as EntityUncheckedCreateNestedManyWithoutActorInputObjectSchema } from './EntityUncheckedCreateNestedManyWithoutActorInput.schema';
import { ActorCacheUncheckedCreateNestedManyWithoutActorInputObjectSchema as ActorCacheUncheckedCreateNestedManyWithoutActorInputObjectSchema } from './ActorCacheUncheckedCreateNestedManyWithoutActorInput.schema';
import { GeoDirectionUncheckedCreateNestedManyWithoutActorInputObjectSchema as GeoDirectionUncheckedCreateNestedManyWithoutActorInputObjectSchema } from './GeoDirectionUncheckedCreateNestedManyWithoutActorInput.schema';
import { MaptilerQueryUncheckedCreateNestedManyWithoutActorInputObjectSchema as MaptilerQueryUncheckedCreateNestedManyWithoutActorInputObjectSchema } from './MaptilerQueryUncheckedCreateNestedManyWithoutActorInput.schema';
import { OsrmCacheEntryUncheckedCreateNestedManyWithoutActorInputObjectSchema as OsrmCacheEntryUncheckedCreateNestedManyWithoutActorInputObjectSchema } from './OsrmCacheEntryUncheckedCreateNestedManyWithoutActorInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  label: z.string(),
  type: ActorTypeSchema,
  note: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  entities: z.lazy(() => EntityUncheckedCreateNestedManyWithoutActorInputObjectSchema).optional(),
  caches: z.lazy(() => ActorCacheUncheckedCreateNestedManyWithoutActorInputObjectSchema).optional(),
  geoDirections: z.lazy(() => GeoDirectionUncheckedCreateNestedManyWithoutActorInputObjectSchema).optional(),
  maptilerQueries: z.lazy(() => MaptilerQueryUncheckedCreateNestedManyWithoutActorInputObjectSchema).optional(),
  osrmCacheEntries: z.lazy(() => OsrmCacheEntryUncheckedCreateNestedManyWithoutActorInputObjectSchema).optional()
}).strict();
export const ActorUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema: z.ZodType<Prisma.ActorUncheckedCreateWithoutMaptilerCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUncheckedCreateWithoutMaptilerCacheEntriesInput>;
export const ActorUncheckedCreateWithoutMaptilerCacheEntriesInputObjectZodSchema = makeSchema();
