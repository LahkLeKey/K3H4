import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoPoiCacheWhereUniqueInputObjectSchema as GeoPoiCacheWhereUniqueInputObjectSchema } from './GeoPoiCacheWhereUniqueInput.schema';
import { GeoPoiCacheCreateWithoutUserInputObjectSchema as GeoPoiCacheCreateWithoutUserInputObjectSchema } from './GeoPoiCacheCreateWithoutUserInput.schema';
import { GeoPoiCacheUncheckedCreateWithoutUserInputObjectSchema as GeoPoiCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoPoiCacheUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoPoiCacheWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => GeoPoiCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoPoiCacheUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const GeoPoiCacheCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheCreateOrConnectWithoutUserInput>;
export const GeoPoiCacheCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
