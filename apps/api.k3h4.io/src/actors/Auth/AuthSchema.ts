import * as z from 'zod';

import {ACTOR_TYPES} from '../../lib/actor-entity-constants';
import {ActorBaseSchema} from '../../lib/actor-entity-schemas';

export const AuthActorSchema = ActorBaseSchema.extend({
  type: z.literal(ACTOR_TYPES.AUTH),
});

export type AuthActor = z.infer<typeof AuthActorSchema>;
