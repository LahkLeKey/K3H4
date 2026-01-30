import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionCreateWithoutSegmentsInputObjectSchema as GeoDirectionCreateWithoutSegmentsInputObjectSchema } from './GeoDirectionCreateWithoutSegmentsInput.schema';
import { GeoDirectionUncheckedCreateWithoutSegmentsInputObjectSchema as GeoDirectionUncheckedCreateWithoutSegmentsInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutSegmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutSegmentsInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutSegmentsInputObjectSchema)])
}).strict();
export const GeoDirectionCreateOrConnectWithoutSegmentsInputObjectSchema: z.ZodType<Prisma.GeoDirectionCreateOrConnectWithoutSegmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionCreateOrConnectWithoutSegmentsInput>;
export const GeoDirectionCreateOrConnectWithoutSegmentsInputObjectZodSchema = makeSchema();
