import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RefreshTokenOrderByRelationAggregateInputObjectSchema as RefreshTokenOrderByRelationAggregateInputObjectSchema } from './RefreshTokenOrderByRelationAggregateInput.schema';
import { UserPreferenceOrderByWithRelationInputObjectSchema as UserPreferenceOrderByWithRelationInputObjectSchema } from './UserPreferenceOrderByWithRelationInput.schema';
import { TelemetryEventOrderByRelationAggregateInputObjectSchema as TelemetryEventOrderByRelationAggregateInputObjectSchema } from './TelemetryEventOrderByRelationAggregateInput.schema';
import { FreightLoadOrderByRelationAggregateInputObjectSchema as FreightLoadOrderByRelationAggregateInputObjectSchema } from './FreightLoadOrderByRelationAggregateInput.schema';
import { PosStoreOrderByRelationAggregateInputObjectSchema as PosStoreOrderByRelationAggregateInputObjectSchema } from './PosStoreOrderByRelationAggregateInput.schema';
import { PosTicketOrderByRelationAggregateInputObjectSchema as PosTicketOrderByRelationAggregateInputObjectSchema } from './PosTicketOrderByRelationAggregateInput.schema';
import { CulinaryMenuItemOrderByRelationAggregateInputObjectSchema as CulinaryMenuItemOrderByRelationAggregateInputObjectSchema } from './CulinaryMenuItemOrderByRelationAggregateInput.schema';
import { CulinaryPrepTaskOrderByRelationAggregateInputObjectSchema as CulinaryPrepTaskOrderByRelationAggregateInputObjectSchema } from './CulinaryPrepTaskOrderByRelationAggregateInput.schema';
import { CulinarySupplierNeedOrderByRelationAggregateInputObjectSchema as CulinarySupplierNeedOrderByRelationAggregateInputObjectSchema } from './CulinarySupplierNeedOrderByRelationAggregateInput.schema';
import { ProviderGrantOrderByRelationAggregateInputObjectSchema as ProviderGrantOrderByRelationAggregateInputObjectSchema } from './ProviderGrantOrderByRelationAggregateInput.schema';
import { GeoRouteCacheOrderByRelationAggregateInputObjectSchema as GeoRouteCacheOrderByRelationAggregateInputObjectSchema } from './GeoRouteCacheOrderByRelationAggregateInput.schema';
import { GeoDirectionOrderByRelationAggregateInputObjectSchema as GeoDirectionOrderByRelationAggregateInputObjectSchema } from './GeoDirectionOrderByRelationAggregateInput.schema';
import { GeoPoiCacheOrderByRelationAggregateInputObjectSchema as GeoPoiCacheOrderByRelationAggregateInputObjectSchema } from './GeoPoiCacheOrderByRelationAggregateInput.schema';
import { GeoQueryCacheOrderByRelationAggregateInputObjectSchema as GeoQueryCacheOrderByRelationAggregateInputObjectSchema } from './GeoQueryCacheOrderByRelationAggregateInput.schema';
import { MaptilerQueryOrderByRelationAggregateInputObjectSchema as MaptilerQueryOrderByRelationAggregateInputObjectSchema } from './MaptilerQueryOrderByRelationAggregateInput.schema';
import { MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema as MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema } from './MaptilerCacheEntryOrderByRelationAggregateInput.schema';
import { OsrmCacheEntryOrderByRelationAggregateInputObjectSchema as OsrmCacheEntryOrderByRelationAggregateInputObjectSchema } from './OsrmCacheEntryOrderByRelationAggregateInput.schema';
import { GeoStatusLogOrderByRelationAggregateInputObjectSchema as GeoStatusLogOrderByRelationAggregateInputObjectSchema } from './GeoStatusLogOrderByRelationAggregateInput.schema';
import { GeoDemTileCacheOrderByRelationAggregateInputObjectSchema as GeoDemTileCacheOrderByRelationAggregateInputObjectSchema } from './GeoDemTileCacheOrderByRelationAggregateInput.schema';
import { GeoViewHistoryOrderByRelationAggregateInputObjectSchema as GeoViewHistoryOrderByRelationAggregateInputObjectSchema } from './GeoViewHistoryOrderByRelationAggregateInput.schema';
import { ChatSessionOrderByRelationAggregateInputObjectSchema as ChatSessionOrderByRelationAggregateInputObjectSchema } from './ChatSessionOrderByRelationAggregateInput.schema';
import { AiInsightOrderByRelationAggregateInputObjectSchema as AiInsightOrderByRelationAggregateInputObjectSchema } from './AiInsightOrderByRelationAggregateInput.schema';
import { OllamaOperationOrderByRelationAggregateInputObjectSchema as OllamaOperationOrderByRelationAggregateInputObjectSchema } from './OllamaOperationOrderByRelationAggregateInput.schema';
import { ActorOrderByRelationAggregateInputObjectSchema as ActorOrderByRelationAggregateInputObjectSchema } from './ActorOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  provider: SortOrderSchema.optional(),
  providerId: SortOrderSchema.optional(),
  k3h4CoinBalance: SortOrderSchema.optional(),
  displayName: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  avatarUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  refreshTokens: z.lazy(() => RefreshTokenOrderByRelationAggregateInputObjectSchema).optional(),
  preference: z.lazy(() => UserPreferenceOrderByWithRelationInputObjectSchema).optional(),
  telemetry: z.lazy(() => TelemetryEventOrderByRelationAggregateInputObjectSchema).optional(),
  freightLoads: z.lazy(() => FreightLoadOrderByRelationAggregateInputObjectSchema).optional(),
  posStores: z.lazy(() => PosStoreOrderByRelationAggregateInputObjectSchema).optional(),
  posTickets: z.lazy(() => PosTicketOrderByRelationAggregateInputObjectSchema).optional(),
  culinaryMenuItems: z.lazy(() => CulinaryMenuItemOrderByRelationAggregateInputObjectSchema).optional(),
  culinaryPrepTasks: z.lazy(() => CulinaryPrepTaskOrderByRelationAggregateInputObjectSchema).optional(),
  culinarySupplierNeeds: z.lazy(() => CulinarySupplierNeedOrderByRelationAggregateInputObjectSchema).optional(),
  providerGrants: z.lazy(() => ProviderGrantOrderByRelationAggregateInputObjectSchema).optional(),
  geoRouteCaches: z.lazy(() => GeoRouteCacheOrderByRelationAggregateInputObjectSchema).optional(),
  geoDirections: z.lazy(() => GeoDirectionOrderByRelationAggregateInputObjectSchema).optional(),
  geoPoiCaches: z.lazy(() => GeoPoiCacheOrderByRelationAggregateInputObjectSchema).optional(),
  geoQueryCaches: z.lazy(() => GeoQueryCacheOrderByRelationAggregateInputObjectSchema).optional(),
  maptilerQueries: z.lazy(() => MaptilerQueryOrderByRelationAggregateInputObjectSchema).optional(),
  maptilerCacheEntries: z.lazy(() => MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema).optional(),
  osrmCacheEntries: z.lazy(() => OsrmCacheEntryOrderByRelationAggregateInputObjectSchema).optional(),
  geoStatusLogs: z.lazy(() => GeoStatusLogOrderByRelationAggregateInputObjectSchema).optional(),
  geoDemTileCaches: z.lazy(() => GeoDemTileCacheOrderByRelationAggregateInputObjectSchema).optional(),
  geoViewHistories: z.lazy(() => GeoViewHistoryOrderByRelationAggregateInputObjectSchema).optional(),
  chatSessions: z.lazy(() => ChatSessionOrderByRelationAggregateInputObjectSchema).optional(),
  aiInsights: z.lazy(() => AiInsightOrderByRelationAggregateInputObjectSchema).optional(),
  ollamaOperations: z.lazy(() => OllamaOperationOrderByRelationAggregateInputObjectSchema).optional(),
  actors: z.lazy(() => ActorOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();
