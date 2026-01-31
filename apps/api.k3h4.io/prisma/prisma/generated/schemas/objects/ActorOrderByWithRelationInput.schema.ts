import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { EntityOrderByRelationAggregateInputObjectSchema as EntityOrderByRelationAggregateInputObjectSchema } from './EntityOrderByRelationAggregateInput.schema';
import { ActorCacheOrderByRelationAggregateInputObjectSchema as ActorCacheOrderByRelationAggregateInputObjectSchema } from './ActorCacheOrderByRelationAggregateInput.schema';
import { GeoDirectionOrderByRelationAggregateInputObjectSchema as GeoDirectionOrderByRelationAggregateInputObjectSchema } from './GeoDirectionOrderByRelationAggregateInput.schema';
import { MaptilerQueryOrderByRelationAggregateInputObjectSchema as MaptilerQueryOrderByRelationAggregateInputObjectSchema } from './MaptilerQueryOrderByRelationAggregateInput.schema';
import { MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema as MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema } from './MaptilerCacheEntryOrderByRelationAggregateInput.schema';
import { OsrmCacheEntryOrderByRelationAggregateInputObjectSchema as OsrmCacheEntryOrderByRelationAggregateInputObjectSchema } from './OsrmCacheEntryOrderByRelationAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  label: SortOrderSchema.optional(),
  type: SortOrderSchema.optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  source: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  entities: z.lazy(() => EntityOrderByRelationAggregateInputObjectSchema).optional(),
  caches: z.lazy(() => ActorCacheOrderByRelationAggregateInputObjectSchema).optional(),
  geoDirections: z.lazy(() => GeoDirectionOrderByRelationAggregateInputObjectSchema).optional(),
  maptilerQueries: z.lazy(() => MaptilerQueryOrderByRelationAggregateInputObjectSchema).optional(),
  maptilerCacheEntries: z.lazy(() => MaptilerCacheEntryOrderByRelationAggregateInputObjectSchema).optional(),
  osrmCacheEntries: z.lazy(() => OsrmCacheEntryOrderByRelationAggregateInputObjectSchema).optional()
}).strict();
export const ActorOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.ActorOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.ActorOrderByWithRelationInput>;
export const ActorOrderByWithRelationInputObjectZodSchema = makeSchema();
