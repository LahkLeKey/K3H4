import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheWhereUniqueInputObjectSchema as GeoRouteCacheWhereUniqueInputObjectSchema } from './GeoRouteCacheWhereUniqueInput.schema';
import { GeoRouteCacheCreateWithoutDirectionsInputObjectSchema as GeoRouteCacheCreateWithoutDirectionsInputObjectSchema } from './GeoRouteCacheCreateWithoutDirectionsInput.schema';
import { GeoRouteCacheUncheckedCreateWithoutDirectionsInputObjectSchema as GeoRouteCacheUncheckedCreateWithoutDirectionsInputObjectSchema } from './GeoRouteCacheUncheckedCreateWithoutDirectionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => GeoRouteCacheCreateWithoutDirectionsInputObjectSchema), z.lazy(() => GeoRouteCacheUncheckedCreateWithoutDirectionsInputObjectSchema)])
}).strict();
export const GeoRouteCacheCreateOrConnectWithoutDirectionsInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheCreateOrConnectWithoutDirectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheCreateOrConnectWithoutDirectionsInput>;
export const GeoRouteCacheCreateOrConnectWithoutDirectionsInputObjectZodSchema = makeSchema();
