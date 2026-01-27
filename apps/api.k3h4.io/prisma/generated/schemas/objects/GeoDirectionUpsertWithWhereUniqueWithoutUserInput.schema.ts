import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionUpdateWithoutUserInputObjectSchema as GeoDirectionUpdateWithoutUserInputObjectSchema } from './GeoDirectionUpdateWithoutUserInput.schema';
import { GeoDirectionUncheckedUpdateWithoutUserInputObjectSchema as GeoDirectionUncheckedUpdateWithoutUserInputObjectSchema } from './GeoDirectionUncheckedUpdateWithoutUserInput.schema';
import { GeoDirectionCreateWithoutUserInputObjectSchema as GeoDirectionCreateWithoutUserInputObjectSchema } from './GeoDirectionCreateWithoutUserInput.schema';
import { GeoDirectionUncheckedCreateWithoutUserInputObjectSchema as GeoDirectionUncheckedCreateWithoutUserInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => GeoDirectionUpdateWithoutUserInputObjectSchema), z.lazy(() => GeoDirectionUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutUserInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const GeoDirectionUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpsertWithWhereUniqueWithoutUserInput>;
export const GeoDirectionUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
