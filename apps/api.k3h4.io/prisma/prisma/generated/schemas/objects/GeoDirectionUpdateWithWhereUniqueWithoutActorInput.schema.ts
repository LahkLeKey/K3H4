import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionUpdateWithoutActorInputObjectSchema as GeoDirectionUpdateWithoutActorInputObjectSchema } from './GeoDirectionUpdateWithoutActorInput.schema';
import { GeoDirectionUncheckedUpdateWithoutActorInputObjectSchema as GeoDirectionUncheckedUpdateWithoutActorInputObjectSchema } from './GeoDirectionUncheckedUpdateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => GeoDirectionUpdateWithoutActorInputObjectSchema), z.lazy(() => GeoDirectionUncheckedUpdateWithoutActorInputObjectSchema)])
}).strict();
export const GeoDirectionUpdateWithWhereUniqueWithoutActorInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpdateWithWhereUniqueWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpdateWithWhereUniqueWithoutActorInput>;
export const GeoDirectionUpdateWithWhereUniqueWithoutActorInputObjectZodSchema = makeSchema();
