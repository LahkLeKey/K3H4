import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereInputObjectSchema as GeoDirectionWhereInputObjectSchema } from './GeoDirectionWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => GeoDirectionWhereInputObjectSchema).optional(),
  some: z.lazy(() => GeoDirectionWhereInputObjectSchema).optional(),
  none: z.lazy(() => GeoDirectionWhereInputObjectSchema).optional()
}).strict();
export const GeoDirectionListRelationFilterObjectSchema: z.ZodType<Prisma.GeoDirectionListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionListRelationFilter>;
export const GeoDirectionListRelationFilterObjectZodSchema = makeSchema();
