import * as z from 'zod';

import {ACTOR_TYPES, ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {ActorBaseSchema, EntityBaseSchema} from '../../lib/actor-entity-schemas';

export const PersonaActorSchema = ActorBaseSchema.extend({
  type: z.literal(ACTOR_TYPES.PERSONA),
});

export const PersonaEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.PERSONA),
});

export const PersonaAttributeEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.PERSONA_ATTRIBUTE),
});

export const PersonaCompatibilityEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.PERSONA_COMPATIBILITY),
});

export type PersonaActor = z.infer<typeof PersonaActorSchema>;
export type PersonaEntity = z.infer<typeof PersonaEntitySchema>;
export type PersonaAttributeEntity =
    z.infer<typeof PersonaAttributeEntitySchema>;
export type PersonaCompatibilityEntity =
    z.infer<typeof PersonaCompatibilityEntitySchema>;
