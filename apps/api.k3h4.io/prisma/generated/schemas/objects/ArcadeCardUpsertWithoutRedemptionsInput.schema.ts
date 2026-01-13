import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeCardUpdateWithoutRedemptionsInputObjectSchema as ArcadeCardUpdateWithoutRedemptionsInputObjectSchema } from './ArcadeCardUpdateWithoutRedemptionsInput.schema';
import { ArcadeCardUncheckedUpdateWithoutRedemptionsInputObjectSchema as ArcadeCardUncheckedUpdateWithoutRedemptionsInputObjectSchema } from './ArcadeCardUncheckedUpdateWithoutRedemptionsInput.schema';
import { ArcadeCardCreateWithoutRedemptionsInputObjectSchema as ArcadeCardCreateWithoutRedemptionsInputObjectSchema } from './ArcadeCardCreateWithoutRedemptionsInput.schema';
import { ArcadeCardUncheckedCreateWithoutRedemptionsInputObjectSchema as ArcadeCardUncheckedCreateWithoutRedemptionsInputObjectSchema } from './ArcadeCardUncheckedCreateWithoutRedemptionsInput.schema';
import { ArcadeCardWhereInputObjectSchema as ArcadeCardWhereInputObjectSchema } from './ArcadeCardWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => ArcadeCardUpdateWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedUpdateWithoutRedemptionsInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeCardCreateWithoutRedemptionsInputObjectSchema), z.lazy(() => ArcadeCardUncheckedCreateWithoutRedemptionsInputObjectSchema)]),
  where: z.lazy(() => ArcadeCardWhereInputObjectSchema).optional()
}).strict();
export const ArcadeCardUpsertWithoutRedemptionsInputObjectSchema: z.ZodType<Prisma.ArcadeCardUpsertWithoutRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeCardUpsertWithoutRedemptionsInput>;
export const ArcadeCardUpsertWithoutRedemptionsInputObjectZodSchema = makeSchema();
