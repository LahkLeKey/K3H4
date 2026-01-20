import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoStatusLogWhereUniqueInputObjectSchema as GeoStatusLogWhereUniqueInputObjectSchema } from './GeoStatusLogWhereUniqueInput.schema';
import { GeoStatusLogUpdateWithoutUserInputObjectSchema as GeoStatusLogUpdateWithoutUserInputObjectSchema } from './GeoStatusLogUpdateWithoutUserInput.schema';
import { GeoStatusLogUncheckedUpdateWithoutUserInputObjectSchema as GeoStatusLogUncheckedUpdateWithoutUserInputObjectSchema } from './GeoStatusLogUncheckedUpdateWithoutUserInput.schema';
import { GeoStatusLogCreateWithoutUserInputObjectSchema as GeoStatusLogCreateWithoutUserInputObjectSchema } from './GeoStatusLogCreateWithoutUserInput.schema';
import { GeoStatusLogUncheckedCreateWithoutUserInputObjectSchema as GeoStatusLogUncheckedCreateWithoutUserInputObjectSchema } from './GeoStatusLogUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoStatusLogWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => GeoStatusLogUpdateWithoutUserInputObjectSchema), z.lazy(() => GeoStatusLogUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => GeoStatusLogCreateWithoutUserInputObjectSchema), z.lazy(() => GeoStatusLogUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const GeoStatusLogUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoStatusLogUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogUpsertWithWhereUniqueWithoutUserInput>;
export const GeoStatusLogUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
