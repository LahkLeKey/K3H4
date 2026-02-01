import * as z from 'zod';

import {ENTITY_KINDS} from '../../lib/actor-entity-constants';
import {EntityBaseSchema} from '../../lib/actor-entity-schemas';

export const PointOfSaleTicketEntitySchema = EntityBaseSchema.extend({
  kind: z.literal(ENTITY_KINDS.POINT_OF_SALE_TICKET),
});

export type PointOfSaleTicketEntity =
    z.infer<typeof PointOfSaleTicketEntitySchema>;
