import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { AgricultureInventoryMovementFindManySchema as AgricultureInventoryMovementFindManySchema } from '../findManyAgricultureInventoryMovement.schema';
import { AgricultureInventoryCountOutputTypeArgsObjectSchema as AgricultureInventoryCountOutputTypeArgsObjectSchema } from './AgricultureInventoryCountOutputTypeArgs.schema'

const makeSchema = () => z.object({
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  movements: z.union([z.boolean(), z.lazy(() => AgricultureInventoryMovementFindManySchema)]).optional(),
  _count: z.union([z.boolean(), z.lazy(() => AgricultureInventoryCountOutputTypeArgsObjectSchema)]).optional()
}).strict();
export const AgricultureInventoryIncludeObjectSchema: z.ZodType<Prisma.AgricultureInventoryInclude> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryInclude>;
export const AgricultureInventoryIncludeObjectZodSchema = makeSchema();
