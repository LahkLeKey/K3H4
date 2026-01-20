import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoQueryCacheWhereUniqueInputObjectSchema as GeoQueryCacheWhereUniqueInputObjectSchema } from './GeoQueryCacheWhereUniqueInput.schema';
import { GeoQueryCacheUpdateWithoutUserInputObjectSchema as GeoQueryCacheUpdateWithoutUserInputObjectSchema } from './GeoQueryCacheUpdateWithoutUserInput.schema';
import { GeoQueryCacheUncheckedUpdateWithoutUserInputObjectSchema as GeoQueryCacheUncheckedUpdateWithoutUserInputObjectSchema } from './GeoQueryCacheUncheckedUpdateWithoutUserInput.schema';
import { GeoQueryCacheCreateWithoutUserInputObjectSchema as GeoQueryCacheCreateWithoutUserInputObjectSchema } from './GeoQueryCacheCreateWithoutUserInput.schema';
import { GeoQueryCacheUncheckedCreateWithoutUserInputObjectSchema as GeoQueryCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoQueryCacheUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoQueryCacheWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => GeoQueryCacheUpdateWithoutUserInputObjectSchema), z.lazy(() => GeoQueryCacheUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => GeoQueryCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoQueryCacheUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const GeoQueryCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheUpsertWithWhereUniqueWithoutUserInput>;
export const GeoQueryCacheUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
