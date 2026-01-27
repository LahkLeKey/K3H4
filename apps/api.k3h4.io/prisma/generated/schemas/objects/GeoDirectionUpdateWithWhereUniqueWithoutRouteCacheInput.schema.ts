import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionUpdateWithoutRouteCacheInputObjectSchema as GeoDirectionUpdateWithoutRouteCacheInputObjectSchema } from './GeoDirectionUpdateWithoutRouteCacheInput.schema';
import { GeoDirectionUncheckedUpdateWithoutRouteCacheInputObjectSchema as GeoDirectionUncheckedUpdateWithoutRouteCacheInputObjectSchema } from './GeoDirectionUncheckedUpdateWithoutRouteCacheInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => GeoDirectionUpdateWithoutRouteCacheInputObjectSchema), z.lazy(() => GeoDirectionUncheckedUpdateWithoutRouteCacheInputObjectSchema)])
}).strict();
export const GeoDirectionUpdateWithWhereUniqueWithoutRouteCacheInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpdateWithWhereUniqueWithoutRouteCacheInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpdateWithWhereUniqueWithoutRouteCacheInput>;
export const GeoDirectionUpdateWithWhereUniqueWithoutRouteCacheInputObjectZodSchema = makeSchema();
