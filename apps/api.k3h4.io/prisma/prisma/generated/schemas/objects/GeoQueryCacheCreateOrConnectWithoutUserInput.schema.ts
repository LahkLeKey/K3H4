import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoQueryCacheWhereUniqueInputObjectSchema as GeoQueryCacheWhereUniqueInputObjectSchema } from './GeoQueryCacheWhereUniqueInput.schema';
import { GeoQueryCacheCreateWithoutUserInputObjectSchema as GeoQueryCacheCreateWithoutUserInputObjectSchema } from './GeoQueryCacheCreateWithoutUserInput.schema';
import { GeoQueryCacheUncheckedCreateWithoutUserInputObjectSchema as GeoQueryCacheUncheckedCreateWithoutUserInputObjectSchema } from './GeoQueryCacheUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoQueryCacheWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => GeoQueryCacheCreateWithoutUserInputObjectSchema), z.lazy(() => GeoQueryCacheUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const GeoQueryCacheCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheCreateOrConnectWithoutUserInput>;
export const GeoQueryCacheCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
