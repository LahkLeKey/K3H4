import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoViewHistoryWhereUniqueInputObjectSchema as GeoViewHistoryWhereUniqueInputObjectSchema } from './GeoViewHistoryWhereUniqueInput.schema';
import { GeoViewHistoryCreateWithoutUserInputObjectSchema as GeoViewHistoryCreateWithoutUserInputObjectSchema } from './GeoViewHistoryCreateWithoutUserInput.schema';
import { GeoViewHistoryUncheckedCreateWithoutUserInputObjectSchema as GeoViewHistoryUncheckedCreateWithoutUserInputObjectSchema } from './GeoViewHistoryUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoViewHistoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => GeoViewHistoryCreateWithoutUserInputObjectSchema), z.lazy(() => GeoViewHistoryUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const GeoViewHistoryCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryCreateOrConnectWithoutUserInput>;
export const GeoViewHistoryCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
