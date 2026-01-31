import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionUpdateWithoutActorInputObjectSchema as GeoDirectionUpdateWithoutActorInputObjectSchema } from './GeoDirectionUpdateWithoutActorInput.schema';
import { GeoDirectionUncheckedUpdateWithoutActorInputObjectSchema as GeoDirectionUncheckedUpdateWithoutActorInputObjectSchema } from './GeoDirectionUncheckedUpdateWithoutActorInput.schema';
import { GeoDirectionCreateWithoutActorInputObjectSchema as GeoDirectionCreateWithoutActorInputObjectSchema } from './GeoDirectionCreateWithoutActorInput.schema';
import { GeoDirectionUncheckedCreateWithoutActorInputObjectSchema as GeoDirectionUncheckedCreateWithoutActorInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => GeoDirectionUpdateWithoutActorInputObjectSchema), z.lazy(() => GeoDirectionUncheckedUpdateWithoutActorInputObjectSchema)]),
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutActorInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutActorInputObjectSchema)])
}).strict();
export const GeoDirectionUpsertWithWhereUniqueWithoutActorInputObjectSchema: z.ZodType<Prisma.GeoDirectionUpsertWithWhereUniqueWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUpsertWithWhereUniqueWithoutActorInput>;
export const GeoDirectionUpsertWithWhereUniqueWithoutActorInputObjectZodSchema = makeSchema();
