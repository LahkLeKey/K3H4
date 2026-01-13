import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosStoreCountOutputTypeCountTicketsArgsObjectSchema as PosStoreCountOutputTypeCountTicketsArgsObjectSchema } from './PosStoreCountOutputTypeCountTicketsArgs.schema'

const makeSchema = () => z.object({
  tickets: z.union([z.boolean(), z.lazy(() => PosStoreCountOutputTypeCountTicketsArgsObjectSchema)]).optional()
}).strict();
export const PosStoreCountOutputTypeSelectObjectSchema: z.ZodType<Prisma.PosStoreCountOutputTypeSelect> = makeSchema() as unknown as z.ZodType<Prisma.PosStoreCountOutputTypeSelect>;
export const PosStoreCountOutputTypeSelectObjectZodSchema = makeSchema();
