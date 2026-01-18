import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheWhereUniqueInputObjectSchema as GeoRouteCacheWhereUniqueInputObjectSchema } from './GeoRouteCacheWhereUniqueInput.schema';
import { GeoRouteCacheUpdateWithoutUserInputObjectSchema as GeoRouteCacheUpdateWithoutUserInputObjectSchema } from './GeoRouteCacheUpdateWithoutUserInput.schema';
import { GeoRouteCacheUncheckedUpdateWithoutUserInputObjectSchema as GeoRouteCacheUncheckedUpdateWithoutUserInputObjectSchema } from './GeoRouteCacheUncheckedUpdateWithoutUserInput.schema';
import { GeoRouteCacheCreateWithoutUserInputObjectSchema as GeoRouteCacheCreateWithoutUserInputObjectSchema } from './GeoRouteCacheCreateWithoutUserInput.schema';
import { GeoRouteCacheUncheckedCreateWithoutUserInputObjectSchema as GeoRouteCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoRouteCacheUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => GeoRouteCacheUpdateWithoutUserInputObjectSchema), z.lazy(() => GeoRouteCacheUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => GeoRouteCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoRouteCacheUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const GeoRouteCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheUpsertWithWhereUniqueWithoutUserInput>;
export const GeoRouteCacheUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
