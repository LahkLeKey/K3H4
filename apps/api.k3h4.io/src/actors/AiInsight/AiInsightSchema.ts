import * as z from 'zod';

import {ACTOR_TYPES, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {ActorBaseSchema, EntityBaseSchema} from '../../lib/actor-entity-schemas';

export const AiInsightActorSchema = ActorBaseSchema.extend({
  type: z.literal(ACTOR_TYPES.AI_INSIGHT),
});

export const AiInsightEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.AI_INSIGHT),
});

export type AiInsightActor = z.infer<typeof AiInsightActorSchema>;
export type AiInsightEntity = z.infer<typeof AiInsightEntitySchema>;
