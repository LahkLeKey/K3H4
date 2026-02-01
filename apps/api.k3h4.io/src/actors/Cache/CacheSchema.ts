import * as z from 'zod';

import {ACTOR_TYPES} from '../../lib/actor-entity-constants';
import {ActorBaseSchema} from '../../lib/actor-entity-schemas';

const CacheActorTypeSchema = z.enum([
  ACTOR_TYPES.WIKIDATA_CACHE,
  ACTOR_TYPES.ENRICHMENT_CACHE,
  ACTOR_TYPES.API_CACHE,
]);

export const CacheActorSchema = ActorBaseSchema.extend({
  type: CacheActorTypeSchema,
});

export type CacheActor = z.infer<typeof CacheActorSchema>;
