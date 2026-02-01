import * as z from 'zod';

import {ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {EntityBaseSchema} from '../../lib/actor-entity-schemas';

export const AuthRefreshTokenEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.AUTH_REFRESH_TOKEN),
});

export const AuthProviderGrantEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.AUTH_PROVIDER_GRANT),
});

export type AuthRefreshTokenEntity =
    z.infer<typeof AuthRefreshTokenEntitySchema>;
export type AuthProviderGrantEntity =
    z.infer<typeof AuthProviderGrantEntitySchema>;
