import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionCreateWithoutStopsInputObjectSchema as GeoDirectionCreateWithoutStopsInputObjectSchema } from './GeoDirectionCreateWithoutStopsInput.schema';
import { GeoDirectionUncheckedCreateWithoutStopsInputObjectSchema as GeoDirectionUncheckedCreateWithoutStopsInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutStopsInput.schema';
import { GeoDirectionCreateOrConnectWithoutStopsInputObjectSchema as GeoDirectionCreateOrConnectWithoutStopsInputObjectSchema } from './GeoDirectionCreateOrConnectWithoutStopsInput.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutStopsInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutStopsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => GeoDirectionCreateOrConnectWithoutStopsInputObjectSchema).optional(),
  connect: z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).optional()
}).strict();
export const GeoDirectionCreateNestedOneWithoutStopsInputObjectSchema: z.ZodType<Prisma.GeoDirectionCreateNestedOneWithoutStopsInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionCreateNestedOneWithoutStopsInput>;
export const GeoDirectionCreateNestedOneWithoutStopsInputObjectZodSchema = makeSchema();
