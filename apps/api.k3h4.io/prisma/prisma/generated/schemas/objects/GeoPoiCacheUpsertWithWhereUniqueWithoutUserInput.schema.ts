import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoPoiCacheWhereUniqueInputObjectSchema as GeoPoiCacheWhereUniqueInputObjectSchema } from './GeoPoiCacheWhereUniqueInput.schema';
import { GeoPoiCacheUpdateWithoutUserInputObjectSchema as GeoPoiCacheUpdateWithoutUserInputObjectSchema } from './GeoPoiCacheUpdateWithoutUserInput.schema';
import { GeoPoiCacheUncheckedUpdateWithoutUserInputObjectSchema as GeoPoiCacheUncheckedUpdateWithoutUserInputObjectSchema } from './GeoPoiCacheUncheckedUpdateWithoutUserInput.schema';
import { GeoPoiCacheCreateWithoutUserInputObjectSchema as GeoPoiCacheCreateWithoutUserInputObjectSchema } from './GeoPoiCacheCreateWithoutUserInput.schema';
import { GeoPoiCacheUncheckedCreateWithoutUserInputObjectSchema as GeoPoiCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoPoiCacheUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoPoiCacheWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => GeoPoiCacheUpdateWithoutUserInputObjectSchema), z.lazy(() => GeoPoiCacheUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => GeoPoiCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoPoiCacheUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const GeoPoiCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheUpsertWithWhereUniqueWithoutUserInput>;
export const GeoPoiCacheUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
