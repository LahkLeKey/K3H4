import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './ArcadeCardWhereUniqueInput.schema';
import { ArcadeCardCreateWithoutRedemptionsInputObjectSchema as ArcadeCardCreateWithoutRedemptionsInputObjectSchema } from './ArcadeCardCreateWithoutRedemptionsInput.schema';
import { ArcadeCardUncheckedCreateWithoutRedemptionsInputObjectSchema as ArcadeCardUncheckedCreateWithoutRedemptionsInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutRedemptionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutRedemptionsInputObjectSchema)])
}).strict();
export const ArcadeCardCreateOrConnectWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.ArcadeCardCreateOrConnectWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardCreateOrConnectWithoutRedemptionsInput>;
export const ArcadeCardCreateOrConnectWithoutRedemptionsInputObjectZodSchema = makeSchema();
