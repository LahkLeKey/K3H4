import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { FreightLoadArgsObjectSchema as FreightLoadArgsObjectSchema } from './FreightLoadArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  freightLoad: z.union([z.boolean(), z.lazy(() => FreightLoadArgsObjectSchema)]).optional()
}).strict();
export const WarehouseItemIncludeObjectSchema: z.ZodType<Prisma.WarehouseItemInclude> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemInclude>;
export const WarehouseItemIncludeObjectZodSchema = makeSchema();
