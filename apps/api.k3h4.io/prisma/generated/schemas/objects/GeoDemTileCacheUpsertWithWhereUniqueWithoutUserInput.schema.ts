import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDemTileCacheWhereUniqueInputObjectSchema as GeoDemTileCacheWhereUniqueInputObjectSchema } from './GeoDemTileCacheWhereUniqueInput.schema';
import { GeoDemTileCacheUpdateWithoutUserInputObjectSchema as GeoDemTileCacheUpdateWithoutUserInputObjectSchema } from './GeoDemTileCacheUpdateWithoutUserInput.schema';
import { GeoDemTileCacheUncheckedUpdateWithoutUserInputObjectSchema as GeoDemTileCacheUncheckedUpdateWithoutUserInputObjectSchema } from './GeoDemTileCacheUncheckedUpdateWithoutUserInput.schema';
import { GeoDemTileCacheCreateWithoutUserInputObjectSchema as GeoDemTileCacheCreateWithoutUserInputObjectSchema } from './GeoDemTileCacheCreateWithoutUserInput.schema';
import { GeoDemTileCacheUncheckedCreateWithoutUserInputObjectSchema as GeoDemTileCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoDemTileCacheUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDemTileCacheWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => GeoDemTileCacheUpdateWithoutUserInputObjectSchema), z.lazy(() => GeoDemTileCacheUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => GeoDemTileCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoDemTileCacheUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const GeoDemTileCacheUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheUpsertWithWhereUniqueWithoutUserInput>;
export const GeoDemTileCacheUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
