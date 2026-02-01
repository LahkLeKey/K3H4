import * as z from 'zod';

import {ACTOR_TYPES, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {ActorBaseSchema, EntityBaseSchema} from '../../lib/actor-entity-schemas';

export const FreightActorSchema = ActorBaseSchema.extend({
  type: z.literal(ACTOR_TYPES.FREIGHT),
});

export const FreightLoadEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.FREIGHT_LOAD),
});

export type FreightActor = z.infer<typeof FreightActorSchema>;
export type FreightLoadEntity = z.infer<typeof FreightLoadEntitySchema>;
