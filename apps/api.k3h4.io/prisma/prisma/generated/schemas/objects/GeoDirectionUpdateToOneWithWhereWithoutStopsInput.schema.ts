import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereInputObjectSchema as GeoDirectionWhereInputObjectSchema } from './GeoDirectionWhereInput.schema';
import { GeoDirectionUpdateWithoutStopsInputObjectSchema as GeoDirectionUpdateWithoutStopsInputObjectSchema } from './GeoDirectionUpdateWithoutStopsInput.schema';
import { GeoDirectionUncheckedUpdateWithoutStopsInputObjectSchema as GeoDirectionUncheckedUpdateWithoutStopsInputObjectSchema } from './GeoDirectionUncheckedUpdateWithoutStopsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => GeoDirectionUpdateWithoutStopsInputObjectSchema), z.lazy(() => GeoDirectionUncheckedUpdateWithoutStopsInputObjectSchema)])
}).strict();
export const GeoDirectionUpdateToOneWithWhereWithoutStopsInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpdateToOneWithWhereWithoutStopsInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpdateToOneWithWhereWithoutStopsInput>;
export const GeoDirectionUpdateToOneWithWhereWithoutStopsInputObjectZodSchema = makeSchema();
