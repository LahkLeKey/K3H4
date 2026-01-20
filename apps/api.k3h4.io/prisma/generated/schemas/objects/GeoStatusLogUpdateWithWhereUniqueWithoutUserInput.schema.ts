import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoStatusLogWhereUniqueInputObjectSchema as GeoStatusLogWhereUniqueInputObjectSchema } from './GeoStatusLogWhereUniqueInput.schema';
import { GeoStatusLogUpdateWithoutUserInputObjectSchema as GeoStatusLogUpdateWithoutUserInputObjectSchema } from './GeoStatusLogUpdateWithoutUserInput.schema';
import { GeoStatusLogUncheckedUpdateWithoutUserInputObjectSchema as GeoStatusLogUncheckedUpdateWithoutUserInputObjectSchema } from './GeoStatusLogUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoStatusLogWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => GeoStatusLogUpdateWithoutUserInputObjectSchema), z.lazy(() => GeoStatusLogUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const GeoStatusLogUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoStatusLogUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogUpdateWithWhereUniqueWithoutUserInput>;
export const GeoStatusLogUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
