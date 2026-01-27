import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionUpdateWithoutUserInputObjectSchema as GeoDirectionUpdateWithoutUserInputObjectSchema } from './GeoDirectionUpdateWithoutUserInput.schema';
import { GeoDirectionUncheckedUpdateWithoutUserInputObjectSchema as GeoDirectionUncheckedUpdateWithoutUserInputObjectSchema } from './GeoDirectionUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => GeoDirectionUpdateWithoutUserInputObjectSchema), z.lazy(() => GeoDirectionUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const GeoDirectionUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpdateWithWhereUniqueWithoutUserInput>;
export const GeoDirectionUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
