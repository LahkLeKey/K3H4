import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { ActorTypeSchema } from '../enums/ActorType.schema';
import { EnumActorTypeFieldUpdateOperationsInputObjectSchema as EnumActorTypeFieldUpdateOperationsInputObjectSchema } from './EnumActorTypeFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ActorCacheUncheckedUpdateManyWithoutActorNestedInputObjectSchema as ActorCacheUncheckedUpdateManyWithoutActorNestedInputObjectSchema } from './ActorCacheUncheckedUpdateManyWithoutActorNestedInput.schema';
import { GeoDirectionUncheckedUpdateManyWithoutActorNestedInputObjectSchema as GeoDirectionUncheckedUpdateManyWithoutActorNestedInputObjectSchema } from './GeoDirectionUncheckedUpdateManyWithoutActorNestedInput.schema';
import { MaptilerQueryUncheckedUpdateManyWithoutActorNestedInputObjectSchema as MaptilerQueryUncheckedUpdateManyWithoutActorNestedInputObjectSchema } from './MaptilerQueryUncheckedUpdateManyWithoutActorNestedInput.schema';
import { MaptilerCacheEntryUncheckedUpdateManyWithoutActorNestedInputObjectSchema as MaptilerCacheEntryUncheckedUpdateManyWithoutActorNestedInputObjectSchema } from './MaptilerCacheEntryUncheckedUpdateManyWithoutActorNestedInput.schema';
import { OsrmCacheEntryUncheckedUpdateManyWithoutActorNestedInputObjectSchema as OsrmCacheEntryUncheckedUpdateManyWithoutActorNestedInputObjectSchema } from './OsrmCacheEntryUncheckedUpdateManyWithoutActorNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  label: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  type: z.union([ActorTypeSchema, z.lazy(() => EnumActorTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  source: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  caches: z.lazy(() => ActorCacheUncheckedUpdateManyWithoutActorNestedInputObjectSchema).optional(),
  geoDirections: z.lazy(() => GeoDirectionUncheckedUpdateManyWithoutActorNestedInputObjectSchema).optional(),
  maptilerQueries: z.lazy(() => MaptilerQueryUncheckedUpdateManyWithoutActorNestedInputObjectSchema).optional(),
  maptilerCacheEntries: z.lazy(() => MaptilerCacheEntryUncheckedUpdateManyWithoutActorNestedInputObjectSchema).optional(),
  osrmCacheEntries: z.lazy(() => OsrmCacheEntryUncheckedUpdateManyWithoutActorNestedInputObjectSchema).optional()
}).strict();
export const ActorUncheckedUpdateWithoutEntitiesInputObjectSchema: z.ZodType<Prisma.ActorUncheckedUpdateWithoutEntitiesInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUncheckedUpdateWithoutEntitiesInput>;
export const ActorUncheckedUpdateWithoutEntitiesInputObjectZodSchema = makeSchema();
