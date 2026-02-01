import * as z from 'zod';

import {ACTOR_TYPES} from '../../lib/actor-entity-constants';
import {ActorBaseSchema} from '../../lib/actor-entity-schemas';

export const TelemetryActorSchema = ActorBaseSchema.extend({
  type: z.literal(ACTOR_TYPES.TELEMETRY),
});

export type TelemetryActor = z.infer<typeof TelemetryActorSchema>;
