import * as z from 'zod';

import {ACTOR_TYPES, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {ActorBaseSchema, EntityBaseSchema} from '../../lib/actor-entity-schemas';

export const AgricultureActorSchema = ActorBaseSchema.extend({
  type: z.literal(ACTOR_TYPES.AGRICULTURE_FARM),
});

export const AgricultureSlotEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.AGRICULTURE_SLOT),
});

export type AgricultureActor = z.infer<typeof AgricultureActorSchema>;
export type AgricultureSlotEntity = z.infer<typeof AgricultureSlotEntitySchema>;
