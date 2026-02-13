import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { NullableDateTimeFieldUpdateOperationsInputObjectSchema as NullableDateTimeFieldUpdateOperationsInputObjectSchema } from './NullableDateTimeFieldUpdateOperationsInput.schema';
import { BoolFieldUpdateOperationsInputObjectSchema as BoolFieldUpdateOperationsInputObjectSchema } from './BoolFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { EntityUncheckedUpdateManyWithoutActorNestedInputObjectSchema as EntityUncheckedUpdateManyWithoutActorNestedInputObjectSchema } from './EntityUncheckedUpdateManyWithoutActorNestedInput.schema';
import { ActorCacheUncheckedUpdateManyWithoutActorNestedInputObjectSchema as ActorCacheUncheckedUpdateManyWithoutActorNestedInputObjectSchema } from './ActorCacheUncheckedUpdateManyWithoutActorNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  label: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  type: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  source: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  category: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  lastSeenAt: z.union([z.coerce.date(), z.lazy(() => NullableDateTimeFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  isGlobal: z.union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  entities: z.lazy(() => EntityUncheckedUpdateManyWithoutActorNestedInputObjectSchema).optional(),
  caches: z.lazy(() => ActorCacheUncheckedUpdateManyWithoutActorNestedInputObjectSchema).optional()
}).strict();
export const ActorUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.ActorUncheckedUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUncheckedUpdateWithoutUserInput>;
export const ActorUncheckedUpdateWithoutUserInputObjectZodSchema = makeSchema();
