import * as z from 'zod';

import {ACTOR_TYPES} from '../../lib/actor-entity-constants';
import {ActorBaseSchema} from '../../lib/actor-entity-schemas';

export const GeoActorSchema = ActorBaseSchema.extend({
  type: z.literal(ACTOR_TYPES.GEO),
});

export type GeoActor = z.infer<typeof GeoActorSchema>;
