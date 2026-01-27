import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionUpdateWithoutStopsInputObjectSchema as GeoDirectionUpdateWithoutStopsInputObjectSchema } from './GeoDirectionUpdateWithoutStopsInput.schema';
import { GeoDirectionUncheckedUpdateWithoutStopsInputObjectSchema as GeoDirectionUncheckedUpdateWithoutStopsInputObjectSchema } from './GeoDirectionUncheckedUpdateWithoutStopsInput.schema';
import { GeoDirectionCreateWithoutStopsInputObjectSchema as GeoDirectionCreateWithoutStopsInputObjectSchema } from './GeoDirectionCreateWithoutStopsInput.schema';
import { GeoDirectionUncheckedCreateWithoutStopsInputObjectSchema as GeoDirectionUncheckedCreateWithoutStopsInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutStopsInput.schema';
import { GeoDirectionWhereInputObjectSchema as GeoDirectionWhereInputObjectSchema } from './GeoDirectionWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => GeoDirectionUpdateWithoutStopsInputObjectSchema), z.lazy(() => GeoDirectionUncheckedUpdateWithoutStopsInputObjectSchema)]),
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutStopsInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutStopsInputObjectSchema)]),
  where: z.lazy(() => GeoDirectionWhereInputObjectSchema).optional()
}).strict();
export const GeoDirectionUpsertWithoutStopsInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpsertWithoutStopsInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpsertWithoutStopsInput>;
export const GeoDirectionUpsertWithoutStopsInputObjectZodSchema = makeSchema();
