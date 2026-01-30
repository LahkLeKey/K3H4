import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionCreateWithoutUserInputObjectSchema as GeoDirectionCreateWithoutUserInputObjectSchema } from './GeoDirectionCreateWithoutUserInput.schema';
import { GeoDirectionUncheckedCreateWithoutUserInputObjectSchema as GeoDirectionUncheckedCreateWithoutUserInputObjectSchema } from './GeoDirectionUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoDirectionWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => GeoDirectionCreateWithoutUserInputObjectSchema), z.lazy(() => GeoDirectionUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const GeoDirectionCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoDirectionCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionCreateOrConnectWithoutUserInput>;
export const GeoDirectionCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
