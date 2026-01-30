import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionCreateWithoutStopsInputObjectSchema as GeoDirectionCreateWithoutStopsInputObjectSchema } from './GeoDirectionCreateWithoutStopsInput.schema';
import { GeoDirectionUncheckedCreateWithoutStopsInputObjectSchema as GeoDirectionUncheckedCreateWithoutStopsInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutStopsInput.schema';
import { GeoDirectionCreateOrConnectWithoutStopsInputObjectSchema as GeoDirectionCreateOrConnectWithoutStopsInputObjectSchema } from './GeoDirectionCreateOrConnectWithoutStopsInput.schema';
import { GeoDirectionUpsertWithoutStopsInputObjectSchema as GeoDirectionUpsertWithoutStopsInputObjectSchema } from './GeoDirectionUpsertWithoutStopsInput.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionUpdateToOneWithWhereWithoutStopsInputObjectSchema as GeoDirectionUpdateToOneWithWhereWithoutStopsInputObjectSchema } from './GeoDirectionUpdateToOneWithWhereWithoutStopsInput.schema';
import { GeoDirectionUpdateWithoutStopsInputObjectSchema as GeoDirectionUpdateWithoutStopsInputObjectSchema } from './GeoDirectionUpdateWithoutStopsInput.schema';
import { GeoDirectionUncheckedUpdateWithoutStopsInputObjectSchema as GeoDirectionUncheckedUpdateWithoutStopsInputObjectSchema } from './GeoDirectionUncheckedUpdateWithoutStopsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutStopsInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutStopsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => GeoDirectionCreateOrConnectWithoutStopsInputObjectSchema).optional(),
  upsert: z.lazy(() => GeoDirectionUpsertWithoutStopsInputObjectSchema).optional(),
  connect: z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => GeoDirectionUpdateToOneWithWhereWithoutStopsInputObjectSchema), z.lazy(() => GeoDirectionUpdateWithoutStopsInputObjectSchema), z.lazy(() => GeoDirectionUncheckedUpdateWithoutStopsInputObjectSchema)]).optional()
}).strict();
export const GeoDirectionUpdateOneRequiredWithoutStopsNestedInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpdateOneRequiredWithoutStopsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpdateOneRequiredWithoutStopsNestedInput>;
export const GeoDirectionUpdateOneRequiredWithoutStopsNestedInputObjectZodSchema = makeSchema();
