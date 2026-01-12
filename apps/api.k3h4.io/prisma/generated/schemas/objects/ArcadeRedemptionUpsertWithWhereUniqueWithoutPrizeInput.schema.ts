import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ArcadeRedemptionWhereUniqueInputObjectSchema as ArcadeRedemptionWhereUniqueInputObjectSchema } from './ArcadeRedemptionWhereUniqueInput.schema';
import { ArcadeRedemptionUpdateWithoutPrizeInputObjectSchema as ArcadeRedemptionUpdateWithoutPrizeInputObjectSchema } from './ArcadeRedemptionUpdateWithoutPrizeInput.schema';
import { ArcadeRedemptionUncheckedUpdateWithoutPrizeInputObjectSchema as ArcadeRedemptionUncheckedUpdateWithoutPrizeInputObjectSchema } from './ArcadeRedemptionUncheckedUpdateWithoutPrizeInput.schema';
import { ArcadeRedemptionCreateWithoutPrizeInputObjectSchema as ArcadeRedemptionCreateWithoutPrizeInputObjectSchema } from './ArcadeRedemptionCreateWithoutPrizeInput.schema';
import { ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectSchema as ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectSchema } from './ArcadeRedemptionUncheckedCreateWithoutPrizeInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ArcadeRedemptionWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => ArcadeRedemptionUpdateWithoutPrizeInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedUpdateWithoutPrizeInputObjectSchema)]),
  create: z.union([z.lazy(() => ArcadeRedemptionCreateWithoutPrizeInputObjectSchema), z.lazy(() => ArcadeRedemptionUncheckedCreateWithoutPrizeInputObjectSchema)])
}).strict();
export const ArcadeRedemptionUpsertWithWhereUniqueWithoutPrizeInputObjectSchema: z.ZodType<Prisma.ArcadeRedemptionUpsertWithWhereUniqueWithoutPrizeInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeRedemptionUpsertWithWhereUniqueWithoutPrizeInput>;
export const ArcadeRedemptionUpsertWithWhereUniqueWithoutPrizeInputObjectZodSchema = makeSchema();
