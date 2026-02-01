import * as z from 'zod';

import {ACTOR_TYPES} from '../../lib/actor-entity-constants';
import {ActorBaseSchema} from '../../lib/actor-entity-schemas';

export const OllamaOperationsActorSchema = ActorBaseSchema.extend({
  type: z.literal(ACTOR_TYPES.AI_OPERATION),
});

export type OllamaOperationsActor = z.infer<typeof OllamaOperationsActorSchema>;
