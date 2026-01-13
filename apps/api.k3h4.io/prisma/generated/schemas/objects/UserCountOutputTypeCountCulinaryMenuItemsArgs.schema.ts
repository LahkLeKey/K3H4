import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryMenuItemWhereInputObjectSchema as CulinaryMenuItemWhereInputObjectSchema } from './CulinaryMenuItemWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CulinaryMenuItemWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountCulinaryMenuItemsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountCulinaryMenuItemsArgsObjectZodSchema = makeSchema();
