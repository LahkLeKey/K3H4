import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionStopWhereUniqueInputObjectSchema as GeoDirectionStopWhereUniqueInputObjectSchema } from './GeoDirectionStopWhereUniqueInput.schema';
import { GeoDirectionStopUpdateWithoutDirectionInputObjectSchema as GeoDirectionStopUpdateWithoutDirectionInputObjectSchema } from './GeoDirectionStopUpdateWithoutDirectionInput.schema';
import { GeoDirectionStopUncheckedUpdateWithoutDirectionInputObjectSchema as GeoDirectionStopUncheckedUpdateWithoutDirectionInputObjectSchema } from './GeoDirectionStopUncheckedUpdateWithoutDirectionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionStopWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => GeoDirectionStopUpdateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionStopUncheckedUpdateWithoutDirectionInputObjectSchema)])
}).strict();
export const GeoDirectionStopUpdateWithWhereUniqueWithoutDirectionInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopUpdateWithWhereUniqueWithoutDirectionInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopUpdateWithWhereUniqueWithoutDirectionInput>;
export const GeoDirectionStopUpdateWithWhereUniqueWithoutDirectionInputObjectZodSchema = makeSchema();
