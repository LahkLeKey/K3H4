import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDemTileCacheWhereUniqueInputObjectSchema as GeoDemTileCacheWhereUniqueInputObjectSchema } from './GeoDemTileCacheWhereUniqueInput.schema';
import { GeoDemTileCacheCreateWithoutUserInputObjectSchema as GeoDemTileCacheCreateWithoutUserInputObjectSchema } from './GeoDemTileCacheCreateWithoutUserInput.schema';
import { GeoDemTileCacheUncheckedCreateWithoutUserInputObjectSchema as GeoDemTileCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoDemTileCacheUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDemTileCacheWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => GeoDemTileCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoDemTileCacheUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const GeoDemTileCacheCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoDemTileCacheCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDemTileCacheCreateOrConnectWithoutUserInput>;
export const GeoDemTileCacheCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
