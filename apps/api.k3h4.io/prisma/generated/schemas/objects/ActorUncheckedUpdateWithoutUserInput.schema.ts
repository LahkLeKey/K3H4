import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { BankActorTypeSchema } from '../enums/BankActorType.schema';
import { EnumBankActorTypeFieldUpdateOperationsInputObjectSchema as EnumBankActorTypeFieldUpdateOperationsInputObjectSchema } from './EnumBankActorTypeFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { EntityUncheckedUpdateManyWithoutActorNestedInputObjectSchema as EntityUncheckedUpdateManyWithoutActorNestedInputObjectSchema } from './EntityUncheckedUpdateManyWithoutActorNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  label: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  type: z.union([BankActorTypeSchema, z.lazy(() => EnumBankActorTypeFieldUpdateOperationsInputObjectSchema)]).optional(),
  note: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  source: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  entities: z.lazy(() => EntityUncheckedUpdateManyWithoutActorNestedInputObjectSchema).optional()
}).strict();
export const ActorUncheckedUpdateWithoutUserInputObjectSchema: z.ZodType<Prisma.ActorUncheckedUpdateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorUncheckedUpdateWithoutUserInput>;
export const ActorUncheckedUpdateWithoutUserInputObjectZodSchema = makeSchema();
