import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionCreateWithoutActorInputObjectSchema as GeoDirectionCreateWithoutActorInputObjectSchema } from './GeoDirectionCreateWithoutActorInput.schema';
import { GeoDirectionUncheckedCreateWithoutActorInputObjectSchema as GeoDirectionUncheckedCreateWithoutActorInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutActorInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutActorInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutActorInputObjectSchema)])
}).strict();
export const GeoDirectionCreateOrConnectWithoutActorInputObjectSchema: z.ZodType<Prisma.GeoDirectionCreateOrConnectWithoutActorInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionCreateOrConnectWithoutActorInput>;
export const GeoDirectionCreateOrConnectWithoutActorInputObjectZodSchema = makeSchema();
