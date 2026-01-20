import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoViewHistoryWhereUniqueInputObjectSchema as GeoViewHistoryWhereUniqueInputObjectSchema } from './GeoViewHistoryWhereUniqueInput.schema';
import { GeoViewHistoryUpdateWithoutUserInputObjectSchema as GeoViewHistoryUpdateWithoutUserInputObjectSchema } from './GeoViewHistoryUpdateWithoutUserInput.schema';
import { GeoViewHistoryUncheckedUpdateWithoutUserInputObjectSchema as GeoViewHistoryUncheckedUpdateWithoutUserInputObjectSchema } from './GeoViewHistoryUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoViewHistoryWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => GeoViewHistoryUpdateWithoutUserInputObjectSchema), z.lazy(() => GeoViewHistoryUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const GeoViewHistoryUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryUpdateWithWhereUniqueWithoutUserInput>;
export const GeoViewHistoryUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
