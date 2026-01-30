import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ProviderGrantWhereInputObjectSchema as ProviderGrantWhereInputObjectSchema } from './ProviderGrantWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ProviderGrantWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountProviderGrantsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountProviderGrantsArgsObjectZodSchema = makeSchema();
