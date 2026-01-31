import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { MaptilerCacheEntryUncheckedUpdateManyWithoutQueryNestedInputObjectSchema as MaptilerCacheEntryUncheckedUpdateManyWithoutQueryNestedInputObjectSchema } from './MaptilerCacheEntryUncheckedUpdateManyWithoutQueryNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  userId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  signature: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  kind: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  path: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  params: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  lastUsedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  cacheEntries: z.lazy(() => MaptilerCacheEntryUncheckedUpdateManyWithoutQueryNestedInputObjectSchema).optional()
}).strict();
export const MaptilerQueryUncheckedUpdateWithoutActorInputObjectSchema: z.ZodType<Prisma.MaptilerQueryUncheckedUpdateWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerQueryUncheckedUpdateWithoutActorInput>;
export const MaptilerQueryUncheckedUpdateWithoutActorInputObjectZodSchema = makeSchema();
