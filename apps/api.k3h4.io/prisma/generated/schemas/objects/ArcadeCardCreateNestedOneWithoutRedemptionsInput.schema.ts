import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardCreateWithoutRedemptionsInputObjectSchema as ArcadeCardCreateWithoutRedemptionsInputObjectSchema } from './ArcadeCardCreateWithoutRedemptionsInput.schema';
import { ArcadeCardUncheckedCreateWithoutRedemptionsInputObjectSchema as ArcadeCardUncheckedCreateWithoutRedemptionsInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutRedemptionsInput.schema';
import { ArcadeCardCreateOrConnectWithoutRedemptionsInputObjectSchema as ArcadeCardCreateOrConnectWithoutRedemptionsInputObjectSchema } from './ArcadeCardCreateOrConnectWithoutRedemptionsInput.schema';
import { ArcadeCardWhereUniqueInputObjectSchema as ArcadeCardWhereUniqueInputObjectSchema } from './ArcadeCardWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutRedemptionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => ArcadeCardCreateOrConnectWithoutRedemptionsInputObjectSchema).optional(),
  connect: z.lazy(() => ArcadeCardWhereUniqueInputObjectSchema).optional()
}).strict();
export const ArcadeCardCreateNestedOneWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.ArcadeCardCreateNestedOneWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardCreateNestedOneWithoutRedemptionsInput>;
export const ArcadeCardCreateNestedOneWithoutRedemptionsInputObjectZodSchema = makeSchema();
