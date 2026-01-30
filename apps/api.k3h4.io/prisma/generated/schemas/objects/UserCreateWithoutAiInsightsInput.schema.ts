import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { RefreshTokenCreateNestedManyWithoutUserInputObjectSchema as RefreshTokenCreateNestedManyWithoutUserInputObjectSchema } from './RefreshTokenCreateNestedManyWithoutUserInput.schema';
import { UserPreferenceCreateNestedOneWithoutUserInputObjectSchema as UserPreferenceCreateNestedOneWithoutUserInputObjectSchema } from './UserPreferenceCreateNestedOneWithoutUserInput.schema';
import { TelemetryEventCreateNestedManyWithoutUserInputObjectSchema as TelemetryEventCreateNestedManyWithoutUserInputObjectSchema } from './TelemetryEventCreateNestedManyWithoutUserInput.schema';
import { FreightLoadCreateNestedManyWithoutUserInputObjectSchema as FreightLoadCreateNestedManyWithoutUserInputObjectSchema } from './FreightLoadCreateNestedManyWithoutUserInput.schema';
import { PosStoreCreateNestedManyWithoutUserInputObjectSchema as PosStoreCreateNestedManyWithoutUserInputObjectSchema } from './PosStoreCreateNestedManyWithoutUserInput.schema';
import { PosTicketCreateNestedManyWithoutUserInputObjectSchema as PosTicketCreateNestedManyWithoutUserInputObjectSchema } from './PosTicketCreateNestedManyWithoutUserInput.schema';
import { CulinaryMenuItemCreateNestedManyWithoutUserInputObjectSchema as CulinaryMenuItemCreateNestedManyWithoutUserInputObjectSchema } from './CulinaryMenuItemCreateNestedManyWithoutUserInput.schema';
import { CulinaryPrepTaskCreateNestedManyWithoutUserInputObjectSchema as CulinaryPrepTaskCreateNestedManyWithoutUserInputObjectSchema } from './CulinaryPrepTaskCreateNestedManyWithoutUserInput.schema';
import { CulinarySupplierNeedCreateNestedManyWithoutUserInputObjectSchema as CulinarySupplierNeedCreateNestedManyWithoutUserInputObjectSchema } from './CulinarySupplierNeedCreateNestedManyWithoutUserInput.schema';
import { ProviderGrantCreateNestedManyWithoutUserInputObjectSchema as ProviderGrantCreateNestedManyWithoutUserInputObjectSchema } from './ProviderGrantCreateNestedManyWithoutUserInput.schema';
import { GeoRouteCacheCreateNestedManyWithoutUserInputObjectSchema as GeoRouteCacheCreateNestedManyWithoutUserInputObjectSchema } from './GeoRouteCacheCreateNestedManyWithoutUserInput.schema';
import { GeoDirectionCreateNestedManyWithoutUserInputObjectSchema as GeoDirectionCreateNestedManyWithoutUserInputObjectSchema } from './GeoDirectionCreateNestedManyWithoutUserInput.schema';
import { GeoPoiCacheCreateNestedManyWithoutUserInputObjectSchema as GeoPoiCacheCreateNestedManyWithoutUserInputObjectSchema } from './GeoPoiCacheCreateNestedManyWithoutUserInput.schema';
import { GeoQueryCacheCreateNestedManyWithoutUserInputObjectSchema as GeoQueryCacheCreateNestedManyWithoutUserInputObjectSchema } from './GeoQueryCacheCreateNestedManyWithoutUserInput.schema';
import { MaptilerQueryCreateNestedManyWithoutUserInputObjectSchema as MaptilerQueryCreateNestedManyWithoutUserInputObjectSchema } from './MaptilerQueryCreateNestedManyWithoutUserInput.schema';
import { MaptilerCacheEntryCreateNestedManyWithoutUserInputObjectSchema as MaptilerCacheEntryCreateNestedManyWithoutUserInputObjectSchema } from './MaptilerCacheEntryCreateNestedManyWithoutUserInput.schema';
import { OsrmCacheEntryCreateNestedManyWithoutUserInputObjectSchema as OsrmCacheEntryCreateNestedManyWithoutUserInputObjectSchema } from './OsrmCacheEntryCreateNestedManyWithoutUserInput.schema';
import { GeoStatusLogCreateNestedManyWithoutUserInputObjectSchema as GeoStatusLogCreateNestedManyWithoutUserInputObjectSchema } from './GeoStatusLogCreateNestedManyWithoutUserInput.schema';
import { GeoDemTileCacheCreateNestedManyWithoutUserInputObjectSchema as GeoDemTileCacheCreateNestedManyWithoutUserInputObjectSchema } from './GeoDemTileCacheCreateNestedManyWithoutUserInput.schema';
import { GeoViewHistoryCreateNestedManyWithoutUserInputObjectSchema as GeoViewHistoryCreateNestedManyWithoutUserInputObjectSchema } from './GeoViewHistoryCreateNestedManyWithoutUserInput.schema';
import { ChatSessionCreateNestedManyWithoutUserInputObjectSchema as ChatSessionCreateNestedManyWithoutUserInputObjectSchema } from './ChatSessionCreateNestedManyWithoutUserInput.schema';
import { OllamaOperationCreateNestedManyWithoutUserInputObjectSchema as OllamaOperationCreateNestedManyWithoutUserInputObjectSchema } from './OllamaOperationCreateNestedManyWithoutUserInput.schema';
import { ActorCreateNestedManyWithoutUserInputObjectSchema as ActorCreateNestedManyWithoutUserInputObjectSchema } from './ActorCreateNestedManyWithoutUserInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
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
  posStores: z.lazy(() => PosStoreCreateNestedManyWithoutUserInputObjectSchema).optional(),
  posTickets: z.lazy(() => PosTicketCreateNestedManyWithoutUserInputObjectSchema).optional(),
  culinaryMenuItems: z.lazy(() => CulinaryMenuItemCreateNestedManyWithoutUserInputObjectSchema).optional(),
  culinaryPrepTasks: z.lazy(() => CulinaryPrepTaskCreateNestedManyWithoutUserInputObjectSchema).optional(),
  culinarySupplierNeeds: z.lazy(() => CulinarySupplierNeedCreateNestedManyWithoutUserInputObjectSchema).optional(),
  providerGrants: z.lazy(() => ProviderGrantCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoRouteCaches: z.lazy(() => GeoRouteCacheCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoDirections: z.lazy(() => GeoDirectionCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoPoiCaches: z.lazy(() => GeoPoiCacheCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoQueryCaches: z.lazy(() => GeoQueryCacheCreateNestedManyWithoutUserInputObjectSchema).optional(),
  maptilerQueries: z.lazy(() => MaptilerQueryCreateNestedManyWithoutUserInputObjectSchema).optional(),
  maptilerCacheEntries: z.lazy(() => MaptilerCacheEntryCreateNestedManyWithoutUserInputObjectSchema).optional(),
  osrmCacheEntries: z.lazy(() => OsrmCacheEntryCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoStatusLogs: z.lazy(() => GeoStatusLogCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoDemTileCaches: z.lazy(() => GeoDemTileCacheCreateNestedManyWithoutUserInputObjectSchema).optional(),
  geoViewHistories: z.lazy(() => GeoViewHistoryCreateNestedManyWithoutUserInputObjectSchema).optional(),
  chatSessions: z.lazy(() => ChatSessionCreateNestedManyWithoutUserInputObjectSchema).optional(),
  ollamaOperations: z.lazy(() => OllamaOperationCreateNestedManyWithoutUserInputObjectSchema).optional(),
  actors: z.lazy(() => ActorCreateNestedManyWithoutUserInputObjectSchema).optional()
}).strict();
export const UserCreateWithoutAiInsightsInputObjectSchema: z.ZodType<Prisma.UserCreateWithoutAiInsightsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateWithoutAiInsightsInput>;
export const UserCreateWithoutAiInsightsInputObjectZodSchema = makeSchema();
