import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoPoiCacheScalarWhereInputObjectSchema as GeoPoiCacheScalarWhereInputObjectSchema } from './GeoPoiCacheScalarWhereInput.schema';
import { GeoPoiCacheUpdateManyMutationInputObjectSchema as GeoPoiCacheUpdateManyMutationInputObjectSchema } from './GeoPoiCacheUpdateManyMutationInput.schema';
import { GeoPoiCacheUncheckedUpdateManyWithoutUserInputObjectSchema as GeoPoiCacheUncheckedUpdateManyWithoutUserInputObjectSchema } from './GeoPoiCacheUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoPoiCacheScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => GeoPoiCacheUpdateManyMutationInputObjectSchema), z.lazy(() => GeoPoiCacheUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const GeoPoiCacheUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheUpdateManyWithWhereWithoutUserInput>;
export const GeoPoiCacheUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
