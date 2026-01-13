import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PosLineItemWhereInputObjectSchema as PosLineItemWhereInputObjectSchema } from './PosLineItemWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => PosLineItemWhereInputObjectSchema).optional(),
  some: z.lazy(() => PosLineItemWhereInputObjectSchema).optional(),
  none: z.lazy(() => PosLineItemWhereInputObjectSchema).optional()
}).strict();
export const PosLineItemListRelationFilterObjectSchema: z.ZodType<Prisma.PosLineItemListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PosLineItemListRelationFilter>;
export const PosLineItemListRelationFilterObjectZodSchema = makeSchema();
