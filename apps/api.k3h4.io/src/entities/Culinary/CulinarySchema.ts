import * as z from 'zod';

import {ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {EntityBaseSchema} from '../../lib/actor-entity-schemas';

export const CulinaryMenuItemEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.CULINARY_MENU_ITEM),
});

export const CulinaryPrepTaskEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.CULINARY_PREP_TASK),
});

export const CulinarySupplierNeedEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.CULINARY_SUPPLIER_NEED),
});

export type CulinaryMenuItemEntity =
    z.infer<typeof CulinaryMenuItemEntitySchema>;
export type CulinaryPrepTaskEntity =
    z.infer<typeof CulinaryPrepTaskEntitySchema>;
export type CulinarySupplierNeedEntity =
    z.infer<typeof CulinarySupplierNeedEntitySchema>;
