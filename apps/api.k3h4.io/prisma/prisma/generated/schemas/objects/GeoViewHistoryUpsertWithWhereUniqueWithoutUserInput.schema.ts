import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoViewHistoryWhereUniqueInputObjectSchema as GeoViewHistoryWhereUniqueInputObjectSchema } from './GeoViewHistoryWhereUniqueInput.schema';
import { GeoViewHistoryUpdateWithoutUserInputObjectSchema as GeoViewHistoryUpdateWithoutUserInputObjectSchema } from './GeoViewHistoryUpdateWithoutUserInput.schema';
import { GeoViewHistoryUncheckedUpdateWithoutUserInputObjectSchema as GeoViewHistoryUncheckedUpdateWithoutUserInputObjectSchema } from './GeoViewHistoryUncheckedUpdateWithoutUserInput.schema';
import { GeoViewHistoryCreateWithoutUserInputObjectSchema as GeoViewHistoryCreateWithoutUserInputObjectSchema } from './GeoViewHistoryCreateWithoutUserInput.schema';
import { GeoViewHistoryUncheckedCreateWithoutUserInputObjectSchema as GeoViewHistoryUncheckedCreateWithoutUserInputObjectSchema } from './GeoViewHistoryUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoViewHistoryWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => GeoViewHistoryUpdateWithoutUserInputObjectSchema), z.lazy(() => GeoViewHistoryUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => GeoViewHistoryCreateWithoutUserInputObjectSchema), z.lazy(() => GeoViewHistoryUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const GeoViewHistoryUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryUpsertWithWhereUniqueWithoutUserInput>;
export const GeoViewHistoryUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
