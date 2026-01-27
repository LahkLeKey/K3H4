import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereInputObjectSchema as GeoDirectionWhereInputObjectSchema } from './GeoDirectionWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => GeoDirectionWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => GeoDirectionWhereInputObjectSchema).optional()
}).strict();
export const GeoDirectionScalarRelationFilterObjectSchema: z.ZodType<Prisma.GeoDirectionScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionScalarRelationFilter>;
export const GeoDirectionScalarRelationFilterObjectZodSchema = makeSchema();
