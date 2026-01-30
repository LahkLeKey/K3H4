import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionUpdateWithoutRouteCacheInputObjectSchema as GeoDirectionUpdateWithoutRouteCacheInputObjectSchema } from './GeoDirectionUpdateWithoutRouteCacheInput.schema';
import { GeoDirectionUncheckedUpdateWithoutRouteCacheInputObjectSchema as GeoDirectionUncheckedUpdateWithoutRouteCacheInputObjectSchema } from './GeoDirectionUncheckedUpdateWithoutRouteCacheInput.schema';
import { GeoDirectionCreateWithoutRouteCacheInputObjectSchema as GeoDirectionCreateWithoutRouteCacheInputObjectSchema } from './GeoDirectionCreateWithoutRouteCacheInput.schema';
import { GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectSchema as GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutRouteCacheInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => GeoDirectionUpdateWithoutRouteCacheInputObjectSchema), z.lazy(() => GeoDirectionUncheckedUpdateWithoutRouteCacheInputObjectSchema)]),
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutRouteCacheInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectSchema)])
}).strict();
export const GeoDirectionUpsertWithWhereUniqueWithoutRouteCacheInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpsertWithWhereUniqueWithoutRouteCacheInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpsertWithWhereUniqueWithoutRouteCacheInput>;
export const GeoDirectionUpsertWithWhereUniqueWithoutRouteCacheInputObjectZodSchema = makeSchema();
