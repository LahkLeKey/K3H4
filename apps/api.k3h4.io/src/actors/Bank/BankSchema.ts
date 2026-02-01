import * as z from 'zod';

import {ACTOR_TYPES} from '../../lib/actor-entity-constants';
import {ActorBaseSchema} from '../../lib/actor-entity-schemas';

export const BankActorSchema = ActorBaseSchema.extend({
  type: z.literal(ACTOR_TYPES.BANK_ACCOUNT),
});

export type BankActor = z.infer<typeof BankActorSchema>;
