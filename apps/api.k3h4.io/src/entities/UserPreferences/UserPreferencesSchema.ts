import * as z from 'zod';

import {ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {EntityBaseSchema} from '../../lib/actor-entity-schemas';

export const UserPreferenceEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.SET),
});

export type UserPreferenceEntity = z.infer<typeof UserPreferenceEntitySchema>;
