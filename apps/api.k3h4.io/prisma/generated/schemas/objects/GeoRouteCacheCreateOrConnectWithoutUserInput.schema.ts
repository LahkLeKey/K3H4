import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoRouteCacheWhereUniqueInputObjectSchema as GeoRouteCacheWhereUniqueInputObjectSchema } from './GeoRouteCacheWhereUniqueInput.schema';
import { GeoRouteCacheCreateWithoutUserInputObjectSchema as GeoRouteCacheCreateWithoutUserInputObjectSchema } from './GeoRouteCacheCreateWithoutUserInput.schema';
import { GeoRouteCacheUncheckedCreateWithoutUserInputObjectSchema as GeoRouteCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoRouteCacheUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoRouteCacheWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => GeoRouteCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoRouteCacheUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const GeoRouteCacheCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheCreateOrConnectWithoutUserInput>;
export const GeoRouteCacheCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
