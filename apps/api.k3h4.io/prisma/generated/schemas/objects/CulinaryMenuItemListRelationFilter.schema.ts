import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinaryMenuItemWhereInputObjectSchema as CulinaryMenuItemWhereInputObjectSchema } from './CulinaryMenuItemWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => CulinaryMenuItemWhereInputObjectSchema).optional(),
  some: z.lazy(() => CulinaryMenuItemWhereInputObjectSchema).optional(),
  none: z.lazy(() => CulinaryMenuItemWhereInputObjectSchema).optional()
}).strict();
export const CulinaryMenuItemListRelationFilterObjectSchema: z.ZodType<Prisma.CulinaryMenuItemListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.CulinaryMenuItemListRelationFilter>;
export const CulinaryMenuItemListRelationFilterObjectZodSchema = makeSchema();
