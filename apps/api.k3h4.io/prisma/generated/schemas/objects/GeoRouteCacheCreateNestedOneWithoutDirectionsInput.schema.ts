import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheCreateWithoutDirectionsInputObjectSchema as GeoRouteCacheCreateWithoutDirectionsInputObjectSchema } from './GeoRouteCacheCreateWithoutDirectionsInput.schema';
import { GeoRouteCacheUncheckedCreateWithoutDirectionsInputObjectSchema as GeoRouteCacheUncheckedCreateWithoutDirectionsInputObjectSchema } from './GeoRouteCacheUncheckedCreateWithoutDirectionsInput.schema';
import { GeoRouteCacheCreateOrConnectWithoutDirectionsInputObjectSchema as GeoRouteCacheCreateOrConnectWithoutDirectionsInputObjectSchema } from './GeoRouteCacheCreateOrConnectWithoutDirectionsInput.schema';
import { GeoRouteCacheWhereUniqueInputObjectSchema as GeoRouteCacheWhereUniqueInputObjectSchema } from './GeoRouteCacheWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoRouteCacheCreateWithoutDirectionsInputObjectSchema), z.lazy(() => GeoRouteCacheUncheckedCreateWithoutDirectionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => GeoRouteCacheCreateOrConnectWithoutDirectionsInputObjectSchema).optional(),
  connect: z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema).optional()
}).strict();
export const GeoRouteCacheCreateNestedOneWithoutDirectionsInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheCreateNestedOneWithoutDirectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheCreateNestedOneWithoutDirectionsInput>;
export const GeoRouteCacheCreateNestedOneWithoutDirectionsInputObjectZodSchema = makeSchema();
