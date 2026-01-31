import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCountOutputTypeCountRefreshTokensArgsObjectSchema as UserCountOutputTypeCountRefreshTokensArgsObjectSchema } from './UserCountOutputTypeCountRefreshTokensArgs.schema';
import { UserCountOutputTypeCountTelemetryArgsObjectSchema as UserCountOutputTypeCountTelemetryArgsObjectSchema } from './UserCountOutputTypeCountTelemetryArgs.schema';
import { UserCountOutputTypeCountFreightLoadsArgsObjectSchema as UserCountOutputTypeCountFreightLoadsArgsObjectSchema } from './UserCountOutputTypeCountFreightLoadsArgs.schema';
import { UserCountOutputTypeCountProviderGrantsArgsObjectSchema as UserCountOutputTypeCountProviderGrantsArgsObjectSchema } from './UserCountOutputTypeCountProviderGrantsArgs.schema';
import { UserCountOutputTypeCountGeoDirectionsArgsObjectSchema as UserCountOutputTypeCountGeoDirectionsArgsObjectSchema } from './UserCountOutputTypeCountGeoDirectionsArgs.schema';
import { UserCountOutputTypeCountChatSessionsArgsObjectSchema as UserCountOutputTypeCountChatSessionsArgsObjectSchema } from './UserCountOutputTypeCountChatSessionsArgs.schema';
import { UserCountOutputTypeCountAiInsightsArgsObjectSchema as UserCountOutputTypeCountAiInsightsArgsObjectSchema } from './UserCountOutputTypeCountAiInsightsArgs.schema';
import { UserCountOutputTypeCountOllamaOperationsArgsObjectSchema as UserCountOutputTypeCountOllamaOperationsArgsObjectSchema } from './UserCountOutputTypeCountOllamaOperationsArgs.schema';
import { UserCountOutputTypeCountActorsArgsObjectSchema as UserCountOutputTypeCountActorsArgsObjectSchema } from './UserCountOutputTypeCountActorsArgs.schema'

const makeSchema = () => z.object({
  refreshTokens: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountRefreshTokensArgsObjectSchema)]).optional(),
  telemetry: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountTelemetryArgsObjectSchema)]).optional(),
  freightLoads: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountFreightLoadsArgsObjectSchema)]).optional(),
  providerGrants: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountProviderGrantsArgsObjectSchema)]).optional(),
  geoDirections: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountGeoDirectionsArgsObjectSchema)]).optional(),
  chatSessions: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountChatSessionsArgsObjectSchema)]).optional(),
  aiInsights: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountAiInsightsArgsObjectSchema)]).optional(),
  ollamaOperations: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountOllamaOperationsArgsObjectSchema)]).optional(),
  actors: z.union([z.boolean(), z.lazy(() => UserCountOutputTypeCountActorsArgsObjectSchema)]).optional()
}).strict();
export const UserCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.UserCountOutputTypeSelect>;
export const UserCountOutputTypeSelectObjectZodSchema = makeSchema();
