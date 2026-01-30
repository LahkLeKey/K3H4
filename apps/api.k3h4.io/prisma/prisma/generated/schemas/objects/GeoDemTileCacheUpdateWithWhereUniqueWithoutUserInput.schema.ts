import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDemTileCacheWhereUniqueInputObjectSchema as GeoDemTileCacheWhereUniqueInputObjectSchema } from './GeoDemTileCacheWhereUniqueInput.schema';
import { GeoDemTileCacheUpdateWithoutUserInputObjectSchema as GeoDemTileCacheUpdateWithoutUserInputObjectSchema } from './GeoDemTileCacheUpdateWithoutUserInput.schema';
import { GeoDemTileCacheUncheckedUpdateWithoutUserInputObjectSchema as GeoDemTileCacheUncheckedUpdateWithoutUserInputObjectSchema } from './GeoDemTileCacheUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDemTileCacheWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => GeoDemTileCacheUpdateWithoutUserInputObjectSchema), z.lazy(() => GeoDemTileCacheUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const GeoDemTileCacheUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheUpdateWithWhereUniqueWithoutUserInput>;
export const GeoDemTileCacheUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
