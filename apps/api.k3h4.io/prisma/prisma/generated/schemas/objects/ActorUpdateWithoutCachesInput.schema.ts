import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { ActorTypeSchema } from '../enums/ActorType.schema';
import { EnumActorTypeFieldUpdateOperationsInputObjectSchema as EnumActorTypeFieldUpdateOperationsInputObjectSchema } from './EnumActorTypeFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneWithoutActorsNestedInputObjectSchema as UserUpdateOneWithoutActorsNestedInputObjectSchema } from './UserUpdateOneWithoutActorsNestedInput.schema';
import { EntityUpdateManyWithoutActorNestedInputObjectSchema as EntityUpdateManyWithoutActorNestedInputObjectSchema } from './EntityUpdateManyWithoutActorNestedInput.schema';
import { GeoDirectionUpdateManyWithoutActorNestedInputObjectSchema as GeoDirectionUpdateManyWithoutActorNestedInputObjectSchema } from './GeoDirectionUpdateManyWithoutActorNestedInput.schema';
import { MaptilerQueryUpdateManyWithoutActorNestedInputObjectSchema as MaptilerQueryUpdateManyWithoutActorNestedInputObjectSchema } from './MaptilerQueryUpdateManyWithoutActorNestedInput.schema';
import { MaptilerCacheEntryUpdateManyWithoutActorNestedInputObjectSchema as MaptilerCacheEntryUpdateManyWithoutActorNestedInputObjectSchema } from './MaptilerCacheEntryUpdateManyWithoutActorNestedInput.schema';
import { OsrmCacheEntryUpdateManyWithoutActorNestedInputObjectSchema as OsrmCacheEntryUpdateManyWithoutActorNestedInputObjectSchema } from './OsrmCacheEntryUpdateManyWithoutActorNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  label: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  type: z.union([ActorTypeSchema, z.lazy(() => EnumActorTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  source: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneWithoutActorsNestedInputObjectSchema).optional(),
  entities: z.lazy(() => EntityUpdateManyWithoutActorNestedInputObjectSchema).optional(),
  geoDirections: z.lazy(() => GeoDirectionUpdateManyWithoutActorNestedInputObjectSchema).optional(),
  maptilerQueries: z.lazy(() => MaptilerQueryUpdateManyWithoutActorNestedInputObjectSchema).optional(),
  maptilerCacheEntries: z.lazy(() => MaptilerCacheEntryUpdateManyWithoutActorNestedInputObjectSchema).optional(),
  osrmCacheEntries: z.lazy(() => OsrmCacheEntryUpdateManyWithoutActorNestedInputObjectSchema).optional()
}).strict();
export const ActorUpdateWithoutCachesInputObjectSchema: z.ZodType<Prisma.ActorUpdateWithoutCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUpdateWithoutCachesInput>;
export const ActorUpdateWithoutCachesInputObjectZodSchema = makeSchema();
