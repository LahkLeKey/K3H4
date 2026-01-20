import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoQueryCacheWhereUniqueInputObjectSchema as GeoQueryCacheWhereUniqueInputObjectSchema } from './GeoQueryCacheWhereUniqueInput.schema';
import { GeoQueryCacheUpdateWithoutUserInputObjectSchema as GeoQueryCacheUpdateWithoutUserInputObjectSchema } from './GeoQueryCacheUpdateWithoutUserInput.schema';
import { GeoQueryCacheUncheckedUpdateWithoutUserInputObjectSchema as GeoQueryCacheUncheckedUpdateWithoutUserInputObjectSchema } from './GeoQueryCacheUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoQueryCacheWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => GeoQueryCacheUpdateWithoutUserInputObjectSchema), z.lazy(() => GeoQueryCacheUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const GeoQueryCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheUpdateWithWhereUniqueWithoutUserInput>;
export const GeoQueryCacheUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
