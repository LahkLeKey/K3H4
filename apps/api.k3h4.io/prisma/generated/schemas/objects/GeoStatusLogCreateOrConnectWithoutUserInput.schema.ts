import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { GeoStatusLogWhereUniqueInputObjectSchema as GeoStatusLogWhereUniqueInputObjectSchema } from './GeoStatusLogWhereUniqueInput.schema';
import { GeoStatusLogCreateWithoutUserInputObjectSchema as GeoStatusLogCreateWithoutUserInputObjectSchema } from './GeoStatusLogCreateWithoutUserInput.schema';
import { GeoStatusLogUncheckedCreateWithoutUserInputObjectSchema as GeoStatusLogUncheckedCreateWithoutUserInputObjectSchema } from './GeoStatusLogUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => GeoStatusLogWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => GeoStatusLogCreateWithoutUserInputObjectSchema), z.lazy(() => GeoStatusLogUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const GeoStatusLogCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoStatusLogCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogCreateOrConnectWithoutUserInput>;
export const GeoStatusLogCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
