import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserPreferenceUncheckedCreateNestedOneWithoutUserInputObjectSchema as UserPreferenceUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './UserPreferenceUncheckedCreateNestedOneWithoutUserInput.schema';
import { TelemetryEventUncheckedCreateNestedManyWithoutUserInputObjectSchema as TelemetryEventUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './TelemetryEventUncheckedCreateNestedManyWithoutUserInput.schema';
import { ProviderGrantUncheckedCreateNestedManyWithoutUserInputObjectSchema as ProviderGrantUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ProviderGrantUncheckedCreateNestedManyWithoutUserInput.schema';
import { ChatSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema as ChatSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ChatSessionUncheckedCreateNestedManyWithoutUserInput.schema';
import { OllamaOperationUncheckedCreateNestedManyWithoutUserInputObjectSchema as OllamaOperationUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './OllamaOperationUncheckedCreateNestedManyWithoutUserInput.schema';
import { ActorUncheckedCreateNestedManyWithoutUserInputObjectSchema as ActorUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ActorUncheckedCreateNestedManyWithoutUserInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  email: z.string(),
  provider: z.string(),
  providerId: z.string(),
  k3h4CoinBalance: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'k3h4CoinBalance' must be a Decimal",
}).optional(),
  displayName: z.string().optional().nullable(),
  avatarUrl: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  preference: z.lazy(() => UserPreferenceUncheckedCreateNestedOneWithoutUserInputObjectSchema).optional(),
  telemetry: z.lazy(() => TelemetryEventUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  providerGrants: z.lazy(() => ProviderGrantUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  chatSessions: z.lazy(() => ChatSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  ollamaOperations: z.lazy(() => OllamaOperationUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  actors: z.lazy(() => ActorUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutRefreshTokensInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutRefreshTokensInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutRefreshTokensInput>;
export const UserUncheckedCreateWithoutRefreshTokensInputObjectZodSchema = makeSchema();
