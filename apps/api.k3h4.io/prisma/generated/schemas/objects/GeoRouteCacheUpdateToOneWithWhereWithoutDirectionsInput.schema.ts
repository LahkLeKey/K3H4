import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheWhereInputObjectSchema as GeoRouteCacheWhereInputObjectSchema } from './GeoRouteCacheWhereInput.schema';
import { GeoRouteCacheUpdateWithoutDirectionsInputObjectSchema as GeoRouteCacheUpdateWithoutDirectionsInputObjectSchema } from './GeoRouteCacheUpdateWithoutDirectionsInput.schema';
import { GeoRouteCacheUncheckedUpdateWithoutDirectionsInputObjectSchema as GeoRouteCacheUncheckedUpdateWithoutDirectionsInputObjectSchema } from './GeoRouteCacheUncheckedUpdateWithoutDirectionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoRouteCacheWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => GeoRouteCacheUpdateWithoutDirectionsInputObjectSchema), z.lazy(() => GeoRouteCacheUncheckedUpdateWithoutDirectionsInputObjectSchema)])
}).strict();
export const GeoRouteCacheUpdateToOneWithWhereWithoutDirectionsInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheUpdateToOneWithWhereWithoutDirectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheUpdateToOneWithWhereWithoutDirectionsInput>;
export const GeoRouteCacheUpdateToOneWithWhereWithoutDirectionsInputObjectZodSchema = makeSchema();
