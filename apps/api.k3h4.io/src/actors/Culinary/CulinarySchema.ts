import * as z from 'zod';

import {ACTOR_TYPES} from '../../lib/actor-entity-constants';
import {ActorBaseSchema} from '../../lib/actor-entity-schemas';

export const CulinaryActorSchema = ActorBaseSchema.extend({
  type: z.literal(ACTOR_TYPES.CULINARY),
});

export type CulinaryActor = z.infer<typeof CulinaryActorSchema>;
