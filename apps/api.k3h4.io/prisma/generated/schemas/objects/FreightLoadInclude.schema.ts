import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { WarehouseItemFindManySchema as WarehouseItemFindManySchema } from '../findManyWarehouseItem.schema';
import { FreightLoadCountOutputTypeArgsObjectSchema as FreightLoadCountOutputTypeArgsObjectSchema } from './FreightLoadCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  warehouseItems: z.union([z.boolean(), z.lazy(() => WarehouseItemFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => FreightLoadCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const FreightLoadIncludeObjectSchema: z.ZodType<Prisma.FreightLoadInclude> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadInclude>;
export const FreightLoadIncludeObjectZodSchema = makeSchema();
