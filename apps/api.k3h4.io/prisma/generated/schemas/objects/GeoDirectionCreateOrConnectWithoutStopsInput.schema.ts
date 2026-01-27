import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionCreateWithoutStopsInputObjectSchema as GeoDirectionCreateWithoutStopsInputObjectSchema } from './GeoDirectionCreateWithoutStopsInput.schema';
import { GeoDirectionUncheckedCreateWithoutStopsInputObjectSchema as GeoDirectionUncheckedCreateWithoutStopsInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutStopsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutStopsInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutStopsInputObjectSchema)])
}).strict();
export const GeoDirectionCreateOrConnectWithoutStopsInputObjectSchema: z.ZodType<Prisma.GeoDirectionCreateOrConnectWithoutStopsInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionCreateOrConnectWithoutStopsInput>;
export const GeoDirectionCreateOrConnectWithoutStopsInputObjectZodSchema = makeSchema();
