import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema as RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenUncheckedCreateNestedManyWithoutUserInput.schema';
import { UserPreferenceUncheckedCreateNestedOneWithoutUserInputObjectSchema as UserPreferenceUncheckedCreateNestedOneWithoutUserInputObjectSchema } from './UserPreferenceUncheckedCreateNestedOneWithoutUserInput.schema';
import { TelemetryEventUncheckedCreateNestedManyWithoutUserInputObjectSchema as TelemetryEventUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './TelemetryEventUncheckedCreateNestedManyWithoutUserInput.schema';
import { FreightLoadUncheckedCreateNestedManyWithoutUserInputObjectSchema as FreightLoadUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './FreightLoadUncheckedCreateNestedManyWithoutUserInput.schema';
import { ProviderGrantUncheckedCreateNestedManyWithoutUserInputObjectSchema as ProviderGrantUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ProviderGrantUncheckedCreateNestedManyWithoutUserInput.schema';
import { GeoRouteCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema as GeoRouteCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './GeoRouteCacheUncheckedCreateNestedManyWithoutUserInput.schema';
import { GeoDirectionUncheckedCreateNestedManyWithoutUserInputObjectSchema as GeoDirectionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './GeoDirectionUncheckedCreateNestedManyWithoutUserInput.schema';
import { GeoPoiCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema as GeoPoiCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './GeoPoiCacheUncheckedCreateNestedManyWithoutUserInput.schema';
import { GeoQueryCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema as GeoQueryCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './GeoQueryCacheUncheckedCreateNestedManyWithoutUserInput.schema';
import { MaptilerQueryUncheckedCreateNestedManyWithoutUserInputObjectSchema as MaptilerQueryUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './MaptilerQueryUncheckedCreateNestedManyWithoutUserInput.schema';
import { MaptilerCacheEntryUncheckedCreateNestedManyWithoutUserInputObjectSchema as MaptilerCacheEntryUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './MaptilerCacheEntryUncheckedCreateNestedManyWithoutUserInput.schema';
import { GeoStatusLogUncheckedCreateNestedManyWithoutUserInputObjectSchema as GeoStatusLogUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './GeoStatusLogUncheckedCreateNestedManyWithoutUserInput.schema';
import { GeoDemTileCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema as GeoDemTileCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './GeoDemTileCacheUncheckedCreateNestedManyWithoutUserInput.schema';
import { GeoViewHistoryUncheckedCreateNestedManyWithoutUserInputObjectSchema as GeoViewHistoryUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './GeoViewHistoryUncheckedCreateNestedManyWithoutUserInput.schema';
import { ChatSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema as ChatSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './ChatSessionUncheckedCreateNestedManyWithoutUserInput.schema';
import { AiInsightUncheckedCreateNestedManyWithoutUserInputObjectSchema as AiInsightUncheckedCreateNestedManyWithoutUserInputObjectSchema } from './AiInsightUncheckedCreateNestedManyWithoutUserInput.schema';
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
  refreshTokens: z.lazy(() => RefreshTokenUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  preference: z.lazy(() => UserPreferenceUncheckedCreateNestedOneWithoutUserInputObjectSchema).optional(),
  telemetry: z.lazy(() => TelemetryEventUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  freightLoads: z.lazy(() => FreightLoadUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  providerGrants: z.lazy(() => ProviderGrantUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoRouteCaches: z.lazy(() => GeoRouteCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoDirections: z.lazy(() => GeoDirectionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoPoiCaches: z.lazy(() => GeoPoiCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoQueryCaches: z.lazy(() => GeoQueryCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  maptilerQueries: z.lazy(() => MaptilerQueryUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  maptilerCacheEntries: z.lazy(() => MaptilerCacheEntryUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoStatusLogs: z.lazy(() => GeoStatusLogUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoDemTileCaches: z.lazy(() => GeoDemTileCacheUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoViewHistories: z.lazy(() => GeoViewHistoryUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  chatSessions: z.lazy(() => ChatSessionUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  aiInsights: z.lazy(() => AiInsightUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  ollamaOperations: z.lazy(() => OllamaOperationUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  actors: z.lazy(() => ActorUncheckedCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutOsrmCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUncheckedCreateWithoutOsrmCacheEntriesInput>;
export const UserUncheckedCreateWithoutOsrmCacheEntriesInputObjectZodSchema = makeSchema();
