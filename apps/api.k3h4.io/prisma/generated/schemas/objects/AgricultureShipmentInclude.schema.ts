import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { FreightLoadArgsObjectSchema as FreightLoadArgsObjectSchema } from './FreightLoadArgs.schema';
import { AgricultureInventoryMovementFindManySchema as AgricultureInventoryMovementFindManySchema } from '../findManyAgricultureInventoryMovement.schema';
import { AgricultureShipmentCountOutputTypeArgsObjectSchema as AgricultureShipmentCountOutputTypeArgsObjectSchema } from './AgricultureShipmentCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  freightLoad: z.union([z.boolean(), z.lazy(() => FreightLoadArgsObjectSchema)]).optional(),
  inventoryMovements: z.union([z.boolean(), z.lazy(() => AgricultureInventoryMovementFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => AgricultureShipmentCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const AgricultureShipmentIncludeObjectSchema: z.ZodType<Prisma.AgricultureShipmentInclude> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentInclude>;
export const AgricultureShipmentIncludeObjectZodSchema = makeSchema();
