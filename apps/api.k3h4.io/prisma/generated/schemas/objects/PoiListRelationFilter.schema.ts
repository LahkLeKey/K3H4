import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PoiWhereInputObjectSchema as PoiWhereInputObjectSchema } from './PoiWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => PoiWhereInputObjectSchema).optional(),
  some: z.lazy(() => PoiWhereInputObjectSchema).optional(),
  none: z.lazy(() => PoiWhereInputObjectSchema).optional()
}).strict();
export const PoiListRelationFilterObjectSchema: z.ZodType<Prisma.PoiListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PoiListRelationFilter>;
export const PoiListRelationFilterObjectZodSchema = makeSchema();
