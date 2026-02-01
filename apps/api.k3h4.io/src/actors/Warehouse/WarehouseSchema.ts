import * as z from 'zod';

import {ACTOR_TYPES, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {ActorBaseSchema, EntityBaseSchema} from '../../lib/actor-entity-schemas';

export const WarehouseActorSchema = ActorBaseSchema.extend({
  type: z.literal(ACTOR_TYPES.WAREHOUSE),
});

export const WarehouseItemEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.WAREHOUSE_ITEM),
});

export type WarehouseActor = z.infer<typeof WarehouseActorSchema>;
export type WarehouseItemEntity = z.infer<typeof WarehouseItemEntitySchema>;
