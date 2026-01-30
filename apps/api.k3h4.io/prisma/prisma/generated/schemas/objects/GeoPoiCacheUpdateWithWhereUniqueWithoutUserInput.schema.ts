import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoPoiCacheWhereUniqueInputObjectSchema as GeoPoiCacheWhereUniqueInputObjectSchema } from './GeoPoiCacheWhereUniqueInput.schema';
import { GeoPoiCacheUpdateWithoutUserInputObjectSchema as GeoPoiCacheUpdateWithoutUserInputObjectSchema } from './GeoPoiCacheUpdateWithoutUserInput.schema';
import { GeoPoiCacheUncheckedUpdateWithoutUserInputObjectSchema as GeoPoiCacheUncheckedUpdateWithoutUserInputObjectSchema } from './GeoPoiCacheUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoPoiCacheWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => GeoPoiCacheUpdateWithoutUserInputObjectSchema), z.lazy(() => GeoPoiCacheUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const GeoPoiCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheUpdateWithWhereUniqueWithoutUserInput>;
export const GeoPoiCacheUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
