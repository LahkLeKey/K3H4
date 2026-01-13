import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { FloatFieldUpdateOperationsInputObjectSchema as FloatFieldUpdateOperationsInputObjectSchema } from './FloatFieldUpdateOperationsInput.schema';
import { IntFieldUpdateOperationsInputObjectSchema as IntFieldUpdateOperationsInputObjectSchema } from './IntFieldUpdateOperationsInput.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutPersonaCompatibilitiesNestedInputObjectSchema as UserUpdateOneRequiredWithoutPersonaCompatibilitiesNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutPersonaCompatibilitiesNestedInput.schema';
import { PersonaUpdateOneRequiredWithoutCompatibilityTargetsNestedInputObjectSchema as PersonaUpdateOneRequiredWithoutCompatibilityTargetsNestedInputObjectSchema } from './PersonaUpdateOneRequiredWithoutCompatibilityTargetsNestedInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  jaccardScore: z.union([z.number(), z.lazy(() => FloatFieldUpdateOperationsInputObjectSchema)]).optional(),
  intersectionCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  unionCount: z.union([z.number().int(), z.lazy(() => IntFieldUpdateOperationsInputObjectSchema)]).optional(),
  overlappingTokens: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  computedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  rationale: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  status: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutPersonaCompatibilitiesNestedInputObjectSchema).optional(),
  target: z.lazy(() => PersonaUpdateOneRequiredWithoutCompatibilityTargetsNestedInputObjectSchema).optional()
}).strict();
export const PersonaCompatibilityUpdateWithoutSourceInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityUpdateWithoutSourceInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityUpdateWithoutSourceInput>;
export const PersonaCompatibilityUpdateWithoutSourceInputObjectZodSchema = makeSchema();
