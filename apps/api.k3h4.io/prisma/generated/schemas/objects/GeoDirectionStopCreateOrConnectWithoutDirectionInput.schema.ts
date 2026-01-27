import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionStopWhereUniqueInputObjectSchema as GeoDirectionStopWhereUniqueInputObjectSchema } from './GeoDirectionStopWhereUniqueInput.schema';
import { GeoDirectionStopCreateWithoutDirectionInputObjectSchema as GeoDirectionStopCreateWithoutDirectionInputObjectSchema } from './GeoDirectionStopCreateWithoutDirectionInput.schema';
import { GeoDirectionStopUncheckedCreateWithoutDirectionInputObjectSchema as GeoDirectionStopUncheckedCreateWithoutDirectionInputObjectSchema } from './GeoDirectionStopUncheckedCreateWithoutDirectionInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionStopWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => GeoDirectionStopCreateWithoutDirectionInputObjectSchema), z.lazy(() => GeoDirectionStopUncheckedCreateWithoutDirectionInputObjectSchema)])
}).strict();
export const GeoDirectionStopCreateOrConnectWithoutDirectionInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopCreateOrConnectWithoutDirectionInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopCreateOrConnectWithoutDirectionInput>;
export const GeoDirectionStopCreateOrConnectWithoutDirectionInputObjectZodSchema = makeSchema();
