import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { RefreshTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema as RefreshTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './RefreshTokenUncheckedUpdateManyWithoutUserNestedInput.schema';
import { UserPreferenceUncheckedUpdateOneWithoutUserNestedInputObjectSchema as UserPreferenceUncheckedUpdateOneWithoutUserNestedInputObjectSchema } from './UserPreferenceUncheckedUpdateOneWithoutUserNestedInput.schema';
import { ProviderGrantUncheckedUpdateManyWithoutUserNestedInputObjectSchema as ProviderGrantUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './ProviderGrantUncheckedUpdateManyWithoutUserNestedInput.schema';
import { ChatSessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema as ChatSessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './ChatSessionUncheckedUpdateManyWithoutUserNestedInput.schema';
import { AiInsightUncheckedUpdateManyWithoutUserNestedInputObjectSchema as AiInsightUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './AiInsightUncheckedUpdateManyWithoutUserNestedInput.schema';
import { OllamaOperationUncheckedUpdateManyWithoutUserNestedInputObjectSchema as OllamaOperationUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './OllamaOperationUncheckedUpdateManyWithoutUserNestedInput.schema';
import { ActorUncheckedUpdateManyWithoutUserNestedInputObjectSchema as ActorUncheckedUpdateManyWithoutUserNestedInputObjectSchema } from './ActorUncheckedUpdateManyWithoutUserNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  email: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  provider: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  providerId: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  k3h4CoinBalance: z.union([z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'k3h4CoinBalance' must be a Decimal",
}), z.lazy(() => DecimalFieldUpdateOperationsInputObjectSchema)]).optional(),
  displayName: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  avatarUrl: z.union([z.string(), z.lazy(() => NullableStringFieldUpdateOperationsInputObjectSchema)]).optional().nullable(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  updatedAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  refreshTokens: z.lazy(() => RefreshTokenUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  preference: z.lazy(() => UserPreferenceUncheckedUpdateOneWithoutUserNestedInputObjectSchema).optional(),
  providerGrants: z.lazy(() => ProviderGrantUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  chatSessions: z.lazy(() => ChatSessionUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  aiInsights: z.lazy(() => AiInsightUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  ollamaOperations: z.lazy(() => OllamaOperationUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  actors: z.lazy(() => ActorUncheckedUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const UserUncheckedUpdateWithoutTelemetryInputObjectSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutTelemetryInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedUpdateWithoutTelemetryInput>;
export const UserUncheckedUpdateWithoutTelemetryInputObjectZodSchema = makeSchema();
