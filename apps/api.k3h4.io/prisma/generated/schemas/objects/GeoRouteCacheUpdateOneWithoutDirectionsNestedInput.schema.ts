import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheCreateWithoutDirectionsInputObjectSchema as GeoRouteCacheCreateWithoutDirectionsInputObjectSchema } from './GeoRouteCacheCreateWithoutDirectionsInput.schema';
import { GeoRouteCacheUncheckedCreateWithoutDirectionsInputObjectSchema as GeoRouteCacheUncheckedCreateWithoutDirectionsInputObjectSchema } from './GeoRouteCacheUncheckedCreateWithoutDirectionsInput.schema';
import { GeoRouteCacheCreateOrConnectWithoutDirectionsInputObjectSchema as GeoRouteCacheCreateOrConnectWithoutDirectionsInputObjectSchema } from './GeoRouteCacheCreateOrConnectWithoutDirectionsInput.schema';
import { GeoRouteCacheUpsertWithoutDirectionsInputObjectSchema as GeoRouteCacheUpsertWithoutDirectionsInputObjectSchema } from './GeoRouteCacheUpsertWithoutDirectionsInput.schema';
import { GeoRouteCacheWhereInputObjectSchema as GeoRouteCacheWhereInputObjectSchema } from './GeoRouteCacheWhereInput.schema';
import { GeoRouteCacheWhereUniqueInputObjectSchema as GeoRouteCacheWhereUniqueInputObjectSchema } from './GeoRouteCacheWhereUniqueInput.schema';
import { GeoRouteCacheUpdateToOneWithWhereWithoutDirectionsInputObjectSchema as GeoRouteCacheUpdateToOneWithWhereWithoutDirectionsInputObjectSchema } from './GeoRouteCacheUpdateToOneWithWhereWithoutDirectionsInput.schema';
import { GeoRouteCacheUpdateWithoutDirectionsInputObjectSchema as GeoRouteCacheUpdateWithoutDirectionsInputObjectSchema } from './GeoRouteCacheUpdateWithoutDirectionsInput.schema';
import { GeoRouteCacheUncheckedUpdateWithoutDirectionsInputObjectSchema as GeoRouteCacheUncheckedUpdateWithoutDirectionsInputObjectSchema } from './GeoRouteCacheUncheckedUpdateWithoutDirectionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoRouteCacheCreateWithoutDirectionsInputObjectSchema), z.lazy(() => GeoRouteCacheUncheckedCreateWithoutDirectionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => GeoRouteCacheCreateOrConnectWithoutDirectionsInputObjectSchema).optional(),
  upsert: z.lazy(() => GeoRouteCacheUpsertWithoutDirectionsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => GeoRouteCacheWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => GeoRouteCacheWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => GeoRouteCacheUpdateToOneWithWhereWithoutDirectionsInputObjectSchema), z.lazy(() => GeoRouteCacheUpdateWithoutDirectionsInputObjectSchema), z.lazy(() => GeoRouteCacheUncheckedUpdateWithoutDirectionsInputObjectSchema)]).optional()
}).strict();
export const GeoRouteCacheUpdateOneWithoutDirectionsNestedInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheUpdateOneWithoutDirectionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheUpdateOneWithoutDirectionsNestedInput>;
export const GeoRouteCacheUpdateOneWithoutDirectionsNestedInputObjectZodSchema = makeSchema();
