import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionSegmentWhereInputObjectSchema as GeoDirectionSegmentWhereInputObjectSchema } from './GeoDirectionSegmentWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => GeoDirectionSegmentWhereInputObjectSchema).optional(),
  some: z.lazy(() => GeoDirectionSegmentWhereInputObjectSchema).optional(),
  none: z.lazy(() => GeoDirectionSegmentWhereInputObjectSchema).optional()
}).strict();
export const GeoDirectionSegmentListRelationFilterObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentListRelationFilter>;
export const GeoDirectionSegmentListRelationFilterObjectZodSchema = makeSchema();
