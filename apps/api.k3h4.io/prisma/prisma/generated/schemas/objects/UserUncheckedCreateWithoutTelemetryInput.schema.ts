import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema as RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenUncheckedCreateNestedManyWithoutUserInput.schema';
import { UserPreferenceUncheckedCreateNestedOneWithoutUserInputObjectSchema as UserPreferenceUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './UserPreferenceUncheckedCreateNestedOneWithoutUserInput.schema';
import { ProviderGrantUncheckedCreateNestedManyWithoutUserInputObjectSchema as ProviderGrantUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ProviderGrantUncheckedCreateNestedManyWithoutUserInput.schema';
import { ChatSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema as ChatSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ChatSessionUncheckedCreateNestedManyWithoutUserInput.schema';
import { AiInsightUncheckedCreateNestedManyWithoutUserInputObjectSchema as AiInsightUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AiInsightUncheckedCreateNestedManyWithoutUserInput.schema';
import { OllamaOperationUncheckedCreateNestedManyWithoutUserInputObjectSchema as OllamaOperationUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './OllamaOperationUncheckedCreateNestedManyWithoutUserInput.schema';
import { ActorUncheckedCreateNestedManyWithoutUserInputObjectSchema as ActorUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ActorUncheckedCreateNestedManyWithoutUserInput.schema';
import { FreightLoadUncheckedCreateNestedManyWithoutUserInputObjectSchema as FreightLoadUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './FreightLoadUncheckedCreateNestedManyWithoutUserInput.schema'

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
  refreshTokens: z.lazy(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  preference: z.lazy(() => UserPreferenceUncheckedCreateNestedOneWithoutUserInputObjectSchema).optional(),
  providerGrants: z.lazy(() => ProviderGrantUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  chatSessions: z.lazy(() => ChatSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  aiInsights: z.lazy(() => AiInsightUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  ollamaOperations: z.lazy(() => OllamaOperationUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  actors: z.lazy(() => ActorUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  freightLoads: z.lazy(() => FreightLoadUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutTelemetryInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutTelemetryInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutTelemetryInput>;
export const UserUncheckedCreateWithoutTelemetryInputObjectZodSchema = makeSchema();
