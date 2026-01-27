import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionStopWhereUniqueInputObjectSchema as GeoDirectionStopWhereUniqueInputObjectSchema } from './GeoDirectionStopWhereUniqueInput.schema';
import { GeoDirectionStopUpdateWithoutDirectionInputObjectSchema as GeoDirectionStopUpdateWithoutDirectionInputObjectSchema } from './GeoDirectionStopUpdateWithoutDirectionInput.schema';
import { GeoDirectionStopUncheckedUpdateWithoutDirectionInputObjectSchema as GeoDirectionStopUncheckedUpdateWithoutDirectionInputObjectSchema } from './GeoDirectionStopUncheckedUpdateWithoutDirectionInput.schema';
import { GeoDirectionStopCreateWithoutDirectionInputObjectSchema as GeoDirectionStopCreateWithoutDirectionInputObjectSchema } from './GeoDirectionStopCreateWithoutDirectionInput.schema';
import { GeoDirectionStopUncheckedCreateWithoutDirectionInputObjectSchema as GeoDirectionStopUncheckedCreateWithoutDirectionInputObjectSchema } from './GeoDirectionStopUncheckedCreateWithoutDirectionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionStopWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => GeoDirectionStopUpdateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionStopUncheckedUpdateWithoutDirectionInputObjectSchema)]),
  create: z.union([z.lazy(() => GeoDirectionStopCreateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionStopUncheckedCreateWithoutDirectionInputObjectSchema)])
}).strict();
export const GeoDirectionStopUpsertWithWhereUniqueWithoutDirectionInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopUpsertWithWhereUniqueWithoutDirectionInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopUpsertWithWhereUniqueWithoutDirectionInput>;
export const GeoDirectionStopUpsertWithWhereUniqueWithoutDirectionInputObjectZodSchema = makeSchema();
