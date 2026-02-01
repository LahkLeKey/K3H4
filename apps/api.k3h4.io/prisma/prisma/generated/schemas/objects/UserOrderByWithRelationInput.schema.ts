import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { TelemetryEventOrderByRelationAggregateInputObjectSchema as TelemetryEventOrderByRelationAggregateInputObjectSchema } from './TelemetryEventOrderByRelationAggregateInput.schema';
import { ChatSessionOrderByRelationAggregateInputObjectSchema as ChatSessionOrderByRelationAggregateInputObjectSchema } from './ChatSessionOrderByRelationAggregateInput.schema';
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
  telemetry: z.lazy(() => TelemetryEventOrderByRelationAggregateInputObjectSchema).optional(),
  chatSessions: z.lazy(() => ChatSessionOrderByRelationAggregateInputObjectSchema).optional(),
  actors: z.lazy(() => ActorOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const UserOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.UserOrderByWithRelationInput>;
export const UserOrderByWithRelationInputObjectZodSchema = makeSchema();
