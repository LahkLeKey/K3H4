import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DecimalFieldUpdateOperationsInputObjectSchema as DecimalFieldUpdateOperationsInputObjectSchema } from './DecimalFieldUpdateOperationsInput.schema';
import { NullableStringFieldUpdateOperationsInputObjectSchema as NullableStringFieldUpdateOperationsInputObjectSchema } from './NullableStringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserPreferenceUpdateOneWithoutUserNestedInputObjectSchema as UserPreferenceUpdateOneWithoutUserNestedInputObjectSchema } from './UserPreferenceUpdateOneWithoutUserNestedInput.schema';
import { TelemetryEventUpdateManyWithoutUserNestedInputObjectSchema as TelemetryEventUpdateManyWithoutUserNestedInputObjectSchema } from './TelemetryEventUpdateManyWithoutUserNestedInput.schema';
import { FreightLoadUpdateManyWithoutUserNestedInputObjectSchema as FreightLoadUpdateManyWithoutUserNestedInputObjectSchema } from './FreightLoadUpdateManyWithoutUserNestedInput.schema';
import { ProviderGrantUpdateManyWithoutUserNestedInputObjectSchema as ProviderGrantUpdateManyWithoutUserNestedInputObjectSchema } from './ProviderGrantUpdateManyWithoutUserNestedInput.schema';
import { GeoRouteCacheUpdateManyWithoutUserNestedInputObjectSchema as GeoRouteCacheUpdateManyWithoutUserNestedInputObjectSchema } from './GeoRouteCacheUpdateManyWithoutUserNestedInput.schema';
import { GeoDirectionUpdateManyWithoutUserNestedInputObjectSchema as GeoDirectionUpdateManyWithoutUserNestedInputObjectSchema } from './GeoDirectionUpdateManyWithoutUserNestedInput.schema';
import { GeoPoiCacheUpdateManyWithoutUserNestedInputObjectSchema as GeoPoiCacheUpdateManyWithoutUserNestedInputObjectSchema } from './GeoPoiCacheUpdateManyWithoutUserNestedInput.schema';
import { GeoQueryCacheUpdateManyWithoutUserNestedInputObjectSchema as GeoQueryCacheUpdateManyWithoutUserNestedInputObjectSchema } from './GeoQueryCacheUpdateManyWithoutUserNestedInput.schema';
import { MaptilerQueryUpdateManyWithoutUserNestedInputObjectSchema as MaptilerQueryUpdateManyWithoutUserNestedInputObjectSchema } from './MaptilerQueryUpdateManyWithoutUserNestedInput.schema';
import { MaptilerCacheEntryUpdateManyWithoutUserNestedInputObjectSchema as MaptilerCacheEntryUpdateManyWithoutUserNestedInputObjectSchema } from './MaptilerCacheEntryUpdateManyWithoutUserNestedInput.schema';
import { OsrmCacheEntryUpdateManyWithoutUserNestedInputObjectSchema as OsrmCacheEntryUpdateManyWithoutUserNestedInputObjectSchema } from './OsrmCacheEntryUpdateManyWithoutUserNestedInput.schema';
import { GeoStatusLogUpdateManyWithoutUserNestedInputObjectSchema as GeoStatusLogUpdateManyWithoutUserNestedInputObjectSchema } from './GeoStatusLogUpdateManyWithoutUserNestedInput.schema';
import { GeoDemTileCacheUpdateManyWithoutUserNestedInputObjectSchema as GeoDemTileCacheUpdateManyWithoutUserNestedInputObjectSchema } from './GeoDemTileCacheUpdateManyWithoutUserNestedInput.schema';
import { GeoViewHistoryUpdateManyWithoutUserNestedInputObjectSchema as GeoViewHistoryUpdateManyWithoutUserNestedInputObjectSchema } from './GeoViewHistoryUpdateManyWithoutUserNestedInput.schema';
import { ChatSessionUpdateManyWithoutUserNestedInputObjectSchema as ChatSessionUpdateManyWithoutUserNestedInputObjectSchema } from './ChatSessionUpdateManyWithoutUserNestedInput.schema';
import { AiInsightUpdateManyWithoutUserNestedInputObjectSchema as AiInsightUpdateManyWithoutUserNestedInputObjectSchema } from './AiInsightUpdateManyWithoutUserNestedInput.schema';
import { OllamaOperationUpdateManyWithoutUserNestedInputObjectSchema as OllamaOperationUpdateManyWithoutUserNestedInputObjectSchema } from './OllamaOperationUpdateManyWithoutUserNestedInput.schema';
import { ActorUpdateManyWithoutUserNestedInputObjectSchema as ActorUpdateManyWithoutUserNestedInputObjectSchema } from './ActorUpdateManyWithoutUserNestedInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
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
  preference: z.lazy(() => UserPreferenceUpdateOneWithoutUserNestedInputObjectSchema).optional(),
  telemetry: z.lazy(() => TelemetryEventUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  freightLoads: z.lazy(() => FreightLoadUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  providerGrants: z.lazy(() => ProviderGrantUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  geoRouteCaches: z.lazy(() => GeoRouteCacheUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  geoDirections: z.lazy(() => GeoDirectionUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  geoPoiCaches: z.lazy(() => GeoPoiCacheUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  geoQueryCaches: z.lazy(() => GeoQueryCacheUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  maptilerQueries: z.lazy(() => MaptilerQueryUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  maptilerCacheEntries: z.lazy(() => MaptilerCacheEntryUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  osrmCacheEntries: z.lazy(() => OsrmCacheEntryUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  geoStatusLogs: z.lazy(() => GeoStatusLogUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  geoDemTileCaches: z.lazy(() => GeoDemTileCacheUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  geoViewHistories: z.lazy(() => GeoViewHistoryUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  chatSessions: z.lazy(() => ChatSessionUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  aiInsights: z.lazy(() => AiInsightUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  ollamaOperations: z.lazy(() => OllamaOperationUpdateManyWithoutUserNestedInputObjectSchema).optional(),
  actors: z.lazy(() => ActorUpdateManyWithoutUserNestedInputObjectSchema).optional()
}).strict();
export const UserUpdateWithoutRefreshTokensInputObjectSchema: z.ZodType<Prisma.UserUpdateWithoutRefreshTokensInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateWithoutRefreshTokensInput>;
export const UserUpdateWithoutRefreshTokensInputObjectZodSchema = makeSchema();
