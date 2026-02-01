import * as z from 'zod';

import {ActorInputSchema} from '../../prisma/generated/schemas/variants/input/Actor.input';
import {EntityInputSchema} from '../../prisma/generated/schemas/variants/input/Entity.input';

export const ActorBaseSchema = ActorInputSchema.extend({
  type: z.string(),
});

export const EntityBaseSchema = EntityInputSchema.extend({
  kind: z.string(),
  direction: z.string().optional().nullable(),
});

export type ActorBase = z.infer<typeof ActorBaseSchema>;
export type EntityBase = z.infer<typeof EntityBaseSchema>;
