import * as z from 'zod';

import {ACTOR_TYPES, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {ActorBaseSchema, EntityBaseSchema} from '../../lib/actor-entity-schemas';

export const StaffingActorSchema = ActorBaseSchema.extend({
  type: z.literal(ACTOR_TYPES.STAFFING),
});

export const StaffingEngagementEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.STAFFING_ENGAGEMENT),
});

export const StaffingRoleEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.STAFFING_ROLE),
});

export const StaffingCandidateEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.STAFFING_CANDIDATE),
});

export const StaffingShiftEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.STAFFING_SHIFT),
});

export const StaffingPlacementEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.STAFFING_PLACEMENT),
});

export type StaffingActor = z.infer<typeof StaffingActorSchema>;
export type StaffingEngagementEntity =
    z.infer<typeof StaffingEngagementEntitySchema>;
export type StaffingRoleEntity = z.infer<typeof StaffingRoleEntitySchema>;
export type StaffingCandidateEntity =
    z.infer<typeof StaffingCandidateEntitySchema>;
export type StaffingShiftEntity = z.infer<typeof StaffingShiftEntitySchema>;
export type StaffingPlacementEntity =
    z.infer<typeof StaffingPlacementEntitySchema>;
