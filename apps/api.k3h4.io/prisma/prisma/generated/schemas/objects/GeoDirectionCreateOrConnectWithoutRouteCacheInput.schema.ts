import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionCreateWithoutRouteCacheInputObjectSchema as GeoDirectionCreateWithoutRouteCacheInputObjectSchema } from './GeoDirectionCreateWithoutRouteCacheInput.schema';
import { GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectSchema as GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutRouteCacheInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutRouteCacheInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectSchema)])
}).strict();
export const GeoDirectionCreateOrConnectWithoutRouteCacheInputObjectSchema: z.ZodType<Prisma.GeoDirectionCreateOrConnectWithoutRouteCacheInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionCreateOrConnectWithoutRouteCacheInput>;
export const GeoDirectionCreateOrConnectWithoutRouteCacheInputObjectZodSchema = makeSchema();
