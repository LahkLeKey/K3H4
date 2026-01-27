import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionCreateWithoutSegmentsInputObjectSchema as GeoDirectionCreateWithoutSegmentsInputObjectSchema } from './GeoDirectionCreateWithoutSegmentsInput.schema';
import { GeoDirectionUncheckedCreateWithoutSegmentsInputObjectSchema as GeoDirectionUncheckedCreateWithoutSegmentsInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutSegmentsInput.schema';
import { GeoDirectionCreateOrConnectWithoutSegmentsInputObjectSchema as GeoDirectionCreateOrConnectWithoutSegmentsInputObjectSchema } from './GeoDirectionCreateOrConnectWithoutSegmentsInput.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutSegmentsInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutSegmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => GeoDirectionCreateOrConnectWithoutSegmentsInputObjectSchema).optional(),
  connect: z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).optional()
}).strict();
export const GeoDirectionCreateNestedOneWithoutSegmentsInputObjectSchema: z.ZodType<Prisma.GeoDirectionCreateNestedOneWithoutSegmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionCreateNestedOneWithoutSegmentsInput>;
export const GeoDirectionCreateNestedOneWithoutSegmentsInputObjectZodSchema = makeSchema();
