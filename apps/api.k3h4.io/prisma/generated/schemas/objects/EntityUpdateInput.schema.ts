import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { EntityKindSchema } from '../enums/EntityKind.schema';
import { EnumEntityKindFieldUpdateOperationsInputObjectSchema as EnumEntityKindFieldUpdateOperationsInputObjectSchema } from './EnumEntityKindFieldUpdateOperationsInput.schema';
import { EntityDirectionSchema } from '../enums/EntityDirection.schema';
import { NullableEnumEntityDirectionFieldUpdateOperationsInputObjectSchema as NullableEnumEntityDirectionFieldUpdateOperationsInputObjectSchema } from './NullableEnumEntityDirectionFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { ActorUpdateOneRequiredWithoutEntitiesNestedInputObjectSchema as ActorUpdateOneRequiredWithoutEntitiesNestedInputObjectSchema } from './ActorUpdateOneRequiredWithoutEntitiesNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  kind: z.union([EntityKindSchema, z.lazy(() => EnumEntityKindFieldUpdateOperationsInputObjectSchema)]).optional(),
  direction: z.union([EntityDirectionSchema, z.lazy(() => NullableEnumEntityDirectionFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  name: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  targetType: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  targetId: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  source: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  actor: z.lazy(() => ActorUpdateOneRequiredWithoutEntitiesNestedInputObjectSchema).optional()
}).strict();
export const EntityUpdateInputObjectSchema: z.ZodType<Prisma.EntityUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityUpdateInput>;
export const EntityUpdateInputObjectZodSchema = makeSchema();
