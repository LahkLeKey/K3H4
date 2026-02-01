import * as z from 'zod';

import {ACTOR_TYPES, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {ActorBaseSchema, EntityBaseSchema} from '../../lib/actor-entity-schemas';

export const AssignmentActorSchema = ActorBaseSchema.extend({
  type: z.literal(ACTOR_TYPES.ASSIGNMENT),
});

export const AssignmentEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.ASSIGNMENT),
});

export const AssignmentTimecardEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.ASSIGNMENT_TIMECARD),
});

export const AssignmentPayoutEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.ASSIGNMENT_PAYOUT),
});

export type AssignmentActor = z.infer<typeof AssignmentActorSchema>;
export type AssignmentEntity = z.infer<typeof AssignmentEntitySchema>;
export type AssignmentTimecardEntity =
    z.infer<typeof AssignmentTimecardEntitySchema>;
export type AssignmentPayoutEntity =
    z.infer<typeof AssignmentPayoutEntitySchema>;
