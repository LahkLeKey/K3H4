import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { RefreshTokenOrderByRelationAggregateInputObjectSchema as RefreshTokenOrderByRelationAggregateInputObjectSchema } from './RefreshTokenOrderByRelationAggregateInput.schema';
import { UserPreferenceOrderByWithRelationInputObjectSchema as UserPreferenceOrderByWithRelationInputObjectSchema } from './UserPreferenceOrderByWithRelationInput.schema';
import { TelemetryEventOrderByRelationAggregateInputObjectSchema as TelemetryEventOrderByRelationAggregateInputObjectSchema } from './TelemetryEventOrderByRelationAggregateInput.schema';
import { FreightLoadOrderByRelationAggregateInputObjectSchema as FreightLoadOrderByRelationAggregateInputObjectSchema } from './FreightLoadOrderByRelationAggregateInput.schema';
import { ProviderGrantOrderByRelationAggregateInputObjectSchema as ProviderGrantOrderByRelationAggregateInputObjectSchema } from './ProviderGrantOrderByRelationAggregateInput.schema';
import { GeoDirectionOrderByRelationAggregateInputObjectSchema as GeoDirectionOrderByRelationAggregateInputObjectSchema } from './GeoDirectionOrderByRelationAggregateInput.schema';
import { MaptilerQueryOrderByRelationAggregateInputObjectSchema as MaptilerQueryOrderByRelationAggregateInputObjectSchema } from './MaptilerQueryOrderByRelationAggregateInput.schema';
import { MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema as MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema } from './MaptilerCacheEntryOrderByRelationAggregateInput.schema';
import { OsrmCacheEntryOrderByRelationAggregateInputObjectSchema as OsrmCacheEntryOrderByRelationAggregateInputObjectSchema } from './OsrmCacheEntryOrderByRelationAggregateInput.schema';
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
  providerGrants: z.lazy(() => ProviderGrantOrderByRelationAggregateInputObjectSchema).optional(),
  geoDirections: z.lazy(() => GeoDirectionOrderByRelationAggregateInputObjectSchema).optional(),
  maptilerQueries: z.lazy(() => MaptilerQueryOrderByRelationAggregateInputObjectSchema).optional(),
  maptilerCacheEntries: z.lazy(() => MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema).optional(),
  osrmCacheEntries: z.lazy(() => OsrmCacheEntryOrderByRelationAggregateInputObjectSchema).optional(),
  chatSessions: z.lazy(() => ChatSessionOrderByRelationAggregateInputObjectSchema).optional(),
  aiInsights: z.lazy(() => AiInsightOrderByRelationAggregateInputObjectSchema).optional(),
  ollamaOperations: z.lazy(() => OllamaOperationOrderByRelationAggregateInputObjectSchema).optional(),
  actors: z.lazy(() => ActorOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();
