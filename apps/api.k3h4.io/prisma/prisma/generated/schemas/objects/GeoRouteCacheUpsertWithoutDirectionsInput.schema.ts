import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheUpdateWithoutDirectionsInputObjectSchema as GeoRouteCacheUpdateWithoutDirectionsInputObjectSchema } from './GeoRouteCacheUpdateWithoutDirectionsInput.schema';
import { GeoRouteCacheUncheckedUpdateWithoutDirectionsInputObjectSchema as GeoRouteCacheUncheckedUpdateWithoutDirectionsInputObjectSchema } from './GeoRouteCacheUncheckedUpdateWithoutDirectionsInput.schema';
import { GeoRouteCacheCreateWithoutDirectionsInputObjectSchema as GeoRouteCacheCreateWithoutDirectionsInputObjectSchema } from './GeoRouteCacheCreateWithoutDirectionsInput.schema';
import { GeoRouteCacheUncheckedCreateWithoutDirectionsInputObjectSchema as GeoRouteCacheUncheckedCreateWithoutDirectionsInputObjectSchema } from './GeoRouteCacheUncheckedCreateWithoutDirectionsInput.schema';
import { GeoRouteCacheWhereInputObjectSchema as GeoRouteCacheWhereInputObjectSchema } from './GeoRouteCacheWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => GeoRouteCacheUpdateWithoutDirectionsInputObjectSchema), z.lazy(() => GeoRouteCacheUncheckedUpdateWithoutDirectionsInputObjectSchema)]),
  create: z.union([z.lazy(() => GeoRouteCacheCreateWithoutDirectionsInputObjectSchema), z.lazy(() => GeoRouteCacheUncheckedCreateWithoutDirectionsInputObjectSchema)]),
  where: z.lazy(() => GeoRouteCacheWhereInputObjectSchema).optional()
}).strict();
export const GeoRouteCacheUpsertWithoutDirectionsInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheUpsertWithoutDirectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheUpsertWithoutDirectionsInput>;
export const GeoRouteCacheUpsertWithoutDirectionsInputObjectZodSchema = makeSchema();
