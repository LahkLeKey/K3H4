import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { RefreshTokenCreateNestedManyWithoutUserInputObjectSchema as RefreshTokenCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenCreateNestedManyWithoutUserInput.schema';
import { UserPreferenceCreateNestedOneWithoutUserInputObjectSchema as UserPreferenceCreateNestedOneWithoutUserInputObjectSchema } from './UserPreferenceCreateNestedOneWithoutUserInput.schema';
import { TelemetryEventCreateNestedManyWithoutUserInputObjectSchema as TelemetryEventCreateNestedManyWithoutUserInputObjectSchema } from './TelemetryEventCreateNestedManyWithoutUserInput.schema';
import { FreightLoadCreateNestedManyWithoutUserInputObjectSchema as FreightLoadCreateNestedManyWithoutUserInputObjectSchema } from './FreightLoadCreateNestedManyWithoutUserInput.schema';
import { ProviderGrantCreateNestedManyWithoutUserInputObjectSchema as ProviderGrantCreateNestedManyWithoutUserInputObjectSchema } from './ProviderGrantCreateNestedManyWithoutUserInput.schema';
import { GeoDirectionCreateNestedManyWithoutUserInputObjectSchema as GeoDirectionCreateNestedManyWithoutUserInputObjectSchema } from './GeoDirectionCreateNestedManyWithoutUserInput.schema';
import { MaptilerQueryCreateNestedManyWithoutUserInputObjectSchema as MaptilerQueryCreateNestedManyWithoutUserInputObjectSchema } from './MaptilerQueryCreateNestedManyWithoutUserInput.schema';
import { OsrmCacheEntryCreateNestedManyWithoutUserInputObjectSchema as OsrmCacheEntryCreateNestedManyWithoutUserInputObjectSchema } from './OsrmCacheEntryCreateNestedManyWithoutUserInput.schema';
import { ChatSessionCreateNestedManyWithoutUserInputObjectSchema as ChatSessionCreateNestedManyWithoutUserInputObjectSchema } from './ChatSessionCreateNestedManyWithoutUserInput.schema';
import { AiInsightCreateNestedManyWithoutUserInputObjectSchema as AiInsightCreateNestedManyWithoutUserInputObjectSchema } from './AiInsightCreateNestedManyWithoutUserInput.schema';
import { OllamaOperationCreateNestedManyWithoutUserInputObjectSchema as OllamaOperationCreateNestedManyWithoutUserInputObjectSchema } from './OllamaOperationCreateNestedManyWithoutUserInput.schema';
import { ActorCreateNestedManyWithoutUserInputObjectSchema as ActorCreateNestedManyWithoutUserInputObjectSchema } from './ActorCreateNestedManyWithoutUserInput.schema'

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
  refreshTokens: z.lazy(() => RefreshTokenCreateNestedManyWithoutUserInputObjectSchema).optional(),
  preference: z.lazy(() => UserPreferenceCreateNestedOneWithoutUserInputObjectSchema).optional(),
  telemetry: z.lazy(() => TelemetryEventCreateNestedManyWithoutUserInputObjectSchema).optional(),
  freightLoads: z.lazy(() => FreightLoadCreateNestedManyWithoutUserInputObjectSchema).optional(),
  providerGrants: z.lazy(() => ProviderGrantCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoDirections: z.lazy(() => GeoDirectionCreateNestedManyWithoutUserInputObjectSchema).optional(),
  maptilerQueries: z.lazy(() => MaptilerQueryCreateNestedManyWithoutUserInputObjectSchema).optional(),
  osrmCacheEntries: z.lazy(() => OsrmCacheEntryCreateNestedManyWithoutUserInputObjectSchema).optional(),
  chatSessions: z.lazy(() => ChatSessionCreateNestedManyWithoutUserInputObjectSchema).optional(),
  aiInsights: z.lazy(() => AiInsightCreateNestedManyWithoutUserInputObjectSchema).optional(),
  ollamaOperations: z.lazy(() => OllamaOperationCreateNestedManyWithoutUserInputObjectSchema).optional(),
  actors: z.lazy(() => ActorCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutMaptilerCacheEntriesInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutMaptilerCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutMaptilerCacheEntriesInput>;
export const UserCreateWithoutMaptilerCacheEntriesInputObjectZodSchema = makeSchema();
