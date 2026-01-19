import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheWhereUniqueInputObjectSchema as GeoRouteCacheWhereUniqueInputObjectSchema } from './GeoRouteCacheWhereUniqueInput.schema';
import { GeoRouteCacheUpdateWithoutUserInputObjectSchema as GeoRouteCacheUpdateWithoutUserInputObjectSchema } from './GeoRouteCacheUpdateWithoutUserInput.schema';
import { GeoRouteCacheUncheckedUpdateWithoutUserInputObjectSchema as GeoRouteCacheUncheckedUpdateWithoutUserInputObjectSchema } from './GeoRouteCacheUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => GeoRouteCacheUpdateWithoutUserInputObjectSchema), z.lazy(() => GeoRouteCacheUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const GeoRouteCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheUpdateWithWhereUniqueWithoutUserInput>;
export const GeoRouteCacheUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
